import fs from 'node:fs';
import crypto from 'node:crypto';

const file = new URL('../twilight.json', import.meta.url);
const schema = JSON.parse(fs.readFileSync(file, 'utf8'));

// Salla's live "Add Section" editor only reliably registers components whose `key` is a UUID v4,
// matching every legacy/original component in this theme. Component paths are stable identifiers,
// so we mint a UUID once per path and persist it here — re-running this generator must never
// change an already-shipped component's key, or merchants' saved sections would orphan.
const keyMapFile = new URL('./premium-component-keys.json', import.meta.url);
const keyMap = fs.existsSync(keyMapFile) ? JSON.parse(fs.readFileSync(keyMapFile, 'utf8')) : {};
const keyFor = (path) => {
  if (!keyMap[path]) keyMap[path] = crypto.randomUUID();
  return keyMap[path];
};

// Preview thumbnail shown in the Add Section picker; falls back to a shared placeholder so every
// premium component has one, matching the `image` property every legacy component ships with.
const defaultThumbnail = 'https://cdn.salla.network/images/themes/raed/preview-images/main-links.png?v=1.1';

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
// `required` defaults to false: Salla's editor can silently refuse to register (or fails to open
// the settings panel for) a component that declares a required dynamic-source field with an empty
// `selected`/`value` default, because there is no valid value to satisfy the requirement at
// schema-load time. Templates that consume this field must fall back gracefully (e.g. to
// `source="latest"`) when the merchant has not picked anything yet.
const selectedItems = (id, label, source, maxLength = 12, required = false) => ({
  id, type: 'items', format: 'dropdown-list', label, source, searchable: true,
  multichoice: true, required, minLength: required ? 1 : 0, maxLength, selected: [], options: [], value: [],
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
    key: keyFor('home.premium-hero'),
    title: { en: '01 · Hero — Premium', ar: '01 · واجهة رئيسية فاخرة' },
    icon: 'sicon-image', path: 'home.premium-hero', image: defaultThumbnail, is_default: true,
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
      text('video_id', 'YouTube video ID / معرّف فيديو يوتيوب'),
      selectedItems('products', 'Spotlight products (used by Product Spotlight variant only) / منتجات مميزة (لتصميم إبراز منتج فقط)', 'products', 4),
      text('cta_label', 'Button label / نص الزر'), variableLink('cta_url', 'Button link / رابط الزر'),
    ],
  },
  {
    key: keyFor('home.product-showcase'),
    title: { en: '03 · Products — Grid or Carousel', ar: '03 · منتجات — شبكة أو سلايدر' },
    icon: 'sicon-shopping-bag', path: 'home.product-showcase', image: defaultThumbnail, is_default: true,
    fields: [
      { type: 'static', format: 'description', id: 'products-guide', value: 'Selected Salla products rendered by the native product list/slider components. Leave products empty to show the store’s latest products.' },
      dropdown('mode', 'Display / طريقة العرض', [['Product grid / شبكة منتجات', 'grid'], ['Product carousel / سلايدر منتجات', 'carousel']], ['Product grid / شبكة منتجات', 'grid']),
      dropdown('variant', 'Variant / التصميم', [
        ['Editorial / تحريري', 'editorial'], ['Minimal / بسيط', 'minimal'], ['Compact / مدمج', 'compact'],
        ['Cards / بطاقات', 'cards'], ['Marketplace / سوق', 'marketplace'], ['Luxury / فاخر', 'luxury'],
        ['Standard carousel / سلايدر قياسي', 'standard'], ['Peek carousel / سلايدر ظاهر جزئياً', 'peek'],
        ['Full bleed carousel / سلايدر بعرض كامل', 'full-bleed'], ['Centered carousel / سلايدر متوسط', 'centered'],
      ], ['Editorial / تحريري', 'editorial']),
      ...common(), text('title', 'Title / العنوان', 'text', true), text('description', 'Description / الوصف', 'textarea'),
      selectedItems('products', 'Products (optional — leave empty for latest) / المنتجات (اختياري — اتركه فارغاً لعرض الأحدث)', 'products', 24),
      { id: 'limit', type: 'number', format: 'integer', label: 'Product count / عدد المنتجات', value: 8, minimum: 2, maximum: 24, required: true },
    ],
  },
  {
    key: keyFor('home.collection-showcase'),
    title: { en: '04 · Collections — Categories', ar: '04 · مجموعات — تصنيفات' },
    icon: 'sicon-grid', path: 'home.collection-showcase', image: defaultThumbnail, is_default: true,
    fields: [
      { type: 'static', format: 'description', id: 'collections-guide', value: 'Category grid or carousel using live Salla category data. Pick the categories to feature — this section renders nothing until at least one is chosen.' },
      dropdown('mode', 'Display / طريقة العرض', [['Category grid / شبكة تصنيفات', 'grid'], ['Category carousel / سلايدر تصنيفات', 'carousel']], ['Category grid / شبكة تصنيفات', 'grid']),
      dropdown('variant', 'Variant / التصميم', [
        ['Portrait / طولي', 'portrait'], ['Square / مربع', 'square'], ['Circle / دائري', 'circle'],
        ['Editorial / تحريري', 'editorial'], ['Overlay / نص فوق الصورة', 'overlay'], ['Minimal text / نص بسيط', 'minimal-text'],
      ], ['Portrait / طولي', 'portrait']),
      ...common(), text('title', 'Title / العنوان', 'text', true),
      selectedItems('categories', 'Categories / التصنيفات', 'categories', 12),
    ],
  },
  {
    key: keyFor('home.image-text'),
    title: { en: '06 · Editorial — Image + Text', ar: '06 · تحريري — صورة ونص' },
    icon: 'sicon-layout', path: 'home.image-text', image: defaultThumbnail, is_default: true,
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
].map(([slug, en, ar]) => ({
  key: keyFor(`home.${slug}`),
  title: { en: `06 · Editorial — ${en}`, ar: `06 · تحريري — ${ar}` },
  icon: 'sicon-image', path: `home.${slug}`, image: defaultThumbnail,
  fields: [
    { type: 'static', format: 'description', id: `${slug}-guide`, value: `${en} / ${ar} — reusable editorial content with responsive media.` },
    ...common(), text('title', 'Title / العنوان'), text('description', 'Description / الوصف', 'textarea'),
    image('image', 'Primary image / الصورة الرئيسية'), text('image_alt', 'Image alternative text / النص البديل'),
    text('quote', 'Quote / الاقتباس', 'textarea'), text('citation', 'Citation / المصدر'), editorialItems(),
  ],
}));

