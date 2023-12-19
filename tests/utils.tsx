import util from 'util';
import type { ReactElement } from 'react';
import React, { createRef, StrictMode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { act, render } from '@testing-library/react';
import type { DOMWindow } from 'jsdom';
import MockDate from 'mockdate';
import { _rs as onEsResize } from 'rc-resize-observer/es/utils/observerUtil';
import { _rs as onLibResize } from 'rc-resize-observer/lib/utils/observerUtil';

export function assertsExist<T>(item?: T): asserts item is T {
  expect(item).not.toBeUndefined();
  expect(item).not.toBeNull();
}

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  MockDate.set(dateString);
}

export function resetMockDate() {
  MockDate.reset();
}

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise((resolve) => {
      globalTimeout(resolve, timeout);
    });
  });
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode, ...options });

export function renderHook<T>(func: () => T): { result: React.RefObject<T> } {
  const result = createRef<T>();

  const Demo: React.FC = () => {
    (result as any).current = func();

    return null;
  };

  customRender(<Demo />);

  return { result };
}

/**
 * Pure render like `@testing-lib` render which will not wrap with StrictMode.
 *
 * Please only use with render times times of memo usage case.
 */
const pureRender = render;

export { pureRender, customRender as render };

export const triggerResize = (target: Element) => {
  const originGetBoundingClientRect = target.getBoundingClientRect;

  target.getBoundingClientRect = () => ({ width: 510, height: 903 }) as DOMRect;

  act(() => {
    onLibResize([{ target } as ResizeObserverEntry]);
    onEsResize([{ target } as ResizeObserverEntry]);
  });

  target.getBoundingClientRect = originGetBoundingClientRect;
};

/**
 * Wait for a time delay. Will wait `advanceTime * times` ms.
 *
 * @param advanceTime Default 1000
 * @param times Default 20
 */
export async function waitFakeTimer(advanceTime = 1000, times = 20) {
  for (let i = 0; i < times; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await Promise.resolve();

      if (advanceTime > 0) {
        jest.advanceTimersByTime(advanceTime);
      } else {
        jest.runAllTimers();
      }
    });
  }
}

export * from '@testing-library/react';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function fillWindowEnv(window: Window | DOMWindow) {
  const win = window as Writeable<Window> & typeof globalThis;

  win.resizeTo = (width, height) => {
    win.innerWidth = width || win.innerWidth;
    win.innerHeight = height || win.innerHeight;
    win.dispatchEvent(new Event('resize'));
  };
  win.scrollTo = () => {};
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!win.matchMedia) {
    Object.defineProperty(win, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }

  // Fix css-animation or rc-motion deps on these
  // https://github.com/react-component/motion/blob/9c04ef1a210a4f3246c9becba6e33ea945e00669/src/util/motion.ts#L27-L35
  // https://github.com/yiminghe/css-animation/blob/a5986d73fd7dfce75665337f39b91483d63a4c8c/src/Event.js#L44
  win.AnimationEvent = win.AnimationEvent || win.Event;
  win.TransitionEvent = win.TransitionEvent || win.Event;

  // ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  // ref: https://github.com/jsdom/jsdom/issues/2524
  Object.defineProperty(win, 'TextEncoder', { writable: true, value: util.TextEncoder });
  Object.defineProperty(win, 'TextDecoder', { writable: true, value: util.TextDecoder });
}
