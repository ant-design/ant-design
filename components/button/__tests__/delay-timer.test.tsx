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
  const otherTimer: any = 9528;
  jest.spyOn(window, 'setTimeout').mockReturnValue(otherTimer);
  jest.restoreAllMocks();

  const wrapper = render(<Content />);

  const btnTimer: any = 9527;
  jest.spyOn(window, 'setTimeout').mockReturnValue(btnTimer);
  jest.spyOn(window, 'clearTimeout');
  const setTimeoutMock = window.setTimeout as any as jest.Mock;
  const clearTimeoutMock = window.clearTimeout as any as jest.Mock;

  // other component may call setTimeout or clearTimeout
  const setTimeoutCount = () => {
    const items = setTimeoutMock.mock.calls.filter(item => item[1] === specialDelay);
    return items.length;
  };
  const clearTimeoutCount = () => {
    const items = clearTimeoutMock.mock.calls.filter(item => item[0] === btnTimer);
    return items.length;
  };

  // switch loading state to true
  fireEvent.click(wrapper.container.querySelectorAll('#toggle_loading')[0]);
  expect(setTimeoutCount()).toBe(1);
  expect(clearTimeoutCount()).toBe(0);

  // trigger timer handler
  act(() => {
    setTimeoutMock.mock.calls[0][0]();
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
