import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Countdown from './Countdown';
import { valueType, FormatConfig, formatValue } from './utils';

const REFRESH_INTERVAL = 200;

interface NumberComponent {
  Countdown?: typeof Countdown;
};

export type NumberProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  title?: string;
  unit?: string;
} & FormatConfig;

interface NumberState {}

class Number extends React.Component<NumberProps & ConfigConsumerProps, NumberState> {
  // static getDerivedStateFromProps(nextProps: NumberProps, prevState: NumberState) {

  // }

  countdownId: number | undefined = undefined;

  componentDidMount() {
    this.checkCountDown({});
  }
  componentDidUpdate(prevProps: NumberProps) {
    this.checkCountDown(prevProps);
  }
  componentWillUnmount() {
    this.stopCountdown();
  }

  getValue() {
    const { value = 0 } = this.props;
    return formatValue(value, this.props);
  }

  // Only check in client side
  checkCountDown({ formatter: prevFormatter }: NumberProps) {
    const { formatter } = this.props;

    if (formatter === 'countdown' && prevFormatter !== formatter) {
      this.startCountdown();
    } else if (prevFormatter === 'countdown' && prevFormatter !== formatter) {
      this.stopCountdown();
    }
  }

  startCountdown() {
    this.countdownId = window.setInterval(() => {
      this.forceUpdate();
    }, REFRESH_INTERVAL);
  }
  stopCountdown() {
    clearInterval(this.countdownId);
  }

  render() {
    const { prefixCls, className, style, title, unit } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <div aria-hidden="true" className={`${prefixCls}-title`}>
          {title}
        </div>
        <div aria-label={title} className={`${prefixCls}-value`}>
          {this.getValue()}
          {unit && <span className={`${prefixCls}-value-unit`}>{unit}</span>}
        </div>
      </div>
    );
  }
}

polyfill(Number);

const WrapperNumber = withConfigConsumer<NumberProps>({
  prefixCls: 'number',
})<NumberComponent>(Number);

export default WrapperNumber;
