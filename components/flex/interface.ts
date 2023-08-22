import type React from 'react';

export interface FlexProps<P = any> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  direction?: React.CSSProperties['flexDirection'];
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  gap?: React.CSSProperties['gap'];
  flex?: React.CSSProperties['flex'];
  children: React.ReactNode;
  component?: React.ComponentType<P>;
}
