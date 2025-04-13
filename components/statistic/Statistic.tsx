import * as React from 'react';
import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';

import type { HTMLAriaDataAttributes } from '../_util/aria-data-attrs';
import { useComponentConfig } from '../config-provider/context';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';
import useStyle from './style';
import type { FormatConfig, valueType } from './utils';

interface StatisticReactProps extends FormatConfig {
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

export type StatisticProps = HTMLAriaDataAttributes & StatisticReactProps;

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
    /* --- FormatConfig starts --- */
    formatter,
    precision,
    decimalSeparator = '.',
    groupSeparator = ',',
    /* --- FormatConfig starts --- */
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('statistic');

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
    contextClassName,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  const restProps = pickAttrs(rest, { aria: true, data: true });

  return wrapCSSVar(
    <div
      {...restProps}
      className={cls}
      style={{ ...contextStyle, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
