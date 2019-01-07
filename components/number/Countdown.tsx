import * as React from 'react';
import Number, { NumberProps } from './Number';
import { formatCountdown, valueType, FormatConfig } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

interface CountdownProps extends NumberProps {
  format?: string;
}

export default class Countdown extends React.Component<CountdownProps, {}> {
  countdownId: number | undefined = undefined;

  componentDidMount() {
    this.countdownId = window.setInterval(() => {
      this.forceUpdate();
    }, REFRESH_INTERVAL);
  }
  componentWillUnmount() {
    clearInterval(this.countdownId);
  }

  formatCountdown = (value: valueType, config: FormatConfig) => {
    const { format = 'HH:mm:ss' } = this.props;
    return formatCountdown(value, { ...config, format });
  };

  render() {
    return <Number {...this.props} formatter={this.formatCountdown} />;
  }
}
