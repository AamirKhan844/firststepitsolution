#!/usr/bin/env node

/**
 * Reviewer Verification Suite: Design System Primitives & Enterprise Architecture
 * 
 * Verifies:
 * 1. Button design system primitive contract, variants, sizes, and nullish child handling.
 * 2. Input design system primitive contract, accessibility attributes, and aria-describedby merging.
 * 3. Barrel exports completeness across layout, sections, ui, data, and types.
 * 4. Path aliases (@/*) resolution and imports in source code.
 * 5. Clean root directory invariant (no tsconfig.tsbuildinfo or temporary artifacts).
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
    console.log(`  ✔ PASS [DESIGN-SYS] ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✖ FAIL [DESIGN-SYS] ${name}: ${err.message}`);
  }
}

console.log('\n======================================================');
console.log('  REVIEWER: DESIGN SYSTEM PRIMITIVES & ARCHITECTURE   ');
console.log('======================================================\n');

// 1. Button Design System Primitive
test('Button primitive implements all 6 design system variants', () => {
  const src = readFile('src/components/ui/Button.tsx');
  const variants = ['primary', 'secondary', 'ghost', 'outline', 'whatsapp', 'danger'];
  for (const v of variants) {
    assert.ok(src.includes(`${v}:`), `Button must define style mapping for variant: ${v}`);
  }
  assert.ok(src.includes("'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp' | 'danger'"), 'ButtonVariant union type complete');
});

test('Button primitive implements sm, md, lg size dimensions', () => {
  const src = readFile('src/components/ui/Button.tsx');
  assert.ok(src.includes("sm: 'px-3"), 'Size sm defined');
  assert.ok(src.includes("md: 'px-4"), 'Size md defined');
  assert.ok(src.includes("lg: 'px-6"), 'Size lg defined');
});

test('Button handles loading state and aria-busy accessibility', () => {
  const src = readFile('src/components/ui/Button.tsx');
  assert.ok(src.includes('aria-busy={isLoading}'), 'Button must bind aria-busy to isLoading');
  assert.ok(src.includes('disabled={disabled || isLoading}'), 'Button must disable when isLoading is true');
  assert.ok(src.includes('animate-spin'), 'Button must render animated spinner when loading');
});

test('Button safely handles zero and nullish children (children != null)', () => {
  const src = readFile('src/components/ui/Button.tsx');
  assert.ok(src.includes('children != null'), 'Button must use nullish check instead of truthiness to render children properly');
});

// 2. Input Design System Primitive
test('Input primitive implements accessible label, error, and helperText attributes', () => {
  const src = readFile('src/components/ui/Input.tsx');
  assert.ok(src.includes('aria-invalid={!!error}'), 'Input must bind aria-invalid');
  assert.ok(src.includes('role="alert"'), 'Error element must define role="alert"');
  assert.ok(src.includes('errorId'), 'Error element must bind unique errorId');
  assert.ok(src.includes('helperId'), 'Helper element must bind unique helperId');
});

test('Input primitive safely merges custom aria-describedby with error/helper IDs', () => {
  const src = readFile('src/components/ui/Input.tsx');
  assert.ok(src.includes('customDescribedBy'), 'Input must track customDescribedBy from props');
  assert.ok(src.includes('combinedDescribedBy'), 'Input must compute merged combinedDescribedBy');
  assert.ok(src.includes('aria-describedby={combinedDescribedBy}'), 'Input must bind combinedDescribedBy after props spreading');
});

// 3. Enterprise Barrel Exports Completeness
test('src/components/layout/index.ts exports all 4 layout components and prop types', () => {
  const src = readFile('src/components/layout/index.ts');
  assert.ok(src.includes('Navbar') && src.includes('type NavbarProps'), 'Navbar exported with props');
  assert.ok(src.includes('Footer') && src.includes('type FooterProps'), 'Footer exported with props');
  assert.ok(src.includes('MobileDrawer') && src.includes('type MobileDrawerProps'), 'MobileDrawer exported with props');
  assert.ok(src.includes('Preloader') && src.includes('type PreloaderProps'), 'Preloader exported with props');
});

test('src/components/sections/index.ts exports all 10 sections and their prop types', () => {
  const src = readFile('src/components/sections/index.ts');
  const sections = [
    'HeroSection',
    'BrandPartnersSection',
    'ProductsSection',
    'RentalSection',
    'ServicesSection',
    'AboutSection',
    'WhyChooseUsSection',
    'StatsSection',
    'TestimonialsSection',
    'ContactSection'
  ];
  for (const s of sections) {
    assert.ok(src.includes(s), `Sections barrel must export ${s}`);
    assert.ok(src.includes(`type ${s}Props`), `Sections barrel must export type ${s}Props`);
  }
});

test('src/components/ui/index.ts exports all 7 UI primitives and prop types', () => {
  const src = readFile('src/components/ui/index.ts');
  assert.ok(src.includes('Button') && src.includes('type ButtonProps'), 'Button exported with props');
  assert.ok(src.includes('Input') && src.includes('type InputProps'), 'Input exported with props');
  assert.ok(src.includes('ContactForm') && src.includes('type ContactFormProps'), 'ContactForm exported with props');
  assert.ok(src.includes('FloatingWhatsApp') && src.includes('type FloatingWhatsAppProps'), 'FloatingWhatsApp exported with props');
  assert.ok(src.includes('SectionHeading') && src.includes('type SectionHeadingProps'), 'SectionHeading exported with props');
  assert.ok(src.includes('ServiceCard') && src.includes('type ServiceCardProps'), 'ServiceCard exported with props');
  assert.ok(src.includes('StatCounter') && src.includes('type StatCounterProps'), 'StatCounter exported with props');
});

test('src/types/index.ts exports unified domain models including RentalHighlight', () => {
  const src = readFile('src/types/index.ts');
  assert.ok(src.includes('export interface RentalHighlight'), 'RentalHighlight interface defined in types');
  assert.ok(src.includes('export interface RentalPlan'), 'RentalPlan interface defined in types');
  assert.ok(src.includes('export interface ProductItem'), 'ProductItem interface defined in types');
});

test('src/data/index.ts exports RentalHighlight type along with business datasets', () => {
  const src = readFile('src/data/index.ts');
  assert.ok(src.includes('type RentalHighlight'), 'RentalHighlight re-exported from data barrel');
});

// 4. Path Aliases Verification
test('App.tsx utilizes modular @/ path aliases and barrel exports', () => {
  const src = readFile('src/App.tsx');
  assert.ok(src.includes("@/components/layout"), 'App.tsx imports layout via @/ path alias');
  assert.ok(src.includes("@/components/sections"), 'App.tsx imports sections via @/ path alias');
  assert.ok(src.includes("@/components/ui"), 'App.tsx imports UI via @/ path alias');
  assert.ok(src.includes("@/data"), 'App.tsx imports data via @/ path alias');
});

// 5. Clean Project Root Invariant
test('Root directory contains zero tsconfig.tsbuildinfo cache or temporary markdown files', () => {
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'tsconfig.tsbuildinfo')), false, 'tsconfig.tsbuildinfo must not exist in root');
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'TEST_INFRA.md')), false, 'TEST_INFRA.md must not exist in root');
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'TEST_READY.md')), false, 'TEST_READY.md must not exist in root');
});

// 6. Round 2 Reviewer Hardening & Invariants
test('StatCounter safely renders displayValue without flashing stat.value on zero and supports reduced motion', () => {
  const src = readFile('src/components/ui/StatCounter.tsx');
  assert.ok(!src.includes('{displayValue || stat.value}'), 'StatCounter must not use falsy or fallback that flashes stat.value on zero');
  assert.ok(src.includes('{displayValue}'), 'StatCounter must cleanly render displayValue');
  assert.ok(src.includes('prefers-reduced-motion'), 'StatCounter must check prefers-reduced-motion');
});

test('SectionHeading supports both dark and light themes for enterprise design system flexibility', () => {
  const src = readFile('src/components/ui/SectionHeading.tsx');
  assert.ok(src.includes("theme?: 'dark' | 'light'"), 'SectionHeadingProps must declare theme');
  assert.ok(src.includes("isDark ? 'text-white' : 'text-slate-900'"), 'Heading must adapt text color to theme');
});

test('FloatingWhatsApp implements accessible aria-expanded and aria-haspopup attributes', () => {
  const src = readFile('src/components/ui/FloatingWhatsApp.tsx');
  assert.ok(src.includes('aria-expanded={isOpen}'), 'Button must declare aria-expanded state');
  assert.ok(src.includes('aria-haspopup="dialog"'), 'Button must declare aria-haspopup="dialog"');
  assert.ok(src.includes('export interface FloatingWhatsAppProps'), 'FloatingWhatsApp must export props interface');
});

test('MobileDrawer subcategory accordion toggle implements aria-expanded and aria-controls', () => {
  const src = readFile('src/components/layout/MobileDrawer.tsx');
  assert.ok(src.includes('aria-expanded={isExpanded}'), 'Accordion toggle must declare aria-expanded');
  assert.ok(src.includes('aria-controls={`subcategories-${cat.id}`}'), 'Accordion toggle must bind aria-controls');
});

test('ContactForm utilizes design system Button primitive', () => {
  const src = readFile('src/components/ui/ContactForm.tsx');
  assert.ok(src.includes("import { Button } from './Button'") || src.includes("import { Button } from '@/components/ui'"), 'ContactForm must import Button');
  assert.ok(src.includes('<Button'), 'ContactForm submit must use Button primitive');
});

test('tests/e2e contains zero stale hyphenated forwarder test scripts', () => {
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'tests/e2e/tier1-feature-coverage.test.js')), false, 'tier1-feature-coverage.test.js must be deleted');
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'tests/e2e/tier2-boundary-corner.test.js')), false, 'tier2-boundary-corner.test.js must be deleted');
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'tests/e2e/tier3-cross-feature.test.js')), false, 'tier3-cross-feature.test.js must be deleted');
  assert.strictEqual(fs.existsSync(path.resolve(PROJECT_ROOT, 'tests/e2e/tier4-user-scenarios.test.js')), false, 'tier4-user-scenarios.test.js must be deleted');
});

// 7. Round 3 Final Adversarial Reviewer Hardening
test('ContactForm utilizes design system Input primitive for form inputs', () => {
  const src = readFile('src/components/ui/ContactForm.tsx');
  assert.ok(src.includes("import { Input } from './Input'") || src.includes("import { Input } from '@/components/ui'"), 'ContactForm must import Input');
  assert.ok(src.includes('<Input'), 'ContactForm must render Input primitives');
  assert.ok(src.includes('id="name"') && src.includes('id="email"') && src.includes('id="phone"'), 'Input primitives must declare field ids');
});

test('RentalSection utilizes design system Button primitive and accessible duration group', () => {
  const src = readFile('src/components/sections/RentalSection.tsx');
  assert.ok(src.includes("import { Button } from '@/components/ui'") || src.includes("import { Button } from '../ui/Button'"), 'RentalSection must import Button');
  assert.ok(src.includes('<Button'), 'RentalSection must render Button primitive');
  assert.ok(src.includes('role="group"'), 'Duration switcher must define role="group"');
  assert.ok(src.includes('role="radio"'), 'Duration switcher buttons must define role="radio"');
  assert.ok(src.includes('aria-checked={duration ==='), 'Duration buttons must bind aria-checked state');
});

test('ServicesSection implements WAI-ARIA tablist and tab semantics on category filters', () => {
  const src = readFile('src/components/sections/ServicesSection.tsx');
  assert.ok(src.includes('role="tablist"'), 'ServicesSection category filter container must define role="tablist"');
  assert.ok(src.includes('role="tab"'), 'ServicesSection category filter button must define role="tab"');
  assert.ok(src.includes('aria-selected={isActive}'), 'ServicesSection category filter button must bind aria-selected');
  assert.ok(src.includes('type="button"'), 'ServicesSection category filter button must declare type="button"');
});

test('TestimonialsSection implements accessible carousel ARIA region and pause on keyboard focus', () => {
  const src = readFile('src/components/sections/TestimonialsSection.tsx');
  assert.ok(src.includes('role="region"'), 'TestimonialsSection must declare role="region"');
  assert.ok(src.includes('aria-roledescription="carousel"'), 'TestimonialsSection must declare aria-roledescription="carousel"');
  assert.ok(src.includes('role="tablist"'), 'Indicators container must declare role="tablist"');
  assert.ok(src.includes('role="tab"'), 'Indicator buttons must declare role="tab"');
  assert.ok(src.includes('aria-selected={currentIndex === idx}'), 'Indicator buttons must bind aria-selected');
  assert.ok(src.includes('onFocus') && src.includes('onBlur'), 'TestimonialsSection must pause autoplay on keyboard focus');
});

test('BrandPartnersSection implements prefers-reduced-motion check and pause on keyboard focus', () => {
  const src = readFile('src/components/sections/BrandPartnersSection.tsx');
  assert.ok(src.includes('prefers-reduced-motion'), 'BrandPartnersSection must check prefers-reduced-motion');
  assert.ok(src.includes('onFocus') && src.includes('onBlur'), 'BrandPartnersSection must pause animation on keyboard focus');
});

test('Zero relative parent imports (../../ or from ../) remain across all files in src/', () => {
  function scanSrc(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanSrc(full);
      } else if (ent.isFile() && (ent.name.endsWith('.ts') || ent.name.endsWith('.tsx'))) {
        const content = fs.readFileSync(full, 'utf8');
        assert.ok(!content.includes('../../'), `Relative parent import (../../) found in ${full}`);
        assert.ok(!content.includes("from '../types'"), `Unstandardized import from '../types' found in ${full}`);
        assert.ok(!content.includes("from '../ui/"), `Unstandardized import from '../ui/' found in ${full}`);
        assert.ok(!content.includes("from '../data/"), `Unstandardized import from '../data/' found in ${full}`);
      }
    }
  }
  scanSrc(path.resolve(PROJECT_ROOT, 'src'));
});

console.log('\n======================================================');
console.log(`  Design System Suite: ${passed} passed, ${failed} failed`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
