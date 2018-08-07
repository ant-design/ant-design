import * as React from 'react';
import { IconProps } from './index';

type TransformInformation = Pick<IconProps, 'rotate' | 'flip'>;

export function getComputedSvgStyle(
  { rotate, flip }: TransformInformation,
  svgStyle: React.CSSProperties,
): React.CSSProperties {

  if (!(rotate || flip)) {
    return { ...svgStyle };
  }

  return {
    transform: `${rotate ? `rotate(${rotate}deg)` : ''} `
      + `${(flip === 'horizontal' || flip === 'both') ? `scaleX(-1)` : ''} `
      + `${(flip === 'vertical' || flip === 'both') ? `scaleY(-1)` : ''}`,
    ...svgStyle,
  };
}
