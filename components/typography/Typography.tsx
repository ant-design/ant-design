import * as React from 'react';
import type { JSX } from 'react';
import classNames from 'classnames';
import { composeRef } from 'rc-util/lib/ref';

import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style';

export interface TypographyProps<C extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** @internal */
  component?: C;
  'aria-label'?: string;
  direction?: DirectionType;
}

interface InternalTypographyProps<C extends keyof JSX.IntrinsicElements>
  extends TypographyProps<C> {
  /** @deprecated Use `ref` directly if using React 16 */
  setContentRef?: (node: HTMLElement) => void;
}

const Typography = React.forwardRef<
  HTMLElement,
  InternalTypographyProps<keyof JSX.IntrinsicElements>
>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    component: Component = 'article',
    className,
    rootClassName,
    setContentRef,
    children,
    direction: typographyDirection,
    style,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('typography');

  const direction = typographyDirection ?? contextDirection;
  const mergedRef = setContentRef ? composeRef(ref, setContentRef) : ref;
  const prefixCls = getPrefixCls('typography', customizePrefixCls);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Typography');
    warning.deprecated(!setContentRef, 'setContentRef', 'ref');
  }

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const componentClassName = classNames(
    prefixCls,
    contextClassName,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  return wrapCSSVar(
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component className={componentClassName} style={mergedStyle} ref={mergedRef} {...restProps}>
      {children}
    </Component>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}

export default Typography;
