/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';

export const roundedArrow = (
  width: number,
  innerRadius: number,
  outerRadius: number,
  bgColor: string,
): CSSObject => {
  const unitWidth = width / 2;

  const ax = 0;
  const ay = unitWidth;
  const bx = (outerRadius * 1) / Math.sqrt(2);
  const by = unitWidth - outerRadius * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - innerRadius * (1 / Math.sqrt(2));
  const cy = outerRadius * (Math.sqrt(2) - 1) + innerRadius * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;

  return {
    borderRadius: { _skip_check_: true, value: `0 0 ${innerRadius}px` },
    pointerEvents: 'none',
    width,
    height: width,
    filter: 'drop-shadow(0 -2px 2px rgb(0 0 0 / 5%))',

    '&::before': {
      position: 'absolute',
      bottom: 0,
      insetInlineStart: 0,
      width,
      height: width / 2,
      background: bgColor,
      clipPath: `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 0 ${fx} ${fy} Z')`,
      content: '""',
    },
  };
};