const safeContentDefinition = {
  key: keyFor('home.safe-html'),
  title: { en: '14 · Custom — Safe HTML', ar: '14 · مخصص — HTML آمن' },
  icon: 'sicon-code', path: 'home.safe-html', image: defaultThumbnail,
  fields: [
    { type: 'static', format: 'description', id: 'safe-html-warning', value: 'Safe HTML only / HTML آمن فقط. Scripts, event handlers, inline styles, unsafe URLs, iframes, object/embed, SVG and unsupported elements are removed.' },
    dropdown('width', 'Width / العرض', [['Contained / داخل الحاوية', 'contained'], ['Narrow / ضيق', 'narrow']], ['Contained / داخل الحاوية', 'contained']),
    dropdown('spacing', 'Vertical spacing / المسافة الرأسية', [['None / بدون', 'none'], ['Compact / مدمجة', 'compact'], ['Normal / عادية', 'normal'], ['Airy / واسعة', 'airy']], ['Normal / عادية', 'normal']),
    dropdown('background', 'Background / الخلفية', [['Canvas / أساسية', 'canvas'], ['Soft surface / سطح ناعم', 'soft'], ['Inverse / داكنة', 'inverse']], ['Canvas / أساسية', 'canvas']),
    text('html', 'Safe HTML content / محتوى HTML الآمن', 'textarea', true),
  ],
};

