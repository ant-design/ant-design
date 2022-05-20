import type { CSSObject } from '@ant-design/cssinjs';
import type { MenuToken } from '.';
import type { GenerateStyle } from '../../_util/theme';

const accessibilityFocusDark: GenerateStyle<MenuToken, CSSObject> = token => ({
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.boxShadowColor}`,
});

const genDarkStyle = (token: MenuToken): CSSObject => {
  const {
    componentCls,
    darkColor,
    darkBg,
    darkHighlightColor,
    motionDurationSlow,
    highlightDangerColor,
  } = token;

  return {
    [`${componentCls}${componentCls}-dark`]: {
      [`&${componentCls}-root:focus-visible`]: {
        ...accessibilityFocusDark(token),
      },

      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        '&:focus-visible': {
          ...accessibilityFocusDark(token),
        },
      },

      // dark theme
      [`&, ${componentCls}-sub`]: {
        color: darkColor,
        background: darkBg,

        [`${componentCls}-submenu-title ${componentCls}-submenu-arrow`]: {
          opacity: 0.45,
          transition: `all ${motionDurationSlow}`,

          '&::after, &::before': {
            background: darkHighlightColor,
          },
        },
      },

      // ========================== Danger ==========================
      [`${componentCls}-item-danger${componentCls}-item`]: {
        [`&, &:hover, & > a`]: {
          color: highlightDangerColor,
        },
      },

      [`&:not(${componentCls}-horizontal) ${componentCls}-item-danger${componentCls}-item-selected`]:
        {
          color: darkHighlightColor,
          backgroundColor: highlightDangerColor,
        },
    },
  };
};

export default genDarkStyle;
