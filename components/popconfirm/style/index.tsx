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
    marginXXS,
    marginXS,
    fontSize,
    fontWeightStrong,
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
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',

        [`> ${componentCls}-message-icon ${iconCls}`]: {
          color: colorWarning,
          fontSize,
          flex: 'none',
          lineHeight: 1,
          marginInlineEnd: marginXS,
        },

        [`${componentCls}-title`]: {
          flex: 'auto',
          fontWeight: fontWeightStrong,

          '&:only-child': {
            fontWeight: 'normal',
          },
        },

        [`${componentCls}-description`]: {
          position: 'relative',
          marginTop: marginXXS,
          color: colorText,
        },
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
