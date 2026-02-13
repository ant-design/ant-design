import * as React from 'react';
import type { JSX } from 'react';
import { clsx } from 'clsx';

import type { DirectionType } from '../config-provider';
import type {
  BaseTypographyProps,
  TypographySemanticClassNames,
  TypographySemanticStyles,
} from './Base';
import { useTypographySemantic } from './hooks/useTypographySemantic';
import useStyle from './style';

export interface TypographyProps<C extends keyof JSX.IntrinsicElements>
  extends BaseTypographyProps {
  /** @internal */
  component?: C;
}

interface InternalProps {
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  component?: keyof JSX.IntrinsicElements;
  direction?: DirectionType;
  classNames?: TypographySemanticClassNames;
  styles?: TypographySemanticStyles;
  prefixCls: string;
}

const InternalTypography = React.forwardRef<HTMLElement, InternalProps>((props, ref) => {
  const {
    component: Component = 'article',
    className,
    rootClassName,
    children,
    direction,
    style,
    classNames,
    styles,
    prefixCls,
    ...restProps
  } = props;

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const componentClassName = clsx(
    prefixCls,
    hashId,
    cssVarCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    classNames?.root,
  );

  const mergedStyle: React.CSSProperties = {
    ...styles?.root,
    ...style,
  };

  return (
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component {...restProps} className={componentClassName} style={mergedStyle} ref={ref}>
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  InternalTypography.displayName = 'InternalTypography';
}

const Typography = React.forwardRef<HTMLElement, TypographyProps<keyof JSX.IntrinsicElements>>(
  (props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      children,
      direction: typographyDirection,
      style,
      classNames,
      styles,
      ...restProps
    } = props;

    const [mergedClassNames, mergedStyles, prefixCls, direction] = useTypographySemantic(
      customizePrefixCls,
      classNames,
      styles,
      typographyDirection,
      props,
    );

    return (
      <InternalTypography
        ref={ref}
        component="article"
        className={clsx(className, rootClassName)}
        direction={direction}
        style={style}
        classNames={mergedClassNames}
        styles={mergedStyles}
        prefixCls={prefixCls}
        {...restProps}
      >
        {children}
      </InternalTypography>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}

export default Typography;
export { InternalTypography };
