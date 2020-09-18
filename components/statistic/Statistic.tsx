import * as React from 'react';
import classNames from 'classnames';
// import { LoadingOutlined } from '@ant-design/icons';

import { ConfigConsumerProps } from '../config-provider';
import { withConfigConsumer } from '../config-provider/context';
import Spin, { SpinProps } from '../spin';
import StatisticNumber from './Number';
import Countdown from './Countdown';
import { valueType, FormatConfig } from './utils';

interface StatisticComponent {
  Countdown: typeof Countdown;
}

export interface StatisticProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean | SpinProps;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const Statistic: React.FC<StatisticProps & ConfigConsumerProps> = props => {
  const {
    prefixCls,
    className,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    loading,
    direction,
    onMouseEnter,
    onMouseLeave,
  } = props;
  let spinProps: SpinProps = { spinning: false };
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading,
    };
  } else if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading,
    };
  }
  const valueNode = spinProps.spinning ? (
    <Spin {...spinProps} />
  ) : (
    <StatisticNumber {...props} value={value} />
  );
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  return (
    <div className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <div style={valueStyle} className={`${prefixCls}-content`}>
        {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
        {valueRender ? valueRender(valueNode) : valueNode}
        {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
      </div>
    </div>
  );
};

Statistic.defaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
};

const WrapperStatistic = withConfigConsumer<StatisticProps>({
  prefixCls: 'statistic',
})<StatisticComponent>(Statistic);

export default WrapperStatistic;
