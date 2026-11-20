import * as React from 'react';

import Statistic from '..';
import type { CountdownProps, StatisticTimerProps } from '..';

describe('Statistic.typescript', () => {
  it('Timer supports numeric onChange callbacks', () => {
    const onChange: StatisticTimerProps['onChange'] = (value: number) => value.toFixed(0);
    const timer = <Statistic.Timer type="countdown" onChange={onChange} />;
    const inferredTimer = <Statistic.Timer type="countup" onChange={(value) => value.toFixed(0)} />;

    expect(timer).toBeTruthy();
    expect(inferredTimer).toBeTruthy();
  });

  it('Countdown supports numeric onChange callbacks', () => {
    const onChange: CountdownProps['onChange'] = (value: number) => value.toFixed(0);
    const countdown = <Statistic.Countdown onChange={onChange} />;
    const inferredCountdown = <Statistic.Countdown onChange={(value) => value.toFixed(0)} />;

    expect(countdown).toBeTruthy();
    expect(inferredCountdown).toBeTruthy();
  });
});
