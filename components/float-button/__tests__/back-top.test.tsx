import React from 'react';
import FloatButton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

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

  it('should scroll to top after click it', async () => {
    const { container } = render(<BackTop />);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);
    await waitFakeTimer();
    expect(document.documentElement.scrollTop).toBe(400);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);
    await waitFakeTimer();
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it('support onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop onClick={onClick} visibilityHeight={0} />);
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
