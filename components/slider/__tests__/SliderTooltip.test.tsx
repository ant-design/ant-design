import React from 'react';

import { render } from '../../../tests/utils';
import type { TooltipProps, TooltipRef } from '../../tooltip';
import SliderTooltip from '../SliderTooltip';

let mockForceAlign: jest.Mock;
let mockTooltipProps: TooltipProps;

jest.mock('../../tooltip', () => {
  const ReactReal: typeof React = jest.requireActual('react');
  return {
    __esModule: true,
    default: ReactReal.forwardRef<Partial<TooltipRef>, TooltipProps>((props, ref) => {
      mockTooltipProps = props;
      ReactReal.useImperativeHandle(ref, () => ({
        forceAlign: mockForceAlign,
      }));
      return <div />;
    }),
  };
});

describe('SliderTooltip', () => {
  beforeEach(() => {
    mockForceAlign = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('calls forceAlign when mergedOpen is true and value changes', () => {
    const { rerender } = render(<SliderTooltip open draggingDelete={false} value={1} />);

    jest.runAllTimers();
    expect(mockForceAlign).toHaveBeenCalledTimes(1);

    rerender(<SliderTooltip open draggingDelete={false} value={2} />);
    jest.runAllTimers();
    expect(mockForceAlign).toHaveBeenCalledTimes(2);
  });

  it('does not call forceAlign when mergedOpen is false and value changes', () => {
    const { rerender } = render(<SliderTooltip open={false} value={1} />);

    jest.runAllTimers();
    expect(mockForceAlign).not.toHaveBeenCalled();

    rerender(<SliderTooltip open={false} value={2} />);
    jest.runAllTimers();
    expect(mockForceAlign).not.toHaveBeenCalled();

    rerender(<SliderTooltip open draggingDelete value={3} />);
    jest.runAllTimers();
    expect(mockForceAlign).not.toHaveBeenCalled();
  });

  it('uses viewport-priority overflow adjustment by default', () => {
    render(<SliderTooltip open />);

    expect(mockTooltipProps.autoAdjustOverflow).toEqual({
      adjustX: 1,
      adjustY: 1,
      shiftX: true,
      shiftY: true,
    });
  });

  it('preserves disabled overflow adjustment', () => {
    render(<SliderTooltip open autoAdjustOverflow={false} />);

    expect(mockTooltipProps.autoAdjustOverflow).toBe(false);
  });
});
