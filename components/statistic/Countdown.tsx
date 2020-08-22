import * as React from 'react';
import Statistic, { StatisticProps } from './Statistic';
import { countdownValueType, formatTimeStr } from './utils';
import { cloneElement } from '../_util/reactNode';
import useForceUpdate from '../_util/hooks/useForceUpdate';

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
  const { format = '', autoStart, value, onFinish } = props;
  const [countdownId, setCountdownId] = React.useState<number>();
  const [pauseTime, setPauseTime] = React.useState<number>();
  const [totalPauseTime, setTotalPauseTime] = React.useState<number>(0);
  const forceUpdate = useForceUpdate();

  const startTimer = () => {
    if (countdownId) return;
    if (pauseTime) setTotalPauseTime(totalPauseTime + Date.now() - pauseTime);
    setCountdownId(
      window.setInterval(() => {
        forceUpdate();
      }, REFRESH_INTERVAL),
    );
  };

  const stopTimer = (forceStop = false) => {
    const timestamp = getTime(value);
    const finish = timestamp + totalPauseTime < Date.now();
    if ((countdownId && finish) || forceStop) {
      clearInterval(countdownId);
      setCountdownId(undefined);
      if (onFinish && finish) onFinish();
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
    if (autoStart) {
      syncTimer();
    } else {
      setPauseTime(Date.now());
    }
    return () => stopTimer(true);
  }, []);

  React.useEffect(() => {
    stopTimer();
  });

  React.useImperativeHandle(ref, () => ({
    start: startTimer,
    pause: () => {
      if (!countdownId) return;
      setPauseTime(Date.now());
      clearInterval(countdownId);
      setCountdownId(undefined);
    },
    isPause: !countdownId,
  }));

  const formatter = (countdownValue: countdownValueType) => {
    const target = new Date(countdownValue).getTime();
    const current = Date.now();
    const diff = Math.max(target - current + totalPauseTime, 0);

    return formatTimeStr(diff, format);
  };

  const valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, {
      title: undefined,
    });

  return <Statistic valueRender={valueRender} {...props} formatter={formatter} />;
};

const Countdown = React.forwardRef<unknown, CountdownProps>(InternalCountdown);
Countdown.displayName = 'Countdown';
Countdown.defaultProps = {
  format: 'HH:mm:ss',
  autoStart: true,
};

export default Countdown;
