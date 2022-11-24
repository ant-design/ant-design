import React from 'react';
import FloatButton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';

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
    jest.runAllTimers();
    expect(document.documentElement.scrollTop).toBe(400);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    jest.runAllTimers();
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop visibilityHeight={0} onClick={onClick} />);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
  });

  it('support invalid target', () => {
    const onClick = jest.fn();
    const { container } = render(
      <BackTop onClick={onClick} visibilityHeight={0} target={undefined} />,
    );
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    expect(onClick).toHaveBeenCalled();
  });

  it('pass style to float button', () => {
    const { container } = render(<BackTop style={{ color: 'red' }} visibilityHeight={0} />);
    expect(container.querySelector<HTMLButtonElement>('.ant-float-btn')?.style.color).toBe('red');
  });
});
