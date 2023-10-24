import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 确认框 z-index
   * @descEN z-index of Popconfirm
   */
  zIndexPopup: number;
}

export interface PopconfirmToken extends FullToken<'Popconfirm'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<PopconfirmToken> = (token) => {
  const {
    componentCls,
    iconCls,
    antCls,
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

      [`&${antCls}-popover`]: {
        fontSize,
      },

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
          color: colorText,
        },
      },

      [`${componentCls}-buttons`]: {
        textAlign: 'end',
        whiteSpace: 'nowrap',

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
  {
    resetStyle: false,
  },
);