const structuredCatalog = [
  ['instagram-feed','07 · Social — Instagram Feed (Curated)','07 · اجتماعي — إنستغرام منسق',['Grid / شبكة','grid','Carousel / سلايدر','carousel','Minimal / بسيط','minimal']],
  ['tiktok-feed','07 · Social — TikTok Feed (Curated)','07 · اجتماعي — تيك توك منسق',['Grid / شبكة','grid','Carousel / سلايدر','carousel','Cards / بطاقات','cards']],
  ['ugc-gallery','07 · Social — UGC Gallery','07 · اجتماعي — محتوى العملاء',['Grid / شبكة','grid','Masonry / متداخل','masonry','Carousel / سلايدر','carousel']],
  ['reels-carousel','07 · Social — Reels Carousel','07 · اجتماعي — سلايدر ريلز',['Carousel / سلايدر','carousel','Cards / بطاقات','cards','Minimal / بسيط','minimal']],
  ['video-gallery','07 · Media — Video Gallery','07 · وسائط — معرض فيديو',['Grid / شبكة','grid','Carousel / سلايدر','carousel','Editorial / تحريري','editorial']],
  ['youtube-section','07 · Media — YouTube','07 · وسائط — يوتيوب',['Contained / داخل الحاوية','contained','Full bleed / عرض كامل','full','Split / منقسم','split']],
  ['social-gallery','07 · Social — Social Gallery','07 · اجتماعي — معرض اجتماعي',['Grid / شبكة','grid','Carousel / سلايدر','carousel','Cards / بطاقات','cards']],
  ['announcement-bar','08 · Conversion — Announcement Bar','08 · تحويل — شريط إعلاني',['Static / ثابت','static','Marquee / متحرك','marquee','Cards / بطاقات','cards']],
  ['countdown-banner','08 · Conversion — Countdown Banner','08 · تحويل — بنر عد تنازلي',['Contained / داخل الحاوية','contained','Full / كامل','full','Split / منقسم','split']],
  ['flash-sale-countdown','08 · Conversion — Flash Sale Countdown','08 · تحويل — تخفيضات مؤقتة',['Bold / جريء','bold','Compact / مدمج','compact','Full / كامل','full']],
  ['trust-badges','08 · Conversion — Trust Badges','08 · تحويل — شارات الثقة',['Inline / صف','inline','Cards / بطاقات','cards','Minimal / بسيط','minimal']],
  ['store-features-premium','08 · Conversion — Store Features','08 · تحويل — مزايا المتجر',['Icons / أيقونات','icons','Cards / بطاقات','cards','Strip / شريط','strip']],
  ['shipping-information','08 · Conversion — Shipping Information','08 · تحويل — معلومات الشحن',['Icons / أيقونات','icons','Cards / بطاقات','cards','Compact / مدمج','compact']],
  ['payment-methods','08 · Conversion — Payment Methods','08 · تحويل — طرق الدفع',['Inline / صف','inline','Panel / لوحة','panel','Minimal / بسيط','minimal']],
  ['guarantees','08 · Conversion — Guarantees','08 · تحويل — الضمانات',['Icons / أيقونات','icons','Cards / بطاقات','cards','Editorial / تحريري','editorial']],
  ['free-shipping-progress','08 · Conversion — Free Shipping Progress','08 · تحويل — تقدم الشحن المجاني',['Card / بطاقة','card','Strip / شريط','strip','Minimal / بسيط','minimal']],
  ['sticky-promotion','08 · Conversion — Sticky Promotion','08 · تحويل — عرض ثابت',['Bottom bar / شريط سفلي','bar','Compact / مدمج','compact','Bold / جريء','bold']],
  ['floating-cta','08 · Conversion — Floating CTA','08 · تحويل — زر عائم',['Pill / كبسولة','pill','Card / بطاقة','card','Minimal / بسيط','minimal']],
  ['whatsapp-cta','08 · Conversion — WhatsApp CTA','08 · تحويل — زر واتساب',['Pill / كبسولة','pill','Card / بطاقة','card','Minimal / بسيط','minimal']],
  ['app-promotion','12 · App — App Promotion','12 · تطبيق — ترويج التطبيق',['Split / منقسم','split','Panel / لوحة','panel','Minimal / بسيط','minimal']],
  ['premium-testimonials','09 · Reviews — Testimonials','09 · تقييمات — آراء العملاء',['Cards / بطاقات','cards','Editorial / تحريري','editorial','Carousel / سلايدر','carousel']],
  ['customer-reviews','09 · Reviews — Customer Reviews','09 · تقييمات — تقييمات المتجر',['Cards / بطاقات','cards','Carousel / سلايدر','carousel','Minimal / بسيط','minimal']],
  ['video-testimonials','09 · Reviews — Video Testimonials','09 · تقييمات — آراء فيديو',['Grid / شبكة','grid','Carousel / سلايدر','carousel','Spotlight / بارز','spotlight']],
  ['faq','10 · Content — FAQ','10 · محتوى — الأسئلة الشائعة',['Accordion / أكورديون','accordion','Two columns / عمودان','two-columns','Minimal / بسيط','minimal']],
  ['blog-posts','10 · Content — Blog Posts','10 · محتوى — مقالات المدونة',['Grid / شبكة','grid','Editorial / تحريري','editorial','Carousel / سلايدر','carousel']],
  ['featured-article','10 · Content — Featured Article','10 · محتوى — مقالة مميزة',['Split / منقسم','split','Cover / غلاف','cover','Minimal / بسيط','minimal']],
  ['newsletter','12 · Signup — Newsletter CTA','12 · تسجيل — دعوة للنشرة',['Banner / بنر','banner','Split / منقسم','split','Minimal / بسيط','minimal']],
  ['rich-text','10 · Content — Rich Text','10 · محتوى — نص منسق',['Reading / قراءة','reading','Centered / متوسط','centered','Two columns / عمودان','two-columns']],
  ['editorial-text','10 · Content — Editorial Text','10 · محتوى — نص تحريري',['Statement / عبارة','statement','Columns / أعمدة','columns','Minimal / بسيط','minimal']],
  ['comparison-table','13 · Interactive — Comparison Table','13 · تفاعلي — جدول مقارنة',['Cards / بطاقات','cards','Table / جدول','table','Compact / مدمج','compact']],
  ['tabs','13 · Interactive — Tabs','13 · تفاعلي — تبويبات',['Underline / خط سفلي','underline','Pills / كبسولات','pills','Minimal / بسيط','minimal']],
  ['accordion','13 · Interactive — Accordion','13 · تفاعلي — أكورديون',['Bordered / بحدود','bordered','Minimal / بسيط','minimal','Cards / بطاقات','cards']],
  ['statistics','11 · Business — Statistics','11 · أعمال — إحصائيات',['Large numbers / أرقام كبيرة','numbers','Cards / بطاقات','cards','Strip / شريط','strip']],
  ['team-members','11 · Business — Team Members','11 · أعمال — فريق العمل',['Portraits / صور شخصية','portraits','Cards / بطاقات','cards','Minimal / بسيط','minimal']],
  ['contact-information','11 · Business — Contact Information','11 · أعمال — معلومات التواصل',['Cards / بطاقات','cards','Split / منقسم','split','Minimal / بسيط','minimal']],
  ['store-locations','11 · Business — Store Locations','11 · أعمال — فروع المتجر',['Cards / بطاقات','cards','List / قائمة','list','Editorial / تحريري','editorial']],
  ['opening-hours','11 · Business — Opening Hours','11 · أعمال — ساعات العمل',['List / قائمة','list','Cards / بطاقات','cards','Compact / مدمج','compact']],
];

