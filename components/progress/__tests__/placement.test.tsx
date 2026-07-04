import React from 'react';
import type { MockedFunction } from 'vitest';
import { vi } from 'vitest';

import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Progress from '../progress';
import type { GapPlacement, GapPosition } from '../progress';

type RcCircle = typeof import('@rc-component/progress')['Circle'];

const rcProgressMocks = vi.hoisted(() => ({
  Circle: vi.fn(),
}));

vi.mock('@rc-component/progress', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@rc-component/progress')>();
  const ReactActual = await vi.importActual<typeof import('react')>('react');
  rcProgressMocks.Circle.mockImplementation((props) => {
    return ReactActual.createElement(actual.Circle, props);
  });
  return {
    ...actual,
    Circle: rcProgressMocks.Circle,
  };
});

describe('Progress gap placement', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const mockCircle = rcProgressMocks.Circle as MockedFunction<RcCircle>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockCircle.mockClear();
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
    vi.restoreAllMocks();
    mockCircle.mockClear();
  });

  const demo = (
    direction: 'rtl' | 'ltr',
    props: { gapPlacement?: GapPlacement; gapPosition?: GapPosition },
  ) => {
    return (
      <ConfigProvider direction={direction}>
        <Progress type="dashboard" percent={30} {...props} />
      </ConfigProvider>
    );
  };

  it.each([
    [
      'should transform gapPlacement="start" to "left" in LTR',
      { direction: 'ltr', props: { gapPlacement: 'start' } },
      { gapPosition: 'left' },
      false,
    ],
    [
      'should directly pass gapPosition="top" with warning',
      { direction: 'ltr', props: { gapPosition: 'top' } },
      { gapPosition: 'top' },
      true,
    ],
    [
      'should prioritize gapPlacement over gapPosition',
      { direction: 'ltr', props: { gapPlacement: 'end', gapPosition: 'bottom' } },
      { gapPosition: 'right' },
      true,
    ],
    [
      'should transform gapPlacement="start" to "right" in RTL',
      { direction: 'rtl', props: { gapPlacement: 'start' } },
      { gapPosition: 'right' },
      false,
    ],
    [
      'should use default "bottom" with no placement',
      { direction: 'ltr', props: {} },
      { gapPosition: 'bottom' },
      false,
    ],
  ])('%s', (_, { direction, props }, expected, shouldWarn) => {
    render(
      demo(
        direction as 'rtl' | 'ltr',
        props as { gapPlacement?: GapPlacement; gapPosition?: GapPosition },
      ),
    );
    const lastCallIndex = mockCircle.mock.calls.length - 1;
    const circleProps = mockCircle.mock.calls[lastCallIndex][0];

    expect(circleProps.gapPosition).toBe(expected.gapPosition);

    if (shouldWarn) {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Progress] `gapPosition` is deprecated. Please use `gapPlacement` instead.',
      );
    } else {
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    }
  });
});
