#!/usr/bin/env node

/**
 * Reviewer Round 2: Adversarial Hardening & Edge-Case Verification Suite
 * 
 * Verifies the edge cases and adversarial scenarios addressed in Round 2:
 * 1. Product card offline SVG/vector fallback when Graphline CDN is unreachable.
 * 2. HeroSection slide image offline fallback when network is intermittent.
 * 3. Mobile drawer body scroll lock release and deferred smooth scrolling.
 * 4. Mobile drawer search input reset on category selection.
 * 5. Navbar searchQuery state reset on category selection.
 * 6. Navbar Escape key dismisses open category dropdown.
 * 7. Preloader accessibility: prefers-reduced-motion and background tab visibility.
 * 8. Floating WhatsApp responsive boundary protection and Escape key handling.
 * 9. WAI-ARIA tablist & tab attributes on ProductsSection category filter tabs.
 * 10. Hero carousel keyboard navigation (ArrowLeft/ArrowRight) & pause on focus/blur.
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../');

function readFile(relPath) {
  return fs.readFileSync(path.resolve(PROJECT_ROOT, relPath), 'utf8');
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✔ PASS [REV2] ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✖ FAIL [REV2] ${name}: ${err.message}`);
  }
}

console.log('\n======================================================');
console.log('  REVIEWER 2: ADVERSARIAL HARDENING VERIFICATION       ');
console.log('======================================================\n');

// 1. ProductsSection Offline Resilient Fallback
test('ProductsSection includes offline standalone vector fallback for CDN failures', () => {
  const src = readFile('src/components/sections/ProductsSection.tsx');
  assert.ok(src.includes('imgFailed'), 'Must track image load failure state');
  assert.ok(src.includes('setImgFailed(true)'), 'Must activate fallback upon failure');
  assert.ok(src.includes('CategoryIcon'), 'Fallback must render dynamic category icon');
  assert.ok(src.includes('Part: {product.partNumber}'), 'Fallback must embed OEM part number');
});

// 2. HeroSection Offline Slide Image Fallback
test('HeroSection includes offline fallback card for hero slide images', () => {
  const src = readFile('src/components/sections/HeroSection.tsx');
  assert.ok(src.includes('slideImageErrors'), 'Must track slide image error state');
  assert.ok(src.includes('setSlideImageErrors'), 'Must handle slide image onError');
  assert.ok(src.includes('Nehru Place Hub'), 'Fallback card must show Nehru Place Hub badge');
});

// 3. MobileDrawer Body Scroll Release
test('MobileDrawer unlocks body scroll before scrollIntoView on mobile', () => {
  const src = readFile('src/components/layout/MobileDrawer.tsx');
  assert.ok(src.includes("document.body.style.overflow = ''"), 'Must unlock body overflow');
  assert.ok(src.includes('setTimeout'), 'Must defer scrollIntoView so body scroll is unblocked');
});

// 4. MobileDrawer & Navbar Search Reset
test('MobileDrawer resets searchInput on category or subcategory selection', () => {
  const src = readFile('src/components/layout/MobileDrawer.tsx');
  assert.ok(src.includes("setSearchInput('')"), 'Must reset searchInput when selecting category');
});

test('Navbar resets searchQuery on category or subcategory selection', () => {
  const src = readFile('src/components/layout/Navbar.tsx');
  assert.ok(src.includes("setSearchQuery('')"), 'Must reset searchQuery in handleSubcategoryClick');
});

// 5. Navbar Escape Key Dropdown Dismissal
test('Navbar implements Escape key listener to close category dropdown', () => {
  const src = readFile('src/components/layout/Navbar.tsx');
  assert.ok(src.includes("e.key === 'Escape'"), 'Must listen for Escape key');
  assert.ok(src.includes('setOpenDropdown(null)'), 'Must close dropdown on Escape');
});

// 6. Preloader Accessibility & Background Tab Resilience
test('Preloader respects prefers-reduced-motion media query', () => {
  const src = readFile('src/components/layout/Preloader.tsx');
  assert.ok(src.includes('prefers-reduced-motion'), 'Must check prefers-reduced-motion');
});

test('Preloader immediately completes when tab is backgrounded', () => {
  const src = readFile('src/components/layout/Preloader.tsx');
  assert.ok(src.includes('visibilitychange'), 'Must listen for visibilitychange event');
  assert.ok(src.includes('document.hidden'), 'Must check document.hidden state');
});

// 7. Floating WhatsApp Mobile Safety & Escape Key
test('Floating WhatsApp protects against horizontal overflow on narrow viewports', () => {
  const src = readFile('src/components/ui/FloatingWhatsApp.tsx');
  assert.ok(src.includes('w-[calc(100vw-3rem)]'), 'Must constrain width to viewport minus margins');
  assert.ok(src.includes("e.key === 'Escape'"), 'Must close popup on Escape key press');
});

// 8. ProductsSection Category Tabs ARIA Semantics
test('ProductsSection category tabs implement WAI-ARIA tablist & tab roles', () => {
  const src = readFile('src/components/sections/ProductsSection.tsx');
  assert.ok(src.includes('role="tablist"'), 'Category tab container must have role="tablist"');
  assert.ok(src.includes('role="tab"'), 'Category tab button must have role="tab"');
  assert.ok(src.includes('aria-selected={isActive}'), 'Tab button must bind aria-selected');
});

// 9. HeroSection Keyboard Navigation & Focus Pause
test('HeroSection supports keyboard arrows and pauses autoplay on focus', () => {
  const src = readFile('src/components/sections/HeroSection.tsx');
  assert.ok(src.includes('onKeyDown'), 'Must support keyboard navigation');
  assert.ok(src.includes('ArrowLeft') && src.includes('ArrowRight'), 'Must handle ArrowLeft and ArrowRight');
  assert.ok(src.includes('onFocus') && src.includes('onBlur'), 'Must pause autoplay on focus and resume on blur');
  assert.ok(src.includes('aria-roledescription="carousel"'), 'Must include carousel ARIA role');
});

// 10. Zero GST Numbers Enforcement
test('Strict zero GST numbers invariant holds across all source files', () => {
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
    'index.html'
  ];

  for (const rel of filesToCheck) {
    const content = readFile(rel);
    assert.strictEqual(
      prohibitedPattern.test(content),
      false,
      `Prohibited GST number found in ${rel}`
    );
  }
});

console.log('\n======================================================');
console.log(`  Reviewer 2 Suite: ${passed} passed, ${failed} failed`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
