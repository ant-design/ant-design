import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

export interface ComponentToken {
  zIndexPopup: number;
}

export interface PopconfirmToken extends FullToken<'Popconfirm'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<PopconfirmToken> = (token) => {
  const {
    componentCls,
    iconCls,
    zIndexPopup,
    colorText,
    colorWarning,
    marginXS,
    fontSize,
    fontWeightStrong,
    lineHeight,
  } = token;

  return {
    [componentCls]: {
      zIndex: zIndexPopup,

      [`${componentCls}-inner-content`]: {
        color: colorText,
      },

      [`${componentCls}-message`]: {
        position: 'relative',
        marginBottom: marginXS,
        color: colorText,
        fontSize,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',

        [`> ${componentCls}-message-icon ${iconCls}`]: {
          color: colorWarning,
          fontSize,
          flex: 'none',
          lineHeight: 1,
          paddingTop: (Math.round(fontSize * lineHeight) - fontSize) / 2,
        },

        '&-title': {
          flex: 'auto',
          marginInlineStart: marginXS,
        },

        '&-title-only': {
          fontWeight: fontWeightStrong,
        },
      },

      [`${componentCls}-description`]: {
        position: 'relative',
        marginInlineStart: fontSize + marginXS,
        marginBottom: marginXS,
        color: colorText,
        fontSize,
      },

      [`${componentCls}-buttons`]: {
        textAlign: 'end',

        button: {
          marginInlineStart: marginXS,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Popconfirm',
  (token) => genBaseStyle(token),
  (token) => {
    const { zIndexPopupBase } = token;

    return {
      zIndexPopup: zIndexPopupBase + 60,
    };
  },
);
