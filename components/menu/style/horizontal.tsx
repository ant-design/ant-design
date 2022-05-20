import type { MenuThemeToken } from '.';
import type { GenerateStyle } from '../../_util/theme';

const getHorizontalStyle: GenerateStyle<MenuThemeToken> = token => {
  const {
    componentCls,
    motionDurationSlow,
    motionEaseInOut,
    menuHorizontalHeight,
    colorBorderSecondary,
    lineWidth,
    lineType,
    themeColorTextHighlight,
    lineWidthBold,
    menuItemPaddingInline,
  } = token;

  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: `${menuHorizontalHeight}px`,
      border: 0,
      borderBottom: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
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
        paddingInline: menuItemPaddingInline,
      },

      [`&:not(${componentCls}-dark)`]: {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: lineWidthBold / 2,
          marginTop: -lineWidthBold / 2,
          marginBottom: 0,

          '&::after': {
            position: 'absolute',
            insetInline: menuItemPaddingInline,
            bottom: 0,
            borderBottom: `${lineWidthBold}px solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },

          [`&:hover, &-active, &-open, &-selected`]: {
            color: themeColorTextHighlight,

            '&::after': {
              borderBottomColor: themeColorTextHighlight,
            },
          },
        },
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
