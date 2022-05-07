import MockDate from 'mockdate';
import type { ReactElement } from 'react';
import { StrictMode } from 'react';
import { act } from 'react-dom/test-utils';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

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

export { customRender as render };

export * from '@testing-library/react';
