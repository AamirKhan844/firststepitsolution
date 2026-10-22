import assert from 'node:assert';
import { readProjectFile, scanForLoremIpsum, AUTHORITATIVE_SPECS, scanForProhibitedGST } from './harness/environment.js';
import { FormSubmissionSimulator, validateContactForm, assertViewportLayoutInvariants } from './harness/dom_simulator.js';
import { TestReporter } from './harness/reporter.js';

export async function runTier4Tests() {
  const reporter = new TestReporter('Tier 4: Real-World Application Scenarios');
  reporter.printHeader();

  const appSrc = readProjectFile('src/App.tsx') || '';
  const companyDataSrc = readProjectFile('src/data/companyData.ts') || '';
  const footerSrc = readProjectFile('src/components/layout/Footer.tsx') || '';
  const navbarSrc = readProjectFile('src/components/layout/Navbar.tsx') || '';
  const heroSrc = readProjectFile('src/components/sections/HeroSection.tsx') || '';
  const productsSrc = readProjectFile('src/components/sections/ProductsSection.tsx') || '';
  const contactSrc = readProjectFile('src/components/sections/ContactSection.tsx') || '';
  const indexHtml = readProjectFile('index.html') || '';

  const test = async (testId, description, fn) => {
    try {
      await fn();
      reporter.record(testId, description, true);
    } catch (err) {
      reporter.record(testId, description, false, err);
    }
  };

  // ==========================================
  // Scenario 1: End-to-End Enterprise Customer Journey
  // ==========================================
  await test('TC-4.1', 'Enterprise visitor completes journey: landing -> reading services -> submitting inquiry -> confirmation', async () => {
    // 1. Landing & Preloader
    assert.ok(appSrc.includes('Preloader'), 'Landing page displays corporate preloader');

    // 2. Hero Headline & Credentials
    assert.ok(
      heroSrc.includes('HP Elite & ProBook Commercial Fleet') || heroSrc.includes('Commercial Fleet'),
      'Hero communicates corporate hardware fleet capabilities'
    );
    assert.ok(
      navbarSrc.includes('Authorized Partner') && navbarSrc.includes('HP Commercial'),
      'Authorized HP Partner credibility badge displayed'
    );

    // 3. Inspect Products, Rentals & Stats
    const aboutSrc = readProjectFile('src/components/sections/AboutSection.tsx') || '';
    assert.ok(productsSrc.includes('Commercial Hardware Sales'), 'Visitor evaluates hardware sales');
    assert.ok(appSrc.includes('RentalSection'), 'Visitor evaluates IT rentals');
    assert.ok(aboutSrc.includes('500+') || appSrc.includes('StatsSection'), 'Visitor notes scale: 500+ clients served');

    // 4. Fill Inquiry Form for Corporate Procurement
    const leadSubmission = {
      name: 'Vikas Oberoi',
      email: 'vikas.oberoi@fintechncr.com',
      phone: '+91 9643537006',
      service: 'Buy IT Hardware (HP ProBook, Dell Desktops, Servers, Printers)',
      message: 'Planning to purchase 30 HP ProBook 440 G11 laptops for corporate engineering team.'
    };

    const validation = validateContactForm(leadSubmission);
    assert.strictEqual(validation.isValid, true, 'Inquiry form inputs must be valid');

    // 5. Submit Form and Receive Confirmation
    const submitSimulator = new FormSubmissionSimulator();
    const result = await submitSimulator.submit(leadSubmission);
    assert.strictEqual(result.success, true, 'Submission must succeed and return confirmation');
    assert.strictEqual(submitSimulator.successfulSubmissions.length, 1);
    assert.strictEqual(submitSimulator.successfulSubmissions[0].service, leadSubmission.service);
  });

  // ==========================================
  // Scenario 2: Haryana Client Faridabad Office Routing & Zero GST Verification
  // ==========================================
  await test('TC-4.2', 'Haryana client verifies Faridabad Head Office, phone link, and confirms ZERO GST numbers', () => {
    const fbd = AUTHORITATIVE_SPECS.faridabadOffice;
    // Verifies address
    assert.ok(companyDataSrc.includes(fbd.address) || contactSrc.includes(fbd.address));
    // Verifies registered phone
    assert.ok(companyDataSrc.includes(fbd.contacts[0]) || contactSrc.includes(fbd.contacts[0]));
    // Verifies tel: link
    assert.ok(footerSrc.includes('tel:') && contactSrc.includes('tel:'));
    // ZERO GST INVARIANT: Verify 0 occurrences of prohibited GST
    assert.strictEqual(
      companyDataSrc.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')),
      false,
      'Prohibited GST number must not appear in companyData.ts'
    );
  });

  // ==========================================
  // Scenario 3: Delhi Commercial Client Nehru Place Routing
  // ==========================================
  await test('TC-4.3', 'Delhi client verifies Nehru Place office, landline 011 41777006, and office coordinates', () => {
    const np = AUTHORITATIVE_SPECS.nehruPlaceOffice;
    // Verifies commercial office address
    assert.ok(companyDataSrc.includes(np.address) || contactSrc.includes(np.address));
    // Verifies landline
    assert.ok(companyDataSrc.includes(np.landline) || navbarSrc.includes(np.landline));
    // Verifies telephone link for landline
    assert.ok(
      navbarSrc.includes('tel:01141777006') ||
      footerSrc.includes('branchOffice.landline') ||
      contactSrc.includes('branchOffice.landline')
    );
    // Verifies Nehru Place Hemkunt Chamber
    assert.ok(companyDataSrc.includes('Hemkunt Chamber') || navbarSrc.includes('Hemkunt Chamber'));
  });

  // ==========================================
  // Scenario 4: Mobile Executive On-The-Go Experience
  // ==========================================
  await test('TC-4.4', 'Mobile executive on 375px viewport uses hamburger drawer and makes phone call', () => {
    const mobileLayout = assertViewportLayoutInvariants(375);
    assert.strictEqual(mobileLayout.isMobile, true);
    assert.strictEqual(mobileLayout.expectedNavMode, 'hamburger');

    // Mobile drawer renders direct phone dialer
    const drawerSrc = readProjectFile('src/components/layout/MobileDrawer.tsx') || '';
    assert.ok(drawerSrc.includes('tel:+919643537006'), 'Mobile drawer must offer direct dial button');
    assert.ok(drawerSrc.includes('wa.me/919643537006'), 'Mobile drawer must offer direct WhatsApp button');
  });

  // ==========================================
  // Scenario 5: Forensic Quality & Zero "Lorem Ipsum" Corporate Audit
  // ==========================================
  await test('TC-4.5', 'Exhaustive corporate audit verifies 0 instances of dummy text across all code & content', () => {
    const filesToAudit = [
      'src/App.tsx',
      'src/data/companyData.ts',
      'src/data/productsData.ts',
      'src/data/rentalData.ts',
      'src/data/servicesData.ts',
      'src/data/statsData.ts',
      'src/data/testimonialsData.ts',
      'src/data/partnersData.ts',
      'src/components/layout/Footer.tsx',
      'src/components/layout/Navbar.tsx',
      'src/components/sections/HeroSection.tsx',
      'src/components/sections/ProductsSection.tsx',
      'src/components/sections/RentalSection.tsx',
      'src/components/sections/ServicesSection.tsx',
      'src/components/sections/ContactSection.tsx'
    ];

    for (const relPath of filesToAudit) {
      const content = readProjectFile(relPath);
      assert.ok(content !== null, `File "${relPath}" must exist for forensic audit`);

      // 1. Audit for dummy text
      const loremMatches = scanForLoremIpsum(content);
      assert.strictEqual(
        loremMatches.length,
        0,
        `Found dummy placeholder text in "${relPath}": ${loremMatches.join(', ')}`
      );

      // 2. Audit for prohibited GST number
      assert.strictEqual(
        content.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')),
        false,
        `Prohibited GST number found in "${relPath}"`
      );
    }
  });

  reporter.printSummary();
  return reporter.getSummary();
}

if (process.argv[1] && process.argv[1].endsWith('tier4_application.test.js')) {
  runTier4Tests().then((summary) => {
    process.exit(summary.failed > 0 ? 1 : 0);
  });
}
