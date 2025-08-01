import type * as React from 'react';
import classNames from 'classnames';

import { isPresetColor } from '../_util/colors';
import { ColorGenInput } from '../color-picker/interface';
import { generateColor } from '../color-picker/util';

export function parseColor(prefixCls: string, color?: string) {
  const isInternalColor = isPresetColor(color);

  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor,
  });

  const overlayStyle: React.CSSProperties = {};
  const arrowStyle: React.CSSProperties = {};
  const colorRgb = generateColor(color as ColorGenInput);
  const textColor = colorRgb.toHsb().b < 0.7 ? '#FFF' : '#000';

  if (color && !isInternalColor) {
    overlayStyle.background = color;
    overlayStyle['--ant-tooltip-color'] = textColor;
    // @ts-ignore
    arrowStyle['--antd-arrow-background-color'] = color;
  }

  return { className, overlayStyle, arrowStyle };
}
