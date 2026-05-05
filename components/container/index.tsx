import React from 'react';
import { mergeProps } from '@rc-component/util';
import clsx from 'clsx';

import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  rootClassName?: string;
  maxWidth?: number | string;
  minWidth?: number | string;
  type?: string;
  name?: string;
}

const defaultProps: Partial<ContainerProps> = {};

export default function Container(props: ContainerProps) {
  const config = useComponentConfig('container');
  const {
    getPrefixCls,
    getPopupContainer,
    renderEmpty,
    direction,
    classNames,
    styles,
    prefixCls: customizePrefixCls,
    maxWidth,
    minWidth,
    type,
    name,
    children,
    ...rest
  } = mergeProps(defaultProps, config, props);

  const prefixCls = getPrefixCls('container', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const isMaxWidthBreakpoint =
    typeof maxWidth === 'string' && responsiveArray.includes(maxWidth as Breakpoint);
  const isMinWidthBreakpoint =
    typeof minWidth === 'string' && responsiveArray.includes(minWidth as Breakpoint);

  return (
    <div
      {...rest}
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-max-width-${maxWidth}`]: isMaxWidthBreakpoint,
          [`${prefixCls}-min-width-${minWidth}`]: isMinWidthBreakpoint,
        },
        hashId,
        cssVarCls,
        config.className,
        props.className,
        props.rootClassName,
      )}
      style={{
        ...config.style,
        ...props.style,
        maxWidth: isMaxWidthBreakpoint ? undefined : maxWidth,
        minWidth: isMinWidthBreakpoint ? undefined : minWidth,
        containerType: type,
        containerName: name,
      }}
    >
      {children}
    </div>
  );
}
