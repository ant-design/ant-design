import type * as React from 'react';
import { clsx } from 'clsx';

import { isPresetColor } from '../_util/colors';
import type { ColorGenInput } from '../color-picker/interface';
import { generateColor } from '../color-picker/util';
import { genCssVar } from '../theme/util/genStyleUtils';

const calcTextColor = (color?: string) => {
  if (!color) {
    return undefined;
  }

  try {
    const rgb = generateColor(color as ColorGenInput).toRgb();
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance < 0.5 ? '#FFF' : '#000';
  } catch {
    return undefined;
  }
};

export const parseColor = (rootPrefixCls: string, prefixCls: string, color?: string) => {
  const isInternalColor = isPresetColor(color);
  const [varName] = genCssVar(rootPrefixCls, 'text-tooltip');

  const className = clsx({ [`${prefixCls}-${color}`]: color && isInternalColor });
  const style: React.CSSProperties = {};

  if (color && !isInternalColor) {
    style[varName('background')] = color;
    style[varName('arrow-background')] = color;
    style[varName('text-color')] = calcTextColor(color);
  }

  return { className, style };
};

export const extractStyleVars = (
  rootPrefixCls: string,
  style?: React.CSSProperties,
): React.CSSProperties => {
  if (!style) {
    return {};
  }

  const [varName] = genCssVar(rootPrefixCls, 'text-tooltip');
  const nextStyle: React.CSSProperties = { ...style };

  const background =
    nextStyle.backgroundColor ||
    (typeof nextStyle.background === 'string' ? nextStyle.background : '');

  if (background) {
    nextStyle[varName('background')] = background;
    nextStyle[varName('arrow-background')] = background;

    if (!nextStyle.color) {
      nextStyle[varName('text-color')] = calcTextColor(background);
    }
  }

  if (nextStyle.color) {
    nextStyle[varName('text-color')] = nextStyle.color;
  }
  if (nextStyle.maxWidth) {
    nextStyle[varName('max-width')] =
      typeof nextStyle.maxWidth === 'number' ? `${nextStyle.maxWidth}px` : nextStyle.maxWidth;
  }
  if (nextStyle.zIndex) {
    nextStyle[varName('z-index')] = nextStyle.zIndex;
  }
  if (nextStyle.boxShadow) {
    nextStyle[varName('box-shadow')] = nextStyle.boxShadow;
  }
  if (nextStyle.borderRadius) {
    nextStyle[varName('border-radius')] =
      typeof nextStyle.borderRadius === 'number'
        ? `${nextStyle.borderRadius}px`
        : nextStyle.borderRadius;
  }
  if (nextStyle.padding) {
    nextStyle[varName('padding')] =
      typeof nextStyle.padding === 'number' ? `${nextStyle.padding}px` : nextStyle.padding;
  }

  delete nextStyle.background;
  delete nextStyle.backgroundColor;
  delete nextStyle.color;
  delete nextStyle.maxWidth;
  delete nextStyle.zIndex;
  delete nextStyle.boxShadow;
  delete nextStyle.borderRadius;
  delete nextStyle.padding;

  return nextStyle;
};
