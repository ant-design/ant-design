import React, { useState } from 'react';

import ConfigProvider from '../../config-provider';
import type { Breakpoint } from '../..';
import { fireEvent, render } from '../../../tests/utils';
import Sider from '../Sider';

const Content = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');
  const toggleBreakpoint = () => {
    if (breakpoint === 'sm') {
      setBreakpoint('lg');
    } else {
      setBreakpoint('sm');
    }
  };
  return (
    <Sider breakpoint={breakpoint}>
      <button type="button" id="toggle" onClick={toggleBreakpoint}>
        Toggle
      </button>
    </Sider>
  );
};

it('Dynamic breakpoint in Sider component', () => {
  const add = jest.fn();
  const remove = jest.fn();
  const newMatch = jest.spyOn(window, 'matchMedia').mockReturnValue({
    matches: true,
    addEventListener: add,
    removeEventListener: remove,
  } as any);

  const { container } = render(<Content />);

  // Record here since React 18 strict mode will render twice at first mount
  const originCallTimes = newMatch.mock.calls.length;
  expect(originCallTimes <= 2).toBeTruthy();

  // subscribe at first
  expect(add.mock.calls).toHaveLength(originCallTimes);
  expect(remove.mock.calls).toHaveLength(originCallTimes - 1);

  fireEvent.click(container.querySelector('#toggle') as Element);

  expect(newMatch.mock.calls).toHaveLength(originCallTimes + 1);
  expect(add.mock.calls).toHaveLength(originCallTimes + 1);
  expect(remove.mock.calls).toHaveLength(originCallTimes);

  jest.restoreAllMocks();
});

it('Sider breakpoint follows the ConfigProvider breakpoint token and stays in sync on change', () => {
  const newMatch = jest.spyOn(window, 'matchMedia').mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  } as any);
  // Only assertions made after this point are relevant: previous tests in the file
  // share the same spied `window.matchMedia`, so discard their recorded calls.
  newMatch.mockClear();

  const { rerender } = render(
    <ConfigProvider theme={{ token: { screenLG: 1100 } }}>
      <Sider breakpoint="lg" collapsedWidth={0} />
    </ConfigProvider>,
  );

  // The media query must be bound to the customized `screenLG` (1100px), not the
  // default 992px, proving the Sider `breakpoint` now responds to ConfigProvider tokens.
  const mountQueries = newMatch.mock.calls.map((call) => String(call[0]));
  expect(mountQueries.length).toBeGreaterThan(0);
  expect(mountQueries.every((q) => q.includes('max-width: 1099.98px'))).toBeTruthy();
  expect(mountQueries.every((q) => !q.includes('992'))).toBeTruthy();

  // Bump `screenLG` (kept below `screenXL` so the breakpoint order stays valid) and
  // confirm the listener re-subscribes with the new token, not just the mount value.
  const mountCalls = newMatch.mock.calls.length;
  rerender(
    <ConfigProvider theme={{ token: { screenLG: 1150 } }}>
      <Sider breakpoint="lg" collapsedWidth={0} />
    </ConfigProvider>,
  );

  const changeQueries = newMatch.mock.calls.map((call) => String(call[0]));
  expect(newMatch.mock.calls.length).toBeGreaterThan(mountCalls);
  expect(changeQueries.some((q) => q.includes('max-width: 1149.98px'))).toBeTruthy();

  jest.restoreAllMocks();
});
