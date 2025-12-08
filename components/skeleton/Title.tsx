/* eslint-disable jsx-a11y/heading-has-content */
import * as React from 'react';
import { clsx } from 'clsx';

export interface SkeletonTitleProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
}

const Title: React.FC<SkeletonTitleProps> = ({ prefixCls, className, width, style }) => (
  // biome-ignore lint/a11y/useHeadingContent: HOC here
  <h3 className={clsx(prefixCls, className)} style={{ width, ...style }} />
);

export default Title;
