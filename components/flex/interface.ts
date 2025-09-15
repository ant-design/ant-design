import type React from 'react';

import type { Orientation } from '../_util/hooks/useOrientation';
import type { AnyObject, CustomComponent } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';

export interface FlexProps<P = AnyObject> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  vertical?: boolean;
  orientation?: Orientation;
  wrap?: boolean | React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | SizeType;
  component?: CustomComponent<P>;
}
