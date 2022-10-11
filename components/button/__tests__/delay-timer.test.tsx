/// <reference lib="dom" />
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../button';

const specialDelay = 9529;
const Content = () => {
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => {
    setLoading(!loading);
  };

  const [visible, setVisible] = useState(true);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button type="button" id="toggle_loading" onClick={toggleLoading}>
        Toggle Loading
      </button>
      <button type="button" id="toggle_visible" onClick={toggleVisible}>
        Toggle Visible
      </button>
      {visible && <Button type="text" loading={loading ? { delay: specialDelay } : false} />}
    </div>
  );
};

it('Delay loading timer in Button component', () => {
  const otherTimer = 9528;
  const setTimeout = jest
    .spyOn<Window, 'setTimeout'>(window, 'setTimeout')
    .mockReturnValue(otherTimer);
  const clearTimeout = jest.spyOn<Window, 'clearTimeout'>(window, 'clearTimeout');
  jest.restoreAllMocks();

  const wrapper = render(<Content />);

  const btnTimer = 9527;
  setTimeout.mockReturnValue(btnTimer);
  jest.spyOn(global, 'clearTimeout');

  // other component may call setTimeout or clearTimeout
  const setTimeoutCount = () => {
    const items = setTimeout.mock.calls.filter(item => item[1] === specialDelay);
    return items.length;
  };
  const clearTimeoutCount = () => {
    const items = clearTimeout.mock.calls.filter(item => item[0] === btnTimer);
    return items.length;
  };

  // switch loading state to true
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_loading')[0]);
  expect(setTimeoutCount()).toBe(1);
  expect(clearTimeoutCount()).toBe(0);

  // trigger timer handler
  act(() => {
    const timeHandler = setTimeout.mock.calls[0][0];
    if (typeof timeHandler === 'function') {
      timeHandler();
    }
  });
  expect(setTimeoutCount()).toBe(1);
  expect(clearTimeoutCount()).toBe(0);

  // switch loading state to false
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_loading')[0]);
  expect(setTimeoutCount()).toBe(1);
  expect(clearTimeoutCount()).toBe(0);

  // switch loading state to true
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_loading')[0]);
  expect(setTimeoutCount()).toBe(2);
  expect(clearTimeoutCount()).toBe(0);

  // switch loading state to false
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_loading')[0]);
  expect(setTimeoutCount()).toBe(2);
  expect(clearTimeoutCount()).toBe(1);

  // switch loading state to true
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_loading')[0]);
  // remove Button component
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_visible')[0]);
  expect(setTimeoutCount()).toBe(3);
  expect(clearTimeoutCount()).toBe(2);

  jest.restoreAllMocks();
});
