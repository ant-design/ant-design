import React from 'react';
import { mount } from 'enzyme';
import BackTop from '..';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('BackTop', () => {
  it('should scroll to top after click it', async () => {
    const wrapper = mount(<BackTop visibilityHeight={-1} />);
    document.documentElement.scrollTop = 400;
    // trigger scroll manually
    wrapper.node.handleScroll();
    await delay(500);
    wrapper.find('.ant-back-top').simulate('click');
    await delay(500);
    expect(Math.round(document.documentElement.scrollTop)).toBe(0);
  });
});
