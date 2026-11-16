import React from 'react';

import BackTop from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';

describe('BackTop', () => {
  const originalMatchMedia = window.matchMedia;
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
    window.matchMedia = originalMatchMedia;
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
    fireEvent.click(container.querySelector<HTMLDivElement>('.ant-back-top')!);
    await waitFakeTimer();
    expect(document.documentElement.scrollTop).toBe(0);
    scrollToSpy.mockRestore();
  });

  it.each([true, false])(
    'respects reduced motion preference (%s) when returning to top',
    async (reducedMotion) => {
      const mediaQuery = Object.assign(new EventTarget(), {
        media: '(prefers-reduced-motion: reduce)',
        matches: !reducedMotion,
      }) as MediaQueryList;
      window.matchMedia = jest.fn((query) =>
        query === mediaQuery.media ? mediaQuery : originalMatchMedia(query),
      );
      const target = document.createElement('div');
      target.scrollTop = 400;
      const { container } = render(
        <BackTop visibilityHeight={0} target={() => target} duration={1000} />,
      );
      act(() => {
        Object.assign(mediaQuery, { matches: reducedMotion });
        mediaQuery.dispatchEvent(Object.assign(new Event('change'), { matches: reducedMotion }));
      });
      fireEvent.click(container.querySelector<HTMLDivElement>('.ant-back-top')!);
      expect(target.scrollTop).toBe(reducedMotion ? 0 : 400);
      await waitFakeTimer();
      expect(target.scrollTop).toBe(0);
    },
  );

  it('support onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop onClick={onClick} visibilityHeight={0} />);
    fireEvent.click(container.querySelector<HTMLDivElement>('.ant-back-top')!);
    expect(onClick).toHaveBeenCalled();
  });

  it('invalid target', () => {
    const onClick = jest.fn();
    const { container } = render(<BackTop onClick={onClick} target={undefined} />);
    fireEvent.click(container.querySelector<HTMLDivElement>('.ant-back-top')!);
    expect(onClick).toHaveBeenCalled();
  });
  it('should console Error', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<BackTop />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: BackTop] `BackTop` is deprecated. Please use `FloatButton.BackTop` instead.',
    );
    errSpy.mockRestore();
  });
});
