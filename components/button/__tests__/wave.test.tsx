import React from 'react';
import { mount } from 'enzyme';
import Button from '..';
import Wave from '../../_util/wave';
import { sleep } from '../../../tests/utils';

describe('click wave effect', () => {
  async function clickButton(wrapper: any) {
    wrapper.find('.ant-btn').getDOMNode().click();
    wrapper.find('.ant-btn').getDOMNode().dispatchEvent(new Event('transitionstart'));
    await sleep(20);
    wrapper.find('.ant-btn').getDOMNode().dispatchEvent(new Event('animationend'));
    await sleep(20);
  }

  it('should have click wave effect for primary button', async () => {
    const wrapper = mount(<Button type="primary">button</Button>);
    await clickButton(wrapper);
    expect(
      wrapper.find('.ant-btn').getDOMNode().hasAttribute('ant-click-animating-without-extra-node'),
    ).toBe(true);
  });

  it('should have click wave effect for default button', async () => {
    const wrapper = mount(<Button>button</Button>);
    await clickButton(wrapper);
    expect(
      wrapper.find('.ant-btn').getDOMNode().hasAttribute('ant-click-animating-without-extra-node'),
    ).toBe(true);
  });

  it('should not have click wave effect for link type button', async () => {
    const wrapper = mount(<Button type="link">button</Button>);
    await clickButton(wrapper);
    expect(
      wrapper.find('.ant-btn').getDOMNode().hasAttribute('ant-click-animating-without-extra-node'),
    ).toBe(false);
  });

  it('should not have click wave effect for text type button', async () => {
    const wrapper = mount(<Button type="text">button</Button>);
    await clickButton(wrapper);
    expect(
      wrapper.find('.ant-btn').getDOMNode().hasAttribute('ant-click-animating-without-extra-node'),
    ).toBe(false);
  });

  it('should handle transitionstart', async () => {
    const wrapper = mount(<Button type="primary">button</Button>);
    await clickButton(wrapper);
    const buttonNode = wrapper.find('.ant-btn').getDOMNode();
    buttonNode.dispatchEvent(new Event('transitionstart'));
    expect(
      wrapper.find('.ant-btn').getDOMNode().hasAttribute('ant-click-animating-without-extra-node'),
    ).toBe(true);
    wrapper.unmount();
    buttonNode.dispatchEvent(new Event('transitionstart'));
  });

  it('should run resetEffect in transitionstart', async () => {
    const wrapper = mount(<Button type="primary">button</Button>);
    const waveInstance = wrapper.find(Wave).instance() as any;
    const resetEffect = jest.spyOn(waveInstance, 'resetEffect');
    await clickButton(wrapper);
    expect(resetEffect).toHaveBeenCalledTimes(1);
    wrapper.find('.ant-btn').getDOMNode<HTMLButtonElement>().click();
    await sleep(10);
    expect(resetEffect).toHaveBeenCalledTimes(2);
    waveInstance.animationStart = false;
    wrapper.find('.ant-btn').getDOMNode().dispatchEvent(new Event('transitionstart'));
    expect(resetEffect).toHaveBeenCalledTimes(3);
    resetEffect.mockRestore();
  });

  it('should handle transitionend', async () => {
    const wrapper = mount(<Button type="primary">button</Button>);
    const waveInstance = wrapper.find(Wave).instance() as any;
    const resetEffect = jest.spyOn(waveInstance, 'resetEffect');
    await clickButton(wrapper);
    expect(resetEffect).toHaveBeenCalledTimes(1);
    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fadeEffect' });
    wrapper.find('.ant-btn').getDOMNode().dispatchEvent(event);
    expect(resetEffect).toHaveBeenCalledTimes(2);
    resetEffect.mockRestore();
  });

  it('Wave on falsy element', async () => {
    const wrapper = mount(<Wave />);
    const waveInstance = wrapper.find(Wave).instance() as any;
    waveInstance.resetEffect();
  });
});
