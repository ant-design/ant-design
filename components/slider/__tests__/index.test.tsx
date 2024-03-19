import React from 'react';
import Slider from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';
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
      container1.querySelector('.ant-tooltip-content')!.className.includes('ant-tooltip-hidden'),
    ).toBeFalsy();

    fireEvent.mouseEnter(container1.querySelector('.ant-slider-handle')!);
    expect(
      container1.querySelector('.ant-tooltip-content')!.className.includes('ant-tooltip-hidden'),
    ).toBeFalsy();

    fireEvent.click(container1.querySelector('.ant-slider-handle')!);
    expect(
      container1.querySelector('.ant-tooltip-content')!.className.includes('ant-tooltip-hidden'),
    ).toBeFalsy();

    const { container: container2 } = render(
      <Slider defaultValue={30} tooltip={{ open: false }} />,
    );
    expect(container2.querySelector('.ant-tooltip-content')!).toBeNull();
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
  it('deprecated warning', () => {
    resetWarned();

    const TSSlider = Slider as any;

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container, rerender } = render(<TSSlider tooltipPrefixCls="xxx" />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tooltipPrefixCls` is deprecated. Please use `tooltip.prefixCls` instead.',
    );

    rerender(<TSSlider getTooltipPopupContainer={() => document.body} />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `getTooltipPopupContainer` is deprecated. Please use `tooltip.getPopupContainer` instead.',
    );

    rerender(<TSSlider tipFormatter={(v: any) => v} />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tipFormatter` is deprecated. Please use `tooltip.formatter` instead.',
    );

    rerender(<TSSlider tooltipVisible />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tooltipVisible` is deprecated. Please use `tooltip.open` instead.',
    );

    rerender(<TSSlider tooltipPlacement="left" />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Slider] `tooltipPlacement` is deprecated. Please use `tooltip.placement` instead.',
    );

    // All should work
    const holder = document.createElement('div');
    holder.id = 'holder';
    document.body.appendChild(holder);

    const getTooltipPopupContainer = jest.fn(() => container);

    rerender(
      <TSSlider
        tooltipPrefixCls="bamboo"
        getTooltipPopupContainer={getTooltipPopupContainer}
        tipFormatter={() => 'little'}
        tooltipPlacement="bottom"
        tooltipVisible
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getTooltipPopupContainer).toHaveBeenCalled();
    expect(container.querySelector('.bamboo')).toBeTruthy();
    expect(container.querySelector('.bamboo-inner')!.textContent).toEqual('little');

    holder.parentNode?.removeChild(holder);

    errSpy.mockRestore();
  });
});
