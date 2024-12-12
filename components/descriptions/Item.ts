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

const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) =>
  children as React.JSX.Element;

export default DescriptionsItem;
