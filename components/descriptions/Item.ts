import type * as React from 'react';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  children: React.ReactNode;
  span?: number;
}

// JSX Structure Syntactic Sugar. Never reach the render code.
/* istanbul ignore next */
const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) =>
  children as React.JSX.Element;

export default DescriptionsItem;
