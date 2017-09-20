import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const testMethod = typeof window !== 'undefined' ? it : xit;

describe('Card', () => {
  function fakeResizeWindowTo(wrapper, width) {
    Object.defineProperties(wrapper.instance().container, {
      offsetWidth: {
        get() { return width; },
        configurable: true,
      },
    });
    window.resizeTo(width);
  }

  testMethod('resize card will trigger different padding', async () => {
    const wrapper = mount(<Card title="xxx">xxx</Card>);
    fakeResizeWindowTo(wrapper, 1000);
    await delay(0);
    wrapper.update();
    expect(wrapper.find('.ant-card-wider-padding').length).toBe(1);
    fakeResizeWindowTo(wrapper, 800);
    await delay(0);
    wrapper.update();
    expect(wrapper.find('.ant-card-wider-padding').length).toBe(0);
  });
});
