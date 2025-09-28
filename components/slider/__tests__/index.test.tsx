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

  it('should apply custom styles to Descriptions', () => {
    const customClassNames = {
      root: 'custom-root',
      track: 'custom-track',
      tracks: 'custom-tracks',
      rail: 'custom-rail',
      handle: 'custom-handle',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      track: { backgroundColor: 'black' },
      tracks: { backgroundColor: 'yellow' },
      rail: { backgroundColor: 'purple' },
      handle: { backgroundColor: 'blue' },
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

    const rootElement = container.querySelector('.ant-slider') as HTMLElement;
    const trackElement = container.querySelector('.ant-slider-track') as HTMLElement;
    const tracksElement = container.querySelector('.ant-slider-tracks') as HTMLElement;
    const railElement = container.querySelector('.ant-slider-rail') as HTMLElement;
    const handleElement = container.querySelector('.ant-slider-handle') as HTMLElement;

    // check classNames
    expect(rootElement.classList).toContain('custom-root');
    expect(trackElement.classList).toContain('custom-track');
    expect(tracksElement.classList).toContain('custom-tracks');
    expect(railElement.classList).toContain('custom-rail');
    expect(handleElement.classList).toContain('custom-handle');

    // check styles
    expect(rootElement.style.backgroundColor).toBe('red');
    expect(trackElement.style.backgroundColor).toBe('black');
    expect(tracksElement.style.backgroundColor).toBe('yellow');
    expect(railElement.style.backgroundColor).toBe('purple');
    expect(handleElement.style.backgroundColor).toBe('blue');
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
});
