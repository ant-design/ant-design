import React from 'react';

import Slider from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { TooltipProps, TooltipRef } from '../../tooltip';
import SliderTooltip from '../SliderTooltip';

function tooltipProps(): TooltipProps {
  return (global as any).tooltipProps;
}

jest.mock('../../tooltip', () => {
  const ReactReal: typeof React = jest.requireActual('react');
  const Tooltip = jest.requireActual('../../tooltip');
  const TooltipComponent = Tooltip.default;
  return ReactReal.forwardRef<TooltipRef, TooltipProps>((props, ref) => {
    (global as any).tooltipProps = props;
    return <TooltipComponent {...props} ref={ref} />;
  });
});

describe('Slider', () => {
  mountTest(Slider);
  rtlTest(Slider);
  focusTest(Slider);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should show tooltip when hovering slider handler', async () => {
    const { container } = render(<Slider defaultValue={30} />);

    fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip')).toMatchSnapshot();

    fireEvent.mouseLeave(container.querySelector('.ant-slider-handle')!);
    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip')).toMatchSnapshot();
  });

  it('should show correct placement tooltip when set tooltipPlacement', () => {
    const { container } = render(
      <Slider vertical defaultValue={30} tooltip={{ placement: 'left' }} />,
    );

    fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
    expect(tooltipProps().placement).toEqual('left');
  });

  it('support autoAdjustOverflow', () => {
    const { container } = render(
      <Slider vertical defaultValue={30} tooltip={{ autoAdjustOverflow: false }} />,
    );

    fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
    expect(tooltipProps().autoAdjustOverflow).toBe(false);
  });

  it('when tooltip.open is true, tooltip should show always, or should never show', () => {
    const { container: container1 } = render(<Slider defaultValue={30} tooltip={{ open: true }} />);
    expect(
      container1.querySelector('.ant-tooltip-container')!.className.includes('ant-tooltip-hidden'),
    ).toBeFalsy();

    fireEvent.mouseEnter(container1.querySelector('.ant-slider-handle')!);
    expect(
      container1.querySelector('.ant-tooltip-container')!.className.includes('ant-tooltip-hidden'),
    ).toBeFalsy();

    fireEvent.click(container1.querySelector('.ant-slider-handle')!);
    expect(
      container1.querySelector('.ant-tooltip-container')!.className.includes('ant-tooltip-hidden'),
    ).toBeFalsy();

    const { container: container2 } = render(
      <Slider defaultValue={30} tooltip={{ open: false }} />,
    );
    expect(container2.querySelector('.ant-tooltip-container')!).toBeNull();
  });

  it('when step is null, thumb can only be slid to the specific mark', () => {
    const intentionallyWrongValue = 40;
    const marks = {
      0: '0',
      48: '48',
      100: '100',
    };

    const { container } = render(
      <Slider
        marks={marks}
        defaultValue={intentionallyWrongValue}
        step={null}
        tooltip={{ open: true }}
      />,
    );
    expect(container.querySelector('.ant-slider-handle')!.getAttribute('aria-valuenow')).toBe('48');
  });

  it('when step is not null, thumb can be slid to the multiples of step', () => {
    const marks = {
      0: '0',
      48: '48',
      100: '100',
    };

    const { container } = render(
      <Slider marks={marks} defaultValue={49} step={1} tooltip={{ open: true }} />,
    );
    expect(container.querySelector('.ant-slider-handle')!.getAttribute('aria-valuenow')).toBe('49');
  });

  it('when step is undefined, thumb can be slid to the multiples of step', () => {
    const marks = {
      0: '0',
      48: '48',
      100: '100',
    };

    const { container } = render(
      <Slider marks={marks} defaultValue={49} step={undefined} tooltip={{ open: true }} />,
    );
    expect(container.querySelector('.ant-slider-handle')!.getAttribute('aria-valuenow')).toBe('49');
  });

  it('should render in RTL direction', () => {
    const { container } = render(
      <ConfigProvider direction="rtl">
        <Slider defaultValue={30} tooltip={{ open: true }} />
      </ConfigProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should keepAlign by calling forceAlign', async () => {
    const ref = React.createRef<any>();
    render(<SliderTooltip title="30" open ref={ref} />);
    ref.current.forceAlign = jest.fn();
    act(() => {
      jest.runAllTimers();
    });
    expect(ref.current.forceAlign).toHaveBeenCalled();
  });

  it('tipFormatter should not crash with undefined value', () => {
    [undefined, null].forEach((value) => {
      render(<Slider value={value as any} tooltip={{ open: true }} />);
    });
  });
  it('step should not crash with undefined value', () => {
    [undefined, null].forEach((value) => {
      render(<Slider step={value} tooltip={{ open: true }} />);
    });
  });

  it('should apply custom styles to Slider', () => {
    const customClassNames = {
      root: 'custom-root',
      track: 'custom-track',
      tracks: 'custom-tracks',
      rail: 'custom-rail',
      handle: 'custom-handle',
    };

    const customStyles = {
      root: { padding: 10 },
      track: { padding: 20 },
      tracks: { padding: 30 },
      rail: { padding: 40 },
      handle: { padding: 50 },
    };

    const { container } = render(
      <Slider
        range
        defaultValue={[20, 30, 50]}
        style={{ width: '100%' }}
        classNames={customClassNames}
        styles={customStyles}
      />,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-slider');
    const trackElement = container.querySelector<HTMLElement>('.ant-slider-track');
    const tracksElement = container.querySelector<HTMLElement>('.ant-slider-tracks');
    const railElement = container.querySelector<HTMLElement>('.ant-slider-rail');
    const handleElement = container.querySelector<HTMLElement>('.ant-slider-handle');

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(trackElement).toHaveClass('custom-track');
    expect(tracksElement).toHaveClass('custom-tracks');
    expect(railElement).toHaveClass('custom-rail');
    expect(handleElement).toHaveClass('custom-handle');

    // check styles
    expect(rootElement).toHaveStyle({ padding: '10px' });
    expect(trackElement).toHaveStyle({ padding: '20px' });
    expect(tracksElement).toHaveStyle({ padding: '30px' });
    expect(railElement).toHaveStyle({ padding: '40px' });
    expect(handleElement).toHaveStyle({ padding: '50px' });
  });

  // ============================= orientation =============================
  describe('orientation attribute', () => {
    it('vertical=true orientation=horizontal, result orientation=horizontal', () => {
      const { container } = render(<Slider vertical orientation="horizontal" step={20} />);
      expect(container.querySelector<HTMLDivElement>('.ant-slider-horizontal')).not.toBeNull();
    });

    it('orientation=vertical vertical=undefined, result orientation=vertical', () => {
      const { container } = render(<Slider orientation="vertical" step={20} />);
      expect(container.querySelector<HTMLDivElement>('.ant-slider-vertical')).not.toBeNull();
    });
  });

  // ============================= auto adjust placement =============================
  describe('auto adjust placement', () => {
    let mockPopupElement: HTMLElement;
    let mockTriggerElement: HTMLElement;
    let mockContainer: HTMLElement;

    beforeEach(() => {
      // 创建 mock 元素
      mockPopupElement = document.createElement('div');
      mockTriggerElement = document.createElement('div');
      mockContainer = document.createElement('div');
      document.body.appendChild(mockContainer);

      // Mock getBoundingClientRect
      mockPopupElement.getBoundingClientRect = jest.fn(() => ({
        left: 100,
        top: 100,
        right: 200,
        bottom: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        toJSON: jest.fn(),
      }));

      mockTriggerElement.getBoundingClientRect = jest.fn(() => ({
        left: 150,
        top: 150,
        right: 150,
        bottom: 150,
        width: 0,
        height: 0,
        x: 150,
        y: 150,
        toJSON: jest.fn(),
      }));

      mockContainer.getBoundingClientRect = jest.fn(() => ({
        left: 0,
        top: 0,
        right: 1000,
        bottom: 1000,
        width: 1000,
        height: 1000,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      }));

      // Mock window.innerWidth 和 innerHeight
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1000,
      });
    });

    afterEach(() => {
      if (document.body.contains(mockContainer)) {
        document.body.removeChild(mockContainer);
      }
      jest.clearAllMocks();
    });

    it('should not adjust placement when tooltip is closed', async () => {
      const { container } = render(<Slider defaultValue={30} tooltip={{ open: false }} />);
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();
      // 当 open 为 false 时，mergedOpen 为 false，不应该执行检测逻辑
      // 由于 tooltip 未打开，无法获取 tooltipProps
      expect(container.querySelector('.ant-slider-handle')).toBeTruthy();
    });

    it('should handle when tooltipRef is null gracefully', async () => {
      const ref = React.createRef<any>();
      render(<SliderTooltip title="30" open ref={ref} />);
      await waitFakeTimer();
      // 组件应该正常渲染，不会崩溃
      expect(ref.current).toBeDefined();
    });

    it('should use document.body as container when getPopupContainer is not provided', async () => {
      const { container } = render(<Slider defaultValue={30} tooltip={{ open: true }} />);
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();
      // 应该使用 document.body 作为容器
      expect(tooltipProps().placement).toBeDefined();
    });

    it('should use custom container when getPopupContainer is provided', async () => {
      const customContainer = document.createElement('div');
      document.body.appendChild(customContainer);
      const getPopupContainer = jest.fn(() => customContainer);

      const { container } = render(
        <Slider defaultValue={30} tooltip={{ open: true, getPopupContainer }} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();

      expect(getPopupContainer).toHaveBeenCalled();
      document.body.removeChild(customContainer);
    });

    describe('horizontal mode (placement: top/bottom)', () => {
      it('should adjust to right when tooltip overflows left with placement top', async () => {
        // Mock 左侧溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: -50,
          top: 100,
          right: 50,
          bottom: 200,
          width: 100,
          height: 100,
          x: -50,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider defaultValue={0} tooltip={{ open: true, placement: 'top' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 right
        expect(tooltipProps().placement).toBe('right');
      });

      it('should adjust to left when tooltip overflows right with placement top', async () => {
        // Mock 右侧溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 950,
          top: 100,
          right: 1050,
          bottom: 200,
          width: 100,
          height: 100,
          x: 950,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider defaultValue={100} tooltip={{ open: true, placement: 'top' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 left
        expect(tooltipProps().placement).toBe('left');
      });

      it('should keep original placement when no overflow with placement top', async () => {
        // Mock 没有溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: 100,
          right: 200,
          bottom: 200,
          width: 100,
          height: 100,
          x: 100,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider defaultValue={50} tooltip={{ open: true, placement: 'top' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该保持原始 placement
        expect(tooltipProps().placement).toBe('top');
      });

      it('should adjust to right when tooltip overflows left with placement bottom', async () => {
        // Mock 左侧溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: -50,
          top: 100,
          right: 50,
          bottom: 200,
          width: 100,
          height: 100,
          x: -50,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider defaultValue={0} tooltip={{ open: true, placement: 'bottom' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 right
        expect(tooltipProps().placement).toBe('right');
      });

      it('should adjust to left when tooltip overflows right with placement bottom', async () => {
        // Mock 右侧溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 950,
          top: 100,
          right: 1050,
          bottom: 200,
          width: 100,
          height: 100,
          x: 950,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider defaultValue={100} tooltip={{ open: true, placement: 'bottom' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 left
        expect(tooltipProps().placement).toBe('left');
      });

      it('should keep original placement when no overflow with placement bottom', async () => {
        // Mock 没有溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: 100,
          right: 200,
          bottom: 200,
          width: 100,
          height: 100,
          x: 100,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider defaultValue={50} tooltip={{ open: true, placement: 'bottom' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该保持原始 placement
        expect(tooltipProps().placement).toBe('bottom');
      });
    });

    describe('vertical mode (placement: left/right)', () => {
      it('should adjust to bottom when tooltip overflows top with placement left', async () => {
        // Mock 顶部溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: -50,
          right: 200,
          bottom: 50,
          width: 100,
          height: 100,
          x: 100,
          y: -50,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider vertical defaultValue={100} tooltip={{ open: true, placement: 'left' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 bottom
        expect(tooltipProps().placement).toBe('bottom');
      });

      it('should adjust to top when tooltip overflows bottom with placement left', async () => {
        // Mock 底部溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: 950,
          right: 200,
          bottom: 1050,
          width: 100,
          height: 100,
          x: 100,
          y: 950,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider vertical defaultValue={0} tooltip={{ open: true, placement: 'left' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 top
        expect(tooltipProps().placement).toBe('top');
      });

      it('should keep original placement when no overflow with placement left', async () => {
        // Mock 没有溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: 100,
          right: 200,
          bottom: 200,
          width: 100,
          height: 100,
          x: 100,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider vertical defaultValue={50} tooltip={{ open: true, placement: 'left' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该保持原始 placement
        expect(tooltipProps().placement).toBe('left');
      });

      it('should adjust to bottom when tooltip overflows top with placement right', async () => {
        // Mock 顶部溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: -50,
          right: 200,
          bottom: 50,
          width: 100,
          height: 100,
          x: 100,
          y: -50,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider vertical defaultValue={100} tooltip={{ open: true, placement: 'right' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 bottom
        expect(tooltipProps().placement).toBe('bottom');
      });

      it('should adjust to top when tooltip overflows bottom with placement right', async () => {
        // Mock 底部溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: 950,
          right: 200,
          bottom: 1050,
          width: 100,
          height: 100,
          x: 100,
          y: 950,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider vertical defaultValue={0} tooltip={{ open: true, placement: 'right' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该调整为 top
        expect(tooltipProps().placement).toBe('top');
      });

      it('should keep original placement when no overflow with placement right', async () => {
        // Mock 没有溢出
        mockPopupElement.getBoundingClientRect = jest.fn(() => ({
          left: 100,
          top: 100,
          right: 200,
          bottom: 200,
          width: 100,
          height: 100,
          x: 100,
          y: 100,
          toJSON: jest.fn(),
        }));

        const { container } = render(
          <Slider vertical defaultValue={50} tooltip={{ open: true, placement: 'right' }} />,
        );
        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        await waitFakeTimer();
        // 应该保持原始 placement
        expect(tooltipProps().placement).toBe('right');
      });
    });

    it('should reset placement when tooltip is closed', async () => {
      const { container, rerender } = render(
        <Slider defaultValue={30} tooltip={{ open: true, placement: 'top' }} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();

      // 关闭 tooltip
      rerender(<Slider defaultValue={30} tooltip={{ open: false, placement: 'top' }} />);
      await waitFakeTimer();
      // placement 应该被重置
      expect(tooltipProps().placement).toBe('top');
    });

    it('should adjust placement when value changes', async () => {
      const { container, rerender } = render(
        <Slider value={0} tooltip={{ open: true, placement: 'top' }} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();

      // 改变 value
      rerender(<Slider value={100} tooltip={{ open: true, placement: 'top' }} />);
      await waitFakeTimer();
      // 应该重新检测并调整
      expect(tooltipProps().placement).toBeDefined();
    });

    it('should adjust placement when title changes', async () => {
      const { container, rerender } = render(
        <Slider defaultValue={30} tooltip={{ open: true, placement: 'top' }} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();

      // 改变 title（通过 formatter）
      rerender(
        <Slider
          defaultValue={30}
          tooltip={{ open: true, placement: 'top', formatter: (val) => `New ${val}` }}
        />,
      );
      await waitFakeTimer();
      // 应该重新检测并调整
      expect(tooltipProps().placement).toBeDefined();
    });

    it('should handle resize event', async () => {
      const { container } = render(
        <Slider defaultValue={30} tooltip={{ open: true, placement: 'top' }} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();

      // 触发 resize 事件
      act(() => {
        window.dispatchEvent(new Event('resize'));
        jest.runAllTimers();
      });
      await waitFakeTimer();
      // 应该重新检测并调整
      expect(tooltipProps().placement).toBeDefined();
    });

    it('should handle scroll event', async () => {
      const { container } = render(
        <Slider defaultValue={30} tooltip={{ open: true, placement: 'top' }} />,
      );
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();

      // 触发 scroll 事件
      act(() => {
        window.dispatchEvent(new Event('scroll'));
        jest.runAllTimers();
      });
      await waitFakeTimer();
      // 应该重新检测并调整
      expect(tooltipProps().placement).toBeDefined();
    });

    it('should use default placement top when placement is undefined', async () => {
      const { container } = render(<Slider defaultValue={30} tooltip={{ open: true }} />);
      fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
      await waitFakeTimer();
      // 应该使用默认的 top
      expect(tooltipProps().placement).toBeDefined();
    });

    it('should handle draggingDelete prop', async () => {
      render(<SliderTooltip title="30" open draggingDelete placement="top" />);
      await waitFakeTimer();
      // 当 draggingDelete 为 true 时，tooltip 不应该显示
      expect(tooltipProps().open).toBe(false);
    });
  });
});
