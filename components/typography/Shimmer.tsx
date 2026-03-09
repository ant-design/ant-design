import * as React from 'react';
import type { JSX } from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface ShimmerProps<C extends keyof JSX.IntrinsicElements = 'span'>
  extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Animation duration in seconds */
  duration?: number;
  /** Whether to disable animation */
  disabled?: boolean;
  prefixCls?: string;
  /** The element type to render */
  component?: C;
}

type InternalShimmerProps = ShimmerProps<keyof JSX.IntrinsicElements>;

const Shimmer = React.forwardRef<HTMLElement, InternalShimmerProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    component: Component = 'span',
    children,
    duration = 2,
    disabled,
    style,
    className,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('typography', customizePrefixCls);

  // Inject style
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // CSS variable for duration control
  const mergedStyle: React.CSSProperties = {
    ...style,
    ['--ant-typography-shimmer-duration' as string]: `${duration}s`,
  };

  const cls = clsx(
    prefixCls,
    `${prefixCls}-shimmer`,
    hashId,
    cssVarCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-shimmer-disabled`]: disabled,
    },
    className,
  );

  return (
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component
      {...restProps}
      ref={ref}
      className={cls}
      style={mergedStyle}
      aria-busy={!disabled}
      aria-disabled={disabled}
    >
      {children}
    </Component>
  );
});

export default Shimmer;
