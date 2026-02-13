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
  component?: C;
}

interface InternalProps {
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  component?: keyof JSX.IntrinsicElements;
  direction?: DirectionType;
  mergedClassNames?: TypographySemanticClassNames;
  mergedStyles?: TypographySemanticStyles;
  prefixCls?: string;
  contextClassName?: string;
  contextStyle?: React.CSSProperties;
  hashId?: string;
  cssVarCls?: string;
}

const InternalTypography = React.forwardRef<HTMLElement, InternalProps>((props, ref) => {
  const {
    component: Component = 'article',
    className,
    rootClassName,
    children,
    direction,
    style,
    mergedClassNames,
    mergedStyles,
    prefixCls,
    contextClassName,
    contextStyle,
    hashId,
    cssVarCls,
    ...restProps
  } = props;

  const componentClassName = clsx(
    prefixCls,
    contextClassName,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    mergedClassNames?.root,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = {
    ...contextStyle,
    ...mergedStyles?.root,
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

    const { mergedClassNames, mergedStyles, prefixCls, direction, contextClassName, contextStyle } =
      useTypographySemantic(customizePrefixCls, classNames, styles, typographyDirection, props);

    const [hashId, cssVarCls] = useStyle(prefixCls);

    return (
      <InternalTypography
        ref={ref}
        component="article"
        className={className}
        rootClassName={rootClassName}
        direction={direction}
        style={style}
        mergedClassNames={mergedClassNames}
        mergedStyles={mergedStyles}
        prefixCls={prefixCls}
        contextClassName={contextClassName}
        contextStyle={contextStyle}
        hashId={hashId}
        cssVarCls={cssVarCls}
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
