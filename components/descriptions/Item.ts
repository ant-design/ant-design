import type * as React from 'react';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  /** @deprecated Please use `styles={{ label: {} }}` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles={{ content: {} }}` instead */
  contentStyle?: React.CSSProperties;
  styles?: {
    label?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  classNames?: {
    label?: string;
    content?: string;
  };
  children: React.ReactNode;
  span?: number;
}

// JSX Structure Syntactic Sugar. Never reach the render code.
/* istanbul ignore next */
const DescriptionsItem: React.FC<DescriptionsItemProps> = ({ children }) =>
  children as React.JSX.Element;

export default DescriptionsItem;