const structuredItems = (title) => ({
  id:'items', type:'collection', format:'collection', label:'Items / العناصر', item_label:'Item / عنصر', required:false, minLength:0, maxLength:20,
  value:[
    {'items.title':{en:title,ar:'عنصر مميز'},'items.text':{en:'Add concise merchant content here.',ar:'أضف محتوى المتجر المختصر هنا.'},'items.icon':'sicon-star'},
    {'items.title':{en:'Built for every screen',ar:'مصمم لكل الشاشات'},'items.text':{en:'Responsive, accessible and easy to scan.',ar:'متجاوب وسهل الوصول والقراءة.'},'items.icon':'sicon-mobile'},
  ],
  fields:[
    image('items.image','Image / الصورة'), text('items.video','Video URL / رابط الفيديو'), text('items.title','Title / العنوان'),
    text('items.text','Text / النص','textarea'), text('items.value','Value / القيمة'),
    {id:'items.icon',type:'string',format:'icon',label:'Icon / الأيقونة',required:false,value:'sicon-star'}, variableLink('items.url','Link / الرابط'),
  ],
});

const structuredGuideOverrides = {
  // Salla has no native newsletter/subscribe API or web component in this theme's
  // dependency set. This section is honestly a link-out call-to-action banner
  // (button + link), not an email capture form -- do not wire a fake submit here.
  newsletter: 'Links to a page, WhatsApp, or social profile — there is no built-in email subscription form or API in Salla for this yet, so this section is a call-to-action banner, not a signup form. / يوجّه الزر لصفحة أو واتساب أو حساب تواصل اجتماعي — لا يوجد في سلة حالياً نموذج أو واجهة برمجية لتسجيل بريد إلكتروني، لذا هذا القسم دعوة لإجراء وليس نموذج اشتراك.',
};

