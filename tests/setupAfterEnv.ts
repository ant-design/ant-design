import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import format, { plugins } from 'pretty-format';

function formatHTML(nodes: any) {
  const htmlContent = format(nodes, {
    plugins: [plugins.DOMCollection, plugins.DOMElement],
  });

  const filtered = htmlContent
    .split(/[\n\r]+/)
    .filter(line => line.trim())
    .map(line => line.replace(/\s+$/, ''))
    .join('\n');

  return filtered;
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
  print: element => formatHTML(element),
});

expect.extend(toHaveNoViolations);
