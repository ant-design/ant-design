import MockDate from 'mockdate';
import type { ReactElement } from 'react';
import React, { StrictMode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render, act } from '@testing-library/react';
import { _rs as onLibResize } from 'rc-resize-observer/lib/utils/observerUtil';
import { _rs as onEsResize } from 'rc-resize-observer/es/utils/observerUtil';

export function setMockDate(dateString = '2017-09-18T03:30:07.795') {
  MockDate.set(dateString);
}

export function resetMockDate() {
  MockDate.reset();
}

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => {
      globalTimeout(resolve, timeout);
    });
  });
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: StrictMode, ...options });

export * from '@testing-library/react';

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
