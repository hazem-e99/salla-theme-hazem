import fs from 'node:fs';

const file = new URL('../twilight.json', import.meta.url);
const schema = JSON.parse(fs.readFileSync(file, 'utf8'));

const option = (label, value) => ({ label, value, key: `premium-${value}` });
const dropdown = (id, label, values, selected = values[0], description = null) => ({
  id,
  type: 'items',
  format: 'dropdown-list',
  label,
  description,
  required: true,
  selected: [option(selected[0], selected[1])],
  options: values.map(([text, value]) => option(text, value)),
});
const text = (id, label, format = 'text', required = false) => ({
  id, type: 'string', format, label, multilanguage: true, required,
});
const image = (id, label, required = false) => ({
  id, type: 'string', format: 'image', label, required,
});
const selectedItems = (id, label, source, maxLength = 12) => ({
  id, type: 'items', format: 'dropdown-list', label, source, searchable: true,
  multichoice: true, required: true, minLength: 1, maxLength, selected: [], options: [], value: [],
});
const linkSources = [
  ['Product / منتج', 'products'], ['Category / تصنيف', 'categories'],
  ['Brand / علامة تجارية', 'brands'], ['Page / صفحة', 'pages'],
  ['Article / مقالة', 'blog_articles'], ['Offers / العروض', 'offers_link'],
  ['Brands page / صفحة العلامات', 'brands_link'], ['Blog / المدونة', 'blog_link'],
  ['External link / رابط خارجي', 'custom'],
].map(([label, value]) => ({ label, key: value, value }));
const variableLink = (id, label) => ({
  id, type: 'items', format: 'variable-list', label, source: 'custom', searchable: true,
  required: false, value: null, sources: linkSources,
});
const common = () => [
  dropdown('width', 'Width / العرض', [['Contained / داخل الحاوية', 'contained'], ['Narrow / ضيق', 'narrow'], ['Wide / عريض', 'wide'], ['Full bleed / عرض كامل', 'full']], ['Contained / داخل الحاوية', 'contained']),
  dropdown('spacing', 'Vertical spacing / المسافة الرأسية', [['None / بدون', 'none'], ['Compact / مدمجة', 'compact'], ['Normal / عادية', 'normal'], ['Airy / واسعة', 'airy']], ['Normal / عادية', 'normal']),
  dropdown('background', 'Background / الخلفية', [['Canvas / أساسية', 'canvas'], ['Soft surface / سطح ناعم', 'soft'], ['Inverse / داكنة', 'inverse']], ['Canvas / أساسية', 'canvas']),
  dropdown('alignment', 'Content alignment / محاذاة المحتوى', [['Start / البداية', 'start'], ['Center / الوسط', 'center'], ['End / النهاية', 'end']], ['Start / البداية', 'start']),
  dropdown('animation', 'Entrance motion / حركة الظهور', [['None / بدون', 'none'], ['Fade / تلاشي', 'fade'], ['Reveal / كشف', 'reveal']], ['Fade / تلاشي', 'fade']),
];

