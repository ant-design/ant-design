/* eslint-disable no-console */
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import React from 'react';
import util from 'util';
import { expect, vi } from 'vitest';

import { toHaveNoViolations } from 'jest-axe';
import jsdom from 'jsdom';
import format, { plugins } from 'pretty-format';
import { defaultConfig } from '../components/theme/internal';

console.log('Current React Version:', React.version);

declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {
    toHaveNoViolations(): void;
  }
}

expect.extend(matchers);

const originConsoleErr = console.error;

// Hack off React warning to avoid too large log in CI.
console.error = (...args) => {
  const str = args.join('').replace(/\n/g, '');

  if (
    ['validateDOMNesting', 'on an unmounted component', 'not wrapped in act'].every(
      (warn) => !str.includes(warn),
    )
  ) {
    originConsoleErr(...args);
  }
};

if (typeof window !== 'undefined') {
  globalThis.window.resizeTo = (width, height) => {
    globalThis.window.innerWidth = width || globalThis.window.innerWidth;
    globalThis.window.innerHeight = height || globalThis.window.innerHeight;
    globalThis.window.dispatchEvent(new Event('resize'));
  };
  globalThis.window.scrollTo = () => {};
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(globalThis.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
  }

  // Fix css-animation or rc-motion deps on these
  // https://github.com/react-component/motion/blob/9c04ef1a210a4f3246c9becba6e33ea945e00669/src/util/motion.ts#L27-L35
  // https://github.com/yiminghe/css-animation/blob/a5986d73fd7dfce75665337f39b91483d63a4c8c/src/Event.js#L44
  window.AnimationEvent = window.AnimationEvent || window.Event;
  window.TransitionEvent = window.TransitionEvent || window.Event;

  // https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  // ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  // ref: https://github.com/jsdom/jsdom/issues/2524
  if (!window.TextDecoder) {
    Object.defineProperty(window, 'TextEncoder', { writable: true, value: util.TextEncoder });
    Object.defineProperty(window, 'TextDecoder', { writable: true, value: util.TextDecoder });
  }
}

vi.mock('@rc-component/trigger');
vi.mock('rc-util/es/Portal');
vi.mock('rc-virtual-list');
vi.mock('copy-to-clipboard');

// Not use dynamic hashed for test env since version will change hash dynamically.
defaultConfig.hashed = false;

if (process.env.LIB_DIR === 'dist') {
  vi.mock('../dist/antd', async (importOriginal) => {
    const antd = await importOriginal<typeof import('antd')>();
    antd.theme.defaultConfig.hashed = false;

    return antd;
  });
} else if (process.env.LIB_DIR === 'es') {
  vi.mock('../es/theme/internal', async (importOriginal) => {
    const esTheme = await importOriginal<typeof import('../components/theme/internal')>();
    if (esTheme.defaultConfig) {
      esTheme.defaultConfig.hashed = false;
    }

    return esTheme;
  });
}

function cleanup(node: HTMLElement) {
  const childList = Array.from(node.childNodes);
  node.innerHTML = '';
  childList.forEach((child) => {
    if (!(child instanceof Text)) {
      node.appendChild(cleanup(child as any));
    } else if (child.textContent) {
      node.appendChild(child);
    }
  });
  return node;
}

function formatHTML(nodes: any) {
  let cloneNodes: any;
  if (Array.isArray(nodes) || nodes instanceof HTMLCollection || nodes instanceof NodeList) {
    cloneNodes = Array.from(nodes).map((node) => cleanup(node.cloneNode(true) as any));
  } else {
    cloneNodes = cleanup(nodes.cloneNode(true));
  }

  const htmlContent = format(cloneNodes, {
    plugins: [plugins.DOMCollection, plugins.DOMElement],
  });

  const filtered = htmlContent
    .split(/[\n\r]+/)
    .filter((line) => line.trim())
    .map((line) => line.replace(/\s+$/, ''))
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
  test: (element) =>
    typeof HTMLElement !== 'undefined' &&
    (element instanceof HTMLElement ||
      element instanceof DocumentFragment ||
      element instanceof HTMLCollection ||
      (Array.isArray(element) && element[0] instanceof HTMLElement)),
  print: (element) => formatHTML(element),
});

/** Demo Test only accept render as SSR to make sure align with both `server` & `client` side */
expect.addSnapshotSerializer({
  test: (node) => node && typeof node === 'object' && node.type === 'demo' && node.html,
  print: ({ html }) => {
    const { JSDOM } = jsdom;
    const { document } = new JSDOM().window;
    document.body.innerHTML = html;

    const children = Array.from(document.body.childNodes);

    // Clean up `data-reactroot` since React 18 do not have this
    children.forEach((ele: HTMLElement) => {
      if (typeof ele.removeAttribute === 'function') {
        ele.removeAttribute('data-reactroot');
      }
    });

    return formatHTML(children.length > 1 ? children : children[0]);
  },
});

expect.extend(toHaveNoViolations);

// with jest-canvas-mock
(globalThis as any).jest = vi;
await import('jest-canvas-mock');
