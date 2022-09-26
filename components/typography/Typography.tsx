import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import type { DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** @internal */
  component?: keyof JSX.IntrinsicElements;
  ['aria-label']?: string;
  direction?: DirectionType;
}

interface InternalTypographyProps extends TypographyProps {
  component?: keyof JSX.IntrinsicElements;
  /** @deprecated Use `ref` directly if using React 16 */
  setContentRef?: (node: HTMLElement) => void;
}

const Typography: React.ForwardRefRenderFunction<HTMLElement, InternalTypographyProps> = (
  {
    prefixCls: customizePrefixCls,
    component: Component = 'article',
    className,
    'aria-label': ariaLabel,
    setContentRef,
    children,
    direction: typographyDirection,
    ...restProps
  },
  ref,
) => {
  const { getPrefixCls, direction: contextDirection } = React.useContext(ConfigContext);

  const direction = typographyDirection ?? contextDirection;

  let mergedRef = ref;
  if (setContentRef) {
    warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
    mergedRef = composeRef(ref, setContentRef);
  }

  const prefixCls = getPrefixCls('typography', customizePrefixCls);
  const componentClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component className={componentClassName} aria-label={ariaLabel} ref={mergedRef} {...restProps}>
      {children}
    </Component>
  );
};

const RefTypography = React.forwardRef(Typography);
if (process.env.NODE_ENV !== 'production') {
  RefTypography.displayName = 'Typography';
}

// es default export should use const instead of let
export default RefTypography;
