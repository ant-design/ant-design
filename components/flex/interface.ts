import type React from 'react';

import type { AnyObject, CustomComponent, LiteralUnion } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';

export interface FlexProps<P = AnyObject> extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  rootClassName?: string;
  vertical?: boolean;
  wrap?: boolean | React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: LiteralUnion<SizeType, React.CSSProperties['gap']>;
  component?: CustomComponent<P>;
}
