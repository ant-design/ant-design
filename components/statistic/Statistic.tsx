import * as React from 'react';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import type { HTMLAriaDataAttributes } from '../_util/aria-data-attrs';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';
import useStyle from './style';
import type { FormatConfig, valueType } from './utils';

export type SemanticName = 'root' | 'content' | 'title' | 'header' | 'prefix' | 'suffix';
export type StatisticClassNamesType = SemanticClassNamesType<StatisticProps, SemanticName>;
export type StatisticStylesType = SemanticStylesType<StatisticProps, SemanticName>;
export interface StatisticRef {
  nativeElement: HTMLDivElement;
}

interface StatisticReactProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  classNames?: StatisticClassNamesType;
  styles?: StatisticStylesType;
  rootClassName?: string;
  style?: React.CSSProperties;
  value?: valueType;
  /** @deprecated Please use `styles.content` instead */
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

const Statistic = React.forwardRef<StatisticRef, StatisticProps>((props, ref) => {
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
    classNames,
    ...rest
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('statistic');

  const prefixCls = getPrefixCls('statistic', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedProps: StatisticProps = {
    ...props,
    decimalSeparator,
    groupSeparator,
    loading,
    value,
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    StatisticClassNamesType,
    StatisticStylesType,
    StatisticProps
  >([contextClassNames, classNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Statistic');

    [['valueStyle', 'styles.content']].forEach(([deprecatedName, newName]) => {
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

  const rootClassNames = clsx(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    contextClassName,
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
  );

  const headerClassNames = clsx(`${prefixCls}-header`, mergedClassNames.header);

  const titleClassNames = clsx(`${prefixCls}-title`, mergedClassNames.title);

  const contentClassNames = clsx(`${prefixCls}-content`, mergedClassNames.content);

  const prefixClassNames = clsx(`${prefixCls}-content-prefix`, mergedClassNames.prefix);

  const suffixClassNames = clsx(`${prefixCls}-content-suffix`, mergedClassNames.suffix);

  const internalRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current!,
  }));

  const restProps = pickAttrs(rest, { aria: true, data: true });

  return (
    <div
      {...restProps}
      className={rootClassNames}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      ref={internalRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {title && (
        <div className={headerClassNames} style={mergedStyles.header}>
          <div className={titleClassNames} style={mergedStyles.title}>
            {title}
          </div>
        </div>
      )}
      <Skeleton paragraph={false} loading={loading} className={`${prefixCls}-skeleton`}>
        <div className={contentClassNames} style={{ ...valueStyle, ...mergedStyles.content }}>
          {prefix && (
            <span className={prefixClassNames} style={mergedStyles.prefix}>
              {prefix}
            </span>
          )}
          {valueRender ? valueRender(valueNode) : valueNode}
          {suffix && (
            <span className={suffixClassNames} style={mergedStyles.suffix}>
              {suffix}
            </span>
          )}
        </div>
      </Skeleton>
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Statistic.displayName = 'Statistic';
}

export default Statistic;
