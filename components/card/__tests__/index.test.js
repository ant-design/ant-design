import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';

const testMethod = typeof window !== 'undefined' ? it : xit;

describe('Card', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  function fakeResizeWindowTo(wrapper, width) {
    Object.defineProperties(wrapper.instance().container, {
      offsetWidth: {
        get() { return width; },
        configurable: true,
      },
    });
    window.resizeTo(width);
  }

  testMethod('resize card will trigger different padding', () => {
    const wrapper = mount(<Card title="xxx">xxx</Card>);
    fakeResizeWindowTo(wrapper, 1000);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-card-wider-padding').length).toBe(1);
    fakeResizeWindowTo(wrapper, 800);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-card-wider-padding').length).toBe(0);
  });
});
