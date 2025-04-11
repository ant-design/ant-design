import * as React from 'react';
import { useEvent } from 'rc-util';
import raf from 'rc-util/lib/raf';

import useForceUpdate from '../_util/hooks/useForceUpdate';
import { cloneElement } from '../_util/reactNode';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';
import type { FormatConfig, valueType } from './utils';
import { formatCounter } from './utils';

export type TimerType = 'countdown' | 'countup';

export interface StatisticTimerProps extends FormatConfig, StatisticProps {
  type: TimerType;
  format?: string;
  /**
   * Only to be called when the type is `countdown`.
   */
  onFinish?: () => void;
  onChange?: (value?: valueType) => void;
}

function getTime(value?: valueType) {
  return new Date(value as valueType).getTime();
}

const StatisticTimer: React.FC<StatisticTimerProps> = (props) => {
  const { value, format = 'HH:mm:ss', onChange, onFinish, type, ...rest } = props;
  const down = type === 'countdown';

  const forceUpdate = useForceUpdate();

  // ======================== Update ========================
  const update = useEvent(() => {
    const now = Date.now();
    const timestamp = getTime(value);

    forceUpdate();
    const timeDiff = !down ? now - timestamp : timestamp - now;

    onChange?.(timeDiff);

    // Only countdown will trigger `onFinish`
    if (down && timestamp < now) {
      onFinish?.();
      return false;
    }
    return true;
  });

  // Effect trigger
  React.useEffect(() => {
    let rafId: number;

    const clear = () => raf.cancel(rafId!);

    const rafUpdate = () => {
      rafId = raf(() => {
        if (update()) {
          rafUpdate();
        }
      });
    };

    rafUpdate();

    return clear;
  }, [value, down]);

  // ======================== Format ========================
  const formatter: StatisticProps['formatter'] = (formatValue, config) =>
    formatCounter(formatValue, { ...config, format }, down);

  const valueRender: StatisticProps['valueRender'] = (node) =>
    cloneElement(node, { title: undefined });

  // ======================== Render ========================
  return <Statistic {...rest} value={value} valueRender={valueRender} formatter={formatter} />;
};

export default StatisticTimer;
