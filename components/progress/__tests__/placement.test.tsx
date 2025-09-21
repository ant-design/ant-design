import React from 'react';
import { Circle } from '@rc-component/progress';
import { ConfigProvider } from 'antd';

import { render } from '../../../tests/utils';
import Progress from '../progress';
import type { GapPlacement, GapPosition } from '../progress';

jest.mock('@rc-component/progress', () => {
  const ActualCircle = jest.requireActual('@rc-component/progress').Circle;
  return {
    ...jest.requireActual('@rc-component/progress'),
    Circle: jest.fn().mockImplementation((props) => {
      return <ActualCircle {...props} />;
    }),
  };
});

describe('Progress gap placement', () => {
  let consoleErrorSpy: jest.SpyInstance;
  const mockCircle = Circle as jest.MockedFunction<typeof Circle>;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockCircle.mockClear();
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
    jest.restoreAllMocks();
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
