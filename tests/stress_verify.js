import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

console.log('=== EMPIRICAL CHALLENGER STRESS VERIFICATION ===\n');

let failedChecks = 0;
let passedChecks = 0;

function assert(condition, testName, detail = '') {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedChecks++;
  } else {
    console.error(`  [FAIL] ${testName}: ${detail}`);
    failedChecks++;
  }
}

// 1. Inspect dist chunks
const distDir = path.resolve('dist');
assert(fs.existsSync(distDir), 'dist directory exists');

const distAssetsDir = path.join(distDir, 'assets');
assert(fs.existsSync(distAssetsDir), 'dist/assets directory exists');

const distFiles = fs.readdirSync(distAssetsDir);
console.log('\n--- Chunk Inventory & Gzip Measurements ---');
const chunks = {};
for (const file of distFiles) {
  const fullPath = path.join(distAssetsDir, file);
  const rawSize = fs.statSync(fullPath).size;
  const content = fs.readFileSync(fullPath);
  const gzSize = zlib.gzipSync(content).length;
  chunks[file] = { raw: rawSize, gzip: gzSize };
  console.log(`  - ${file.padEnd(35)} raw: ${(rawSize / 1024).toFixed(2).padStart(7)} KB | gzip: ${(gzSize / 1024).toFixed(2).padStart(7)} KB`);
}

// Verify ZERO Three.js or 3D canvas chunks exist (Mandated Zero 3D)
const vendorThreeChunk = distFiles.find(f => f.startsWith('vendor-three') && f.endsWith('.js'));
assert(!vendorThreeChunk, 'Zero vendor-three chunks in dist/assets (Zero 3D invariant enforced)');

const heroCanvasChunk = distFiles.find(f => f.startsWith('HeroCanvas-') && f.endsWith('.js'));
assert(!heroCanvasChunk, 'Zero HeroCanvas chunks in dist/assets (Zero 3D invariant enforced)');

// Check index js chunk exists
const indexJsChunk = distFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
assert(Boolean(indexJsChunk), 'index-*.js chunk exists in dist/assets', indexJsChunk || 'Not found');

// 2. Inspect dist/index.html
console.log('\n--- Preload & Modulepreload Isolation in dist/index.html ---');
const indexHtmlPath = path.join(distDir, 'index.html');
assert(fs.existsSync(indexHtmlPath), 'dist/index.html exists');

const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Check for any mention of vendor-three in index.html
assert(!indexHtmlContent.includes('vendor-three'), 'dist/index.html does NOT mention vendor-three');
assert(!indexHtmlContent.includes('three'), 'dist/index.html does NOT mention three.js');

// 3. Static import verification on dist/assets/index-*.js
console.log('\n--- Static Import Verification on dist/assets/index-*.js ---');
const indexJsPath = path.join(distAssetsDir, indexJsChunk);
const indexJsContent = fs.readFileSync(indexJsPath, 'utf8');

function extractStaticImports(code) {
  const imports = [];
  const fromRegex = /import\s*(?:\{[^}]*\}|[^{;"'\n]+)\s*from\s*["']([^"']+)["']/g;
  let m;
  while ((m = fromRegex.exec(code)) !== null) {
    imports.push(m[1]);
  }
  const bareRegex = /import\s*["']([^"']+)["']/g;
  while ((m = bareRegex.exec(code)) !== null) {
    imports.push(m[1]);
  }
  return imports;
}

const indexStaticImports = extractStaticImports(indexJsContent);
console.log('  Static import targets in index-*.js:');
indexStaticImports.forEach(t => console.log(`    ${t}`));

const staticImportsThree = indexStaticImports.some(target => target.includes('vendor-three') || target.includes('three'));
assert(!staticImportsThree, 'index-*.js does NOT statically import vendor-three or three');

// 4. Exhaustive Search for Placeholder / Dummy Text
console.log('\n--- Exhaustive Placeholder / Dummy Text Audit ---');
const placeholderPatterns = [
  { name: 'Lorem ipsum', regex: /lorem\s+ipsum/i },
  { name: 'dolor sit', regex: /dolor\s+sit/i },
  { name: 'consectetur', regex: /consectetur/i },
  { name: 'adipiscing', regex: /adipiscing/i },
  { name: 'TODO comment', regex: /\bTODO\b/ },
  { name: 'FIXME comment', regex: /\bFIXME\b/ },
  { name: 'placeholder text label', regex: /\bplaceholder\s+text\b/i },
  { name: 'John Doe dummy name', regex: /john\s+doe/i }
];

function scanDirectory(dir, patterns, exclusions = ['node_modules', '.git']) {
  const results = [];
  function recurse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (exclusions.includes(entry.name)) continue;
      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        recurse(full);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.json'].includes(ext)) {
          const content = fs.readFileSync(full, 'utf8');
          for (const p of patterns) {
            const m = content.match(p.regex);
            if (m) {
              results.push({ file: full, pattern: p.name, match: m[0] });
            }
          }
        }
      }
    }
  }
  recurse(dir);
  return results;
}

const srcResults = scanDirectory(path.resolve('src'), placeholderPatterns);
assert(srcResults.length === 0, 'Zero placeholder text in src/', JSON.stringify(srcResults));

const distResults = scanDirectory(distDir, placeholderPatterns);
assert(distResults.length === 0, 'Zero placeholder text in dist/', JSON.stringify(distResults));

// 5. Authentic Corporate Info Verification in dist/
console.log('\n--- Corporate Data Verification & ZERO GST Audit in dist/ ---');
const distHtmlAndJs = indexHtmlContent + '\n' + indexJsContent;

// ZERO GST AUDIT
assert(!distHtmlAndJs.includes(['06', 'BFKPA', '1247', 'K1ZM'].join('')), 'CRITICAL AUDIT: Prohibited GST number does NOT exist in dist');

// Verbatim Corporate Details
assert(distHtmlAndJs.includes('F-1, SGM Nagar'), 'Verbatim Faridabad address present in dist');
assert(distHtmlAndJs.includes('Building No 89, 1218 Hemkunt Chamber'), 'Verbatim Nehru Place address present in dist');
assert(distHtmlAndJs.includes('011 41777006'), 'Verbatim Landline number present in dist');
assert(distHtmlAndJs.includes('9990990431'), 'Verbatim registered phone present in dist');
assert(distHtmlAndJs.includes('sales@firststepitsolutions.com'), 'Verbatim corporate email present in dist');

console.log(`\n======================================================`);
console.log(`  Empirical Stress Audit: ${passedChecks} passed, ${failedChecks} failed`);
console.log(`======================================================\n`);

process.exit(failedChecks > 0 ? 1 : 0);
