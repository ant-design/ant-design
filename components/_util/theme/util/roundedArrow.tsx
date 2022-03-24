/* eslint-disable import/prefer-default-export */
import { CSSObject } from '@ant-design/cssinjs';
import seedToken from '../themes/default';

export const roundedArrow = (
  width: number,
  outerRadius: number,
  bgColor: string,
): CSSObject => {
  const cornerHeight = outerRadius * (1 - 1 / Math.sqrt(2));
  const { radiusBase } = seedToken;

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
    borderRadius: `0 0 ${radiusBase}px 0`,
    pointerEvents: 'none',

    '&::before': {
      position: 'absolute',
      top: -width,
      insetInlineStart: -width,
      width: width * 3,
      height: width * 3,
      background: `linear-gradient(to left, ${bgColor} 50%, ${bgColor} 50%) no-repeat ${Math.ceil(-width + 1)}px ${Math.ceil(-width + 1)}px`,
      content: '""',
      clipPath: `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 1 ${bx} ${by} L ${cx} ${cy} A ${radiusBase} ${radiusBase} 0 0 0 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 1 ${fx} ${fy} Z')`,
    },
  };
}
