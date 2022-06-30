import React, { useState } from 'react';
import Sider from '../Sider';
import { render, fireEvent } from '../../../tests/utils';

const Content = () => {
  const [breakpoint, setBreakpoint] = useState('sm');
  const toggleBreakpoint = () => {
    if (breakpoint === 'sm') {
      setBreakpoint('lg');
    } else {
      setBreakpoint('sm');
    }
  };
  return (
    <Sider breakpoint={breakpoint as any}>
      <button type="button" id="toggle" onClick={toggleBreakpoint}>
        Toggle
      </button>
    </Sider>
  );
};

it('Dynamic breakpoint in Sider component', () => {
  const add = jest.fn();
  const remove = jest.fn();
  jest.spyOn(window, 'matchMedia').mockReturnValue({
    matches: true,
    addEventListener: add,
    removeEventListener: remove,
  } as any);

  const { container } = render(<Content />);
  const newMatch = window.matchMedia as jest.Mock;

  // subscribe at first
  expect(newMatch.mock.calls.length).toBe(1);
  expect(add.mock.calls.length).toBe(1);
  expect(remove.mock.calls.length).toBe(0);

  fireEvent.click(container.querySelector('#toggle') as Element);

  expect(newMatch.mock.calls.length).toBe(2);
  expect(add.mock.calls.length).toBe(2);
  expect(remove.mock.calls.length).toBe(1);

  jest.restoreAllMocks();
});
