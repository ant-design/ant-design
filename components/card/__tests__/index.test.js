import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Card', () => {
  function fakeResizeWindowTo(wrapper, width) {
    Object.defineProperties(wrapper.node.container, {
      offsetWidth: {
        get() { return width; },
        configurable: true,
      },
    });
    window.resizeTo(width);
  }

  it('resize card will trigger different padding', async () => {
    const wrapper = mount(<Card title="xxx">xxx</Card>);
    fakeResizeWindowTo(wrapper, 1000);
    await delay(0);
    expect(wrapper.hasClass('ant-card-wider-padding')).toBe(true);
    fakeResizeWindowTo(wrapper, 800);
    await delay(0);
    expect(wrapper.hasClass('ant-card-wider-padding')).toBe(false);
  });
});
