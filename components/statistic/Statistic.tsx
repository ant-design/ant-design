import classNames from 'classnames';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';
import useStyle from './style';
import type { FormatConfig, valueType } from './utils';

type StatisticHTMLAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

interface StatisticReactProps extends FormatConfig {
  prefixCls?: string;
  rootClassName?: string;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
}

export type StatisticProps = StatisticHTMLAttributes & StatisticReactProps;

const Statistic: React.FC<StatisticProps & StatisticHTMLAttributes> = (props) => {
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
    /* --- FormatConfig starts --- */
    formatter,
    precision,
    decimalSeparator = '.',
    groupSeparator = ',',
    /* --- FormatConfig starts --- */
    ...rest
  } = props;

  const { getPrefixCls, direction, statistic } =
    React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('statistic', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const valueNode: React.ReactNode = (
    <StatisticNumber
      decimalSeparator={decimalSeparator}
      groupSeparator={groupSeparator}
      prefixCls={prefixCls}
      formatter={formatter}
      precision={precision}
      value={value}
    />
  );

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    statistic?.className,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  return wrapCSSVar(
    <div {...rest} className={cls} style={{ ...statistic?.style, ...style }}>
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