const structuredDefinitions = structuredCatalog.map(([slug,en,ar,variantData]) => {
  const variants=[]; for(let i=0;i<variantData.length;i+=2) variants.push([variantData[i],variantData[i+1]]);
  const titleField=text('title','Title / العنوان'); titleField.value={en:en.split(' — ').pop(),ar:ar.split(' — ').pop()};
  const descriptionField=text('description','Description / الوصف','textarea'); descriptionField.value={en:'Present useful store information with a clear next action.',ar:'اعرض معلومات مفيدة للمتجر مع إجراء واضح.'};
  return {
    key:keyFor(`home.${slug}`), title:{en,ar}, icon:'sicon-layout', path:`home.${slug}`, image:defaultThumbnail,
    fields:[
      {type:'static',format:'description',id:`${slug}-guide`,value:structuredGuideOverrides[slug] || `${en} / ${ar}`},
      dropdown('variant','Variant / التصميم',variants,variants[0]), ...common(), titleField,
      text('subtitle','Eyebrow / العنوان الصغير'), descriptionField, text('video_id','YouTube video ID / معرّف يوتيوب'),
      text('date','End date (ISO) / تاريخ الانتهاء'), text('cta_label','Button label / نص الزر'), variableLink('cta_url','Button link / رابط الزر'),
      text('link_label','Link label / نص الرابط'), text('success_text','Success message / رسالة النجاح'),
      text('remaining_text','Remaining message with {amount} / رسالة المتبقي'),
      {id:'limit',type:'number',format:'integer',label:'Item count / عدد العناصر',value:8,minimum:2,maximum:20,required:false},
      structuredItems(titleField.value.en),
    ],
  };
});

const wrapperDirectory = new URL('../src/views/components/home/', import.meta.url);
structuredCatalog.forEach(([slug]) => fs.writeFileSync(new URL(`${slug}.twig`, wrapperDirectory), `{% set section_kind = '${slug}' %}{% include 'components.home._structured-family' %}\n`, 'utf8'));

const components = [...coreComponents, ...editorialDefinitions, safeContentDefinition, ...structuredDefinitions];

// Every component this generator manages is identified by `path` (stable) — replace any existing
// entry at that path (including the legacy `home.testimonials` this catalog supersedes) and leave
// every other component (legacy, hand-authored, or future) untouched.
const managedPaths = new Set([...components.map((component) => component.path), 'home.testimonials']);
schema.components = [
    ...(schema.components || []).filter((component) => !managedPaths.has(component.path)),
    ...components
];

