import * as React from 'react';
import Statistic, { StatisticProps } from './Statistic';
import { formatCountdown, countdownValueType, FormatConfig } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

interface CountdownProps extends StatisticProps {
  value?: countdownValueType;
  format?: string;
}

export default class Countdown extends React.Component<CountdownProps, {}> {
  static defaultProps: Partial<CountdownProps> = {
    format: 'HH:mm:ss',
  };

  countdownId?: number = undefined;

  componentDidMount() {
    this.countdownId = window.setInterval(() => {
      this.forceUpdate();
    }, REFRESH_INTERVAL);
  }
  componentWillUnmount() {
    clearInterval(this.countdownId);
    this.countdownId = undefined;
  }

  formatCountdown = (value: countdownValueType, config: FormatConfig) => {
    const { format } = this.props;
    return formatCountdown(value, { ...config, format });
  };

  render() {
    return <Statistic {...this.props} formatter={this.formatCountdown} />;
  }
}
