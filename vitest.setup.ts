import { ReadableStream } from 'node:stream/web';
import util from 'node:util';
import { MessagePort } from 'node:worker_threads';

import '@testing-library/jest-dom/vitest';

import React from 'react';
import { configure as configureTestingLibrary } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import type { DOMWindow } from 'jsdom';
import format, { plugins } from 'pretty-format';
import { expect, vi } from 'vitest';

// 关闭动态 hash，避免版本变化影响 snapshot
import { defaultConfig } from './components/theme/internal';

defaultConfig.hashed = false;

configureTestingLibrary({
  asyncWrapper: async (callback) => {
    const global = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previousActEnvironment = global.IS_REACT_ACT_ENVIRONMENT;
    global.IS_REACT_ACT_ENVIRONMENT = false;

    try {
      const result = await callback();

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);

        if (vi.isFakeTimers()) {
          vi.advanceTimersByTime(0);
        }
      });

      return result;
    } finally {
      global.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
    }
  },
});

/* -------------------------------------------------------------------------- */
/* 环境注入（来自 tests/setup.ts，原样复用）                                   */
/* -------------------------------------------------------------------------- */

if (typeof globalThis.ReadableStream === 'undefined') {
  Object.defineProperty(globalThis, 'ReadableStream', {
    value: ReadableStream,
    writable: true,
    configurable: true,
  });
}

if (typeof globalThis.MessagePort === 'undefined') {
  Object.defineProperty(globalThis, 'MessagePort', {
    value: MessagePort,
    writable: true,
    configurable: true,
  });
}

console.log('Current React Version:', React.version);

const originConsoleErr = console.error;
const ignoreWarns = [
  'validateDOMNesting',
  'on an unmounted component',
  'not wrapped in act',
  'You called act',
];
console.error = (...args: any[]) => {
  const str = args.join('').replace(/\n/g, '');
  if (ignoreWarns.every((warn) => !str.includes(warn))) {
    originConsoleErr(...args);
  }
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

function getMatchedStyleValue(win: Window, elt: Element, prop: string) {
  const styleSheets = Array.from(win.document.styleSheets).reverse();

  for (const sheet of styleSheets) {
    let rules: CSSRuleList;

    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }

    const styleRules = Array.from(rules).reverse();

    for (const rule of styleRules) {
      if (!('selectorText' in rule) || !('style' in rule)) {
        continue;
      }

      const selectorText = rule.selectorText as string;
      const selectors = selectorText.split(',');

      if (
        selectors.some((selector) => {
          try {
            return elt.matches(selector.trim());
          } catch {
            return false;
          }
        })
      ) {
        const value = (rule.style as CSSStyleDeclaration).getPropertyValue(prop);
        if (value) {
          return value;
        }
      }
    }
  }

  return '';
}

