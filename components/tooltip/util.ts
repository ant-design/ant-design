/* eslint-disable import/prefer-default-export */

import type * as React from 'react';
import classNames from 'classnames';
import { isPresetColor } from '../_util/colors';

export function parseColor(prefixCls: string, color?: string) {
  const isInternalColor = isPresetColor(color);

  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor,
  });

  const overlayStyle: React.CSSProperties = {};
  const arrowStyle: React.CSSProperties = {};

  if (color && !isInternalColor) {
    overlayStyle.background = color;
    // @ts-ignore
    arrowStyle['--antd-arrow-background-color'] = color;
  }

  return { className, overlayStyle, arrowStyle };
}
