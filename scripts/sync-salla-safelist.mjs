import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve('src');
const upstreamFile = path.resolve('node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt');
const globalOutputFile = path.resolve('src/assets/styles/salla-component-safelist.txt');
const pageOutputFile = path.resolve('src/assets/styles/salla-page-component-safelist.txt');
const sourceExtensions = /\.(twig|js|scss)$/;

function walk(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const target = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(target) : [target];
    });
}

const sourceFiles = walk(sourceRoot).filter((file) => sourceExtensions.test(file));
const globalSource = sourceFiles.filter((file) => !file.includes(`${path.sep}views${path.sep}pages${path.sep}`)).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const pageSource = sourceFiles.filter((file) => file.includes(`${path.sep}views${path.sep}pages${path.sep}`)).map((file) => fs.readFileSync(file, 'utf8')).join('\n');

const prefixes = new Set([
    // Shared foundations rendered inside Salla components.
    's-modal', 's-sheet', 's-button', 's-form', 's-loader', 's-spinner',
    's-skeleton', 's-swiper', 's-tabs', 's-product-card', 's-list-tile', 's-quantity-input',
]);

for (const match of globalSource.matchAll(/<salla-([a-z0-9-]+)/g)) prefixes.add(`s-${match[1]}`);
const pagePrefixes = new Set();
for (const match of pageSource.matchAll(/<salla-([a-z0-9-]+)/g)) {
    const prefix = `s-${match[1]}`;
    if (!prefixes.has(prefix)) pagePrefixes.add(prefix);
}

const upstreamLines = fs.readFileSync(upstreamFile, 'utf8').split(/\r?\n/).filter(Boolean);
const kept = upstreamLines.filter((line) => [...prefixes].some((prefix) => line.includes(prefix)));
const pageKept = upstreamLines.filter((line) => [...pagePrefixes].some((prefix) => line.includes(prefix)));

fs.writeFileSync(globalOutputFile, `${kept.join('\n')}\n`, 'utf8');
fs.writeFileSync(pageOutputFile, `${pageKept.join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ upstream: upstreamLines.length, globalKept: kept.length, pageKept: pageKept.length, globalPrefixes: prefixes.size, pagePrefixes: pagePrefixes.size }, null, 2));
