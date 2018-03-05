import React from 'react';
import { mount } from 'enzyme';

describe('BackTop', () => {
  let BackTop;
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(setTimeout);
    BackTop = require('..').default; // eslint-disable-line
  });

  afterAll(() => {
    window.requestAnimationFrame.mockRestore();
    jest.useRealTimers();
  });

  it('should scroll to top after click it', () => {
    const wrapper = mount(<BackTop visibilityHeight={-1} />);
    document.documentElement.scrollTop = 400;
    // trigger scroll manually
    wrapper.instance().handleScroll();
    wrapper.find('.ant-back-top').simulate('click');
    jest.runAllTimers();
    expect(Math.round(document.documentElement.scrollTop)).toBe(0);
  });
});
