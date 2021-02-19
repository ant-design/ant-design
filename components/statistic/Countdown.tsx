import * as React from 'react';
import Statistic, { StatisticProps } from './Statistic';
import { formatCountdown, countdownValueType, FormatConfig } from './utils';
import { cloneElement } from '../_util/reactNode';

const REFRESH_INTERVAL = 1000 / 30;

interface CountdownProps extends StatisticProps {
  value?: countdownValueType;
  format?: string;
  onFinish?: () => void;
}

function getTime(value?: countdownValueType) {
  return new Date(value as any).getTime();
}

class Countdown extends React.Component<CountdownProps, {}> {
  static defaultProps: Partial<CountdownProps> = {
    format: 'HH:mm:ss',
  };

  countdownId?: number;

  componentDidMount() {
    this.syncTimer();
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
      if (timestamp < Date.now()) {
        onFinish?.();
      }
    }
  };

  formatCountdown = (value: countdownValueType, config: FormatConfig) => {
    const { format } = this.props;
    return formatCountdown(value, { ...config, format });
  };

  // Countdown do not need display the timestamp
  valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, {
      title: undefined,
    });

  render() {
    return (
      <Statistic valueRender={this.valueRender} {...this.props} formatter={this.formatCountdown} />
    );
  }
}

export default Countdown;
