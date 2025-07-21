import React from 'react';

import Spin from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Spin', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  mountTest(Spin);
  rtlTest(Spin);

  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const { container } = render(
      <Spin style={{ background: 'red' }}>
        <div>content</div>
      </Spin>,
    );
    expect(container.querySelector<HTMLElement>('.ant-spin-nested-loading')?.style.length).toBe(0);
    expect(container.querySelector<HTMLElement>('.ant-spin')?.style.background).toBe('red');
  });

  it('should not apply nested styles when full screen', () => {
    const { container } = render(
      <Spin fullscreen>
        <div>content</div>
      </Spin>,
    );
    expect(container.querySelector<HTMLElement>('ant-spin-nested-loading')).toBeNull();
  });

  it("should render custom indicator when it's set", () => {
    const customIndicator = <div className="custom-indicator" />;
    const { asFragment } = render(<Spin indicator={customIndicator} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should be controlled by spinning', async () => {
    jest.useFakeTimers();
    const { container, rerender } = render(<Spin spinning={false} />);
    expect(container.querySelector('.ant-spin-spinning')).toBeFalsy();
    rerender(<Spin spinning />);
    await waitFakeTimer();
    expect(container.querySelector('.ant-spin-spinning')).toBeTruthy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('if indicator set null should not be render default indicator', () => {
    const { asFragment } = render(<Spin indicator={null as any} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support static method Spin.setDefaultIndicator', () => {
    Spin.setDefaultIndicator(<em className="custom-spinner" />);
    const { asFragment } = render(<Spin />);
    expect(asFragment().firstChild).toMatchSnapshot();
    Spin.setDefaultIndicator(null);
  });

  it('should render 0', () => {
    const { container } = render(<Spin>{0}</Spin>);
    expect(container.querySelector('.ant-spin-container')?.textContent).toBe('0');
  });

  it('warning tip without nest', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Spin tip="Not Show" />);
    expect(container.querySelector('.ant-spin-text')).toBeFalsy();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Spin] `tip` only work in nest or fullscreen pattern.',
    );

    errSpy.mockRestore();
  });

  it('should not warn tip with fullscreen', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Spin fullscreen tip="Fullscreen" />);
    expect(container.querySelector('.ant-spin-fullscreen')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();

    errSpy.mockRestore();
  });

  it('right style when fullscreen', () => {
    const { container } = render(<Spin fullscreen spinning />);
    const element = container.querySelector<HTMLDivElement>('.ant-spin-fullscreen');
    expect(element).not.toHaveStyle({ pointerEvents: 'none' });
  });

  it('should support ConfigProvider indicator', () => {
    const { container } = render(
      <ConfigProvider spin={{ indicator: <div className="custom-indicator" /> }}>
        <Spin />
      </ConfigProvider>,
    );
    expect(container.querySelector('.custom-indicator')).toBeTruthy();
  });

  describe('percent', () => {
    it('percent support auto', () => {
      const { container } = render(<Spin percent="auto" />);

      act(() => {
        jest.advanceTimersByTime(100000);
      });

      const nowPTG = Number(
        container.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow'),
      );

      expect(nowPTG).toBeGreaterThanOrEqual(1);
    });

    it('custom indicator has percent', () => {
      const MyIndicator = ({ percent }: { percent?: number }) => (
        <div className="custom-indicator">{percent}</div>
      );
      const { container } = render(<Spin indicator={<MyIndicator />} percent={23} />);
      expect(container.querySelector('.custom-indicator')?.textContent).toBe('23');
    });
  });

  it('custom styles', () => {
    const customStyles = {
      root: { background: 'red' },
      indicator: { color: 'blue' },
      mask: { background: 'green' },
    };
    const customClassNames = {
      root: 'custom-root',
      indicator: 'custom-indicator',
      mask: 'custom-mask',
    };
    const { container } = render(<Spin styles={customStyles} classNames={customClassNames} />);
    const { container: fullscreenContainer } = render(
      <Spin fullscreen styles={customStyles} classNames={customClassNames} />,
    );
    expect(container.querySelector('.custom-root'))?.toHaveStyle('background: red');
    expect(fullscreenContainer.querySelector('.custom-mask'))?.toHaveStyle('background: green');
    expect(fullscreenContainer.querySelector('.custom-indicator'))?.toHaveStyle('color: blue');
  });
});
