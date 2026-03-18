import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { MenuToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const getHorizontalStyle: GenerateStyle<MenuToken, CSSObject> = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    horizontalLineHeight,
    colorSplit,
    lineWidth,
    lineType,
    itemPaddingInline,
  } = token;

  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: horizontalLineHeight,
      border: 0,
      borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      boxShadow: 'none',

      '&::after': {
        display: 'block',
        clear: 'both',
        height: 0,
        content: '"\\20"',
      },

      // ======================= Item =======================
      [`${componentCls}-item, ${componentCls}-submenu`]: {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'bottom',
        paddingInline: itemPaddingInline,
      },

      [`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: {
        backgroundColor: 'transparent',
      },

      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        transition: [`border-color`, `background-color`]
          .map((prop) => `${prop} ${motionDurationSlow}`)
          .join(','),
      },

      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: 'none',
      },
    },
  };
};

export default getHorizontalStyle;
