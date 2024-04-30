import React from 'react';

import Slider from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import type { TooltipProps, TooltipRef } from '../../tooltip';

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

describe('Slider.Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('Correct show the tooltip', async () => {
    const { container } = render(<Slider defaultValue={30} />);

    const handleEle = container.querySelector('.ant-slider-handle')!;

    // Enter
    fireEvent.mouseEnter(handleEle);
    await waitFakeTimer();
    expect(tooltipProps().open).toBeTruthy();

    // Down
    fireEvent.mouseDown(handleEle);
    await waitFakeTimer();
    expect(tooltipProps().open).toBeTruthy();

    // Move(Leave)
    fireEvent.mouseLeave(handleEle);
    await waitFakeTimer();
    expect(tooltipProps().open).toBeTruthy();

    // Up
    fireEvent.mouseUp(handleEle);
    await waitFakeTimer();
    expect(tooltipProps().open).toBeFalsy();
  });

  it('tooltip should not display when formatter is null or open is false', async () => {
    // https://github.com/ant-design/ant-design/issues/48668
    const { container: container1 } = render(
      <Slider defaultValue={30} tooltip={{ formatter: null }} />,
    );
    // https://github.com/ant-design/ant-design/issues/48707
    const { container: container2 } = render(
      <Slider defaultValue={30} tooltip={{ open: false }} />,
    );

    const handler1 = container1.querySelector('.ant-slider-handle')!;
    const handler2 = container2.querySelector('.ant-slider-handle')!;

    // Enter
    fireEvent.mouseEnter(handler1);
    fireEvent.mouseEnter(handler2);
    await waitFakeTimer();
    expect(container1.querySelector('.ant-tooltip-open')).toBeFalsy();
    expect(container2.querySelector('.ant-tooltip-open')).toBeFalsy();

    // Down
    fireEvent.focus(handler1);
    fireEvent.focus(handler2);
    await waitFakeTimer();
    expect(container1.querySelector('.ant-tooltip-open')).toBeFalsy();
    expect(container2.querySelector('.ant-tooltip-open')).toBeFalsy();
  });
});
