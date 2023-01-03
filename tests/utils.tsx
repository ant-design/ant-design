import MockDate from 'mockdate';
import type { ReactElement } from 'react';
import React, { StrictMode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render, act } from '@testing-library/react';
import { _rs as onLibResize } from 'rc-resize-observer/lib/utils/observerUtil';
import { _rs as onEsResize } from 'rc-resize-observer/es/utils/observerUtil';

export function assertsExist<T>(item: T | null | undefined): asserts item is T {
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
  const result = React.createRef<T>();

  const Demo = () => {
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

export { customRender as render, pureRender };

export const triggerResize = (target: Element) => {
  const originGetBoundingClientRect = target.getBoundingClientRect;

  target.getBoundingClientRect = () => ({ width: 510, height: 903 } as DOMRect);

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

/**
 * Grants access to the raw `process` variable that has not been tampered
 * with by Jest. This is needed in order to work with native events without
 * Jest intercepting them.
 *
 * Use in a `describe` block to setup `beforeEach` and `afterEach` lifecycle
 * hooks like so:
 *
 * @example
 * describe('', () => {
 *   const rawProcess = withRawProcessLifecycle()
 *   it('', () => {
 *     rawProcess.once('unhandledRejection', ...)
 *   })
 * })
 *
 * @see This repository's Jest config at /.jest.js.
 * @see https://github.com/facebook/jest/issues/5620
 * @see https://johann.pardanaud.com/blog/how-to-assert-unhandled-rejection-and-uncaught-exception-with-jest/
 */
export const withRawProcessLifecycle = (): NodeJS.Process => {
  // Access the raw process that has not been tampered with by Jest.
  // This is setup in .jest.js.
  const rawProcess = (process as any)._rawProcess() as NodeJS.Process;

  // Store the original listeners in an object containing an array for each
  // event we need to alter
  const originalJestListeners: Record<
    NodeJS.UncaughtExceptionOrigin,
    Array<NodeJS.UnhandledRejectionListener>
  > = {
    uncaughtException: [],
    unhandledRejection: [],
  };

  // For each event, we retrieve the registered listeners, store them
  // in our global object and remove them from the event emitter.
  beforeEach(() => {
    Object.keys(originalJestListeners).forEach((event: NodeJS.UncaughtExceptionOrigin) => {
      rawProcess.listeners(event as any).forEach((listener) => {
        originalJestListeners[event].push(listener);
        rawProcess.off(event, listener);
      });
    });
  });

  // For each event, we retrieve the listeners stored in the global
  // object and we register them on the event emitter.
  afterEach(() => {
    let listener;
    Object.keys(originalJestListeners).forEach((event: NodeJS.UncaughtExceptionOrigin) => {
      while ((listener = originalJestListeners[event].pop()) !== undefined) {
        rawProcess.on(event, listener);
      }
    });
  });

  return rawProcess;
};

export * from '@testing-library/react';
