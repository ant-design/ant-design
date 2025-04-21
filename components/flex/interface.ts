import type React from 'react';

import type { AnyObject, CustomComponent } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';

export type Orientation = 'horizontal' | 'vertical';
export interface FlexProps<P = AnyObject> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  /**
   * @deprecated orientation
   * @default horizontal
   */
  vertical?: boolean;
  orientation?: Orientation;
  wrap?: boolean | React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | SizeType;
  children: React.ReactNode;
  component?: CustomComponent<P>;
}
