import type { MenuToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const getHorizontalStyle: GenerateStyle<MenuToken> = (token) => {
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
      borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
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
        transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`].join(
          ',',
        ),
      },

      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: 'none',
      },
    },
  };
};

export default getHorizontalStyle;