export function fillWindowEnv(window: Window | DOMWindow) {
  const win = window as Writeable<Window> & typeof globalThis;
  win.resizeTo = (width, height) => {
    win.innerWidth = width || win.innerWidth;
    win.innerHeight = height || win.innerHeight;
    win.dispatchEvent(new Event('resize'));
  };
  win.scrollTo = () => {};
  if (!win.matchMedia) {
    Object.defineProperty(win, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: query.includes('max-width'),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  }
  win.AnimationEvent = win.AnimationEvent || (win.Event as any);
  win.TransitionEvent = win.TransitionEvent || (win.Event as any);
  Object.defineProperty(win, 'TextEncoder', { writable: true, value: util.TextEncoder });
  Object.defineProperty(win, 'TextDecoder', { writable: true, value: util.TextDecoder });

  const originalGetComputedStyle = win.getComputedStyle;
  win.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
    if (pseudoElt) {
      return {
        getPropertyValue: (prop: string) => {
          const defaults: Record<string, string> = {
            width: '0px',
            height: '0px',
            padding: '0px',
            margin: '0px',
            border: '0px',
            'background-color': 'transparent',
            color: 'rgb(0, 0, 0)',
            'font-size': '16px',
            'line-height': 'normal',
            display: 'block',
            position: 'static',
            overflow: 'visible',
            'overflow-x': 'visible',
            'overflow-y': 'visible',
          };
          return defaults[prop] || '';
        },
      } as CSSStyleDeclaration;
    }
    const style = originalGetComputedStyle.call(win, elt, pseudoElt);
    const inlineStyle = (elt as HTMLElement).style;
    const overrides: Partial<Record<keyof CSSStyleDeclaration, string>> = {};

    if (inlineStyle.gap) {
      overrides.gap = inlineStyle.gap;
    }
    if (
      elt.classList.contains('ant-collapse-body') &&
      (style.padding === '0px' || style.padding === '0')
    ) {
      const matchedPadding = getMatchedStyleValue(win, elt, 'padding');
      if (matchedPadding.startsWith('var(')) {
        overrides.padding = matchedPadding;
      }
    }
    if (!inlineStyle.border && style.border.includes('none')) {
      overrides.border = '';
    }

    if (!inlineStyle.borderTopColor && style.borderTopColor === 'rgb(0, 0, 0)') {
      overrides.borderTopColor = 'canvastext';
    }
    if (!inlineStyle.borderColor && style.borderColor === 'rgb(0, 0, 0)') {
      overrides.borderColor = 'canvastext';
    } else if (
      inlineStyle.borderTopColor === 'transparent' &&
      inlineStyle.borderRightColor &&
      inlineStyle.borderRightColor !== 'transparent'
    ) {
      overrides.borderColor = inlineStyle.borderRightColor;
    }

    if (!Object.keys(overrides).length) {
      return style;
    }

    Object.entries(overrides).forEach(([key, value]) => {
      Object.defineProperty(style, key, {
        configurable: true,
        value,
      });
    });
    const originalGetPropertyValue = style.getPropertyValue.bind(style);
    Object.defineProperty(style, 'getPropertyValue', {
      configurable: true,
      value: (prop: string) => {
        if (prop === 'border-top-color' && overrides.borderTopColor) {
          return overrides.borderTopColor;
        }
        if (prop === 'border-color' && overrides.borderColor) {
          return overrides.borderColor;
        }
        if (prop === 'border' && overrides.border !== undefined) {
          return overrides.border;
        }
        if (prop === 'gap' && overrides.gap) {
          return overrides.gap;
        }
        if (prop === 'padding' && overrides.padding) {
          return overrides.padding;
        }
        return originalGetPropertyValue(prop);
      },
    });

    return style;
  };

  Object.defineProperty(globalThis, 'getComputedStyle', {
    configurable: true,
    writable: true,
    value: win.getComputedStyle,
  });
}

if (typeof window !== 'undefined') {
  fillWindowEnv(window);
}

global.requestAnimationFrame = global.requestAnimationFrame || (global.setTimeout as any);
global.cancelAnimationFrame = global.cancelAnimationFrame || (global.clearTimeout as any);

if (typeof MessageChannel === 'undefined') {
  (global as any).MessageChannel = class {
    port1: any;
    port2: any;
    constructor() {
      // 用闭包引用 port，避免 postMessage 作为回调被解构/unbound 调用时 this 丢失。
      const createPort = (): any => {
        const port: any = {
          onmessage: null,
          postMessage: (message: any) => {
            setTimeout(() => {
              port._target?.onmessage?.({ data: message });
            }, 0);
          },
          _target: null,
        };
        return port;
      };
      const port1 = createPort();
      const port2 = createPort();
      port1._target = port2;
      port2._target = port1;
      this.port1 = port1;
      this.port2 = port2;
    }
  };
}

// Mock useId 返回稳定 id（snapshot 稳定）
vi.mock('react', async () => {
  const originReact = await vi.importActual<typeof import('react')>('react');
  if (process.env.MOCK_USE_ID !== 'false') {
    return { ...originReact, useId: () => 'test-id' };
  }
  return { ...originReact };
});

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

