import * as React from 'react';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) => <div>{children}</div>;

export default DescriptionsItem;
