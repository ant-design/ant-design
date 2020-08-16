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

class Countdown extends React.Component<CountdownProps, {}> {
  static defaultProps: Partial<CountdownProps> = {
    format: 'HH:mm:ss',
    autoStart: true,
  };

  private countdownId?: number;

  private pauseTime: number;

  private totalPauseTime: number = 0;

  componentDidMount() {
    if (this.props.autoStart) {
      this.syncTimer();
    } else {
      this.pauseTime = Date.now();
    }
  }

  componentDidUpdate() {
    this.syncTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  syncTimer = () => {
    const { value } = this.props;

    const timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  };

  startTimer = () => {
    if (this.countdownId) return;
    if (this.pauseTime) this.totalPauseTime += Date.now() - this.pauseTime;
    this.countdownId = window.setInterval(() => {
      this.forceUpdate();
    }, REFRESH_INTERVAL);
  };

  stopTimer = () => {
    const { onFinish, value } = this.props;
    if (this.countdownId) {
      clearInterval(this.countdownId);
      this.countdownId = undefined;

      const timestamp = getTime(value);
      if (onFinish && timestamp < Date.now()) {
        onFinish();
      }
    }
  };

  public start = () => this.startTimer();

  public pause = () => {
    if (!this.countdownId) return;
    this.pauseTime = Date.now();
    clearInterval(this.countdownId);
    this.countdownId = undefined;
  };

  formatter = (value: countdownValueType) => {
    const { format = '' } = this.props;
    const target = new Date(value).getTime();
    const current = Date.now();
    const diff = Math.max(target - current + this.totalPauseTime, 0);

    return formatTimeStr(diff, format);
  };

  // Countdown do not need display the timestamp
  valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, {
      title: undefined,
    });

  render() {
    return <Statistic valueRender={this.valueRender} {...this.props} formatter={this.formatter} />;
  }
}

export default Countdown;
