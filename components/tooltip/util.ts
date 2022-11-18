/* eslint-disable import/prefer-default-export */

import type * as React from 'react';
import classNames from 'classnames';
import { PresetColorTypes } from '../_util/colors';

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

export function parseColor(prefixCls: string, color?: string) {
  const className = classNames({
    [`${prefixCls}-${color}`]: color && PresetColorRegex.test(color),
  });

  const overlayStyle: React.CSSProperties = {};
  const arrowStyle: React.CSSProperties = {};

  if (color && !PresetColorRegex.test(color)) {
    overlayStyle.background = color;
    // @ts-ignore
    arrowStyle['--antd-arrow-background-color'] = color;
  }

  return { className, overlayStyle, arrowStyle };
}
