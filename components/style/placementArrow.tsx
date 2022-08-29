import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { AliasToken } from '../theme';
import type { TokenWithCommonCls } from '../theme/util/genComponentStyleHook';
import { roundedArrow } from './roundedArrow';

function connectArrowCls(classList: string[], showArrowCls: string = '') {
  return classList.map(cls => `${showArrowCls}${cls}`).join(',');
}

export default function getArrowStyle<Token extends TokenWithCommonCls<AliasToken>>(
  token: Token,
  colorBg: string,
  showArrowCls?: string,
  arrowMargin?: number,
): CSSInterpolation {
  const {
    componentCls,
    sizePopupArrow,
    marginXXS,
    radiusXS,
    radiusOuter,
    boxShadowPopoverArrow,
    marginXS,
  } = token;

  const dropdownArrowOffset = arrowMargin ?? marginXS;
  const dropdownArrowDistance = sizePopupArrow + marginXXS;

  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [
        {
          position: 'absolute',
          zIndex: 1, // lift it up so the menu wouldn't cask shadow on it
          display: 'block',

          ...roundedArrow(sizePopupArrow, radiusXS, radiusOuter, colorBg, boxShadowPopoverArrow),

          '&:before': {
            background: colorBg,
          },
        },
      ],

      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      [[
        `&-placement-top ${componentCls}-arrow`,
        `&-placement-topLeft ${componentCls}-arrow`,
        `&-placement-topRight ${componentCls}-arrow`,
      ].join(',')]: {
        bottom: 0,
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

      // >>>>> Bottom
      [[
        `&-placement-bottom ${componentCls}-arrow`,
        `&-placement-bottomLeft ${componentCls}-arrow`,
        `&-placement-bottomRight ${componentCls}-arrow`,
      ].join(',')]: {
        top: 0,
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

      // >>>>> Left
      [[
        `&-placement-left ${componentCls}-arrow`,
        `&-placement-leftTop ${componentCls}-arrow`,
        `&-placement-leftBottom ${componentCls}-arrow`,
      ].join(',')]: {
        right: {
          _skip_check_: true,
          value: 0,
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
        top: dropdownArrowOffset,
      },

      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffset,
      },

      // >>>>> Right
      [[
        `&-placement-right ${componentCls}-arrow`,
        `&-placement-rightTop ${componentCls}-arrow`,
        `&-placement-rightBottom ${componentCls}-arrow`,
      ].join(',')]: {
        left: {
          _skip_check_: true,
          value: 0,
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
        top: dropdownArrowOffset,
      },

      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffset,
      },

      // =========================== Offset ============================
      // Offset the popover to account for the dropdown arrow
      // >>>>> Top
      [connectArrowCls(
        [`&-placement-topLeft`, `&-placement-top`, `&-placement-topRight`],
        showArrowCls,
      )]: {
        paddingBottom: dropdownArrowDistance,
      },

      // >>>>> Bottom
      [connectArrowCls(
        [`&-placement-bottomLeft`, `&-placement-bottom`, `&-placement-bottomRight`],
        showArrowCls,
      )]: {
        paddingTop: dropdownArrowDistance,
      },

      // >>>>> Left
      [connectArrowCls(
        [`&-placement-leftTop`, `&-placement-left`, `&-placement-leftBottom`],
        showArrowCls,
      )]: {
        paddingRight: {
          _skip_check_: true,
          value: dropdownArrowDistance,
        },
      },

      // >>>>> Right
      [connectArrowCls(
        [`&-placement-rightTop`, `&-placement-right`, `&-placement-rightBottom`],
        showArrowCls,
      )]: {
        paddingLeft: {
          _skip_check_: true,
          value: dropdownArrowDistance,
        },
      },
    },
  };
}
