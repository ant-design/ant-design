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

const getProgressOffset = (container: HTMLElement) =>
  Number.parseFloat(
    container.querySelector<SVGPathElement>('.ant-float-btn-progress-path')?.style
      .strokeDashoffset || 'NaN',
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

  it('does not render progress ring by default', () => {
    const { container } = render(<BackTop visibilityHeight={0} />);

    expect(container.querySelector('.ant-float-btn-progress')).toBeFalsy();
  });

  it('renders progress ring when showProgress is enabled', () => {
    const { container } = render(
      <BackTop visibilityHeight={0} showProgress target={() => window} />,
    );

    expect(container.querySelector('.ant-float-btn-progress')).toBeTruthy();
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
    window.dispatchEvent(new Event('resize'));
    await waitFakeTimer();

    expect(getProgressOffset(container)).toBeCloseTo(0.5);

    scrollToSpy.mockRestore();
  });

  it('computes document target progress', async () => {
    setElementScrollMetrics(document.documentElement, {
      scrollTop: 300,
      scrollHeight: 1500,
      clientHeight: 1000,
    });

    const { container } = render(
      <BackTop visibilityHeight={0} showProgress target={() => document} />,
    );

    fireEvent.scroll(document);
    await waitFakeTimer();

    expect(getProgressOffset(container)).toBeCloseTo(0.4);
  });

  it('computes element target progress without NaN for non-scrollable containers', async () => {
    const holder = document.createElement('div');

    setElementScrollMetrics(holder, {
      scrollTop: 0,
      scrollHeight: 400,
      clientHeight: 400,
    });

    const { container } = render(
      <BackTop visibilityHeight={0} showProgress target={() => holder} />,
    );

    fireEvent.scroll(holder);
    await waitFakeTimer();

    expect(getProgressOffset(container)).toBeCloseTo(1);
  });

  it('keeps progress stable when target resolves to null', async () => {
    const { container } = render(
      <BackTop
        visibilityHeight={0}
        showProgress
        target={(() => null) as unknown as () => HTMLElement | Window | Document}
      />,
    );

    await waitFakeTimer();

    expect(getProgressOffset(container)).toBeCloseTo(1);
  });

  it('keeps actual progress independent from visibilityHeight', async () => {
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
    expect(getProgressOffset(container)).toBeCloseTo(0.3);
  });

  it('uses square progress path when group shape overrides BackTop shape', () => {
    const { container } = render(
      <FloatButton.Group shape="square">
        <BackTop visibilityHeight={0} showProgress />
      </FloatButton.Group>,
    );

    expect(container.querySelector('.ant-float-btn-square')).toBeTruthy();
    expect(container.querySelector('.ant-float-btn-progress')?.getAttribute('data-shape')).toBe(
      'square',
    );
  });

  it('rebinds progress calculation when target changes', async () => {
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

    rerender(<BackTop visibilityHeight={0} showProgress target={() => second} />);
    fireEvent.scroll(second);
    await waitFakeTimer();

    expect(getProgressOffset(container)).toBeCloseTo(0.2);
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

    expect(getProgressOffset(container)).toBeCloseTo(0);

    scrollToSpy.mockRestore();
  });
});
