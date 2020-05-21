import React from 'react';
import { mount } from 'enzyme';
import { sleep } from '../../../tests/utils';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import BackTop from '..';

describe('BackTop', () => {
  mountTest(BackTop);
  rtlTest(BackTop);

  it('should scroll to top after click it', async () => {
    const wrapper = mount(<BackTop visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    expect(document.documentElement.scrollTop).toBe(400);
    wrapper.find('.ant-back-top').simulate('click');
    await sleep(500);
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', async () => {
    const onClick = jest.fn();
    const wrapper = mount(<BackTop onClick={onClick} visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });
    document.dispatchEvent(new Event('scroll'));
    window.scrollTo(0, 400);
    wrapper.find('.ant-back-top').simulate('click');
    expect(onClick).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('invalid target', async () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <BackTop onClick={onClick} visible target={() => ({ documentElement: {} })} />,
    );
    wrapper.find('.ant-back-top').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