// ---------------------------------------------------------------------------
// Default homepage composition
// ---------------------------------------------------------------------------
// Salla seeds a merchant's homepage at theme install/activation from whichever
// components carry `is_default: true`, in the order they appear in this array
// (there is no separate "order" field). This is the deliberate curated
// storefront a fresh install shows, so it must be entirely premium
// components with real settings and copy -- not an empty shell mixed with
// legacy defaults left over from before this system existed.
const defaultVariantValue = (fieldDef, value) => {
  const match = fieldDef.options.find((o) => o.value === value);
  if (!match) throw new Error(`Unknown option "${value}" for field "${fieldDef.id}"`);
  fieldDef.selected = [match];
};
const setField = (component, id, value) => {
  const field = component.fields.find((f) => f.id === id);
  if (!field) throw new Error(`Component "${component.path}" has no field "${id}"`);
  if (field.format === 'dropdown-list' && !field.multichoice) {
    defaultVariantValue(field, value);
  } else {
    field.value = value;
  }
};

const defaultHomepageSeed = [
  ['home.announcement-bar', (c) => {
    setField(c, 'variant', 'static');
    setField(c, 'title', { en: 'Announcement', ar: 'إعلان' });
    setField(c, 'items', [
      { 'items.text': { en: 'Complimentary shipping on orders over 300 SAR', ar: 'شحن مجاني للطلبات فوق 300 ريال' } },
      { 'items.text': { en: 'New arrivals every week', ar: 'وصل حديثاً كل أسبوع' } },
    ]);
  }],
  ['home.premium-hero', (c) => {
    setField(c, 'variant', 'editorial-split');
    setField(c, 'width', 'full');
    setField(c, 'spacing', 'none');
    setField(c, 'alignment', 'start');
    setField(c, 'subtitle', { en: 'New season', ar: 'الموسم الجديد' });
    setField(c, 'title', { en: 'Considered pieces, made to last', ar: 'قطع مدروسة، مصمّمة لتدوم' });
    setField(c, 'description', { en: 'A tightly edited collection built around quality materials and quiet, confident design.', ar: 'مجموعة منتقاة بعناية حول خامات عالية الجودة وتصميم هادئ وواثق.' });
    setField(c, 'cta_label', { en: 'Shop the collection', ar: 'تسوّق المجموعة' });
  }],
  ['home.collection-showcase', (c) => {
    setField(c, 'mode', 'grid');
    setField(c, 'variant', 'portrait');
    setField(c, 'title', { en: 'Shop by category', ar: 'تسوّق حسب التصنيف' });
  }],
  ['home.image-text', (c) => {
    setField(c, 'variant', 'overlapping');
    setField(c, 'subtitle', { en: 'Our approach', ar: 'نهجنا' });
    setField(c, 'title', { en: 'Designed with intention', ar: 'مصمّم بروية' });
    setField(c, 'description', { en: 'Every piece starts with a material we trust and a silhouette that earns its place in a considered wardrobe.', ar: 'تبدأ كل قطعة بخامة نثق بها وقصّة تستحق مكانها في خزانة مدروسة.' });
    setField(c, 'cta_label', { en: 'Our story', ar: 'قصتنا' });
  }],
  ['home.product-showcase', (c) => {
    setField(c, 'mode', 'grid');
    setField(c, 'variant', 'editorial');
    setField(c, 'title', { en: 'Featured products', ar: 'منتجات مميزة' });
    setField(c, 'description', { en: 'A closer look at what is new this season.', ar: 'نظرة أقرب على ما هو جديد هذا الموسم.' });
  }],
  ['home.split-banner', (c) => {
    setField(c, 'width', 'wide');
    setField(c, 'title', { en: 'Two ways to wear it', ar: 'طريقتان للتنسيق' });
    setField(c, 'description', { en: 'Editorial pairings from our styling team.', ar: 'إطلالات مختارة من فريق التنسيق لدينا.' });
  }],
  ['home.editorial-story', (c) => {
    setField(c, 'width', 'contained');
    setField(c, 'title', { en: 'A brand built on restraint', ar: 'علامة قائمة على الاتزان' });
    setField(c, 'description', { en: 'We work with a small number of mills and workshops we trust, and we say no to far more than we say yes to.', ar: 'نعمل مع عدد محدود من المصانع وورش العمل التي نثق بها، ونرفض أكثر بكثير مما نقبل.' });
    setField(c, 'quote', { en: 'Fewer, better things.', ar: 'أشياء أقل، وأفضل.' });
  }],
  ['home.masonry-gallery', (c) => {
    setField(c, 'title', { en: 'In the studio', ar: 'في الاستوديو' });
    setField(c, 'description', { en: 'A closer look at how each piece comes together.', ar: 'نظرة أقرب على كيفية تصنيع كل قطعة.' });
  }],
  ['home.lookbook', (c) => {
    setField(c, 'title', { en: 'Lookbook', ar: 'كتاب الإطلالات' });
    setField(c, 'description', { en: 'Full looks from the current collection.', ar: 'إطلالات كاملة من المجموعة الحالية.' });
  }],
  ['home.trust-badges', (c) => {
    setField(c, 'variant', 'inline');
    setField(c, 'items', [
      { 'items.title': { en: 'Free returns', ar: 'إرجاع مجاني' }, 'items.text': { en: 'Within 14 days', ar: 'خلال 14 يوماً' }, 'items.icon': 'sicon-reverse-arrow' },
      { 'items.title': { en: 'Secure checkout', ar: 'دفع آمن' }, 'items.text': { en: 'Encrypted payments', ar: 'مدفوعات مشفّرة' }, 'items.icon': 'sicon-shield-check' },
      { 'items.title': { en: 'Nationwide shipping', ar: 'شحن لكل المملكة' }, 'items.text': { en: '2–5 business days', ar: '2-5 أيام عمل' }, 'items.icon': 'sicon-truck' },
    ]);
  }],
  ['home.premium-testimonials', (c) => {
    setField(c, 'variant', 'editorial');
    setField(c, 'title', { en: 'What customers say', ar: 'آراء العملاء' });
    setField(c, 'items', [
      { 'items.title': { en: 'Sara A.', ar: 'سارة أ.' }, 'items.text': { en: 'The quality is immediately obvious the moment you touch the fabric.', ar: 'تظهر الجودة فور لمس القماش مباشرة.' } },
      { 'items.title': { en: 'Faisal M.', ar: 'فيصل م.' }, 'items.text': { en: 'Understated pieces that actually get worn every week.', ar: 'قطع بسيطة تُلبس فعلياً كل أسبوع.' } },
    ]);
  }],
  ['home.newsletter', (c) => {
    setField(c, 'variant', 'banner');
    setField(c, 'title', { en: 'Join the list', ar: 'انضم إلى قائمتنا' });
    setField(c, 'description', { en: 'New arrivals and early access to limited pieces, occasionally.', ar: 'وصولات جديدة ووصول مبكر للقطع المحدودة، من حين لآخر.' });
  }],
];

const defaultPaths = new Set(defaultHomepageSeed.map(([path]) => path));
const byPath = new Map(schema.components.map((c) => [c.path, c]));

for (const c of schema.components) {
  if (c.is_default && !defaultPaths.has(c.path)) delete c.is_default;
}
for (const [path, applyDefaults] of defaultHomepageSeed) {
  const component = byPath.get(path);
  if (!component) throw new Error(`Default homepage references missing component path "${path}"`);
  component.is_default = true;
  applyDefaults(component);
}

const orderedDefaults = defaultHomepageSeed.map(([path]) => byPath.get(path));
const rest = schema.components.filter((c) => !defaultPaths.has(c.path));
schema.components = [...orderedDefaults, ...rest];

fs.writeFileSync(file, `${JSON.stringify(schema, null, 4)}\n`, 'utf8');
fs.writeFileSync(keyMapFile, `${JSON.stringify(keyMap, null, 2)}\n`, 'utf8');
console.log(`Synced ${components.length} premium components; total components: ${schema.components.length}`);
console.log('Default homepage:', defaultHomepageSeed.map(([path]) => path));
