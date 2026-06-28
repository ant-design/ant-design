import React from 'react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

import { render } from '../../../tests/utils';
import type { TooltipRef } from '../../tooltip';
import SliderTooltip from '../SliderTooltip';

let mockForceAlign: Mock;

vi.mock('../../tooltip', async () => {
  const ReactReal = await vi.importActual<typeof import('react')>('react');
  return {
    default: ReactReal.forwardRef<Partial<TooltipRef>, React.HTMLAttributes<HTMLDivElement>>(
      (props, ref) => {
        ReactReal.useImperativeHandle(ref, () => ({
          forceAlign: mockForceAlign,
        }));
        return <div {...props} />;
      },
    ),
  };
});

describe('SliderTooltip', () => {
  beforeEach(() => {
    mockForceAlign = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('calls forceAlign when mergedOpen is true and value changes', () => {
    const { rerender } = render(<SliderTooltip open draggingDelete={false} value={1} />);

    vi.runAllTimers();
    expect(mockForceAlign).toHaveBeenCalledTimes(1);

    rerender(<SliderTooltip open draggingDelete={false} value={2} />);
    vi.runAllTimers();
    expect(mockForceAlign).toHaveBeenCalledTimes(2);
  });

  it('does not call forceAlign when mergedOpen is false and value changes', () => {
    const { rerender } = render(<SliderTooltip open={false} value={1} />);

    vi.runAllTimers();
    expect(mockForceAlign).not.toHaveBeenCalled();

    rerender(<SliderTooltip open={false} value={2} />);
    vi.runAllTimers();
    expect(mockForceAlign).not.toHaveBeenCalled();

    rerender(<SliderTooltip open draggingDelete value={3} />);
    vi.runAllTimers();
    expect(mockForceAlign).not.toHaveBeenCalled();
  });
});
