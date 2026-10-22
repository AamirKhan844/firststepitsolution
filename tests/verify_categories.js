import fs from 'node:fs';

const productsDataSrc = fs.readFileSync('src/data/productsData.ts', 'utf8');

const productBlocks = productsDataSrc.split(/\n\s*\{\s*\n\s*id:/).slice(1);
const products = productBlocks.map(block => {
  const getField = (f) => {
    const m = block.match(new RegExp(f + ":\\s*'([^']+)'"));
    return m ? m[1] : '';
  };
  return {
    id: block.split(',')[0].trim().replace(/^['"]|['"]$/g, ''),
    category: getField('category'),
    subcategory: getField('subcategory'),
    name: getField('name'),
  };
});

console.log('Parsed products count:', products.length);

const menus = [
  { key: 'laptops', subs: ['HP Business Series - Entry Range', 'HP Business Series - Pro Series', 'HP Business Series - Elite Series'] },
  { key: 'workstations', subs: ['Desktop Workstation', 'Mobile Workstation'] },
  { key: 'desktops', subs: ['HP Business Series'] },
  { key: 'monitors', subs: ['Commercial LED & IPS Displays'] },
  { key: 'printers', subs: ['Inkjet Printers', 'Laserjet Printers'] },
  { key: 'accessories', subs: ['Laptop Accessories', 'Desktop Accessories', 'Workstation Accessories', 'General Accessories'] },
];

let allPassed = true;
for (const menu of menus) {
  for (const sub of menu.subs) {
    const matched = products.filter(p => p.category === menu.key && p.subcategory.toLowerCase() === sub.toLowerCase());
    console.log(`[${menu.key}] "${sub}" -> ${matched.length} products found: ${matched.map(p => p.name).join(' | ')}`);
    if (matched.length === 0) {
      console.error(`FATAL ERROR: 0 products found for ${menu.key} -> ${sub}`);
      allPassed = false;
    }
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('ALL 13 SUBCATEGORIES HAVE AT LEAST ONE MATCHING PRODUCT!');
}
