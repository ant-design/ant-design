import React from 'react';
import { mount } from 'enzyme';
import { sleep } from '../../../tests/utils';
import mountTest from '../../../tests/shared/mountTest';
import BackTop from '..';

describe('BackTop', () => {
  mountTest(BackTop);

  it('should scroll to top after click it', async () => {
    const wrapper = mount(<BackTop visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });
    window.scrollTo(0, 400);
    // trigger scroll manually
    wrapper.instance().handleScroll();
    await sleep();
    wrapper.find('.ant-back-top').simulate('click');
    await sleep(500);
    expect(window.pageYOffset).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', async () => {
    const onClick = jest.fn();
    const wrapper = mount(<BackTop onClick={onClick} visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });
    window.scrollTo(0, 400);
    // trigger scroll manually
    wrapper.instance().handleScroll();
    await sleep();
    wrapper.find('.ant-back-top').simulate('click');
    expect(onClick).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });
});
