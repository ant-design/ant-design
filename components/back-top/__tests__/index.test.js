import React from 'react';
import { mount } from 'enzyme';
import { sleep } from '../../../tests/utils';
import BackTop from '..';

describe('BackTop', () => {
  it('should scroll to top after click it', async () => {
    const wrapper = mount(<BackTop visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      const w = window;
      w.scrollY = y;
      w.pageYOffset = y;
    });
    window.scrollTo(0, 400);
    // trigger scroll manually
    wrapper.instance().handleScroll();
    await sleep();
    wrapper.find('.ant-back-top').simulate('click');
    await sleep(1000);
    expect(window.pageYOffset).toBe(0);
    scrollToSpy.mockRestore();
  });
});
