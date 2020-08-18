import * as React from 'react';
import Statistic, { StatisticProps } from './Statistic';
import { countdownValueType, formatTimeStr } from './utils';
import { cloneElement } from '../_util/reactNode';

const REFRESH_INTERVAL = 1000 / 30;

interface CountdownProps extends StatisticProps {
  value?: countdownValueType;
  format?: string;
  onFinish?: () => void;
  autoStart?: boolean;
}

function getTime(value?: countdownValueType) {
  return new Date(value as any).getTime();
}

const InternalCountdown: React.ForwardRefRenderFunction<unknown, CountdownProps> = (props, ref) => {
  const { format = '', autoStart } = props;
  const [countdownId, setCountdownId] = React.useState<number>();
  const [pauseTime, setPauseTime] = React.useState<number>();
  const [totalPauseTime, setTotalPauseTime] = React.useState<number>(0);
  const [, forceUpdate] = React.useState({});

  const startTimer = () => {
    if (countdownId) return;
    if (pauseTime) setTotalPauseTime(totalPauseTime + Date.now() - pauseTime);
    setCountdownId(window.setInterval(() => {
      forceUpdate({});
    }, REFRESH_INTERVAL));
  };

  const stopTimer = () => {
    const { onFinish, value } = props;
    if (countdownId) {
      clearInterval(countdownId);
      setCountdownId(undefined);

      const timestamp = getTime(value);
      if (onFinish && timestamp < Date.now()) {
        onFinish();
      }
    }
  };

  const syncTimer = () => {
    const { value } = props;

    const timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  React.useEffect(() => {
    if (autoStart) {
      syncTimer();
    } else {
      setPauseTime(Date.now());
    }

    return stopTimer;
  }, []);

  React.useImperativeHandle(ref, () => ({
    start: startTimer,
    pause: () => {
      if (!countdownId) return;
      setPauseTime(Date.now());
      clearInterval(countdownId);
      setCountdownId(undefined);
    },
  }));

  const formatter = (value: countdownValueType) => {
    const target = new Date(value).getTime();
    const current = Date.now();
    const diff = Math.max(target - current + totalPauseTime, 0);

    return formatTimeStr(diff, format);
  };

  const valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, {
      title: undefined,
    });

  return <Statistic valueRender={valueRender} {...props} formatter={formatter}/>;
};

const Countdown = React.forwardRef<unknown, CountdownProps>(InternalCountdown);
Countdown.displayName = 'Countdown';
Countdown.defaultProps = {
  format: 'HH:mm:ss',
  autoStart: true,
};

export default Countdown;
