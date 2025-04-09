import * as React from 'react';

import useForceUpdate from '../_util/hooks/useForceUpdate';
import type { FormatConfig, valueType } from './utils';
import type { StatisticProps } from './Statistic';
import { formatCounter } from './utils';
import { cloneElement } from '../_util/reactNode';
import Statistic from './Statistic';

export type TimerType = 'countdown' | 'countup';

const REFRESH_INTERVAL = 1000 / 30;

export interface StatisticTimerProps extends FormatConfig, StatisticProps {
  type: TimerType;
  format?: string;
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

  React.useEffect(() => {
    const timestamp = getTime(value);
    const now = Date.now();
    let counter: NodeJS.Timeout;

    if ((down && timestamp >= now) || (!down && timestamp <= now)) {
      counter = setInterval(() => {
        const now = Date.now();
        forceUpdate();
        const timeDiff = !down ? now - timestamp : timestamp - now;
        onChange?.(timeDiff);
        if (down && timestamp < now) {
          onFinish?.();
          if (counter) {
            clearInterval(counter);
          }
        }
      }, REFRESH_INTERVAL);
    }

    return () => {
      if (counter) {
        clearInterval(counter);
      }
    };
  }, [value]);

  const formatter: StatisticProps['formatter'] = (formatValue, config) =>
    formatCounter(formatValue, { ...config, format }, down);

  const valueRender: StatisticProps['valueRender'] = (node) =>
    cloneElement(node, { title: undefined });

  return <Statistic {...rest} value={value} valueRender={valueRender} formatter={formatter} />;
};

export default StatisticTimer;
