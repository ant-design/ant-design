import type React from 'react';

import type { AnyObject, CustomComponent } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';

export interface FlexProps<P = AnyObject> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  vertical?: boolean;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | SizeType;
  children: React.ReactNode;
  component?: CustomComponent<P>;
}