class MockCanvasRenderingContext2D {
  private _font = 'normal normal normal 16px sans-serif';

  get font() {
    return this._font;
  }

  set font(value: string) {
    this._font = value;
  }

  fillStyle: string | CanvasGradient | CanvasPattern = '#000';

  globalAlpha = 1;

  textAlign: CanvasTextAlign = 'start';

  textBaseline: CanvasTextBaseline = 'alphabetic';

  save() {}

  restore() {}

  translate() {}

  rotate() {}

  scale() {}

  clearRect() {}

  fillRect() {}

  fill() {}

  fillText() {}

  drawImage() {}

  measureText(text: string) {
    const width = String(text).length * 8;
    return {
      width,
      fontBoundingBoxAscent: 12,
      fontBoundingBoxDescent: 4,
      actualBoundingBoxAscent: 12,
      actualBoundingBoxDescent: 4,
      actualBoundingBoxLeft: 0,
      actualBoundingBoxRight: width,
    } as TextMetrics;
  }
}

if (typeof globalThis.CanvasRenderingContext2D === 'undefined') {
  Object.defineProperty(globalThis, 'CanvasRenderingContext2D', {
    configurable: true,
    writable: true,
    value: MockCanvasRenderingContext2D,
  });
}

// jsdom 未实现 canvas getContext，补 2D mock 以覆盖 Watermark/QRCode 等组件测试。
if (typeof HTMLCanvasElement !== 'undefined') {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    writable: true,
    value: vi.fn((contextId: string) =>
      contextId === '2d' ? new globalThis.CanvasRenderingContext2D() : null,
    ),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    configurable: true,
    writable: true,
    value: vi.fn(() => 'data:image/png;base64,mock'),
  });
}

if (global.HTMLElement) {
  global.HTMLElement.prototype.scrollIntoView = () => {};
}

/* -------------------------------------------------------------------------- */
/* setupAfterEnv：snapshot serializer（来自 setupAfterEnv.ts）                  */
/* jest-dom / axe / defaultConfig 已在文件顶部 import。                         */
/* -------------------------------------------------------------------------- */

type SnapshotTarget = HTMLElement | DocumentFragment | HTMLCollection | NodeList | Node[];

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

function formatHTML(nodes: SnapshotTarget) {
  let cloneNodes: Node | Node[];
  if (Array.isArray(nodes) || nodes instanceof HTMLCollection || nodes instanceof NodeList) {
    cloneNodes = Array.from(nodes).map((node) => cleanup(node.cloneNode(true) as HTMLElement));
  } else {
    cloneNodes = cleanup(nodes.cloneNode(true) as HTMLElement);
  }
  const htmlContent = format(cloneNodes, {
    plugins: [plugins.DOMCollection, plugins.DOMElement],
  });
  return htmlContent
    .split('\n')
    .filter((line) => line.trim())
    .join('\n');
}

expect.addSnapshotSerializer({
  test: (element) =>
    typeof HTMLElement !== 'undefined' &&
    (element instanceof HTMLElement ||
      element instanceof DocumentFragment ||
      element instanceof HTMLCollection ||
      (Array.isArray(element) && element[0] instanceof HTMLElement)),
  print: (element) => formatHTML(element as SnapshotTarget),
});

expect.addSnapshotSerializer({
  test: (node: any) => node && typeof node === 'object' && node.type === 'demo' && node.html,
  print: (node: any) => {
    const container = document.createElement('div');
    container.innerHTML = node.html;
    const children = Array.from(container.childNodes).filter((n) => n.nodeName !== 'LINK');
    children.forEach((ele: any) => {
      if (typeof ele.removeAttribute === 'function') {
        ele.removeAttribute('data-reactroot');
      }
    });
    return formatHTML((children.length > 1 ? children : children[0]) as SnapshotTarget);
  },
});

expect.extend(toHaveNoViolations as any);