const coreComponents = [
  {
    key: 'premium-system-hero-001',
    title: { en: '01 · Hero — Premium', ar: '01 · واجهة رئيسية فاخرة' },
    icon: 'sicon-image', path: 'home.premium-hero', is_default: true,
    fields: [
      { type: 'static', format: 'description', id: 'hero-guide', value: 'Hero / الواجهة الرئيسية — seven composition variants with responsive media.' },
      dropdown('variant', 'Hero variant / تصميم الواجهة', [
        ['Full Screen / شاشة كاملة', 'full-screen'], ['Editorial Split / تقسيم تحريري', 'editorial-split'],
        ['Centered Overlay / محتوى متوسط', 'centered-overlay'], ['Minimal Luxury / فاخر بسيط', 'minimal-luxury'],
        ['Product Spotlight / إبراز منتج', 'product-spotlight'], ['Video Hero / واجهة فيديو', 'video'],
        ['Collage Hero / كولاج', 'collage'],
      ], ['Full Screen / شاشة كاملة', 'full-screen']),
      ...common(), text('title', 'Title / العنوان', 'text', true), text('subtitle', 'Eyebrow / العنوان الصغير'),
      text('description', 'Description / الوصف', 'textarea'), image('image', 'Desktop image / صورة سطح المكتب', true),
      image('mobile_image', 'Mobile image / صورة الجوال'), image('secondary_image', 'Secondary collage image / صورة الكولاج الثانية'),
      text('video_id', 'YouTube video ID / معرّف فيديو يوتيوب'), selectedItems('products', 'Spotlight products / منتجات مميزة', 'products', 4),
      text('cta_label', 'Button label / نص الزر'), variableLink('cta_url', 'Button link / رابط الزر'),
    ],
  },
  {
    key: 'premium-system-products-001',
    title: { en: '03 · Products — Grid or Carousel', ar: '03 · منتجات — شبكة أو سلايدر' },
    icon: 'sicon-shopping-bag', path: 'home.product-showcase', is_default: true,
    fields: [
      { type: 'static', format: 'description', id: 'products-guide', value: 'Selected Salla products rendered by the native product list/slider components.' },
      dropdown('mode', 'Display / طريقة العرض', [['Product grid / شبكة منتجات', 'grid'], ['Product carousel / سلايدر منتجات', 'carousel']], ['Product grid / شبكة منتجات', 'grid']),
      dropdown('variant', 'Variant / التصميم', [
        ['Editorial / تحريري', 'editorial'], ['Minimal / بسيط', 'minimal'], ['Compact / مدمج', 'compact'],
        ['Cards / بطاقات', 'cards'], ['Marketplace / سوق', 'marketplace'], ['Luxury / فاخر', 'luxury'],
        ['Standard carousel / سلايدر قياسي', 'standard'], ['Peek carousel / سلايدر ظاهر جزئياً', 'peek'],
        ['Full bleed carousel / سلايدر بعرض كامل', 'full-bleed'], ['Centered carousel / سلايدر متوسط', 'centered'],
      ], ['Editorial / تحريري', 'editorial']),
      ...common(), text('title', 'Title / العنوان', 'text', true), text('description', 'Description / الوصف', 'textarea'),
      selectedItems('products', 'Products / المنتجات', 'products', 24),
      { id: 'limit', type: 'number', format: 'integer', label: 'Product count / عدد المنتجات', value: 8, minimum: 2, maximum: 24, required: true },
    ],
  },
  {
    key: 'premium-system-collections-001',
    title: { en: '04 · Collections — Categories', ar: '04 · مجموعات — تصنيفات' },
    icon: 'sicon-grid', path: 'home.collection-showcase', is_default: true,
    fields: [
      { type: 'static', format: 'description', id: 'collections-guide', value: 'Category grid or carousel using live Salla category data.' },
      dropdown('mode', 'Display / طريقة العرض', [['Category grid / شبكة تصنيفات', 'grid'], ['Category carousel / سلايدر تصنيفات', 'carousel']], ['Category grid / شبكة تصنيفات', 'grid']),
      dropdown('variant', 'Variant / التصميم', [
        ['Portrait / طولي', 'portrait'], ['Square / مربع', 'square'], ['Circle / دائري', 'circle'],
        ['Editorial / تحريري', 'editorial'], ['Overlay / نص فوق الصورة', 'overlay'], ['Minimal text / نص بسيط', 'minimal-text'],
      ], ['Portrait / طولي', 'portrait']),
      ...common(), text('title', 'Title / العنوان', 'text', true), selectedItems('categories', 'Categories / التصنيفات', 'categories', 12),
    ],
  },
  {
    key: 'premium-system-image-text-001',
    title: { en: '06 · Editorial — Image + Text', ar: '06 · تحريري — صورة ونص' },
    icon: 'sicon-layout', path: 'home.image-text', is_default: true,
    fields: [
      { type: 'static', format: 'description', id: 'image-text-guide', value: 'Editorial storytelling with six genuinely different compositions.' },
      dropdown('variant', 'Variant / التصميم', [
        ['Image left / الصورة يسار', 'image-left'], ['Image right / الصورة يمين', 'image-right'],
        ['Overlapping / متداخل', 'overlapping'], ['Full background / خلفية كاملة', 'full-background'],
        ['Editorial / تحريري', 'editorial'], ['Compact / مدمج', 'compact'],
      ], ['Image left / الصورة يسار', 'image-left']),
      ...common(), image('image', 'Image / الصورة', true), text('image_alt', 'Image alternative text / النص البديل'),
      text('title', 'Title / العنوان', 'text', true), text('subtitle', 'Eyebrow / العنوان الصغير'),
      text('description', 'Description / الوصف', 'textarea'), text('cta_label', 'Button label / نص الزر'),
      variableLink('cta_url', 'Button link / رابط الزر'),
    ],
  },
];

