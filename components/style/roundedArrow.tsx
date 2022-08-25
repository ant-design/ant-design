/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';

export const roundedArrow = (
  width: number,
  innerRadius: number,
  outerRadius: number,
  bgColor: string,
  boxShadow: string,
): CSSObject => {
  const unitWidth = width / 2;

  const ax = unitWidth - outerRadius * (Math.sqrt(2) - 1);
  const ay = unitWidth;
  const bx = unitWidth + outerRadius * (1 - 1 / Math.sqrt(2));
  const by = unitWidth - outerRadius * (1 - 1 / Math.sqrt(2));
  const cx = 2 * unitWidth - innerRadius * (1 / Math.sqrt(2));
  const cy = innerRadius * (1 / Math.sqrt(2));
  const dx = 4 * unitWidth - cx;
  const dy = cy;
  const ex = 4 * unitWidth - bx;
  const ey = by;
  const fx = 4 * unitWidth - ax;
  const fy = ay;

  return {
    borderRadius: { _skip_check_: true, value: `0 0 ${innerRadius}px` },
    pointerEvents: 'none',
    width: width * 2,
    height: width * 2,
    overflow: 'hidden',

    '&::after': {
      content: '""',
      position: 'absolute',
      width: width / Math.sqrt(2),
      height: width / Math.sqrt(2),
      bottom: 0,
      insetInline: 0,
      margin: 'auto',
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${innerRadius}px 0`,
      },
      transform: 'translateY(50%) rotate(-135deg)',
      boxShadow,
      zIndex: 0,
      background: 'transparent',
    },

    '&::before': {
      position: 'absolute',
      bottom: 0,
      insetInlineStart: 0,
      width: width * 2,
      height: width / 2,
      background: bgColor,
      clipPath: `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 0 ${fx} ${fy} Z')`,
      content: '""',
    },
  };
};
