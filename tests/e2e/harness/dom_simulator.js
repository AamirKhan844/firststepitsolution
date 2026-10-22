/**
 * DOM Simulator & Specification Contract Emulator
 * 
 * Provides opaque-box behavioral testing for form validation, multi-viewport layout constraints,
 * carousel navigation state clamping, and WebGL degradation.
 */

/**
 * Validates Contact Form submission against authoritative interface contracts (PROJECT.md lines 140-151)
 * @param {Object} formData
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateContactForm(formData = {}) {
  const errors = {};
  const { name, email, phone, service, message } = formData;

  // Name validation: required, minimum 2 characters
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Full Name is required (minimum 2 characters)';
  }

  // Email validation: required, standard RFC email pattern with alphabetical TLD
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'A valid email address is required';
  }

  // Phone validation: required, at least 10 numeric digits
  const digitCount = (phone || '').toString().replace(/\D/g, '').length;
  if (!phone || digitCount < 10) {
    errors.phone = 'Valid phone number required (minimum 10 digits)';
  }

  // Service validation: must match one of the recognized IT service offerings
  const validServices = [
    'Buy IT Hardware (HP ProBook, Dell Desktops, Servers, Printers)',
    'Rent IT Equipment (Laptops, PCs, Workstations on Flexible Rent)',
    'Annual Maintenance Contract (Comprehensive / Non-Comprehensive AMC)',
    'Chip-Level Motherboard Repair (Nehru Place Lab)',
    'Networking Solutions & Structured Cabling',
    'Cloud & Server Migration',
    'Data Center Management',
    'Bulk Corporate Procurement (10+ Units)',
    'Other Corporate IT Inquiry',
    'Networking Solutions',
    'Cloud Services',
    'Cybersecurity',
    'Hardware Sales & Support',
    'AI-Powered Solutions',
    'Other IT Inquiry'
  ];
  if (!service || !validServices.includes(service)) {
    errors.service = 'Please select a valid IT service offering';
  }

  // Message validation: required, minimum 10 characters
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Inquiry message is required (minimum 10 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Simulates carousel state navigation with boundary protection
 */
export class CarouselSimulator {
  constructor(totalSlides = 3) {
    this.totalSlides = totalSlides;
    this.currentIndex = 0;
    this.isPlaying = true;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    return this.currentIndex;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    return this.currentIndex;
  }

  goTo(index) {
    if (typeof index !== 'number' || isNaN(index)) {
      throw new TypeError('Slide index must be a valid number');
    }
    // Clamp within bounds [0, totalSlides - 1]
    this.currentIndex = Math.max(0, Math.min(this.totalSlides - 1, Math.floor(index)));
    return this.currentIndex;
  }

  setHover(isHovered) {
    this.isPlaying = !isHovered;
  }
}

/**
 * Simulates form submission concurrency and anti-duplicate submission protection
 */
export class FormSubmissionSimulator {
  constructor() {
    this.isSubmitting = false;
    this.submissionCount = 0;
    this.successfulSubmissions = [];
  }

  async submit(data) {
    if (this.isSubmitting) {
      // Discard or block duplicate rapid submissions
      return { blocked: true, reason: 'Submission in progress' };
    }

    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return { blocked: false, success: false, errors: validation.errors };
    }

    this.isSubmitting = true;
    this.submissionCount++;

    // Simulated network processing
    await new Promise((resolve) => setTimeout(resolve, 50));

    this.successfulSubmissions.push({ ...data, timestamp: Date.now() });
    this.isSubmitting = false;

    return { blocked: false, success: true, errors: {} };
  }
}

/**
 * Simulates WebGL context availability and degradation handler
 */
export class WebGLContextSimulator {
  constructor(hasHardwareAcceleration = true) {
    this.hasHardwareAcceleration = hasHardwareAcceleration;
    this.isContextLost = false;
  }

  getContext() {
    if (!this.hasHardwareAcceleration || this.isContextLost) {
      return null;
    }
    return {
      canvas: {},
      isContextLost: () => this.isContextLost,
      viewport: () => {},
      clear: () => {}
    };
  }

  triggerContextLost() {
    this.isContextLost = true;
  }

  restoreContext() {
    this.isContextLost = false;
  }

  resolveHeroRenderingMode(viewportWidth = 1440) {
    if (viewportWidth < 768) {
      return 'mobile-fallback'; // CSS / SVG lightweight glowing orb
    }
    const gl = this.getContext();
    if (!gl) {
      return 'static-fallback'; // WebGL context lost or unsupported
    }
    return 'webgl-3d'; // High fidelity interactive Three.js canvas
  }
}

/**
 * Simulates viewport layout constraints
 */
export function assertViewportLayoutInvariants(width) {
  if (width < 320) {
    throw new Error('Viewport width below minimal supported mobile resolution');
  }

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    expectedNavMode: isMobile ? 'hamburger' : 'horizontal',
    expectedHeroMode: isMobile ? 'mobile-fallback' : 'webgl-3d',
    hasHorizontalOverflowRisk: false, // Protected by overflow-x: hidden in index.html and App.tsx
    containerMaxWidthClass: 'max-w-7xl'
  };
}
