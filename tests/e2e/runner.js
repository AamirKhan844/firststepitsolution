#!/usr/bin/env node

/**
 * Automated E2E Test Suite Runner
 * First Step Solutions 3D Web Application
 * 
 * Executes Tiers 1 through 4 test suites with structured reporting and exit code semantics.
 * Usage:
 *   node tests/e2e/runner.js
 *   node tests/e2e/runner.js --tier 1
 *   node tests/e2e/runner.js --tier 2
 *   node tests/e2e/runner.js --tier 3
 *   node tests/e2e/runner.js --tier 4
 */

import { runTier1Tests } from './tier1_features.test.js';
import { runTier2Tests } from './tier2_boundaries.test.js';
import { runTier3Tests } from './tier3_interactions.test.js';
import { runTier4Tests } from './tier4_application.test.js';

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  white: '\x1b[37m'
};

async function main() {
  const args = process.argv.slice(2);
  let selectedTier = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tier' && args[i + 1]) {
      selectedTier = parseInt(args[i + 1], 10);
    }
  }

  console.log(`\n${colors.bold}${colors.cyan}======================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  FIRST STEP SOLUTIONS — E2E TEST RUNNER (TIERS 1-4)   ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}======================================================${colors.reset}`);
  console.log(`${colors.gray}Integrity Mode: Strict Opaque-Box Requirement Verification${colors.reset}\n`);

  const startTime = Date.now();
  const tierSummaries = [];

  const tierTasks = [
    { tier: 1, name: 'Tier 1: Feature Coverage', runner: runTier1Tests },
    { tier: 2, name: 'Tier 2: Boundary & Corner Cases', runner: runTier2Tests },
    { tier: 3, name: 'Tier 3: Cross-Feature Combinations', runner: runTier3Tests },
    { tier: 4, name: 'Tier 4: Real-World Scenarios', runner: runTier4Tests }
  ];

  for (const task of tierTasks) {
    if (selectedTier !== null && selectedTier !== task.tier) {
      continue;
    }

    try {
      const summary = await task.runner();
      tierSummaries.push(summary);
    } catch (err) {
      console.error(`\n${colors.red}Unhandled exception running Tier ${task.tier}:${colors.reset}`, err);
      tierSummaries.push({
        suiteName: task.name,
        total: 1,
        passed: 0,
        failed: 1,
        duration: 0
      });
    }
  }

  const totalTime = Date.now() - startTime;
  const grandTotal = tierSummaries.reduce((sum, s) => sum + s.total, 0);
  const grandPassed = tierSummaries.reduce((sum, s) => sum + s.passed, 0);
  const grandFailed = tierSummaries.reduce((sum, s) => sum + s.failed, 0);

  console.log(`\n${colors.bold}${colors.cyan}======================================================${colors.reset}`);
  console.log(`${colors.bold}                  OVERALL SUITE RESULTS               ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}======================================================${colors.reset}`);

  for (const s of tierSummaries) {
    const statusTag = s.failed === 0
      ? `${colors.green}✔ PASSED${colors.reset}`
      : `${colors.red}✖ FAILED${colors.reset}`;
    console.log(`  ${statusTag}  ${s.suiteName.padEnd(42)} ${s.passed}/${s.total} tests (${s.duration}ms)`);
  }

  console.log(`${colors.cyan}------------------------------------------------------${colors.reset}`);
  console.log(`  ${colors.bold}Total Executed:${colors.reset}   ${grandTotal}`);
  console.log(`  ${colors.bold}Total Passed:${colors.reset}     ${colors.green}${grandPassed}${colors.reset}`);
  console.log(`  ${colors.bold}Total Failed:${colors.reset}     ${grandFailed > 0 ? colors.red + grandFailed : colors.gray + 0}${colors.reset}`);
  console.log(`  ${colors.bold}Total Duration:${colors.reset}   ${totalTime}ms\n`);

  if (grandFailed > 0) {
    console.log(`  ${colors.bgRed}${colors.white}${colors.bold} TEST SUITE FAILED ${colors.reset}  (${grandFailed} failing tests)\n`);
    process.exit(1);
  } else {
    console.log(`  ${colors.bgGreen}${colors.white}${colors.bold} TEST SUITE PASSED ${colors.reset}  All Tiers 1-4 successfully validated!\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
