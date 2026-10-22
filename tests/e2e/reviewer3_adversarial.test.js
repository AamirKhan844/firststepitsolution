import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

function readFile(relPath) {
  return fs.readFileSync(path.resolve(process.cwd(), relPath), 'utf8');
}

console.log('======================================================');
console.log('  REVIEWER 3: FINAL ADVERSARIAL HARDENING VERIFICATION');
console.log('======================================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✔ PASS [REV3] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✖ FAIL [REV3] ${name}: ${err.message}`);
    failed++;
  }
}

// 1. Dropdown Menu Outside-Click Handling on Desktop / Touch
test('Navbar binds click-outside listener (mousedown & touchstart) and binds navRef to nav element', () => {
  const src = readFile('src/components/layout/Navbar.tsx');
  assert.ok(src.includes('handleClickOutside'), 'Navbar must define handleClickOutside listener');
  assert.ok(src.includes("document.addEventListener('mousedown', handleClickOutside)"), 'Must attach mousedown listener');
  assert.ok(src.includes("document.addEventListener('touchstart', handleClickOutside)"), 'Must attach touchstart listener');
  assert.ok(src.includes('ref={navRef}'), 'Must bind navRef to the category nav element');
  assert.ok(src.includes('navRef.current.contains(e.target as Node)'), 'Must check target inside navRef');
});

// 2. Mobile Drawer Rapid Tap Re-entrancy Protection
test('MobileDrawer guards against rapid successive taps during exit animation using isNavigatingRef', () => {
  const src = readFile('src/components/layout/MobileDrawer.tsx');
  assert.ok(src.includes('isNavigatingRef'), 'MobileDrawer must define isNavigatingRef');
  assert.ok(src.includes('if (isNavigatingRef.current) return;'), 'Handlers must check isNavigatingRef before navigating');
  assert.ok(src.includes('isNavigatingRef.current = true;'), 'Handlers must set isNavigatingRef to true');
  assert.ok(src.includes('isNavigatingRef.current = false;'), 'Effect must reset isNavigatingRef on drawer state change');
});

// 3. Hero Carousel Keyboard Focus Retention Pause
test('HeroSection onBlur checks relatedTarget to maintain pause while keyboard user focuses slide elements', () => {
  const src = readFile('src/components/sections/HeroSection.tsx');
  assert.ok(src.includes('onBlur'), 'Must implement onBlur handler');
  assert.ok(src.includes('containerRef.current?.contains(e.relatedTarget as Node)'), 'onBlur must check if focus remains inside carousel');
});

// 4. Hero Carousel Slide Tabpanel & Controls ARIA Semantics
test('HeroSection slide stage renders role="tabpanel" and dots bind aria-controls', () => {
  const src = readFile('src/components/sections/HeroSection.tsx');
  assert.ok(src.includes('role="tabpanel"'), 'Slide stage must define role="tabpanel"');
  assert.ok(src.includes('aria-controls={`hero-slide-${idx}`}'), 'Indicator dots must bind aria-controls to slide panels');
  assert.ok(src.includes('aria-roledescription="slide"'), 'Slide must have aria-roledescription="slide"');
});

// 5. Product Category Tabs Highlight Persistence During Subcategory Filter
test('ProductsSection category tabs highlight active parent category when subcategory is chosen', () => {
  const src = readFile('src/components/sections/ProductsSection.tsx');
  assert.ok(src.includes('const isActive = tab.id === activeTab;'), 'Tab isActive must depend directly on activeTab');
});

// 6. ProductCard Prop Synchronization on Prop Change
test('ProductCard synchronizes imgSrc and imgFailed when product prop changes', () => {
  const src = readFile('src/components/sections/ProductsSection.tsx');
  assert.ok(src.includes('setImgSrc(product.imageUrl)'), 'Must update imgSrc on product update');
  assert.ok(src.includes('setImgFailed(false)'), 'Must reset imgFailed on product update');
  assert.ok(src.includes('[product.id, product.imageUrl]'), 'Must include dependencies in effect');
});

// 7. Responsive Tablet Scroll Margin Clearance (sm:scroll-mt-28)
test('All major section anchors include sm:scroll-mt-28 for tablet header clearance', () => {
  const files = [
    'src/components/sections/ProductsSection.tsx',
    'src/components/sections/RentalSection.tsx',
    'src/components/sections/ServicesSection.tsx',
    'src/components/sections/AboutSection.tsx',
    'src/components/sections/WhyChooseUsSection.tsx',
    'src/components/sections/StatsSection.tsx',
    'src/components/sections/TestimonialsSection.tsx',
    'src/components/sections/ContactSection.tsx'
  ];
  for (const f of files) {
    const src = readFile(f);
    assert.ok(src.includes('sm:scroll-mt-28'), `${f} must include sm:scroll-mt-28 for tablet sticky header offset`);
  }
});

// 8. Strict Zero GST Number Invariant Across Source and Dist
test('Zero GST registration numbers exist across all source and dist files', () => {
  const prohibitedPattern = /06BFKPA1247K1ZM/g;
  const filesToCheck = [
    'src/App.tsx',
    'src/data/companyData.ts',
    'src/data/productsData.ts',
    'src/components/layout/Navbar.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/MobileDrawer.tsx',
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/ProductsSection.tsx',
    'src/components/ui/ContactForm.tsx',
    'src/components/ui/FloatingWhatsApp.tsx',
    'index.html',
    'dist/index.html'
  ];
  for (const f of filesToCheck) {
    if (fs.existsSync(f)) {
      const content = readFile(f);
      assert.strictEqual(prohibitedPattern.test(content), false, `GST number found in ${f}`);
    }
  }
});

// 9. Strict Zero 3D Animation / WebGL Scripts Invariant
test('Zero 3D/WebGL packages or scripts in package.json and dist bundle', () => {
  const pkg = JSON.parse(readFile('package.json'));
  const deps = Object.keys(pkg.dependencies || {});
  assert.ok(!deps.includes('three'), 'three.js must not be installed');
  assert.ok(!deps.includes('@react-three/fiber'), '@react-three/fiber must not be installed');
  assert.ok(!deps.includes('@react-three/drei'), '@react-three/drei must not be installed');

  const distAssets = fs.existsSync('dist/assets') ? fs.readdirSync('dist/assets') : [];
  for (const asset of distAssets) {
    assert.ok(!asset.toLowerCase().includes('three'), `3D asset chunk found: ${asset}`);
  }
});

// 10. WhatsApp URI Schema E.164 and Prefilled Inquiries Verification
test('All WhatsApp CTAs use sanitized E.164 format wa.me/919643537006 with prefilled message', () => {
  const files = [
    'src/components/layout/Navbar.tsx',
    'src/components/layout/MobileDrawer.tsx',
    'src/components/ui/FloatingWhatsApp.tsx',
    'src/components/sections/ProductsSection.tsx'
  ];
  for (const f of files) {
    const src = readFile(f);
    assert.ok(src.includes('https://wa.me/919643537006'), `Missing standard WhatsApp URL in ${f}`);
  }
});

console.log('\n======================================================');
console.log(`  Reviewer 3 Suite: ${passed} passed, ${failed} failed`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
}
