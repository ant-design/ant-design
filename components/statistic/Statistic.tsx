import classNames from 'classnames';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';
import useStyle from './style';
import type { FormatConfig, valueType } from './utils';

export interface StatisticProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const Statistic: React.FC<StatisticProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    loading = false,
    onMouseEnter,
    onMouseLeave,
    decimalSeparator = '.',
    groupSeparator = ',',
  } = props;

  const { getPrefixCls, direction } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('statistic', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const valueNode: React.ReactNode = (
    <StatisticNumber
      decimalSeparator={decimalSeparator}
      groupSeparator={groupSeparator}
      prefixCls={prefixCls}
      {...props}
      value={value}
    />
  );

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  return wrapSSR(
    <div className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <Skeleton paragraph={false} loading={loading} className={`${prefixCls}-skeleton`}>
        <div style={valueStyle} className={`${prefixCls}-content`}>
          {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
          {valueRender ? valueRender(valueNode) : valueNode}
          {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
        </div>
      </Skeleton>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Statistic.displayName = 'Statistic';
}

export default Statistic;
