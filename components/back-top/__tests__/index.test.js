import React from 'react';
import BackTop from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep } from '../../../tests/utils';

describe('BackTop', () => {
  mountTest(BackTop);
  rtlTest(BackTop);

  it('should scroll to top after click it', async () => {
    const { container } = render(<BackTop visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    expect(document.documentElement.scrollTop).toBe(400);
    fireEvent.click(container.querySelector('.ant-back-top'));
    await sleep(500);
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', async () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop onClick={onClick} visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((x, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });
    document.dispatchEvent(new Event('scroll'));
    window.scrollTo(0, 400);
    fireEvent.click(container.querySelector('.ant-back-top'));
    expect(onClick).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('invalid target', async () => {
    const onClick = jest.fn();
    const { container } = render(
      <BackTop onClick={onClick} visible target={() => ({ documentElement: {} })} />,
    );
    fireEvent.click(container.querySelector('.ant-back-top'));
    expect(onClick).toHaveBeenCalled();
  });
});
