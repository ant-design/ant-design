import React from 'react';
import { mount } from 'enzyme';
import BackTop from '..';

jest.useFakeTimers();

describe('BackTop', () => {
  it('should scroll to top after click it', async () => {
    const wrapper = mount(<BackTop visibilityHeight={-1} />);
    document.documentElement.scrollTop = 400;
    // trigger scroll manually
    wrapper.instance().handleScroll();
    jest.runAllTimers();
    wrapper.find('.ant-back-top').simulate('click');
    jest.runAllTimers();
    expect(Math.round(document.documentElement.scrollTop)).toBe(0);
  });
});
