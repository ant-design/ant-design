import React, { useState } from 'react';

import { act, fireEvent, render } from '../../../tests/utils';
import Button from '../Button';

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
  jest.useFakeTimers();

  const wrapper = render(<Content />);
  const toggleLoading = wrapper.container.querySelector('#toggle_loading')!;
  const toggleVisible = wrapper.container.querySelector('#toggle_visible')!;
  const button = () => wrapper.container.querySelector('.ant-btn');

  fireEvent.click(toggleLoading);
  expect(button()).not.toHaveClass('ant-btn-loading');
  act(() => {
    jest.advanceTimersByTime(specialDelay);
  });
  expect(button()).toHaveClass('ant-btn-loading');

  fireEvent.click(toggleLoading);
  expect(button()).not.toHaveClass('ant-btn-loading');

  fireEvent.click(toggleLoading);
  fireEvent.click(toggleLoading);
  act(() => {
    jest.advanceTimersByTime(specialDelay);
  });
  expect(button()).not.toHaveClass('ant-btn-loading');

  fireEvent.click(toggleLoading);
  fireEvent.click(toggleVisible);
  act(() => {
    jest.advanceTimersByTime(specialDelay);
  });
  expect(button()).not.toBeInTheDocument();

  jest.useRealTimers();
});
it('Delay loading while use loading delay at first time', () => {
  const Demo = () => <Button loading={{ delay: specialDelay }} />;
  const wrapper = render(<Demo />);
  expect(wrapper.container.firstChild).not.toHaveClass('ant-btn-loading');
});
