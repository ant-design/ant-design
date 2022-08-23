import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import format, { plugins } from 'pretty-format';
import { defaultConfig } from '../components/theme/index';

// Not use dynamic hashed for test env since version will change hash dynamically.
defaultConfig.hashed = false;

if (process.env.LIB_DIR === 'dist') {
  jest.mock('../dist/antd', () => {
    const antd = jest.requireActual('../dist/antd');
    antd.theme.defaultConfig.hashed = false;

    return antd;
  });
} else if (process.env.LIB_DIR === 'es') {
  jest.mock('../es/theme', () => {
    const esTheme = jest.requireActual('../es/theme');
    if (esTheme.defaultConfig) {
      esTheme.defaultConfig.hashed = false;
    }

    return esTheme;
  });
}

/**
 * React 17 & 18 will have different behavior in some special cases:
 *
 * React 17:
 *
 * ```html
 * <span> Hello World </span>
 * ```
 *
 * React 18:
 *
 * ```html
 * <span> Hello World </span>
 * ```
 *
 * These diff is nothing important in front end but will break in snapshot diff.
 */
expect.addSnapshotSerializer({
  test: element =>
    typeof HTMLElement !== 'undefined' &&
    (element instanceof HTMLElement ||
      element instanceof DocumentFragment ||
      element instanceof HTMLCollection ||
      (Array.isArray(element) && element[0] instanceof HTMLElement)),
  print: element => {
    const htmlContent = format(element, {
      plugins: [plugins.DOMCollection, plugins.DOMElement],
    });

    const filtered = htmlContent
      .split(/[\n\r]+/)
      .filter(line => line.trim())
      .join('\n');

    return filtered;
  },
});

expect.extend(toHaveNoViolations);
