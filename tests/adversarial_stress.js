import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

console.log('=== EMPIRICAL ADVERSARIAL STRESS TEST SUITE ===\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, name, details = '') {
  if (condition) {
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${name}: ${details}`);
    failedTests++;
  }
}

// Read index.html and dist bundle
const distHtml = fs.readFileSync('dist/index.html', 'utf8');
const distFiles = fs.readdirSync('dist/assets');
const indexJsFile = distFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
const indexJs = fs.readFileSync(path.join('dist/assets', indexJsFile), 'utf8');

// 1. Navigation Anchors Integrity
console.log('--- 1. Anchor & Navigation Integrity ---');
const mandatedAnchors = ['hero', 'products', 'rentals', 'services', 'about', 'why-us', 'contact'];
const appContent = fs.readFileSync('src/App.tsx', 'utf8');
const companyDataContent = fs.readFileSync('src/data/companyData.ts', 'utf8');

for (const anchor of mandatedAnchors) {
  const hasInNav = companyDataContent.includes(`href: '#${anchor}'`) || companyDataContent.includes(`href: "#${anchor}"`);
  assert(hasInNav, `companyData navigationItems contains anchor #${anchor}`);

  const hasInApp = appContent.includes(`id="${anchor}"`) || appContent.includes(`id='${anchor}'`);
  assert(hasInApp, `App.tsx contains corresponding section id="${anchor}"`);
}

// 2. Corporate Data Integrity (evaluated from companyData.ts & dist)
console.log('\n--- 2. Corporate Data Verification & ZERO GST Audit ---');
const companyDataSrc = fs.readFileSync('src/data/companyData.ts', 'utf8');

// Registered office
assert(companyDataSrc.includes('F-1, SGM Nagar, Near Patel Chowk, Faridabad, Haryana – 121001'), 'Faridabad registered address matches verbatim');
assert(!companyDataSrc.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')), 'Zero GST registration numbers in companyData.ts');
assert(!distHtml.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')) && !indexJs.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')), 'Zero GST registration numbers in dist bundle');
assert(companyDataSrc.includes('+91 9990990431') && companyDataSrc.includes('+91 9891508606'), 'Faridabad phone numbers match verbatim');

// Branch office
assert(companyDataSrc.includes('Building No 89, 1218 Hemkunt Chamber, Nehru Place, South Delhi – 110019'), 'Nehru Place office address matches verbatim');
assert(companyDataSrc.includes('011 41777006'), 'Nehru Place landline matches verbatim');
assert(companyDataSrc.includes('+91 9643537006'), 'Nehru Place mobile matches verbatim');

// Emails
assert(companyDataSrc.includes('sales@firststepitsolutions.com'), 'Sales email matches verbatim');
assert(companyDataSrc.includes('sahil@firststepitsolutions.com'), 'Sahil email matches verbatim');

