import React from 'react';
import Switch from '..';
import { sleep, render, fireEvent } from '../../../tests/utils';

describe('click wave effect', () => {
  async function click(container: HTMLElement) {
    fireEvent.click(container.querySelector('.ant-switch')!);
    container.querySelector('.ant-switch')!.dispatchEvent(new Event('transitionstart'));
    await sleep(20);
    container.querySelector('.ant-switch')!.dispatchEvent(new Event('animationend'));
    await sleep(20);
  }

  it('should have click wave effect', async () => {
    const { container } = render(<Switch />);
    await click(container);
    await click(container);

    expect(
      container.querySelector('.ant-switch')!.getAttribute('ant-switch-click-animating'),
    ).toBeFalsy();

    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fadeEffect' });
    container.querySelector('.ant-switch')!.dispatchEvent(event);
  });
});
