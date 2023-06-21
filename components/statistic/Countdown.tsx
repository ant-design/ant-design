import * as React from 'react';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { cloneElement } from '../_util/reactNode';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';
import type { valueType, FormatConfig } from './utils';
import { formatCountdown } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

export interface CountdownProps extends StatisticProps {
  value?: valueType;
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: valueType) => void;
}

function getTime(value?: valueType) {
  return new Date(value as valueType).getTime();
}

const Countdown: React.FC<CountdownProps> = (props) => {
  const { value, format = 'HH:mm:ss', onChange, onFinish } = props;

  const forceUpdate = useForceUpdate();

  const countdown = React.useRef<NodeJS.Timer | null>(null);

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

  const formatter = (formatValue: valueType, config: FormatConfig) =>
    formatCountdown(formatValue, { ...config, format });

  const valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, { title: undefined });

  return <Statistic {...props} valueRender={valueRender} formatter={formatter} />;
};

export default React.memo(Countdown);
