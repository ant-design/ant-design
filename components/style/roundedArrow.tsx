/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';

export const roundedArrow = (width: number, outerRadius: number, bgColor: string): CSSObject => {
  const cornerHeight = outerRadius * (1 - 1 / Math.sqrt(2));
  const radiusBase = 2;

  const ax = width - cornerHeight;
  const ay = 2 * width + cornerHeight;
  const bx = ax + outerRadius * (1 / Math.sqrt(2));
  const by = 2 * width;
  const cx = 2 * width - radiusBase;
  const cy = 2 * width;
  const dx = 2 * width;
  const dy = 2 * width - radiusBase;
  const fx = 2 * width + cornerHeight;
  const fy = width - cornerHeight;
  const ex = 2 * width;
  const ey = fy + outerRadius * (1 / Math.sqrt(2));

  return {
    borderRadius: { _skip_check_: true, value: `0 0 2px` },
    pointerEvents: 'none',

    '&::before': {
      position: 'absolute',
      top: -width,
      insetInlineStart: -width,
      width: width * 3,
      height: width * 3,
      background: bgColor,
      // Hack firefox: https://github.com/ant-design/ant-design/pull/33710#issuecomment-1015287825
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${Math.ceil(-width + 1)}px ${Math.ceil(-width + 1)}px`,
      content: '""',
      clipPath: `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 1 ${bx} ${by} L ${cx} ${cy} A ${radiusBase} ${radiusBase} 0 0 0 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 1 ${fx} ${fy} Z')`,
    },
  };
};
