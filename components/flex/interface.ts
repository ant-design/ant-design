import type React from 'react';

import type { AnyObject, CustomComponent, LiteralUnion } from '../_util/type';

export type GapSize = 'small' | 'middle' | 'large';

export interface FlexProps<P = AnyObject> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  vertical?: boolean;
  wrap?: boolean | React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: LiteralUnion<GapSize> | number;
  component?: CustomComponent<P>;
}
