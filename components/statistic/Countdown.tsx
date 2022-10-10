/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { cloneElement } from '../_util/reactNode';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';
import type { countdownValueType, FormatConfig, valueType } from './utils';
import { formatCountdown } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

interface CountdownProps extends StatisticProps {
  value?: countdownValueType;
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: countdownValueType) => void;
}

function getTime(value?: countdownValueType) {
  return new Date(value as valueType).getTime();
}

const Countdown: React.FC<CountdownProps> = props => {
  const { value, format = 'HH:mm:ss', onFinish, onChange } = props;

  const forceUpdate = useForceUpdate();

  const countdown = React.useRef<NodeJS.Timer | null>(null);

  const startTimer = () => {
    if (countdown.current) {
      return;
    }
    const timestamp = getTime(value);

    countdown.current = setInterval(() => {
      forceUpdate();
      if (timestamp > Date.now()) {
        onChange?.(timestamp - Date.now());
      }
    }, REFRESH_INTERVAL);
  };

  const stopTimer = () => {
    if (countdown.current) {
      clearInterval(countdown.current);
      countdown.current = null;
      const timestamp = getTime(value);

      if (timestamp < Date.now()) {
        onFinish?.();
      }
    }
  };

  const syncTimer = () => {
    const timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  React.useEffect(() => {
    syncTimer();
    return () => {
      stopTimer();
    };
  }, [props]);

  const formatter = (value: countdownValueType, config: FormatConfig) =>
    formatCountdown(value, { ...config, format });

  const valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, { title: undefined });

  return <Statistic {...props} valueRender={valueRender} formatter={formatter} />;
};

export default Countdown;
