import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';
import format, { plugins } from 'pretty-format';

function formatHTML(nodes: any) {
  const htmlContent = format(Array.from(nodes), {
    plugins: [plugins.DOMCollection, plugins.DOMElement],
  });

  const filtered = htmlContent
    .split(/[\n\r]+/)
    .filter(line => line.trim())
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

// Demo test which always use ssr
expect.addSnapshotSerializer({
  test: content => typeof content === 'object' && content?.ssr === true && 'html' in content,
  print: (content: any) => {
    const { html } = content;

    const dom = new JSDOM(`<body></body>`);
    dom.window.document.body.innerHTML = html;

    const nodes = Array.from(dom.window.document.body.childNodes);

    return formatHTML(nodes.length === 1 ? nodes[0] : nodes);
  },
});

expect.extend(toHaveNoViolations);
