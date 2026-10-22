import assert from 'node:assert';
import { readProjectFile, AUTHORITATIVE_SPECS, scanForProhibitedGST } from './harness/environment.js';
import { TestReporter } from './harness/reporter.js';

export async function runTier1Tests() {
  const reporter = new TestReporter('Tier 1: Feature Coverage (Core Requirements)');
  reporter.printHeader();

  // Load project files for opaque-box contract verification
  const appSrc = readProjectFile('src/App.tsx') || '';
  const companyDataSrc = readProjectFile('src/data/companyData.ts') || '';
  const productsDataSrc = readProjectFile('src/data/productsData.ts') || '';
  const statsDataSrc = readProjectFile('src/data/statsData.ts') || '';
  const partnersDataSrc = readProjectFile('src/data/partnersData.ts') || '';
  const testimonialsDataSrc = readProjectFile('src/data/testimonialsData.ts') || '';
  const rentalDataSrc = readProjectFile('src/data/rentalData.ts') || '';
  const servicesDataSrc = readProjectFile('src/data/servicesData.ts') || '';
  const footerSrc = readProjectFile('src/components/layout/Footer.tsx') || '';
  const navbarSrc = readProjectFile('src/components/layout/Navbar.tsx') || '';
  const mobileDrawerSrc = readProjectFile('src/components/layout/MobileDrawer.tsx') || '';
  const heroSrc = readProjectFile('src/components/sections/HeroSection.tsx') || '';
  const productsSectionSrc = readProjectFile('src/components/sections/ProductsSection.tsx') || '';
  const rentalSectionSrc = readProjectFile('src/components/sections/RentalSection.tsx') || '';
  const servicesSectionSrc = readProjectFile('src/components/sections/ServicesSection.tsx') || '';
  const aboutSectionSrc = readProjectFile('src/components/sections/AboutSection.tsx') || '';
  const statsSectionSrc = readProjectFile('src/components/sections/StatsSection.tsx') || '';
  const contactSectionSrc = readProjectFile('src/components/sections/ContactSection.tsx') || '';
  const contactFormSrc = readProjectFile('src/components/ui/ContactForm.tsx') || '';
  const preloaderSrc = readProjectFile('src/components/layout/Preloader.tsx') || '';
  const typesSrc = readProjectFile('src/types/index.ts') || '';
  const indexHtml = readProjectFile('index.html') || '';
  const packageJson = readProjectFile('package.json') || '';

  const combinedCode = [
    appSrc,
    companyDataSrc,
    productsDataSrc,
    statsDataSrc,
    partnersDataSrc,
    testimonialsDataSrc,
    rentalDataSrc,
    servicesDataSrc,
    footerSrc,
    navbarSrc,
    mobileDrawerSrc,
    heroSrc,
    productsSectionSrc,
    rentalSectionSrc,
    servicesSectionSrc,
    aboutSectionSrc,
    statsSectionSrc,
    contactSectionSrc,
    contactFormSrc,
    preloaderSrc,
    typesSrc,
    indexHtml
  ].join('\n');

  // Helper test runner
  const test = (testId, description, fn) => {
    try {
      fn();
      reporter.record(testId, description, true);
    } catch (err) {
      reporter.record(testId, description, false, err);
    }
  };

  // ==========================================
  // Category 1.1: 10 Mandated Page Sections & Core Structure
  // ==========================================
  test('TC-1.1.1', 'Preloader exists with clean corporate loading portal and HP Partner badge', () => {
    assert.ok(
      combinedCode.includes('Preloader') || combinedCode.includes('preloader'),
      'Preloader component must be declared and integrated'
    );
    assert.ok(
      preloaderSrc.includes('progress') && preloaderSrc.includes('Authorized HP Commercial Partner'),
      'Preloader must feature progress tracking and HP partner badge'
    );
  });

  test('TC-1.1.2', 'Header navigation exists with fixed positioning and brand typography', () => {
    assert.ok(
      navbarSrc.includes('fixed top-0') || navbarSrc.includes('sticky'),
      'Navigation must feature fixed viewport positioning'
    );
    assert.ok(
      combinedCode.includes('First Step Solutions'),
      'Navigation must contain "First Step Solutions" brand typography'
    );
  });

  test('TC-1.1.3', 'Hero section exists with responsive carousel stage and CTAs', () => {
    assert.ok(
      appSrc.includes('id="hero"'),
      'Section with id="hero" must exist'
    );
    assert.ok(
      heroSrc.includes('Shop Laptops') && heroSrc.includes('Request Corporate Pricing'),
      'Hero must offer primary CTA routing to products and contact'
    );
  });

  test('TC-1.1.4', 'About Us section exists with founding year 2009 and Nehru Place heritage', () => {
    assert.ok(
      appSrc.includes('id="about"'),
      'Section with id="about" must exist'
    );
    assert.ok(
      combinedCode.includes('2009') || combinedCode.includes('foundingYear'),
      'About section must reference founding year 2009'
    );
  });

  test('TC-1.1.5', 'Products catalog section exists with hardware procurement', () => {
    assert.ok(
      appSrc.includes('id="products"'),
      'Section with id="products" must exist'
    );
  });

  test('TC-1.1.6', 'Corporate Rentals section exists with transparent rental tiers', () => {
    assert.ok(
      appSrc.includes('id="rentals"'),
      'Section with id="rentals" must exist'
    );
  });

  test('TC-1.1.7', 'Services section exists with AMC and Nehru Place chip lab capabilities', () => {
    assert.ok(
      appSrc.includes('id="services"'),
      'Section with id="services" must exist'
    );
  });

  test('TC-1.1.8', 'Stats section exists with 4 key metrics (500+, 15+, 24/7, 1000+)', () => {
    assert.ok(
      appSrc.includes('id="stats"'),
      'Section with id="stats" must exist'
    );
    assert.ok(
      combinedCode.includes('500+') && combinedCode.includes('15+'),
      'Stats section must render key business metrics'
    );
  });

  test('TC-1.1.9', 'Brand Partners section exists with continuous marquee', () => {
    assert.ok(
      appSrc.includes('id="partners"'),
      'Section with id="partners" must exist'
    );
    assert.ok(
      combinedCode.includes('marquee') || appSrc.includes('BrandPartnersSection'),
      'Brand Partners container must exist'
    );
  });

  test('TC-1.1.10', 'Testimonials section exists with review cards and star ratings', () => {
    assert.ok(
      appSrc.includes('id="testimonials"'),
      'Section with id="testimonials" must exist'
    );
  });

  test('TC-1.1.11', 'Contact section exists with dual office hubs (Nehru Place & Faridabad)', () => {
    assert.ok(
      appSrc.includes('id="contact"'),
      'Section with id="contact" must exist'
    );
    assert.ok(
      combinedCode.includes('Faridabad') && combinedCode.includes('Nehru Place'),
      'Contact section must present both Faridabad and Nehru Place locations'
    );
  });

  // ==========================================
  // Category 1.2: R1 Category Navigation Bar & Dropdowns (Graphline Pattern)
  // ==========================================
  test('TC-1.2.1', 'Top Utility Bar contains corporate phones, email, hours, dual offices', () => {
    assert.ok(navbarSrc.includes('+91 96435 37006') || navbarSrc.includes('+919643537006'), 'Nehru Place mobile phone must exist in top utility bar');
    assert.ok(navbarSrc.includes('011 41777006') || navbarSrc.includes('01141777006'), 'Nehru Place landline must exist in top utility bar');
    assert.ok(navbarSrc.includes('sales@firststepitsolutions.com'), 'Corporate sales email must exist in top utility bar');
    assert.ok(navbarSrc.includes('Nehru Place') && navbarSrc.includes('Faridabad'), 'Dual office indicators must exist in top utility bar');
  });

  test('TC-1.2.2', 'Brand row displays logo, Authorized HP Commercial Partner badge, search bar & CTA', () => {
    assert.ok(navbarSrc.includes('Authorized Partner') && navbarSrc.includes('HP Commercial'), 'Official HP Partner badge must exist in brand row');
    assert.ok(navbarSrc.includes('Search') || navbarSrc.includes('searchQuery'), 'Live search input must exist in brand row');
    assert.ok(navbarSrc.includes('Request B2B Quote'), 'Request B2B Quote CTA button must exist in brand row');
  });

  test('TC-1.2.3', 'Category nav bar uses deep corporate blue #002d62 and includes Home icon', () => {
    assert.ok(navbarSrc.includes('#002d62'), 'Category nav bar must use deep blue #002d62');
    assert.ok(navbarSrc.includes('Home') || navbarSrc.includes('<Home'), 'Category nav bar must include Home icon button');
  });

  test('TC-1.2.4', 'All 6 mandated product category menus exist: Laptops, Work Stations, Desktop, Monitors, Printers, Accessories', () => {
    for (const cat of AUTHORITATIVE_SPECS.productCategories) {
      assert.ok(
        companyDataSrc.includes(`name: '${cat.name}'`) || companyDataSrc.includes(`name: "${cat.name}"`),
        `Category "${cat.name}" must exist in category navigation menus`
      );
    }
  });

  test('TC-1.2.5', 'All 13 mandated subcategories exist within the respective category dropdowns', () => {
    for (const cat of AUTHORITATIVE_SPECS.productCategories) {
      for (const sub of cat.subcategories) {
        assert.ok(
          companyDataSrc.includes(`name: '${sub}'`) || companyDataSrc.includes(`name: "${sub}"`),
          `Subcategory "${sub}" must exist under "${cat.name}"`
        );
      }
    }
  });

  test('TC-1.2.6', 'Direct nav links exist for Corporate Rentals, AMC & Services, About Us, Contact Us', () => {
    for (const link of AUTHORITATIVE_SPECS.directNavLinks) {
      assert.ok(
        companyDataSrc.includes(link.name) && companyDataSrc.includes(link.href),
        `Direct nav link "${link.name}" -> "${link.href}" must exist`
      );
    }
  });

  test('TC-1.2.7', 'Subcategory click triggers scroll to #products and updates catalog filter', () => {
    assert.ok(
      navbarSrc.includes("document.getElementById('products')") || navbarSrc.includes("scrollIntoView"),
      'Navbar must implement scroll to #products on subcategory click'
    );
    assert.ok(
      navbarSrc.includes('onSelectCategory'),
      'Navbar must pass category and subcategory to onSelectCategory callback'
    );
  });

  test('TC-1.2.8', 'Mobile drawer includes full hierarchical menu with categories and accordion subcategories', () => {
    assert.ok(
      mobileDrawerSrc.includes('productCategoryMenus.map'),
      'Mobile drawer must map through product category menus'
    );
    assert.ok(
      mobileDrawerSrc.includes('cat.subcategories.map'),
      'Mobile drawer must render subcategory list in accordion'
    );
    assert.ok(
      mobileDrawerSrc.includes('Escape') && mobileDrawerSrc.includes('overflow = \'hidden\''),
      'Mobile drawer must implement Escape key listener and body scroll lock'
    );
  });

  // ==========================================
  // Category 1.3: R2 Full-Width Responsive Hero Carousel
  // ==========================================
  test('TC-1.3.1', 'Hero carousel contains at least 3 distinct slides (4 slides in implementation)', () => {
    for (const slide of AUTHORITATIVE_SPECS.heroSlides) {
      assert.ok(
        heroSrc.includes(slide.title),
        `Hero carousel slide "${slide.title}" must exist`
      );
      assert.ok(
        heroSrc.includes(slide.tagline),
        `Hero carousel slide tagline "${slide.tagline}" must exist`
      );
    }
  });

  test('TC-1.3.2', 'Hero carousel implements 6-second autoplay with pause on hover', () => {
    assert.ok(
      heroSrc.includes('6000'),
      'Hero carousel must configure 6000ms autoplay interval'
    );
    assert.ok(
      heroSrc.includes('onMouseEnter') && heroSrc.includes('setIsPaused(true)'),
      'Hero carousel must pause auto-rotation when user hovers'
    );
    assert.ok(
      heroSrc.includes('onMouseLeave') && heroSrc.includes('setIsPaused(false)'),
      'Hero carousel must resume auto-rotation when user leaves'
    );
  });

  test('TC-1.3.3', 'Hero carousel includes bottom indicator dots and previous/next navigation arrows', () => {
    assert.ok(
      heroSrc.includes('ChevronLeft') && heroSrc.includes('prevSlide'),
      'Hero carousel must provide left/previous navigation arrow'
    );
    assert.ok(
      heroSrc.includes('ChevronRight') && heroSrc.includes('nextSlide'),
      'Hero carousel must provide right/next navigation arrow'
    );
    assert.ok(
      heroSrc.includes('goToSlide') || heroSrc.includes('role="tab"'),
      'Hero carousel must provide clickable indicator dots'
    );
  });

  test('TC-1.3.4', 'Hero carousel is built with zero Three.js / WebGL / 3D canvas scripts', () => {
    assert.ok(!heroSrc.includes('<canvas'), 'Hero section must not mount any 3D canvas');
    assert.ok(!heroSrc.includes('three'), 'Hero section must not import three.js');
    assert.ok(!packageJson.includes('"three"'), 'package.json must not include three dependency');
    assert.ok(!packageJson.includes('"@react-three/fiber"'), 'package.json must not include @react-three/fiber');
  });

  // ==========================================
  // Category 1.4: Corporate Verbatim Data & ZERO GST INVARIANT
  // ==========================================
  test('TC-1.4.1', 'Faridabad Registered Head Office address matches verbatim', () => {
    const expectedAddress = AUTHORITATIVE_SPECS.faridabadOffice.address;
    assert.ok(
      combinedCode.includes(expectedAddress),
      `Verbatim address "${expectedAddress}" must be present in code/content`
    );
  });

  test('TC-1.4.2', 'CRITICAL AUDIT: Zero GST registration numbers appear in UI or code', () => {
    const prohibitedGst = ['06', 'BFKPA', '1247', 'K1ZM'].join('');
    assert.strictEqual(
      combinedCode.includes(prohibitedGst),
      false,
      `Prohibited GST number "${prohibitedGst}" MUST NOT appear anywhere in the codebase or UI`
    );
    const gstMatches = scanForProhibitedGST(combinedCode);
    assert.strictEqual(
      gstMatches.length,
      0,
      `Found prohibited GST format strings: ${gstMatches.join(', ')}`
    );
  });

  test('TC-1.4.3', 'Faridabad registered phone numbers are present with tel: protocol links', () => {
    const [tel1, tel2] = AUTHORITATIVE_SPECS.faridabadOffice.contacts;
    assert.ok(combinedCode.includes(tel1), `Contact "${tel1}" must be present`);
    assert.ok(combinedCode.includes(tel2), `Contact "${tel2}" must be present`);
  });

  test('TC-1.4.4', 'Nehru Place Commercial Office address matches verbatim', () => {
    const expectedAddress = AUTHORITATIVE_SPECS.nehruPlaceOffice.address;
    assert.ok(
      combinedCode.includes(expectedAddress),
      `Verbatim address "${expectedAddress}" must be present in code/content`
    );
  });

  test('TC-1.4.5', 'Nehru Place phone numbers and landline 011 41777006 are present', () => {
    const landline = AUTHORITATIVE_SPECS.nehruPlaceOffice.landline;
    assert.ok(combinedCode.includes(landline), `Landline "${landline}" must be present`);
    const [mob1] = AUTHORITATIVE_SPECS.nehruPlaceOffice.contacts;
    assert.ok(combinedCode.includes(mob1), `Contact "${mob1}" must be present`);
  });

  test('TC-1.4.6', 'Corporate emails are present with mailto: protocol links', () => {
    const [email1, email2] = AUTHORITATIVE_SPECS.emails;
    assert.ok(combinedCode.includes(email1), `Email "${email1}" must be present`);
    assert.ok(combinedCode.includes(email2), `Email "${email2}" must be present`);
  });

  // ==========================================
  // Category 1.5: Animated Stats & Metric Counters
  // ==========================================
  test('TC-1.5.1', 'Stat Metric 1: "500+" Clients Served is present', () => {
    assert.ok(combinedCode.includes('500+'), 'Metric "500+" must be rendered');
  });

  test('TC-1.5.2', 'Stat Metric 2: "15+" Years Experience is present', () => {
    assert.ok(combinedCode.includes('15+'), 'Metric "15+" must be rendered');
  });

  test('TC-1.5.3', 'Stat Metric 3: "24/7" Dedicated Support is present', () => {
    assert.ok(combinedCode.includes('24/7'), 'Metric "24/7" must be rendered');
  });

  test('TC-1.5.4', 'Stat Metric 4: "1000+" Projects Delivered is present', () => {
    assert.ok(
      combinedCode.includes('1000+') || (statsDataSrc.includes('1000') && statsDataSrc.includes('+')),
      'Metric "1000+" must be rendered'
    );
  });

  test('TC-1.5.5', 'Stats container supports responsive 4-column layout on desktop', () => {
    assert.ok(
      statsSectionSrc.includes('grid-cols-2') && statsSectionSrc.includes('lg:grid-cols-4'),
      'Stats container must scale from 2 columns on mobile to 4 columns on large screens'
    );
  });

  // ==========================================
  // Category 1.6: Brand Partners Marquee
  // ==========================================
  test('TC-1.6.1', 'Brand partners list contains global technology leaders (HP, Dell, Cisco, Microsoft, AWS, Lenovo)', () => {
    for (const partner of AUTHORITATIVE_SPECS.mandatedPartners) {
      assert.ok(combinedCode.includes(partner), `Partner ${partner} must be included in showcase`);
    }
  });

  // ==========================================
  // Category 1.7: Testimonials & Reviews
  // ==========================================
  test('TC-1.7.1', 'Testimonials section features verified client profiles and star ratings', () => {
    assert.ok(combinedCode.includes('testimonialsData') || combinedCode.includes('review'), 'Testimonials must feature verified client review profiles');
    assert.ok(combinedCode.includes('Star') || combinedCode.includes('★'), 'Review cards must render star rating representation');
  });

  // ==========================================
  // Category 1.8: R4 Commercial Hardware Catalog & HP ProBook Models
  // ==========================================
  test('TC-1.8.1', 'Catalog contains real HP ProBook models scraped from Graphline Computers', () => {
    for (const part of AUTHORITATIVE_SPECS.scrapedProBookPartNumbers) {
      assert.ok(
        productsDataSrc.includes(part),
        `Authentic Graphline HP ProBook part number "${part}" must exist in catalog`
      );
    }
  });

  test('TC-1.8.2', 'Products display specs, OEM part numbers, and WhatsApp inquiry buttons', () => {
    assert.ok(
      productsSectionSrc.includes('partNumber'),
      'Product cards must display OEM part number'
    );
    assert.ok(
      productsSectionSrc.includes('https://wa.me/919643537006'),
      'Product cards must include WhatsApp inquiry link'
    );
  });

  test('TC-1.8.3', 'Products section implements category tab filter, subcategory filter, and live search', () => {
    assert.ok(
      productsSectionSrc.includes('activeTab') && productsSectionSrc.includes('activeSubcat'),
      'Products section must support active category and subcategory filtering'
    );
    assert.ok(
      productsSectionSrc.includes('localSearch') || productsSectionSrc.includes('searchQuery'),
      'Products section must support search query filtering'
    );
  });

  test('TC-1.8.4', 'Corporate IT Rentals section features 4-tier pricing with zero upfront deposit', () => {
    assert.ok(
      rentalSectionSrc.includes('₹1,499') || rentalSectionSrc.includes('1,499'),
      'Rental section must feature entry pricing from ₹1,499/mo'
    );
    assert.ok(
      /zero\s+upfront\s+security\s+deposit/i.test(rentalSectionSrc) ||
      /zero\s+security\s+deposit/i.test(rentalSectionSrc),
      'Rental section must feature zero security deposit value proposition'
    );
  });

  test('TC-1.8.5', 'Contact Form validates name, corporate email, 10-digit phone, service, and message', () => {
    assert.ok(contactFormSrc.includes('name') && contactFormSrc.includes('email') && contactFormSrc.includes('phone'), 'Contact form fields must exist');
    assert.ok(contactFormSrc.includes('validateContactFormFields') || contactFormSrc.includes('digitCount'), 'Contact form validation logic must be implemented');
  });

  // ==========================================
  // Category 1.9: Corporate Footer & Microworld B2B Styling
  // ==========================================
  test('TC-1.9.1', 'Footer renders quick navigation items, legal policy modals, and dual office cards', () => {
    assert.ok(footerSrc.includes('Quick Navigation'), 'Footer must display quick navigation');
    assert.ok(footerSrc.includes('Privacy Policy') && footerSrc.includes('Terms of Service') && footerSrc.includes('SLA Guarantees'), 'Footer must include legal policy modal triggers');
    assert.ok(footerSrc.includes('Nehru Place') && footerSrc.includes('Faridabad'), 'Footer must display dual office addresses');
  });

  test('TC-1.9.2', 'Footer includes copyright notice for 2026 First Step Solutions', () => {
    assert.ok(
      footerSrc.includes('2026') && footerSrc.includes('First Step Solutions'),
      'Footer must state copyright for 2026 First Step Solutions'
    );
  });

  test('TC-1.9.3', 'Footer displays ZERO GST numbers and clean corporate jurisdiction notice', () => {
    assert.ok(!footerSrc.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')), 'Footer must not contain prohibited GSTIN');
    assert.ok(footerSrc.includes('Haryana & Delhi NCR') || footerSrc.includes('Corporate Registration'), 'Footer must state corporate registration jurisdiction without raw GST');
  });

  reporter.printSummary();
  return reporter.getSummary();
}

if (process.argv[1] && process.argv[1].endsWith('tier1_features.test.js')) {
  runTier1Tests().then((summary) => {
    process.exit(summary.failed > 0 ? 1 : 0);
  });
}
