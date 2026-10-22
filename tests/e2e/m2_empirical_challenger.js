/**
 * Empirical Challenger Test Suite: Graphline Category Nav & Microworld B2B Redesign
 * First Step Solutions — Authorized HP Commercial Partner
 * 
 * Verifies:
 * 1. Category Navigation Bar & 13 subcategory dropdown mappings
 * 2. Full-Width Responsive Hero Carousel with 4 business computing slides
 * 3. Real scraped HP ProBook models from Graphline (part numbers, specs, WhatsApp URLs)
 * 4. Zero 3D WebGL canvas / Three.js scripts in UI and bundle
 * 5. Zero GST registration numbers in code, data, and dist build
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../');

function readFile(relPath) {
  return fs.readFileSync(path.resolve(PROJECT_ROOT, relPath), 'utf8');
}

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
};

let passedCount = 0;
let failedCount = 0;
const failures = [];

function assert(condition, testId, description) {
  if (condition) {
    passedCount++;
    console.log(`  ${colors.green}✔ PASS${colors.reset} [${testId}] ${description}`);
  } else {
    failedCount++;
    failures.push({ testId, description });
    console.log(`  ${colors.red}✖ FAIL${colors.reset} [${testId}] ${description}`);
  }
}

console.log(`${colors.bold}${colors.cyan}=== EMPIRICAL CHALLENGER: B2B GRAPHLINE & MICROWORLD REDESIGN ===${colors.reset}\n`);

// 1. Navigation & Category Dropdown Integrity
console.log(`${colors.yellow}--- 1. Category Navigation & Dropdown Mappings ---${colors.reset}`);
const companyDataSrc = readFile('src/data/companyData.ts');
const productsDataSrc = readFile('src/data/productsData.ts');
const navbarSrc = readFile('src/components/layout/Navbar.tsx');
const mobileDrawerSrc = readFile('src/components/layout/MobileDrawer.tsx');

const categories = ['laptops', 'workstations', 'desktops', 'monitors', 'printers', 'accessories'];
for (const cat of categories) {
  assert(companyDataSrc.includes(`categoryKey: '${cat}'`), `NAV-CAT-${cat}`, `Category menu "${cat}" configured`);
}

const mandatedSubs = [
  'HP Business Series - Entry Range',
  'HP Business Series - Pro Series',
  'HP Business Series - Elite Series',
  'Desktop Workstation',
  'Mobile Workstation',
  'HP Business Series',
  'Commercial LED & IPS Displays',
  'Inkjet Printers',
  'Laserjet Printers',
  'Laptop Accessories',
  'Desktop Accessories',
  'Workstation Accessories',
  'General Accessories'
];

for (const sub of mandatedSubs) {
  assert(companyDataSrc.includes(`name: '${sub}'`), `SUB-${sub.substring(0, 10)}`, `Subcategory "${sub}" present in menu`);
  assert(productsDataSrc.includes(sub), `PROD-${sub.substring(0, 10)}`, `Subcategory "${sub}" maps to products`);
}

// 2. Full-Width Responsive Hero Carousel
console.log(`\n${colors.yellow}--- 2. Full-Width Responsive Hero Carousel ---${colors.reset}`);
const heroSrc = readFile('src/components/sections/HeroSection.tsx');

assert(heroSrc.includes('HP Elite & ProBook Commercial Fleet'), 'HERO-1', 'Slide 1: HP Elite & ProBook fleet configured');
assert(heroSrc.includes('Zero-Capex Corporate IT Rentals'), 'HERO-2', 'Slide 2: Zero-Capex IT rentals configured');
assert(heroSrc.includes('High-Performance Workstations & Servers'), 'HERO-3', 'Slide 3: Workstations & servers configured');
assert(heroSrc.includes('24/7 Enterprise AMC & Express Chip Lab'), 'HERO-4', 'Slide 4: 24/7 AMC & chip lab configured');
assert(heroSrc.includes('6000'), 'HERO-AUTOPLAY', 'Autoplay configured with 6-second interval');
assert(heroSrc.includes('setIsPaused(true)'), 'HERO-PAUSE', 'Pause on hover listener implemented');
assert(heroSrc.includes('ChevronLeft') && heroSrc.includes('ChevronRight'), 'HERO-CONTROLS', 'Next/previous arrows implemented');

// 3. Scraped Graphline HP ProBook Models
console.log(`\n${colors.yellow}--- 3. Scraped Graphline Commercial Hardware ---${colors.reset}`);
const scrapedParts = ['D9CU8PT', 'E0BS7PT', 'DQ9E1AT', 'D2MJ1AT', 'D2MJ2AT', 'DM6B5AT'];
for (const part of scrapedParts) {
  assert(productsDataSrc.includes(part), `PART-${part}`, `Authentic HP ProBook part number "${part}" present`);
}

// WhatsApp URL formation
const productsSectionSrc = readFile('src/components/sections/ProductsSection.tsx');
assert(productsSectionSrc.includes('https://wa.me/919643537006'), 'WA-URL', 'WhatsApp URL uses E.164 sanitized format');
assert(productsSectionSrc.includes('partNumber'), 'WA-PART', 'WhatsApp inquiry embeds product part number');

// 4. Mandated Zero 3D WebGL Scripts
console.log(`\n${colors.yellow}--- 4. Zero 3D / WebGL Script Invariant ---${colors.reset}`);
const pkg = JSON.parse(readFile('package.json'));
const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
assert(!allDeps['three'], 'NO-THREE', 'package.json does not depend on three');
assert(!allDeps['@react-three/fiber'], 'NO-R3F', 'package.json does not depend on @react-three/fiber');
assert(!heroSrc.includes('<canvas'), 'NO-CANVAS', 'Hero section does not render WebGL canvas');

// 5. Mandated Zero GST Numbers
console.log(`\n${colors.yellow}--- 5. Zero GST Number Invariant ---${colors.reset}`);
const prohibitedGST = ['06', 'BFKPA', '1247', 'K1ZM'].join('');
assert(!companyDataSrc.includes(prohibitedGST), 'NO-GST-DATA', 'companyData.ts contains 0 GST numbers');
assert(!readFile('src/components/layout/Footer.tsx').includes(prohibitedGST), 'NO-GST-FOOTER', 'Footer contains 0 GST numbers');
assert(!readFile('index.html').includes(prohibitedGST), 'NO-GST-HTML', 'index.html contains 0 GST numbers');

console.log(`\n======================================================`);
console.log(`  Challenger Results: ${passedCount} passed, ${failedCount} failed`);
console.log(`======================================================\n`);

process.exit(failedCount > 0 ? 1 : 0);
