import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const twilightFile = path.join(scriptDir, '..', 'twilight.json');
const componentsDir = path.join(scriptDir, '..', 'src', 'views', 'components');

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Components predating this generator that are known-working in the live editor and are
 * intentionally out of scope for the required-field-default rule below. Do not add to this list
 * without confirming the component is genuinely pre-existing and already verified live. */
const LEGACY_REQUIRED_FIELD_EXCEPTIONS = new Set([
  '9a758d20-2ce4-4782-91fe-c04466464588/products', // "Animated products with a background"
  '25f6cf26-a53f-4954-9b32-739b311b32c7/brands', // "Brands"
]);

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}
function warn(message) {
  warnings.push(message);
}

let raw;
try {
  raw = fs.readFileSync(twilightFile, 'utf8');
} catch (e) {
  console.error(`FATAL: cannot read twilight.json (${e.message})`);
  process.exit(1);
}

let schema;
try {
  schema = JSON.parse(raw);
} catch (e) {
  console.error(`FATAL: twilight.json is not valid JSON (${e.message})`);
  process.exit(1);
}

if (!Array.isArray(schema.components)) {
  fail('twilight.json has no `components` array.');
  report();
}

const seenComponentKeys = new Map();
const seenComponentPaths = new Map();

for (const component of schema.components) {
  const label = component.key ?? '(missing key)';

  // --- key format ---
  if (!component.key) {
    fail(`Component with path "${component.path}" has no key.`);
  } else if (!uuidRe.test(component.key)) {
    fail(`Component "${label}" (path: ${component.path}) has a non-UUID key. Salla's live "Add Section" library only reliably registers UUID v4 keys.`);
  }

  // --- duplicate key ---
  if (component.key) {
    if (seenComponentKeys.has(component.key)) {
      fail(`Duplicate component key "${component.key}" used by both "${seenComponentKeys.get(component.key)}" and "${component.path}".`);
    } else {
      seenComponentKeys.set(component.key, component.path);
    }
  }

  // --- duplicate path ---
  if (component.path) {
    if (seenComponentPaths.has(component.path)) {
      fail(`Duplicate component path "${component.path}" used by keys "${seenComponentPaths.get(component.path)}" and "${component.key}".`);
    } else {
      seenComponentPaths.set(component.path, component.key);
    }
  } else {
    fail(`Component "${label}" has no path.`);
  }

  // --- path -> twig template must exist ---
  if (component.path) {
    const parts = component.path.split('.');
    const twigFile = path.join(componentsDir, ...parts) + '.twig';
    if (!fs.existsSync(twigFile)) {
      fail(`Component "${label}" (path: ${component.path}) has no matching Twig template at ${twigFile}.`);
    }
  }

  // --- bilingual title ---
  if (!component.title || typeof component.title !== 'object' || !component.title.ar || !component.title.en) {
    fail(`Component "${label}" is missing a complete bilingual title (ar/en).`);
  }

  // --- icon ---
  if (!component.icon || !component.icon.startsWith('sicon-')) {
    warn(`Component "${label}" has a missing or non-standard icon: ${component.icon}.`);
  }

  // --- Add Section preview thumbnail ---
  if (!component.image) {
    warn(`Component "${label}" has no Add Section preview thumbnail (image).`);
  }

  // --- fields ---
  if (!Array.isArray(component.fields)) {
    fail(`Component "${label}" has no fields array.`);
    continue;
  }

  const seenFieldIds = new Map();
  for (const field of component.fields) {
    if (!field.id) continue; // static description blocks may omit id in some themes; still check others below

    if (seenFieldIds.has(field.id)) {
      fail(`Component "${label}" has a duplicate field id "${field.id}".`);
    } else {
      seenFieldIds.set(field.id, true);
    }

    // required field with an impossible/empty default on a dynamic multi-select source
    const exceptionKey = `${component.key}/${field.id}`;
    if (field.required && !LEGACY_REQUIRED_FIELD_EXCEPTIONS.has(exceptionKey)) {
      const emptySelected = Array.isArray(field.selected) && field.selected.length === 0;
      const emptyValue = Array.isArray(field.value) && field.value.length === 0;
      if ((emptySelected || emptyValue) && field.source) {
        fail(`Component "${label}" field "${field.id}" is required with an empty default (selected/value = []) on a dynamic source ("${field.source}"). Salla's editor can silently reject or fail to render settings for a required field with no valid default.`);
      }
    }

    // dropdown-list must have either a dynamic source or static options
    if (field.format === 'dropdown-list') {
      const hasSource = !!field.source;
      const hasStaticOptions = Array.isArray(field.options) && field.options.length > 0;
      if (!hasSource && !hasStaticOptions) {
        fail(`Component "${label}" field "${field.id}" is a dropdown-list with neither a dynamic source nor static options.`);
      }
    }

    // collection subfields must be malformed-free and correctly namespaced
    if (field.type === 'collection') {
      if (!Array.isArray(field.fields) || field.fields.length === 0) {
        fail(`Component "${label}" collection field "${field.id}" has no subfields.`);
      } else {
        const subSeen = new Map();
        for (const subField of field.fields) {
          if (!subField.id) {
            fail(`Component "${label}" collection field "${field.id}" has a subfield with no id.`);
            continue;
          }
          if (!subField.id.startsWith(`${field.id}.`)) {
            fail(`Component "${label}" collection field "${field.id}" has a malformed subfield id "${subField.id}" (must start with "${field.id}.").`);
          }
          if (subSeen.has(subField.id)) {
            fail(`Component "${label}" collection field "${field.id}" has a duplicate subfield id "${subField.id}".`);
          } else {
            subSeen.set(subField.id, true);
          }
        }
      }
    }

    // multilanguage field values must carry both locales when a default value is present
    if (field.multilanguage && field.value !== undefined && field.value !== null) {
      const isPlainObject = typeof field.value === 'object' && !Array.isArray(field.value);
      if (!isPlainObject || !('ar' in field.value) || !('en' in field.value)) {
        fail(`Component "${label}" field "${field.id}" is multilanguage but its default value is not a complete {ar, en} object.`);
      }
    }
  }
}

function report() {
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    console.error(`\nFAILED: ${errors.length} error(s), ${warnings.length} warning(s).`);
    process.exit(1);
  }
  console.log(`\nOK: ${schema.components.length} components validated, 0 errors, ${warnings.length} warning(s).`);
}

report();
