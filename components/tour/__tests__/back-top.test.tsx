import React from 'react';
import FloatButton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep } from '../../../tests/utils';

const { BackTop } = FloatButton;
describe('BackTop', () => {
  mountTest(BackTop);
  rtlTest(BackTop);

  it('should scroll to top after click it', async () => {
    const { container } = render(<BackTop visible visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    expect(document.documentElement.scrollTop).toBe(400);
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    await sleep(500);
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop visible visibilityHeight={-1} onClick={onClick} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });
    document.dispatchEvent(new Event('scroll'));
    window.scrollTo(0, 400);
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('invalid target', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop onClick={onClick} visible target={undefined} />);
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
  });
});
