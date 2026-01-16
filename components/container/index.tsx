import React from 'react';
import clsx from 'clsx';

import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import { ConfigContext, useComponentConfig } from '../config-provider/context';
import useStyle from './style';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  maxWidth?: number | string;
  minWidth?: number | string;
  rootClassName?: string;
}

export default function Container(props: ContainerProps) {
  const {
    maxWidth,
    minWidth,
    children,
    className,
    prefixCls: customizePrefixCls,
    style,
    rootClassName,
    ...rest
  } = props;
  const {
    maxWidth: contextMaxWidth,
    minWidth: contextMinWidth,
    classNames: contextClassName,
  } = useComponentConfig('container');
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('container', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedMaxWidth = maxWidth ?? contextMaxWidth;
  const mergedMinWidth = minWidth ?? contextMinWidth;

  const isMaxWidthBreakpoint =
    typeof mergedMaxWidth === 'string' && responsiveArray.includes(mergedMaxWidth as Breakpoint);
  const isMinWidthBreakpoint =
    typeof mergedMinWidth === 'string' && responsiveArray.includes(mergedMinWidth as Breakpoint);

  const classNames = clsx(
    prefixCls,
    {
      [`${prefixCls}-max-width-${mergedMaxWidth}`]: isMaxWidthBreakpoint,
      [`${prefixCls}-min-width-${mergedMinWidth}`]: isMinWidthBreakpoint,
    },
    hashId,
    cssVarCls,
    contextClassName,
    className,
    rootClassName,
  );

  return (
    <div
      className={classNames}
      style={{
        maxWidth: isMaxWidthBreakpoint ? undefined : mergedMaxWidth,
        minWidth: isMinWidthBreakpoint ? undefined : mergedMinWidth,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
