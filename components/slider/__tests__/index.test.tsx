import React from 'react';
import Slider from '..';
import type { SliderSingleProps } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, fireEvent, act } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import SliderTooltip from '../SliderTooltip';
import type { TooltipProps } from '../../tooltip';

function tooltipProps(): TooltipProps {
  return (global as any).tooltipProps;
}

jest.mock('../../tooltip', () => {
  const ReactReal = jest.requireActual('react');
  const Tooltip = jest.requireActual('../../tooltip');
  const TooltipComponent = Tooltip.default;
  return ReactReal.forwardRef((props: TooltipProps, ref: any) => {
    (global as any).tooltipProps = props;
    return <TooltipComponent {...props} ref={ref} />;
  });
});

describe('Slider', () => {
  mountTest(Slider);
  rtlTest(Slider);
  focusTest(Slider, { testLib: true });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should show tooltip when hovering slider handler', () => {
    const { container } = render(<Slider defaultValue={30} />);

    fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
    expect(document.querySelector('.ant-tooltip')).toMatchSnapshot();

    fireEvent.mouseLeave(container.querySelector('.ant-slider-handle')!);

    expect(document.querySelector('.ant-tooltip')).toMatchSnapshot();
  });

  describe('should show correct placement tooltip when set tooltipPlacement', () => {
    function test(name: string, props: Partial<SliderSingleProps>) {
      it(name, () => {
        const { container } = render(<Slider vertical defaultValue={30} {...props} />);

        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        expect(tooltipProps().placement).toEqual('left');
      });
    }

    test('new', { tooltip: { placement: 'left' } });
    test('legacy', { tooltipPlacement: 'left' });
  });

  describe('when tooltip.open is true, tooltip should show always, or should never show', () => {
    function test(
      name: string,
      showProps: Partial<SliderSingleProps>,
      hideProps: Partial<SliderSingleProps>,
    ) {
      it(name, () => {
        const { container, rerender } = render(<Slider defaultValue={30} {...showProps} />);
        expect(
          container.querySelector('.ant-tooltip-content')!.className.includes('ant-tooltip-hidden'),
        ).toBeFalsy();

        fireEvent.mouseEnter(container.querySelector('.ant-slider-handle')!);
        expect(
          container.querySelector('.ant-tooltip-content')!.className.includes('ant-tooltip-hidden'),
        ).toBeFalsy();

        fireEvent.click(container.querySelector('.ant-slider-handle')!);
        expect(
          container.querySelector('.ant-tooltip-content')!.className.includes('ant-tooltip-hidden'),
        ).toBeFalsy();

        // Force hide
        rerender(<Slider defaultValue={30} {...hideProps} />);

        act(() => {
          jest.runAllTimers();
        });
        if (container.querySelector('.ant-zoom-down-leave-active')) {
          fireEvent.animationEnd(container.querySelector('.ant-zoom-down-leave-active')!);
        }

        expect(container.querySelector('.ant-tooltip-hidden')!).toBeTruthy();
      });
    }

    test('new', { tooltip: { open: true } }, { tooltip: { open: false } });
    test('legacy', { tooltipVisible: true }, { tooltipVisible: false });
  });

  it('when step is null, thumb can only be slided to the specific mark', () => {
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

  it('when step is not null, thumb can be slided to the multiples of step', () => {
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

  it('when step is undefined, thumb can be slided to the multiples of step', () => {
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

  it('should keepAlign by calling forcePopupAlign', async () => {
    let ref: any;
    render(
      <SliderTooltip
        title="30"
        open
        ref={node => {
          ref = node;
        }}
      />,
    );
    ref.forcePopupAlign = jest.fn();
    act(() => {
      jest.runAllTimers();
    });
    expect(ref.forcePopupAlign).toHaveBeenCalled();
  });

  it('tipFormatter should not crash with undefined value', () => {
    [undefined, null].forEach(value => {
      render(<Slider value={value as any} tooltip={{ open: true }} />);
    });
  });
  it('step should not crash with undefined value', () => {
    [undefined, null].forEach(value => {
      render(<Slider step={value} tooltip={{ open: true }} />);
    });
  });
  it('deprecated warning', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(<Slider tooltipPrefixCls="xxx" />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tooltipPrefixCls` is deprecated which will be removed in next major version, please use `tooltip.prefixCls` instead.',
    );
    rerender(<Slider getTooltipPopupContainer={() => document.body} />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `getTooltipPopupContainer` is deprecated which will be removed in next major version, please use `tooltip.getPopupContainer` instead.',
    );
    rerender(<Slider tipFormatter={v => v} />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tipFormatter` is deprecated which will be removed in next major version, please use `tooltip.formatter` instead.',
    );
    rerender(<Slider tooltipVisible />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tooltipVisible` is deprecated which will be removed in next major version, please use `tooltip.open` instead.',
    );
    rerender(<Slider tooltipPlacement="left" />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tooltipPlacement` is deprecated which will be removed in next major version, please use `tooltip.placement` instead.',
    );

    errSpy.mockRestore();
  });
});
