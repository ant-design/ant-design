import type * as React from 'react';

import type { Breakpoint } from '../_util/responsiveObserver';
import type { CellSemanticType } from './DescriptionsContext';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  /** @deprecated Please use `styles.label` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  contentStyle?: React.CSSProperties;
  classNames?: CellSemanticType['classNames'];
  styles?: CellSemanticType['styles'];
  span?: number | 'filled' | { [key in Breakpoint]?: number };
  children?: React.ReactNode;
}

// JSX Structure Syntactic Sugar. Never reach the render code.
/* istanbul ignore next */
const DescriptionsItem: React.FC<React.PropsWithChildren<DescriptionsItemProps>> = (props) => {
  return props.children as React.JSX.Element;
};

export default DescriptionsItem;
