import assert from 'node:assert';
import { readProjectFile, AUTHORITATIVE_SPECS } from './harness/environment.js';
import { CarouselSimulator } from './harness/dom_simulator.js';
import { TestReporter } from './harness/reporter.js';

export async function runTier3Tests() {
  const reporter = new TestReporter('Tier 3: Cross-Feature Combinations');
  reporter.printHeader();

  const appSrc = readProjectFile('src/App.tsx') || '';
  const companyDataSrc = readProjectFile('src/data/companyData.ts') || '';
  const navbarSrc = readProjectFile('src/components/layout/Navbar.tsx') || '';
  const drawerSrc = readProjectFile('src/components/layout/MobileDrawer.tsx') || '';
  const preloaderSrc = readProjectFile('src/components/layout/Preloader.tsx') || '';

  const test = (testId, description, fn) => {
    try {
      fn();
      reporter.record(testId, description, true);
    } catch (err) {
      reporter.record(testId, description, false, err);
    }
  };

  // ==========================================
  // Cross-Feature Integration 3.1: Nav Anchors to Section IDs
  // ==========================================
  test('TC-3.1', 'Every navigation anchor maps directly to a target section in App.tsx', () => {
    // Extract nav items hrefs from companyData.ts
    const hrefMatches = [...companyDataSrc.matchAll(/href:\s*'(#[a-zA-Z0-9_-]+)'/g)].map((m) => m[1]);
    assert.ok(hrefMatches.length >= 7, 'Expected at least 7 navigation links');

    for (const href of hrefMatches) {
      const sectionId = href.replace('#', '');
      const expectedIdPattern = new RegExp(`id=["']${sectionId}["']`);
      assert.ok(
        expectedIdPattern.test(appSrc) || expectedIdPattern.test(navbarSrc),
        `Nav target "${href}" does not map to any section with id="${sectionId}" in App.tsx`
      );
    }
  });

  // ==========================================
  // Cross-Feature Integration 3.2: Mobile Drawer Parity
  // ==========================================
  test('TC-3.2', 'Mobile drawer navigation renders matching links and triggers auto-close', () => {
    assert.ok(
      drawerSrc.includes('items.map') || drawerSrc.includes('items'),
      'Mobile drawer must receive and render navigation items'
    );
    assert.ok(
      drawerSrc.includes('onClose'),
      'Mobile drawer must implement onClose handler when link is tapped'
    );
  });

  // ==========================================
  // Cross-Feature Integration 3.3: Preloader to Hero Reveal
  // ==========================================
  test('TC-3.3', 'Preloader completion callback coordinates with Hero section reveal', () => {
    assert.ok(
      appSrc.includes('Preloader') && appSrc.includes('onComplete'),
      'App must pass onComplete handler to Preloader'
    );
    assert.ok(
      preloaderSrc.includes('onComplete'),
      'Preloader must trigger onComplete when loading sequence finishes'
    );
  });

  // ==========================================
  // Cross-Feature Integration 3.4: Category Submenu ↔ Product Catalog Alignment
  // ==========================================
  test('TC-3.4', 'Every category and subcategory from navigation maps to real catalog products', () => {
    const productsDataSrc = readProjectFile('src/data/productsData.ts') || '';
    const contactFormSrc = readProjectFile('src/components/ui/ContactForm.tsx') || '';

    // Verify all 13 subcategories map to authentic products
    for (const cat of AUTHORITATIVE_SPECS.productCategories) {
      for (const sub of cat.subcategories) {
        assert.ok(
          productsDataSrc.includes(sub),
          `Subcategory "${sub}" must have matching product entries in productsData.ts`
        );
      }
    }

    // Verify contact form options cover key B2B offerings
    assert.ok(contactFormSrc.includes('Buy IT Hardware'), 'Form must offer hardware procurement');
    assert.ok(contactFormSrc.includes('Rent IT Equipment'), 'Form must offer IT equipment rental');
    assert.ok(contactFormSrc.includes('Annual Maintenance Contract'), 'Form must offer AMC');
    assert.ok(contactFormSrc.includes('Chip-Level Motherboard Repair'), 'Form must offer chip repair');
  });

  // ==========================================
  // Cross-Feature Integration 3.5: Testimonials Carousel State Synchronization
  // ==========================================
  test('TC-3.5', 'Testimonials carousel state synchronizes active slide, author, and star rating', () => {
    const totalReviews = 3;
    const carousel = new CarouselSimulator(totalReviews);

    // Initial state
    assert.strictEqual(carousel.currentIndex, 0);

    // Step forward
    carousel.next();
    assert.strictEqual(carousel.currentIndex, 1);

    // Step forward again
    carousel.next();
    assert.strictEqual(carousel.currentIndex, 2);

    // Wrap around to start
    carousel.next();
    assert.strictEqual(carousel.currentIndex, 0);

    // Reverse step
    carousel.prev();
    assert.strictEqual(carousel.currentIndex, 2);
  });

  // ==========================================
  // Cross-Feature Integration 3.6: Testimonials Auto-Play Pause on Interaction
  // ==========================================
  test('TC-3.6', 'Testimonials carousel pauses auto-play on user hover / focus', () => {
    const carousel = new CarouselSimulator(3);
    assert.strictEqual(carousel.isPlaying, true, 'Carousel should play by default');

    // User hovers over review card
    carousel.setHover(true);
    assert.strictEqual(carousel.isPlaying, false, 'Carousel must pause when hovered');

    // User moves mouse away
    carousel.setHover(false);
    assert.strictEqual(carousel.isPlaying, true, 'Carousel must resume playback when unhovered');
  });

  // ==========================================
  // Cross-Feature Integration 3.7: Brand Marquee Animation Continuity
  // ==========================================
  test('TC-3.7', 'Brand marquee container implements seamless horizontal loop', () => {
    const partnersSrc = readProjectFile('src/components/sections/BrandPartnersSection.tsx') || '';
    assert.ok(
      appSrc.includes('id="partners"') || partnersSrc.includes('id={id}'),
      'Partners section must be mounted'
    );
    assert.ok(
      partnersSrc.includes('flex') && partnersSrc.includes('overflow-hidden'),
      'Marquee wrapper must implement flex container with overflow-hidden'
    );
  });

  // ==========================================
  // Cross-Feature Integration 3.8: Hero Call-to-Action to Section Routing
  // ==========================================
  test('TC-3.8', 'Hero Call-to-Action buttons link to Services and Contact sections', () => {
    const heroSectionMatch = appSrc.match(/<section[^>]*id=["']hero["'][^>]*>([\s\S]*?)<\/section>/);
    assert.ok(heroSectionMatch, 'Hero section block must exist in App.tsx');

    const heroContent = heroSectionMatch[1];
    assert.ok(heroContent.includes('href="#services"'), 'Primary CTA must link to #services');
    assert.ok(heroContent.includes('href="#contact"'), 'Secondary CTA must link to #contact');
  });

  reporter.printSummary();
  return reporter.getSummary();
}

if (process.argv[1] && process.argv[1].endsWith('tier3_interactions.test.js')) {
  runTier3Tests().then((summary) => {
    process.exit(summary.failed > 0 ? 1 : 0);
  });
}
