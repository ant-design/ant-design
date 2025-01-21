import * as React from 'react';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import classNames from 'classnames';

import type { HTMLAriaDataAttributes } from '../_util/aria-data-attrs';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';
import useStyle from './style';
import type { FormatConfig, valueType } from './utils';

export type SemanticName = 'root' | 'content' | 'title' | 'header' | 'prefix' | 'suffix';
interface StatisticReactProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  rootClassName?: string;
  style?: React.CSSProperties;
  value?: valueType;
  /** @deprecated Please use `styles={{ content: { } }}` instead */
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
    styles,
    classNames: statisticClassNames,
    ...rest
  } = props;

  const { getPrefixCls, direction, statistic } =
    React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('statistic', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Statistic');

    [['valueStyle', 'styles={{ content: { } }}']].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

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

  const rootClassNames = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    statistic?.className,
    className,
    rootClassName,
    statistic?.classNames?.root,
    statisticClassNames?.root,
    hashId,
    cssVarCls,
  );

  const headerClassNames = classNames(
    `${prefixCls}-header`,
    statistic?.classNames?.header,
    statisticClassNames?.header,
  );

  const titleClassNames = classNames(
    `${prefixCls}-title`,
    statistic?.classNames?.title,
    statisticClassNames?.title,
  );

  const contentClassNames = classNames(
    `${prefixCls}-content`,
    statistic?.classNames?.content,
    statisticClassNames?.content,
  );

  const prefixClassNames = classNames(
    `${prefixCls}-content-prefix`,
    statistic?.classNames?.prefix,
    statisticClassNames?.prefix,
  );

  const suffixClassNames = classNames(
    `${prefixCls}-content-suffix`,
    statistic?.classNames?.suffix,
    statisticClassNames?.suffix,
  );

  const restProps = pickAttrs(rest, { aria: true, data: true });

  return wrapCSSVar(
    <div
      {...restProps}
      className={rootClassNames}
      style={{ ...statistic?.styles?.root, ...styles?.root, ...statistic?.style, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {title && (
        <div
          className={headerClassNames}
          style={{ ...statistic?.styles?.header, ...styles?.header }}
        >
          <div
            className={titleClassNames}
            style={{ ...statistic?.styles?.title, ...styles?.title }}
          >
            {title}
          </div>
        </div>
      )}
      <Skeleton paragraph={false} loading={loading} className={`${prefixCls}-skeleton`}>
        <div
          className={contentClassNames}
          style={{ ...valueStyle, ...statistic?.styles?.content, ...styles?.content }}
        >
          {prefix && (
            <span
              className={prefixClassNames}
              style={{ ...statistic?.styles?.prefix, ...styles?.prefix }}
            >
              {prefix}
            </span>
          )}
          {valueRender ? valueRender(valueNode) : valueNode}
          {suffix && (
            <span
              className={suffixClassNames}
              style={{ ...statistic?.styles?.suffix, ...styles?.suffix }}
            >
              {suffix}
            </span>
          )}
        </div>
      </Skeleton>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Statistic.displayName = 'Statistic';
}

export default Statistic;
