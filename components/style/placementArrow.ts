import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { AliasToken } from '../theme/internal';
import type { TokenWithCommonCls } from '../theme/util/genComponentStyleHook';
import { roundedArrow } from './roundedArrow';

export const MAX_VERTICAL_CONTENT_RADIUS = 8;

export function getArrowOffset(options: {
  contentRadius: number;
  limitVerticalRadius?: boolean;
}) {
  const maxVerticalContentRadius = MAX_VERTICAL_CONTENT_RADIUS;
  const { contentRadius, limitVerticalRadius } = options;
  const dropdownArrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
  const dropdownArrowOffsetVertical = limitVerticalRadius
    ? maxVerticalContentRadius
    : dropdownArrowOffset;
  return { dropdownArrowOffset, dropdownArrowOffsetVertical };
}

function isInject(valid: boolean, code: CSSObject): CSSObject {
  if (!valid) return {};
  return code;
}

export default function getArrowStyle<Token extends TokenWithCommonCls<AliasToken>>(
  token: Token,
  options: {
    colorBg: string;
    showArrowCls?: string;
    contentRadius?: number;
    limitVerticalRadius?: boolean;
    arrowDistance?: number;
    arrowPlacement?: {
      left?: boolean;
      right?: boolean;
      top?: boolean;
      bottom?: boolean;
    };
  },
): CSSInterpolation {
  const { componentCls, sizePopupArrow, borderRadiusXS, borderRadiusOuter, boxShadowPopoverArrow } =
    token;

  const {
    colorBg,
    contentRadius = token.borderRadiusLG,
    limitVerticalRadius,
    arrowDistance = 0,
    arrowPlacement = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    },
  } = options;

  const { dropdownArrowOffsetVertical, dropdownArrowOffset } = getArrowOffset({
    contentRadius,
    limitVerticalRadius,
  });

  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [
        {
          position: 'absolute',
          zIndex: 1, // lift it up so the menu wouldn't cask shadow on it
          display: 'block',

          ...roundedArrow(
            sizePopupArrow,
            borderRadiusXS,
            borderRadiusOuter,
            colorBg,
            boxShadowPopoverArrow,
          ),

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
          `&-placement-top ${componentCls}-arrow`,
          `&-placement-topLeft ${componentCls}-arrow`,
          `&-placement-topRight ${componentCls}-arrow`,
        ].join(',')]: {
          bottom: arrowDistance,
          transform: 'translateY(100%) rotate(180deg)',
        },

        [`&-placement-top ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translateX(-50%) translateY(100%) rotate(180deg)',
        },

        [`&-placement-topLeft ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: dropdownArrowOffset,
          },
        },

        [`&-placement-topRight ${componentCls}-arrow`]: {
          right: {
            _skip_check_: true,
            value: dropdownArrowOffset,
          },
        },
      }),

      // >>>>> Bottom
      ...isInject(!!arrowPlacement.bottom, {
        [[
          `&-placement-bottom ${componentCls}-arrow`,
          `&-placement-bottomLeft ${componentCls}-arrow`,
          `&-placement-bottomRight ${componentCls}-arrow`,
        ].join(',')]: {
          top: arrowDistance,
          transform: `translateY(-100%)`,
        },

        [`&-placement-bottom ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: '50%',
          },
          transform: `translateX(-50%) translateY(-100%)`,
        },

        [`&-placement-bottomLeft ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: dropdownArrowOffset,
          },
        },

        [`&-placement-bottomRight ${componentCls}-arrow`]: {
          right: {
            _skip_check_: true,
            value: dropdownArrowOffset,
          },
        },
      }),

      // >>>>> Left
      ...isInject(!!arrowPlacement.left, {
        [[
          `&-placement-left ${componentCls}-arrow`,
          `&-placement-leftTop ${componentCls}-arrow`,
          `&-placement-leftBottom ${componentCls}-arrow`,
        ].join(',')]: {
          right: {
            _skip_check_: true,
            value: arrowDistance,
          },
          transform: 'translateX(100%) rotate(90deg)',
        },

        [`&-placement-left ${componentCls}-arrow`]: {
          top: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translateY(-50%) translateX(100%) rotate(90deg)',
        },

        [`&-placement-leftTop ${componentCls}-arrow`]: {
          top: dropdownArrowOffsetVertical,
        },

        [`&-placement-leftBottom ${componentCls}-arrow`]: {
          bottom: dropdownArrowOffsetVertical,
        },
      }),

      // >>>>> Right
      ...isInject(!!arrowPlacement.right, {
        [[
          `&-placement-right ${componentCls}-arrow`,
          `&-placement-rightTop ${componentCls}-arrow`,
          `&-placement-rightBottom ${componentCls}-arrow`,
        ].join(',')]: {
          left: {
            _skip_check_: true,
            value: arrowDistance,
          },
          transform: 'translateX(-100%) rotate(-90deg)',
        },

        [`&-placement-right ${componentCls}-arrow`]: {
          top: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translateY(-50%) translateX(-100%) rotate(-90deg)',
        },

        [`&-placement-rightTop ${componentCls}-arrow`]: {
          top: dropdownArrowOffsetVertical,
        },

        [`&-placement-rightBottom ${componentCls}-arrow`]: {
          bottom: dropdownArrowOffsetVertical,
        },
      }),
    },
  };
}
