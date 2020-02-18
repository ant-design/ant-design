/* eslint-disable jsx-a11y/heading-has-content */
import * as React from 'react';
import { cnb } from 'cnbuilder';

export interface SkeletonTitleProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  width?: number | string;
}

const Title = ({ prefixCls, className, width, style }: SkeletonTitleProps) => (
  <h3 className={cnb(prefixCls, className)} style={{ width, ...style }} />
);

export default Title;
