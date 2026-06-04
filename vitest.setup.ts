import { createRequire } from 'node:module';
import util from 'node:util';
import { ReadableStream } from 'node:stream/web';
import { MessagePort } from 'node:worker_threads';
import '@testing-library/jest-dom/vitest';
import { expect, vi } from 'vitest';
import React from 'react';
import { toHaveNoViolations } from 'jest-axe';
import format, { plugins } from 'pretty-format';
import type { DOMWindow } from 'jsdom';

// 关闭动态 hash，避免版本变化影响 snapshot
import { defaultConfig } from './components/theme/internal';

defaultConfig.hashed = false;

// Vitest 默认以 ESM 运行，全局 require 可能不存在；用 createRequire 构造稳定 require。
const nodeRequire = createRequire(import.meta.url);

/* -------------------------------------------------------------------------- */
/* jest → vi 垫片                                                              */
/* POC：让现有测试文件中的 `jest.*` 直接映射到 `vi`，实现测试文件零改动。       */
/* 唯一无法用 vi 直接填平的是 `jest.requireActual`（同步动态路径），           */
/* 用 import.meta.glob eager 预构建模块表来支持。                              */
/* -------------------------------------------------------------------------- */

// 预构建 POC 选定组件的 demo + 组件入口模块表，供同步 requireActual 解析。
// 用 lazy glob：只在 requireActual 命中时才真正加载对应模块，避免把所有 demo
// （及其依赖如 antd-style）拉进每一个测试文件。
// import.meta.glob 是 Vite 的编译期宏，必须以字面量形式调用（不能经别名/解构），
// 故此处直接调用并用 @ts-expect-error 抑制类型报错（vite/client 类型未加入项目 tsconfig）。
// @ts-expect-error Vite 注入的 import.meta.glob
const demoModules: Record<string, () => Promise<any>> = import.meta.glob(
  './components/{button,modal,table}/demo/*.tsx',
);
// @ts-expect-error Vite 注入的 import.meta.glob
const entryModules: Record<string, () => Promise<any>> = import.meta.glob(
  './components/{button,modal,table}/index.{ts,tsx}',
);
const lazyMap: Record<string, () => Promise<any>> = { ...demoModules, ...entryModules };
// 已解析模块缓存（同步 requireActual 需要在首次异步加载后命中）。
const resolvedCache: Record<string, any> = {};

// 归一化路径用于匹配：去掉前导 ../、./ 等
function normalize(p: string): string {
  return p
    .replace(/^(\.\.\/|\.\/)+/, '')
    .replace(/\/index(\.tsx?)?$/, '')
    .replace(/\.tsx?$/, '');
}

function requireActual(request: string): any {
  // 'react' / 'react-dom' 等裸模块：交给真实模块（同步 require 兜底）
  if (!request.startsWith('.') && !request.startsWith('/')) {
    return nodeRequire(request);
  }
  const target = normalize(request);
  const hitKey = Object.keys(lazyMap).find((key) => normalize(key) === target);
  if (hitKey && hitKey in resolvedCache) {
    return resolvedCache[hitKey];
  }
  throw new Error(
    `[vitest requireActual shim] 模块未预加载: ${request}（normalized: ${target}）。` +
      `demo 测试需在 beforeAll 中预解析 lazyMap；若为 POC 范围外组件，请扩展 vitest.setup.ts 的 import.meta.glob。`,
  );
}

// demo 测试在 test 体内同步调用 requireActual。setupFiles 的顶层 await 在测试文件
// 模块求值之前执行，故在此预解析 lazyMap 填充同步缓存，demo 测试即可同步命中。
async function preloadDemoModules() {
  await Promise.all(
    Object.entries(lazyMap).map(async ([key, loader]) => {
      if (!(key in resolvedCache)) {
        try {
          resolvedCache[key] = await loader();
        } catch {
          // 加载失败的 demo 留待 requireActual 时抛出明确错误
        }
      }
    }),
  );
}
// eslint-disable-next-line antfu/no-top-level-await
await preloadDemoModules();

const jestShim: any = {
  fn: vi.fn,
  spyOn: vi.spyOn,
  mock: vi.mock,
  unmock: vi.unmock,
  doMock: vi.doMock,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
  restoreAllMocks: vi.restoreAllMocks,
  useFakeTimers: vi.useFakeTimers,
  useRealTimers: vi.useRealTimers,
  advanceTimersByTime: vi.advanceTimersByTime,
  advanceTimersByTimeAsync: vi.advanceTimersByTimeAsync,
  runAllTimers: vi.runAllTimers,
  runOnlyPendingTimers: vi.runOnlyPendingTimers,
  clearAllTimers: vi.clearAllTimers,
  setSystemTime: vi.setSystemTime,
  getRealSystemTime: vi.getRealSystemTime,
  requireActual,
  requireMock: requireActual,
  resetModules: vi.resetModules,
  isolateModules: (fn: () => void) => fn(),
};

(globalThis as any).jest = jestShim;

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
    return originalGetComputedStyle.call(win, elt, pseudoElt);
  };
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
