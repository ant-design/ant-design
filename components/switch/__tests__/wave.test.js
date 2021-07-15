import React from 'react';
import { mount } from 'enzyme';
import Switch from '..';
import Wave from '../../_util/wave';
import { sleep } from '../../../tests/utils';

describe('click wave effect', () => {
  async function click(wrapper) {
    wrapper.find('.ant-switch').getDOMNode().click();
    wrapper.find('.ant-switch').getDOMNode().dispatchEvent(new Event('transitionstart'));
    await sleep(20);
    wrapper.find('.ant-switch').getDOMNode().dispatchEvent(new Event('animationend'));
    await sleep(20);
  }

  it('should have click wave effect', async () => {
    const wrapper = mount(<Switch />);
    await click(wrapper);
    const waveInstance = wrapper.find(Wave).instance();
    const resetEffect = jest.spyOn(waveInstance, 'resetEffect');
    await click(wrapper);
    expect(resetEffect).toHaveBeenCalledTimes(1);
    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fadeEffect' });
    wrapper.find('.ant-switch').getDOMNode().dispatchEvent(event);
    resetEffect.mockRestore();
  });
});
