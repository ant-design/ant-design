import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { AliasToken, TokenWithCommonCls } from '../theme/internal';
import type { ArrowToken } from './roundedArrow';
import { genRoundedArrow } from './roundedArrow';

export const MAX_VERTICAL_CONTENT_RADIUS = 8;

export interface ArrowOffsetToken {
  /** @internal */
  arrowOffsetHorizontal: number;
  /** @internal */
  arrowOffsetVertical: number;
}

export function getArrowOffsetToken(options: {
  contentRadius: number;
  limitVerticalRadius?: boolean;
}): ArrowOffsetToken {
  const { contentRadius, limitVerticalRadius } = options;
  const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
  const arrowOffsetVertical = limitVerticalRadius ? MAX_VERTICAL_CONTENT_RADIUS : arrowOffset;
  return { arrowOffsetHorizontal: arrowOffset, arrowOffsetVertical };
}

function isInject(valid: boolean, code: CSSObject): CSSObject {
  if (!valid) {
    return {};
  }
  return code;
}

export default function getArrowStyle<
  Token extends TokenWithCommonCls<AliasToken> & ArrowOffsetToken & ArrowToken,
>(
  token: Token,
  colorBg: string,
  options?: {
    arrowDistance?: number;
    arrowPlacement?: {
      left?: boolean;
      right?: boolean;
      top?: boolean;
      bottom?: boolean;
    };
  },
): CSSInterpolation {
  const { componentCls, boxShadowPopoverArrow, arrowOffsetVertical, arrowOffsetHorizontal } = token;

  const {
    arrowDistance = 0,
    arrowPlacement = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    },
  } = options || {};

  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [
        {
          position: 'absolute',
          zIndex: 1, // lift it up so the menu wouldn't cask shadow on it
          display: 'block',

          ...genRoundedArrow(token, colorBg, boxShadowPopoverArrow),

          '&:before': {
            background: colorBg,
          },
        },
      ],

      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      ...isInject(!!arrowPlacement.top, {
        [[
          `&-placement-top > ${componentCls}-arrow`,
          `&-placement-topLeft > ${componentCls}-arrow`,
          `&-placement-topRight > ${componentCls}-arrow`,
        ].join(',')]: {
          bottom: arrowDistance,
          transform: 'translateY(100%) rotate(180deg)',
        },

        [`&-placement-top > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translateX(-50%) translateY(100%) rotate(180deg)',
        },

        '&-placement-topLeft': {
          '--arrow-offset-horizontal': arrowOffsetHorizontal,

          [`> ${componentCls}-arrow`]: {
            left: {
              _skip_check_: true,
              value: arrowOffsetHorizontal,
            },
          },
        },

        '&-placement-topRight': {
          '--arrow-offset-horizontal': `calc(100% - ${unit(arrowOffsetHorizontal)})`,

          [`> ${componentCls}-arrow`]: {
            right: {
              _skip_check_: true,
              value: arrowOffsetHorizontal,
            },
          },
        },
      }),

      // >>>>> Bottom
      ...isInject(!!arrowPlacement.bottom, {
        [[
          `&-placement-bottom > ${componentCls}-arrow`,
          `&-placement-bottomLeft > ${componentCls}-arrow`,
          `&-placement-bottomRight > ${componentCls}-arrow`,
        ].join(',')]: {
          top: arrowDistance,
          transform: `translateY(-100%)`,
        },

        [`&-placement-bottom > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: '50%',
          },
          transform: `translateX(-50%) translateY(-100%)`,
        },

        '&-placement-bottomLeft': {
          '--arrow-offset-horizontal': arrowOffsetHorizontal,

          [`> ${componentCls}-arrow`]: {
            left: {
              _skip_check_: true,
              value: arrowOffsetHorizontal,
            },
          },
        },

        '&-placement-bottomRight': {
          '--arrow-offset-horizontal': `calc(100% - ${unit(arrowOffsetHorizontal)})`,

          [`> ${componentCls}-arrow`]: {
            right: {
              _skip_check_: true,
              value: arrowOffsetHorizontal,
            },
          },
        },
      }),

      // >>>>> Left
      ...isInject(!!arrowPlacement.left, {
        [[
          `&-placement-left > ${componentCls}-arrow`,
          `&-placement-leftTop > ${componentCls}-arrow`,
          `&-placement-leftBottom > ${componentCls}-arrow`,
        ].join(',')]: {
          right: {
            _skip_check_: true,
            value: arrowDistance,
          },
          transform: 'translateX(100%) rotate(90deg)',
        },

        [`&-placement-left > ${componentCls}-arrow`]: {
          top: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translateY(-50%) translateX(100%) rotate(90deg)',
        },

        [`&-placement-leftTop > ${componentCls}-arrow`]: {
          top: arrowOffsetVertical,
        },

        [`&-placement-leftBottom > ${componentCls}-arrow`]: {
          bottom: arrowOffsetVertical,
        },
      }),

      // >>>>> Right
      ...isInject(!!arrowPlacement.right, {
        [[
          `&-placement-right > ${componentCls}-arrow`,
          `&-placement-rightTop > ${componentCls}-arrow`,
          `&-placement-rightBottom > ${componentCls}-arrow`,
        ].join(',')]: {
          left: {
            _skip_check_: true,
            value: arrowDistance,
          },
          transform: 'translateX(-100%) rotate(-90deg)',
        },

        [`&-placement-right > ${componentCls}-arrow`]: {
          top: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translateY(-50%) translateX(-100%) rotate(-90deg)',
        },

        [`&-placement-rightTop > ${componentCls}-arrow`]: {
          top: arrowOffsetVertical,
        },

        [`&-placement-rightBottom > ${componentCls}-arrow`]: {
          bottom: arrowOffsetVertical,
        },
      }),
    },
  };
}
