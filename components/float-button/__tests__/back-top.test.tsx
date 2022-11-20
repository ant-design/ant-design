import React from 'react';
import FloatButton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, act } from '../../../tests/utils';

const { BackTop } = FloatButton;
describe('BackTop', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  mountTest(BackTop);
  rtlTest(BackTop);

  it('should scroll to top after click it', () => {
    const { container } = render(<BackTop visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.documentElement.scrollTop).toBe(400);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    jest.runAllTimers();
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop visibilityHeight={-1} onClick={onClick} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
    });
    document.dispatchEvent(new Event('scroll'));
    window.scrollTo(0, 400);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('invalid target', () => {
    const onClick = jest.fn();
    const { container } = render(
      <BackTop onClick={onClick} visibilityHeight={-1} target={undefined} />,
    );
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('pass style to float button', async () => {
    const { container } = render(<BackTop style={{ color: 'red' }} visibilityHeight={-1} />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelector<HTMLButtonElement>('.ant-float-btn')?.style.color).toBe('red');
    scrollToSpy.mockRestore();
  });
});
