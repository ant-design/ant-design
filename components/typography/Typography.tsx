import * as React from 'react';
import type { JSX } from 'react';
import classNames from 'classnames';
import type { ConfigConsumerProps, DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
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
  extends TypographyProps<C> {}

const Typography = React.forwardRef<
  HTMLElement,
  InternalTypographyProps<keyof JSX.IntrinsicElements>
>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    component: Component = 'article',
    className,
    rootClassName,
    children,
    direction: typographyDirection,
    style,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction: contextDirection,
    typography,
  } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const direction = typographyDirection ?? contextDirection;
  const prefixCls = getPrefixCls('typography', customizePrefixCls);

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const componentClassName = classNames(
    prefixCls,
    typography?.className,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...typography?.style, ...style };

  return wrapCSSVar(
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component className={componentClassName} style={mergedStyle} ref={ref} {...restProps}>
      {children}
    </Component>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}

export default Typography;
