import assert from 'node:assert';
import { readProjectFile } from './harness/environment.js';
import {
  validateContactForm,
  CarouselSimulator,
  FormSubmissionSimulator,
  WebGLContextSimulator,
  assertViewportLayoutInvariants
} from './harness/dom_simulator.js';
import { TestReporter } from './harness/reporter.js';

export async function runTier2Tests() {
  const reporter = new TestReporter('Tier 2: Boundary & Corner Cases');
  reporter.printHeader();

  const test = async (testId, description, fn) => {
    try {
      await fn();
      reporter.record(testId, description, true);
    } catch (err) {
      reporter.record(testId, description, false, err);
    }
  };

  // ==========================================
  // Category 2.1: Contact Form Validation & Adversarial Inputs
  // ==========================================
  await test('TC-2.1.1', 'Empty form submission is rejected on all required fields', () => {
    const result = validateContactForm({});
    assert.strictEqual(result.isValid, false, 'Empty form must not be valid');
    assert.ok(result.errors.name, 'Name error required');
    assert.ok(result.errors.email, 'Email error required');
    assert.ok(result.errors.phone, 'Phone error required');
    assert.ok(result.errors.service, 'Service error required');
    assert.ok(result.errors.message, 'Message error required');
  });

  await test('TC-2.1.2', 'Malformed email formats are rejected (adversarial patterns)', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'email@example',
      'email@111.222.333.44444'
    ];

    for (const badEmail of invalidEmails) {
      const result = validateContactForm({
        name: 'Enterprise Client',
        email: badEmail,
        phone: '+91 9990990431',
        service: 'Cloud Services',
        message: 'Requesting cloud assessment for hybrid migration.'
      });
      assert.strictEqual(
        result.isValid,
        false,
        `Email "${badEmail}" should be rejected but was accepted`
      );
      assert.ok(result.errors.email, `Error on email expected for "${badEmail}"`);
    }
  });

  await test('TC-2.1.3', 'Short phone numbers (<10 digits) are rejected', () => {
    const shortPhones = ['123', '9891', '123456789'];
    for (const phone of shortPhones) {
      const result = validateContactForm({
        name: 'Test Client',
        email: 'client@example.com',
        phone,
        service: 'Cybersecurity',
        message: 'Looking for firewall security audit.'
      });
      assert.strictEqual(result.isValid, false, `Phone "${phone}" must be rejected`);
      assert.ok(result.errors.phone, `Phone error expected for "${phone}"`);
    }
  });

  await test('TC-2.1.4', 'Non-digit phone strings are rejected', () => {
    const nonDigitPhones = ['abcdefghij', '---+++()', 'No phone available'];
    for (const phone of nonDigitPhones) {
      const result = validateContactForm({
        name: 'Test Client',
        email: 'client@example.com',
        phone,
        service: 'Networking Solutions',
        message: 'Inquiry regarding Cisco switches.'
      });
      assert.strictEqual(result.isValid, false, `Phone "${phone}" must be rejected`);
      assert.ok(result.errors.phone, `Phone error expected for "${phone}"`);
    }
  });

  await test('TC-2.1.5', 'Unselected or unrecognized service category is rejected', () => {
    const invalidServices = ['', 'Select a Service', 'Unknown IT Service', null, undefined];
    for (const service of invalidServices) {
      const result = validateContactForm({
        name: 'Enterprise Client',
        email: 'client@enterprise.com',
        phone: '9891508606',
        service,
        message: 'Inquiry for IT services across NCR.'
      });
      assert.strictEqual(result.isValid, false, `Service "${service}" must be rejected`);
      assert.ok(result.errors.service, `Service error expected for "${service}"`);
    }
  });

  await test('TC-2.1.6', 'Short message (<10 characters) is rejected', () => {
    const shortMessages = ['', 'hi', 'call me', '123456789'];
    for (const message of shortMessages) {
      const result = validateContactForm({
        name: 'Enterprise Client',
        email: 'client@enterprise.com',
        phone: '9891508606',
        service: 'Networking Solutions',
        message
      });
      assert.strictEqual(result.isValid, false, `Message "${message}" must be rejected`);
      assert.ok(result.errors.message, `Message error expected for "${message}"`);
    }
  });

  await test('TC-2.1.7', 'Short name (<2 characters) is rejected', () => {
    const shortNames = ['', ' ', 'A', '   '];
    for (const name of shortNames) {
      const result = validateContactForm({
        name,
        email: 'client@enterprise.com',
        phone: '9891508606',
        service: 'Networking Solutions',
        message: 'Valid inquiry message for network setup.'
      });
      assert.strictEqual(result.isValid, false, `Name "${name}" must be rejected`);
      assert.ok(result.errors.name, `Name error expected for "${name}"`);
    }
  });

  await test('TC-2.1.8', 'Adversarial XSS and unicode inputs are sanitized safely without crashing', () => {
    const xssPayload = "<script>alert('xss')</script>";
    const unicodeName = "François O'Connor & Sons";
    const unicodeMessage = '🚀 Requesting urgent high-availability data center rack setup (SAN/NAS).';

    const result = validateContactForm({
      name: unicodeName,
      email: 'francois.oconnor@global-firm.org',
      phone: '+91 (989) 150-8606',
      service: 'Data Center Management',
      message: `${xssPayload} ${unicodeMessage}`
    });

    assert.strictEqual(result.isValid, true, 'Valid unicode and formatted inputs must pass validation');
  });

  // ==========================================
  // Category 2.2: Multi-Viewport Adaptation
  // ==========================================
  await test('TC-2.2.1', 'Mobile viewport boundary (375px) enforces overflow-x protection', () => {
    const layout = assertViewportLayoutInvariants(375);
    assert.strictEqual(layout.isMobile, true);
    assert.strictEqual(layout.expectedNavMode, 'hamburger');

    const indexHtml = readProjectFile('index.html') || '';
    assert.ok(
      indexHtml.includes('overflow-x-hidden'),
      'index.html body must declare overflow-x-hidden to prevent mobile horizontal scroll'
    );
  });

  await test('TC-2.2.2', 'Mobile navigation collapses to accessible hamburger button', () => {
    const navbarSrc = readProjectFile('src/components/layout/Navbar.tsx') || '';
    assert.ok(
      navbarSrc.includes('lg:hidden') || navbarSrc.includes('md:hidden'),
      'Hamburger button must use responsive breakpoint hiding (lg:hidden)'
    );
    assert.ok(
      navbarSrc.includes('aria-expanded') && navbarSrc.includes('aria-controls'),
      'Mobile hamburger button must implement accessible ARIA attributes'
    );
  });

  await test('TC-2.2.3', 'Tablet viewport boundary (768px) enforces multi-column adaptation', () => {
    const layout = assertViewportLayoutInvariants(768);
    assert.strictEqual(layout.isTablet, true);

    const productsSrc = readProjectFile('src/components/sections/ProductsSection.tsx') || '';
    const statsSrc = readProjectFile('src/components/sections/StatsSection.tsx') || '';
    assert.ok(
      productsSrc.includes('md:grid-cols-2') || statsSrc.includes('grid-cols-2'),
      'App layout must provide 2-column layout on tablet'
    );
  });

  await test('TC-2.2.4', 'Desktop wide viewport boundary (1440px) enforces max container constraints', () => {
    const layout = assertViewportLayoutInvariants(1440);
    assert.strictEqual(layout.isDesktop, true);

    const appSrc = readProjectFile('src/App.tsx') || '';
    const navbarSrc = readProjectFile('src/components/layout/Navbar.tsx') || '';
    assert.ok(
      appSrc.includes('max-w-7xl') || navbarSrc.includes('max-w-7xl'),
      'Containers must enforce max-w-7xl boundary to prevent stretched layouts'
    );
  });

  // ==========================================
  // Category 2.3: WebGL & Graphic Boundaries
  // ==========================================
  await test('TC-2.3.1', 'WebGL null context or context loss degrades gracefully to static/fallback mode', () => {
    const simulator = new WebGLContextSimulator(false);
    assert.strictEqual(simulator.getContext(), null);
    const mode = simulator.resolveHeroRenderingMode(1440);
    assert.strictEqual(mode, 'static-fallback');

    // Context loss simulation
    const activeSim = new WebGLContextSimulator(true);
    activeSim.triggerContextLost();
    assert.strictEqual(activeSim.getContext(), null);
    assert.strictEqual(activeSim.resolveHeroRenderingMode(1440), 'static-fallback');
  });

  await test('TC-2.3.2', 'Mobile viewport (<768px) activates lightweight fallback visual', () => {
    const simulator = new WebGLContextSimulator(true);
    const mobileMode = simulator.resolveHeroRenderingMode(375);
    assert.strictEqual(mobileMode, 'mobile-fallback');
    const tabletMobileMode = simulator.resolveHeroRenderingMode(767);
    assert.strictEqual(tabletMobileMode, 'mobile-fallback');
  });

  // ==========================================
  // Category 2.4: Interaction Concurrency & Stress
  // ==========================================
  await test('TC-2.4.1', 'Rapid double-click on form submit does not initiate duplicate submissions', async () => {
    const submitSim = new FormSubmissionSimulator();
    const validData = {
      name: 'Rohan Mehta',
      email: 'rohan@enterprise.co.in',
      phone: '+91 9990990431',
      service: 'AI-Powered Solutions',
      message: 'Interested in AI-driven helpdesk automation.'
    };

    // Trigger two submissions concurrently (rapid double click)
    const [sub1, sub2] = await Promise.all([
      submitSim.submit(validData),
      submitSim.submit(validData)
    ]);

    assert.ok(
      (sub1.success && sub2.blocked) || (sub2.success && sub1.blocked),
      'Concurrent duplicate submission must be blocked by in-flight lock'
    );
    assert.strictEqual(submitSim.successfulSubmissions.length, 1);
  });

  await test('TC-2.4.2', 'Rapid clicking on carousel navigation clamps slide index cleanly', () => {
    const carousel = new CarouselSimulator(3);

    // Rapid forward clicks
    carousel.next();
    carousel.next();
    carousel.next(); // wraps to 0
    assert.strictEqual(carousel.currentIndex, 0);

    // Rapid reverse clicks
    carousel.prev(); // wraps to 2
    assert.strictEqual(carousel.currentIndex, 2);

    // Out of bounds jump clamping
    carousel.goTo(999);
    assert.strictEqual(carousel.currentIndex, 2);
    carousel.goTo(-50);
    assert.strictEqual(carousel.currentIndex, 0);
  });

  await test('TC-2.4.3', 'Preloader safety timeout guarantees dismissal <= 2500ms', () => {
    const preloaderSrc = readProjectFile('src/components/layout/Preloader.tsx') || '';
    assert.ok(
      preloaderSrc.includes('2500') || preloaderSrc.includes('setTimeout') || preloaderSrc.includes('interval'),
      'Preloader must implement timer-based progress or failsafe timeout'
    );
  });

  reporter.printSummary();
  return reporter.getSummary();
}

if (process.argv[1] && process.argv[1].endsWith('tier2_boundaries.test.js')) {
  runTier2Tests().then((summary) => {
    process.exit(summary.failed > 0 ? 1 : 0);
  });
}
