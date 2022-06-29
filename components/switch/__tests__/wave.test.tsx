import React from 'react';
import Switch from '..';
import { sleep, render, fireEvent } from '../../../tests/utils';

describe('click wave effect', () => {
  async function click(wrapper: HTMLElement) {
    fireEvent.click(wrapper.querySelector('.ant-switch')!);
    wrapper.querySelector('.ant-switch')!.dispatchEvent(new Event('transitionstart'));
    await sleep(20);
    wrapper.querySelector('.ant-switch')!.dispatchEvent(new Event('animationend'));
    await sleep(20);
  }

  it('should have click wave effect', async () => {
    const instance = React.createRef<typeof Switch>();
    const { container } = render(<Switch ref={instance} />);
    await click(container);
    const waveInstance = document.querySelector('InternalWave');
    const resetEffect = jest.spyOn(waveInstance, 'resetEffect');
    await click(container);
    expect(resetEffect).toHaveBeenCalledTimes(1);
    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fadeEffect' });
    container.querySelector('.ant-switch')!.dispatchEvent(event);
    resetEffect.mockRestore();
  });
});