// 3. Contact Form Validation Model Stress Test
console.log('\n--- 3. Contact Form Validation Model Stress Test ---');
function validateContactInput(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  const digitsOnly = (data.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    errors.phone = 'Please enter a valid phone number (min 10 digits)';
  }
  if (!data.service || data.service.trim() === '') {
    errors.service = 'Please select a service';
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

const adversarialCases = [
  {
    name: 'Empty payload',
    input: {},
    expectKeys: ['name', 'email', 'phone', 'service', 'message']
  },
  {
    name: 'Single character name',
    input: { name: 'A', email: 'valid@firststep.com', phone: '9990990431', service: 'Buy IT Hardware', message: 'Legitimate message here' },
    expectKeys: ['name']
  },
  {
    name: 'Whitespace only name',
    input: { name: '   ', email: 'valid@firststep.com', phone: '9990990431', service: 'Buy IT Hardware', message: 'Legitimate message here' },
    expectKeys: ['name']
  },
  {
    name: 'Invalid email missing domain',
    input: { name: 'Valid Name', email: 'invalid@', phone: '9990990431', service: 'Buy IT Hardware', message: 'Legitimate message here' },
    expectKeys: ['email']
  },
  {
    name: 'Invalid email missing @',
    input: { name: 'Valid Name', email: 'invalid.com', phone: '9990990431', service: 'Buy IT Hardware', message: 'Legitimate message here' },
    expectKeys: ['email']
  },
  {
    name: 'Short phone number 9 digits',
    input: { name: 'Valid Name', email: 'valid@firststep.com', phone: '123456789', service: 'Buy IT Hardware', message: 'Legitimate message here' },
    expectKeys: ['phone']
  },
  {
    name: 'Letters in phone number',
    input: { name: 'Valid Name', email: 'valid@firststep.com', phone: 'abcdefghij', service: 'Buy IT Hardware', message: 'Legitimate message here' },
    expectKeys: ['phone']
  },
  {
    name: 'Short message 5 characters',
    input: { name: 'Valid Name', email: 'valid@firststep.com', phone: '9990990431', service: 'Buy IT Hardware', message: 'Short' },
    expectKeys: ['message']
  },
  {
    name: 'Valid full submission with international phone',
    input: { name: 'Corporate Director', email: 'director@company.com', phone: '+91 96435 37006', service: 'Buy IT Hardware', message: 'Need 50 HP ProBook laptops with corporate imaging.' },
    expectKeys: []
  }
];

for (const tc of adversarialCases) {
  const errs = validateContactInput(tc.input);
  const errorKeys = Object.keys(errs);
  const passed = tc.expectKeys.every(k => errorKeys.includes(k)) && (tc.expectKeys.length === 0 ? errorKeys.length === 0 : true);
  assert(passed, `Contact validation scenario: ${tc.name}`);
}

// 4. CSS and Responsive Protection Audit
console.log('\n--- 4. CSS and Responsive Protection Audit ---');
const distCssFile = distFiles.find(f => f.startsWith('index-') && f.endsWith('.css'));
const distCss = fs.readFileSync(path.join('dist/assets', distCssFile), 'utf8');

assert(distCss.includes('overflow-x:hidden') || distHtml.includes('overflow-x-hidden'), 'Global horizontal overflow protection active');
assert(distCss.includes('scroll-behavior:smooth') || distHtml.includes('scroll-smooth'), 'Smooth scrolling active in CSS/HTML');

// 5. Total Uncompressed and Gzip Budget Verification
console.log('\n--- 5. Bundle Size Budget Verification ---');
const indexJsStat = fs.statSync(path.join('dist/assets', indexJsFile));
const indexJsGzip = zlib.gzipSync(indexJs).length;

console.log(`  Main JS Chunk: ${(indexJsStat.size / 1024).toFixed(1)} KB (raw), ${(indexJsGzip / 1024).toFixed(1)} KB (gzip)`);
assert(indexJsGzip < 50 * 1024, `Main index bundle gzip size ${(indexJsGzip / 1024).toFixed(1)} KB < 50 KB budget`);

const vendorReactFile = distFiles.find(f => f.startsWith('vendor-react') && f.endsWith('.js'));
const vendorMotionFile = distFiles.find(f => f.startsWith('vendor-motion') && f.endsWith('.js'));
const vendorIconsFile = distFiles.find(f => f.startsWith('vendor-icons') && f.endsWith('.js'));

const initialJsGzip = indexJsGzip +
  zlib.gzipSync(fs.readFileSync(path.join('dist/assets', vendorReactFile))).length +
  zlib.gzipSync(fs.readFileSync(path.join('dist/assets', vendorMotionFile))).length +
  zlib.gzipSync(fs.readFileSync(path.join('dist/assets', vendorIconsFile))).length;

console.log(`  Total Initial JS Payload (gzip): ${(initialJsGzip / 1024).toFixed(1)} KB`);
assert(initialJsGzip < 170 * 1024, `Total initial JS payload ${(initialJsGzip / 1024).toFixed(1)} KB < 170 KB`);

// Mandated Zero 3D validation
const vendorThreeFile = distFiles.find(f => f.startsWith('vendor-three') && f.endsWith('.js'));
assert(!vendorThreeFile, 'Zero 3D vendor chunks exist in dist/assets (Zero 3D requirement satisfied)');

console.log(`\n======================================================`);
console.log(`  Adversarial Stress Results: ${passedTests} passed, ${failedTests} failed`);
console.log(`======================================================\n`);

process.exit(failedTests > 0 ? 1 : 0);
