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

  const shadowWidth = unitWidth * Math.sqrt(2) + outerRadius * (Math.sqrt(2) - 2);
  const polygonOffset = outerRadius * (Math.sqrt(2) - 1);

  return {
    pointerEvents: 'none',
    width,
    height: width,
    overflow: 'hidden',

    '&::before': {
      position: 'absolute',
      bottom: 0,
      insetInlineStart: 0,
      width,
      height: width / 2,
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [
          `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${
            2 * unitWidth - polygonOffset
          }px 100%, ${polygonOffset}px 100%)`,
          `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 0 ${fx} ${fy} Z')`,
        ],
      },
      content: '""',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      width: shadowWidth,
      height: shadowWidth,
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
  };
};
