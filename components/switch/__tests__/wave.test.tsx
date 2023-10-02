import React from 'react';
import Switch from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

describe('click wave effect', () => {
  async function click(container: HTMLElement) {
    fireEvent.click(container.querySelector('.ant-switch')!);
    container.querySelector('.ant-switch')!.dispatchEvent(new Event('transitionstart'));
    await waitFakeTimer();
    container.querySelector('.ant-switch')!.dispatchEvent(new Event('animationend'));
    await waitFakeTimer();
  }

  it('should have click wave effect', async () => {
    jest.useFakeTimers();
    const { container } = render(<Switch />);
    await click(container);
    await click(container);

    expect(
      container.querySelector('.ant-switch')!.getAttribute('ant-switch-click-animating'),
    ).toBeFalsy();

    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fadeEffect' });
    container.querySelector('.ant-switch')!.dispatchEvent(event);
    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
