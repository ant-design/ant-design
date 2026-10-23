import React from 'react';

import FloatButton from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

const { BackTop } = FloatButton;

const setElementScrollMetrics = (
  element: HTMLElement | Document['documentElement'],
  { scrollTop, scrollHeight, clientHeight }: Record<string, number>,
) => {
  Object.defineProperties(element, {
    scrollTop: { configurable: true, value: scrollTop, writable: true },
    scrollHeight: { configurable: true, value: scrollHeight },
    clientHeight: { configurable: true, value: clientHeight },
  });
};

const getScrollProgress = (container: HTMLElement) =>
  Number.parseFloat(
    container
      .querySelector<HTMLButtonElement>('.ant-float-btn-progress')
      ?.style.getPropertyValue('--ant-float-btn-progress') || 'NaN',
  );

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
    const { container } = render(<BackTop visibilityHeight={0} />);
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

  it('should scroll to top immediately when reduced motion is enabled', () => {
    jest.spyOn(window, 'matchMedia').mockReturnValueOnce({ matches: true } as MediaQueryList);
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      window.scrollY = y;
      window.pageYOffset = y;
      document.documentElement.scrollTop = y;
    });
    window.scrollTo(0, 400);

    const { container } = render(<BackTop visibilityHeight={0} />);
    fireEvent.click(container.querySelector<HTMLButtonElement>('.ant-float-btn')!);

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
    const { container } = render(<BackTop style={{ padding: 20 }} visibilityHeight={0} />);
    expect(container.querySelector<HTMLButtonElement>('.ant-float-btn')).toHaveStyle({
      padding: '20px',
    });
  });

  it('no error when BackTop work', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<BackTop visibilityHeight={0} />);
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('supports ConfigProvider backTopIcon', () => {
    const wrapper = render(
      <ConfigProvider floatButton={{ backTopIcon: <span>666</span> }}>
        <BackTop visibilityHeight={0} />
      </ConfigProvider>,
    );
    expect(wrapper.getByText('666')).toBeInTheDocument();
  });

  it('computes window target progress', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      Object.defineProperty(window, 'pageYOffset', {
        configurable: true,
        value: y,
        writable: true,
      });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        value: y,
        writable: true,
      });
    });

    setElementScrollMetrics(document.documentElement, {
      scrollTop: 0,
      scrollHeight: 2000,
      clientHeight: 1000,
    });

    const { container } = render(
      <BackTop visibilityHeight={0} showProgress target={() => window} />,
    );

    window.scrollTo(0, 500);
    fireEvent.scroll(window);
    await waitFakeTimer();

    expect(getScrollProgress(container)).toBeCloseTo(0.5);

    scrollToSpy.mockRestore();
  });

  it('computes document target progress independently from visibility', async () => {
    setElementScrollMetrics(document.documentElement, {
      scrollTop: 700,
      scrollHeight: 2000,
      clientHeight: 1000,
    });

    const { container } = render(
      <BackTop visibilityHeight={600} showProgress target={() => document} />,
    );

    fireEvent.scroll(document);
    await waitFakeTimer();

    expect(container.querySelector('.ant-float-btn')).toBeTruthy();
    expect(getScrollProgress(container)).toBeCloseTo(0.7);
  });

  it('computes element target progress after target changes', async () => {
    const first = document.createElement('div');
    const second = document.createElement('div');

    setElementScrollMetrics(first, {
      scrollTop: 200,
      scrollHeight: 1000,
      clientHeight: 500,
    });
    setElementScrollMetrics(second, {
      scrollTop: 400,
      scrollHeight: 1000,
      clientHeight: 500,
    });

    const { container, rerender } = render(
      <BackTop visibilityHeight={0} showProgress target={() => first} />,
    );

    fireEvent.scroll(first);
    await waitFakeTimer();
    expect(getScrollProgress(container)).toBeCloseTo(0.4);

    rerender(<BackTop visibilityHeight={0} showProgress target={() => second} />);
    fireEvent.scroll(second);
    await waitFakeTimer();

    expect(getScrollProgress(container)).toBeCloseTo(0.8);
  });

  it('returns zero progress for non-scrollable and null targets', async () => {
    const holder = document.createElement('div');

    setElementScrollMetrics(holder, {
      scrollTop: 0,
      scrollHeight: 400,
      clientHeight: 400,
    });

    const { container, rerender } = render(
      <BackTop visibilityHeight={0} showProgress target={() => holder} />,
    );

    fireEvent.scroll(holder);
    await waitFakeTimer();
    expect(getScrollProgress(container)).toBeCloseTo(0);

    rerender(
      <BackTop
        visibilityHeight={0}
        showProgress
        target={(() => null) as unknown as () => HTMLElement | Window | Document}
      />,
    );

    await waitFakeTimer();

    expect(getScrollProgress(container)).toBeCloseTo(0);
  });

  it('recalculates progress on resize', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation((_, y) => {
      Object.defineProperty(window, 'pageYOffset', {
        configurable: true,
        value: y,
        writable: true,
      });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        value: y,
        writable: true,
      });
    });

    setElementScrollMetrics(document.documentElement, {
      scrollTop: 500,
      scrollHeight: 2000,
      clientHeight: 1000,
    });

    const { container } = render(
      <BackTop visibilityHeight={0} showProgress target={() => window} />,
    );

    window.scrollTo(0, 500);
    fireEvent.scroll(window);
    await waitFakeTimer();

    setElementScrollMetrics(document.documentElement, {
      scrollTop: 500,
      scrollHeight: 2000,
      clientHeight: 1500,
    });

    fireEvent(window, new Event('resize'));
    await waitFakeTimer();

    expect(getScrollProgress(container)).toBeCloseTo(1);

    scrollToSpy.mockRestore();
  });
});