const editorialItems = () => ({
  id: 'items', type: 'collection', format: 'collection', label: 'Items / العناصر',
  item_label: 'Item / عنصر', required: false, minLength: 0, maxLength: 12, value: [],
  fields: [
    image('items.image', 'Image / الصورة'), text('items.title', 'Title / العنوان'),
    text('items.text', 'Text / النص', 'textarea'), variableLink('items.url', 'Link / الرابط'),
    { id: 'items.x', type: 'number', format: 'integer', label: 'Horizontal position % / الموضع الأفقي', value: 50, minimum: 0, maximum: 100, required: false },
    { id: 'items.y', type: 'number', format: 'integer', label: 'Vertical position % / الموضع الرأسي', value: 50, minimum: 0, maximum: 100, required: false },
  ],
});

const editorialDefinitions = [
  ['split-banner', 'Split Banner', 'بنر منقسم'],
  ['editorial-story', 'Editorial Story', 'قصة تحريرية'],
  ['lookbook', 'Lookbook', 'كتاب الإطلالات'],
  ['image-hotspots', 'Image Hotspots', 'نقاط تفاعلية على الصورة'],
  ['magazine-layout', 'Magazine Layout', 'تخطيط مجلة'],
  ['editorial-quote', 'Editorial Quote', 'اقتباس تحريري'],
  ['timeline', 'Timeline', 'خط زمني'],
  ['image-gallery', 'Image Gallery', 'معرض صور'],
  ['masonry-gallery', 'Masonry Gallery', 'معرض متداخل'],
  ['before-after', 'Before / After', 'قبل وبعد'],
].map(([slug, en, ar], index) => ({
  key: `premium-editorial-${String(index + 1).padStart(3, '0')}`,
  title: { en: `06 · Editorial — ${en}`, ar: `06 · تحريري — ${ar}` },
  icon: 'sicon-image', path: `home.${slug}`,
  fields: [
    { type: 'static', format: 'description', id: `${slug}-guide`, value: `${en} / ${ar} — reusable editorial content with responsive media.` },
    ...common(), text('title', 'Title / العنوان'), text('description', 'Description / الوصف', 'textarea'),
    image('image', 'Primary image / الصورة الرئيسية'), text('image_alt', 'Image alternative text / النص البديل'),
    text('quote', 'Quote / الاقتباس', 'textarea'), text('citation', 'Citation / المصدر'), editorialItems(),
  ],
}));

const components = [...coreComponents, ...editorialDefinitions];

const managedPaths = new Set(components.map((component) => component.path));
schema.components = [...(schema.components || []).filter((component) => !managedPaths.has(component.path)), ...components];
fs.writeFileSync(file, `${JSON.stringify(schema, null, 4)}\n`, 'utf8');
console.log(`Synced ${components.length} premium components; total components: ${schema.components.length}`);
