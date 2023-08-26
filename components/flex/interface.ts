import type React from 'react';

import type { SizeType } from '../config-provider/SizeContext';

export interface FlexProps<P = any> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  direction?: React.CSSProperties['flexDirection'];
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | SizeType;
  children: React.ReactNode;
  component?: React.ComponentType<P>;
}
