import React from 'react';

import { render } from '../../../tests/utils';
import SliderTooltip from '../SliderTooltip';

let mockForceAlign: jest.Mock;

jest.mock('../../tooltip', () => {
  const ReactReal: typeof React = jest.requireActual('react');
  return {
    __esModule: true,
    default: ReactReal.forwardRef((props: any, ref: any) => {
      ReactReal.useImperativeHandle(ref, () => ({
        forceAlign: mockForceAlign,
      }));
      return <div {...props} />;
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
});
