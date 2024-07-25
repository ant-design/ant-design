import * as React from 'react';

import useForceUpdate from '../_util/hooks/useForceUpdate';
import { cloneElement } from '../_util/reactNode';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';
import type { valueType } from './utils';
import { formatCountdown } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

export interface CountdownProps extends StatisticProps {
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: valueType) => void;
}

function getTime(value?: valueType) {
  return new Date(value as valueType).getTime();
}

const Countdown: React.FC<CountdownProps> = (props) => {
  const { value, format = 'HH:mm:ss', onChange, onFinish, ...rest } = props;

  const forceUpdate = useForceUpdate();

  const countdown = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTimer = () => {
    onFinish?.();
    if (countdown.current) {
      clearInterval(countdown.current);
      countdown.current = null;
    }
  };

  const syncTimer = () => {
    const timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      countdown.current = setInterval(() => {
        forceUpdate();
        onChange?.(timestamp - Date.now());
        if (timestamp < Date.now()) {
          stopTimer();
        }
      }, REFRESH_INTERVAL);
    }
  };

  React.useEffect(() => {
    syncTimer();
    return () => {
      if (countdown.current) {
        clearInterval(countdown.current);
        countdown.current = null;
      }
    };
  }, [value]);

  const formatter: StatisticProps['formatter'] = (formatValue, config) =>
    formatCountdown(formatValue, { ...config, format });

  const valueRender: StatisticProps['valueRender'] = (node) =>
    cloneElement(node, { title: undefined });

  return <Statistic {...rest} value={value} valueRender={valueRender} formatter={formatter} />;
};

export default React.memo(Countdown);
