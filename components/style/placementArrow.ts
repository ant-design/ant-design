import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { AliasToken } from '../theme/internal';
import type { TokenWithCommonCls } from '../theme/util/genComponentStyleHook';
import { roundedArrow } from './roundedArrow';

function connectArrowCls(classList: string[], showArrowCls: string = '') {
  return classList.map((cls) => `${showArrowCls}${cls}`).join(',');
}

function connectCls(classList: (string | undefined)[]) {
  return classList.filter((item) => !!item).join(',');
}

export const MAX_VERTICAL_CONTENT_RADIUS = 8;

export function getArrowOffset(options: {
  sizePopupArrow: number;
  contentRadius: number;
  borderRadiusOuter: number;
  limitVerticalRadius?: boolean;
}) {
  const maxVerticalContentRadius = MAX_VERTICAL_CONTENT_RADIUS;
  const { sizePopupArrow, contentRadius, borderRadiusOuter, limitVerticalRadius } = options;
  const arrowInnerOffset = sizePopupArrow / 2 - Math.ceil(borderRadiusOuter * (Math.sqrt(2) - 1));
  const dropdownArrowOffset = (contentRadius > 12 ? contentRadius + 2 : 12) - arrowInnerOffset;
  const dropdownArrowOffsetVertical = limitVerticalRadius
    ? maxVerticalContentRadius - arrowInnerOffset
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
    arrowDistance?: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
    arrowPlacement?: {
      left?: boolean;
      right?: boolean;
      top?: boolean;
      bottom?: boolean;
    };
  },
): CSSInterpolation {
  const {
    componentCls,
    sizePopupArrow,
    marginXXS,
    borderRadiusXS,
    borderRadiusOuter,
    boxShadowPopoverArrow,
  } = token;

  const {
    colorBg,
    showArrowCls,
    contentRadius = token.borderRadiusLG,
    limitVerticalRadius,
    arrowDistance = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    arrowPlacement = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    },
  } = options;

  const { dropdownArrowOffsetVertical, dropdownArrowOffset } = getArrowOffset({
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius,
  });
  const dropdownArrowDistance = sizePopupArrow / 2 + marginXXS;

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
      ...isInject(arrowPlacement.top ?? true, {
        [[
          `&-placement-top ${componentCls}-arrow`,
          `&-placement-topLeft ${componentCls}-arrow`,
          `&-placement-topRight ${componentCls}-arrow`,
        ].join(',')]: {
          bottom: arrowDistance.bottom ?? 0,
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
        // =========================== Offset ============================
        // Offset the popover to account for the dropdown arrow
        // >>>>> Top
        [connectArrowCls(
          [`&-placement-topLeft`, `&-placement-top`, `&-placement-topRight`],
          showArrowCls,
        )]: {
          paddingBottom: marginXXS,
          [connectCls([`&${componentCls}-show-arrow`, showArrowCls])]: {
            paddingBottom: dropdownArrowDistance,
          },
        },
      }),

      // >>>>> Bottom
      ...isInject(arrowPlacement.bottom ?? true, {
        [[
          `&-placement-bottom ${componentCls}-arrow`,
          `&-placement-bottomLeft ${componentCls}-arrow`,
          `&-placement-bottomRight ${componentCls}-arrow`,
        ].join(',')]: {
          top: arrowDistance.top ?? 0,
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
        // =========================== Offset ============================
        // Offset the popover to account for the dropdown arrow
        // >>>>> Bottom
        [connectArrowCls(
          [`&-placement-bottomLeft`, `&-placement-bottom`, `&-placement-bottomRight`],
          showArrowCls,
        )]: {
          paddingTop: marginXXS,
          [connectCls([`&${componentCls}-show-arrow`, showArrowCls])]: {
            paddingTop: dropdownArrowDistance,
          },
        },
      }),

      // >>>>> Left
      ...isInject(arrowPlacement.left ?? true, {
        [[
          `&-placement-left ${componentCls}-arrow`,
          `&-placement-leftTop ${componentCls}-arrow`,
          `&-placement-leftBottom ${componentCls}-arrow`,
        ].join(',')]: {
          right: {
            _skip_check_: true,
            value: arrowDistance.right ?? 0,
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
        // =========================== Offset ============================
        // Offset the popover to account for the dropdown arrow
        // >>>>> Left
        [connectArrowCls(
          [`&-placement-leftTop`, `&-placement-left`, `&-placement-leftBottom`],
          showArrowCls,
        )]: {
          paddingRight: {
            _skip_check_: true,
            value: marginXXS,
          },
          [connectCls([`&${componentCls}-show-arrow`, showArrowCls])]: {
            paddingRight: {
              _skip_check_: true,
              value: dropdownArrowDistance,
            },
          },
        },
      }),

      // >>>>> Right
      ...isInject(arrowPlacement.right ?? true, {
        [[
          `&-placement-right ${componentCls}-arrow`,
          `&-placement-rightTop ${componentCls}-arrow`,
          `&-placement-rightBottom ${componentCls}-arrow`,
        ].join(',')]: {
          left: {
            _skip_check_: true,
            value: arrowDistance.left ?? 0,
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

        // =========================== Offset ============================
        // Offset the popover to account for the dropdown arrow
        // >>>>> Right
        [connectArrowCls(
          [`&-placement-rightTop`, `&-placement-right`, `&-placement-rightBottom`],
          showArrowCls,
        )]: {
          paddingLeft: {
            _skip_check_: true,
            value: marginXXS,
          },
          [connectCls([`&${componentCls}-show-arrow`, showArrowCls])]: {
            paddingLeft: {
              _skip_check_: true,
              value: dropdownArrowDistance,
            },
          },
        },
      }),
    },
  };
}
