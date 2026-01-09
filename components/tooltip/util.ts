import type * as React from 'react';
import { clsx } from 'clsx';

import { isPresetColor } from '../_util/colors';
import type { ColorGenInput } from '../color-picker/interface';
import { generateColor } from '../color-picker/util';
import { genCssVar } from '../theme/util/genStyleUtils';

export const parseColor = (rootPrefixCls: string, prefixCls: string, color?: string) => {
  const isInternalColor = isPresetColor(color);

  const [varName] = genCssVar(rootPrefixCls, 'tooltip');

  const className = clsx({ [`${prefixCls}-${color}`]: color && isInternalColor });

  const overlayStyle: React.CSSProperties = {};
  const arrowStyle: React.CSSProperties = {};
  const rgb = generateColor(color as ColorGenInput).toRgb();
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  const textColor = luminance < 0.5 ? '#FFF' : '#000';
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    overlayStyle[varName`overlay-color` as any] = textColor;
    arrowStyle[varName`arrow-background-color` as any] = color;
  }

  return { className, overlayStyle, arrowStyle };
};
