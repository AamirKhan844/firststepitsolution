/**
 * ANSI Formatted Test Reporter
 */

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m'
};

export class TestReporter {
  constructor(suiteName) {
    this.suiteName = suiteName;
    this.results = [];
    this.startTime = Date.now();
  }

  record(testId, description, passed, error = null) {
    this.results.push({
      testId,
      description,
      passed,
      error,
      duration: 0
    });

    const status = passed
      ? `${colors.green}✔ PASS${colors.reset}`
      : `${colors.red}✖ FAIL${colors.reset}`;
    console.log(`  ${status} [${colors.cyan}${testId}${colors.reset}] ${description}`);

    if (!passed && error) {
      console.log(`         ${colors.red}Error: ${error.message || error}${colors.reset}`);
      if (error.stack && process.env.VERBOSE) {
        console.log(`         ${colors.dim}${error.stack.split('\n').slice(1, 4).join('\n         ')}${colors.reset}`);
      }
    }
  }

  printHeader() {
    console.log(`\n${colors.bold}${colors.cyan}=== ${this.suiteName} ===${colors.reset}`);
  }

  getSummary() {
    const total = this.results.length;
    const passed = this.results.filter((r) => r.passed).length;
    const failed = total - passed;
    const duration = Date.now() - this.startTime;

    return {
      suiteName: this.suiteName,
      total,
      passed,
      failed,
      duration
    };
  }

  printSummary() {
    const summary = this.getSummary();
    const color = summary.failed === 0 ? colors.green : colors.red;

    console.log(`\n  ${colors.bold}Summary:${colors.reset} ${color}${summary.passed}/${summary.total} passed${colors.reset} (${summary.duration}ms)`);
    if (summary.failed > 0) {
      console.log(`  ${colors.bgRed}${colors.white}${colors.bold} FAILED ${colors.reset} ${summary.failed} test(s) failed in ${this.suiteName}\n`);
    } else {
      console.log(`  ${colors.bgGreen}${colors.white}${colors.bold} ALL PASSED ${colors.reset} ${this.suiteName} fully compliant\n`);
    }
  }
}
