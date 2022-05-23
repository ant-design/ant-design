// deps-lint-skip-all
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook } from '../../_util/theme';

export interface ComponentToken {
  zIndexPopup: number;
}

export interface PopconfirmToken extends FullToken<'Popconfirm'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<PopconfirmToken> = token => {
  const {
    componentCls,
    paddingSM,
    padding,
    paddingXXS,
    iconCls,
    zIndexPopup,
    colorText,
    colorWarning,
    marginXS,
    marginXXS,
    fontSize,
    lineHeight,
  } = token;

  return {
    [componentCls]: {
      zIndex: zIndexPopup,

      [`${componentCls}-inner-content`]: {
        padding: `${paddingSM}px ${padding}px`,
        color: colorText,
      },

      [`${componentCls}-message`]: {
        position: 'relative',
        padding: `${paddingXXS}px 0 ${paddingSM}px`,
        color: colorText,
        fontSize,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',

        [`> ${iconCls}`]: {
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
      },

      [`${componentCls}-buttons`]: {
        marginBottom: marginXXS,
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
  token => genBaseStyle(token),
  token => {
    const { zIndexPopupBase } = token;

    return {
      zIndexPopup: zIndexPopupBase + 60,
    };
  },
);
