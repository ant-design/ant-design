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
    colorTextHeading,
  } = token;

  return {
    [componentCls]: {
      zIndex: zIndexPopup,
      color: colorText,

      [`${componentCls}-message`]: {
        marginBottom: marginXS,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',

        [`> ${componentCls}-message-icon ${iconCls}`]: {
          color: colorWarning,
          fontSize,
          lineHeight: 1,
          marginInlineEnd: marginXS,
        },

        [`${componentCls}-title`]: {
          fontWeight: fontWeightStrong,
          color: colorTextHeading,

          '&:only-child': {
            fontWeight: 'normal',
          },
        },

        [`${componentCls}-description`]: {
          marginTop: marginXXS,
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
