import type React from 'react';
import { clearFix, genFocusStyle, resetComponent } from '../../style';
import { initFadeMotion, initZoomMotion } from '../../style/motion';
import type { AliasToken, FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  headerBg: string;
  titleLineHeight: number;
  titleFontSize: number;
  titleColor: string;
  contentBg: string;
  footerBg: string;
}

export interface ModalToken extends FullToken<'Modal'> {
  // Custom token here
  modalHeaderHeight: number;
  modalBodyPadding: number;
  modalHeaderPadding: string;
  modalHeaderBorderWidth: number;
  modalHeaderBorderStyle: string;
  modalHeaderBorderColorSplit: string;
  modalFooterBorderColorSplit: string;
  modalFooterBorderStyle: string;
  modalFooterPaddingVertical: number;
  modalFooterPaddingHorizontal: number;
  modalFooterBorderWidth: number;
  modalIconHoverColor: string;
  modalCloseIconColor: string;
  modalCloseBtnSize: number;
  modalConfirmIconSize: number;
}

function box(position: React.CSSProperties['position']): React.CSSProperties {
  return {
    position,
    top: 0,
    insetInlineEnd: 0,
    bottom: 0,
    insetInlineStart: 0,
  };
}

export const genModalMaskStyle: GenerateStyle<TokenWithCommonCls<AliasToken>> = (token) => {
  const { componentCls, antCls } = token;

  return [
    {
      [`${componentCls}-root`]: {
        [`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
          // reset scale avoid mousePosition bug
          transform: 'none',
          opacity: 0,
          animationDuration: token.motionDurationSlow,
          // https://github.com/ant-design/ant-design/issues/11777
          userSelect: 'none',
        },

        // https://github.com/ant-design/ant-design/issues/37329
        // https://github.com/ant-design/ant-design/issues/40272
        [`${componentCls}${antCls}-zoom-leave ${componentCls}-content`]: {
          pointerEvents: 'none',
        },

        [`${componentCls}-mask`]: {
          ...box('fixed'),
          zIndex: token.zIndexPopupBase,
          height: '100%',
          backgroundColor: token.colorBgMask,

          [`${componentCls}-hidden`]: {
            display: 'none',
          },
        },

        [`${componentCls}-wrap`]: {
          ...box('fixed'),
          overflow: 'auto',
          outline: 0,
          WebkitOverflowScrolling: 'touch',
        },
      },
    },
    { [`${componentCls}-root`]: initFadeMotion(token) },
  ];
};

const genModalStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;

  return [
    // ======================== Root =========================
    {
      [`${componentCls}-root`]: {
        [`${componentCls}-wrap`]: {
          zIndex: token.zIndexPopupBase,
          position: 'fixed',
          inset: 0,
          overflow: 'auto',
          outline: 0,
          WebkitOverflowScrolling: 'touch',
        },
        [`${componentCls}-wrap-rtl`]: {
          direction: 'rtl',
        },

        [`${componentCls}-centered`]: {
          textAlign: 'center',

          '&::before': {
            display: 'inline-block',
            width: 0,
            height: '100%',
            verticalAlign: 'middle',
            content: '""',
          },
          [componentCls]: {
            top: 0,
            display: 'inline-block',
            paddingBottom: 0,
            textAlign: 'start',
            verticalAlign: 'middle',
          },
        },

        [`@media (max-width: ${token.screenSMMax})`]: {
          [componentCls]: {
            maxWidth: 'calc(100vw - 16px)',
            margin: `${token.marginXS} auto`,
          },
          [`${componentCls}-centered`]: {
            [componentCls]: {
              flex: 1,
            },
          },
        },
      },
    },

    // ======================== Modal ========================
    {
      [componentCls]: {
        ...resetComponent(token),
        pointerEvents: 'none',
        position: 'relative',
        top: 100,
        width: 'auto',
        maxWidth: `calc(100vw - ${token.margin * 2}px)`,
        margin: '0 auto',
        paddingBottom: token.paddingLG,

        [`${componentCls}-title`]: {
          margin: 0,
          color: token.titleColor,
          fontWeight: token.fontWeightStrong,
          fontSize: token.titleFontSize,
          lineHeight: token.titleLineHeight,
          wordWrap: 'break-word',
        },

        [`${componentCls}-content`]: {
          position: 'relative',
          backgroundColor: token.contentBg,
          backgroundClip: 'padding-box',
          border: 0,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadow,
          pointerEvents: 'auto',
          padding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`,
        },

        [`${componentCls}-close`]: {
          position: 'absolute',
          top: (token.modalHeaderHeight - token.modalCloseBtnSize) / 2,
          insetInlineEnd: (token.modalHeaderHeight - token.modalCloseBtnSize) / 2,
          zIndex: token.zIndexPopupBase + 10,
          padding: 0,
          color: token.modalCloseIconColor,
          fontWeight: token.fontWeightStrong,
          lineHeight: 1,
          textDecoration: 'none',
          background: 'transparent',
          borderRadius: token.borderRadiusSM,
          width: token.modalCloseBtnSize,
          height: token.modalCloseBtnSize,
          border: 0,
          outline: 0,
          cursor: 'pointer',
          transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,

          '&-x': {
            display: 'flex',
            fontSize: token.fontSizeLG,
            fontStyle: 'normal',
            lineHeight: `${token.modalCloseBtnSize}px`,
            justifyContent: 'center',
            textTransform: 'none',
            textRendering: 'auto',
          },

          '&:hover': {
            color: token.modalIconHoverColor,
            backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent,
            textDecoration: 'none',
          },

          '&:active': {
            backgroundColor: token.wireframe ? 'transparent' : token.colorFillContentHover,
          },

          ...genFocusStyle(token),
        },

        [`${componentCls}-header`]: {
          color: token.colorText,
          background: token.headerBg,
          borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
          marginBottom: token.marginXS,
        },

        [`${componentCls}-body`]: {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          wordWrap: 'break-word',
        },

        [`${componentCls}-footer`]: {
          textAlign: 'end',
          background: token.footerBg,
          marginTop: token.marginSM,

          [`${token.antCls}-btn + ${token.antCls}-btn:not(${token.antCls}-dropdown-trigger)`]: {
            marginBottom: 0,
            marginInlineStart: token.marginXS,
          },
        },

        [`${componentCls}-open`]: {
          overflow: 'hidden',
        },
      },
    },

    // ======================== Pure =========================
    {
      [`${componentCls}-pure-panel`]: {
        top: 'auto',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',

        [`${componentCls}-content,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',
        },

        [`${componentCls}-confirm-body`]: {
          marginBottom: 'auto',
        },
      },
    },
  ];
};

const genModalConfirmStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [confirmComponentCls]: {
      '&-rtl': {
        direction: 'rtl',
      },
      [`${token.antCls}-modal-header`]: {
        display: 'none',
      },
      [`${confirmComponentCls}-body-wrapper`]: {
        ...clearFix(),
      },
      [`${confirmComponentCls}-body`]: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',

        [`${confirmComponentCls}-title`]: {
          flex: '0 0 100%',
          display: 'block',
          // create BFC to avoid
          // https://user-images.githubusercontent.com/507615/37702510-ba844e06-2d2d-11e8-9b67-8e19be57f445.png
          overflow: 'hidden',
          color: token.colorTextHeading,
          fontWeight: token.fontWeightStrong,
          fontSize: token.titleFontSize,
          lineHeight: token.titleLineHeight,

          [`+ ${confirmComponentCls}-content`]: {
            marginBlockStart: token.marginXS,
            flexBasis: '100%',
            maxWidth: `calc(100% - ${token.modalConfirmIconSize + token.marginSM}px)`,
          },
        },

        [`${confirmComponentCls}-content`]: {
          color: token.colorText,
          fontSize: token.fontSize,
        },

        [`> ${token.iconCls}`]: {
          flex: 'none',
          marginInlineEnd: token.marginSM,
          fontSize: token.modalConfirmIconSize,

          [`+ ${confirmComponentCls}-title`]: {
            flex: 1,
          },

          // `content` after `icon` should set marginLeft
          [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
            marginInlineStart: token.modalConfirmIconSize + token.marginSM,
          },
        },
      },
      [`${confirmComponentCls}-btns`]: {
        textAlign: 'end',
        marginTop: token.marginSM,

        [`${token.antCls}-btn + ${token.antCls}-btn`]: {
          marginBottom: 0,
          marginInlineStart: token.marginXS,
        },
      },
    },

    [`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorError,
    },

    [`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorWarning,
    },

    [`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorInfo,
    },

    [`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorSuccess,
    },
  };
};

const genRTLStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap-rtl`]: {
        direction: 'rtl',

        [`${componentCls}-confirm-body`]: {
          direction: 'rtl',
        },
      },
    },
  };
};

const genWireframeStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls, antCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [componentCls]: {
      [`${componentCls}-content`]: {
        padding: 0,
      },

      [`${componentCls}-header`]: {
        padding: token.modalHeaderPadding,
        borderBottom: `${token.modalHeaderBorderWidth}px ${token.modalHeaderBorderStyle} ${token.modalHeaderBorderColorSplit}`,
        marginBottom: 0,
      },

      [`${componentCls}-body`]: {
        padding: token.modalBodyPadding,
      },

      [`${componentCls}-footer`]: {
        padding: `${token.modalFooterPaddingVertical}px ${token.modalFooterPaddingHorizontal}px`,
        borderTop: `${token.modalFooterBorderWidth}px ${token.modalFooterBorderStyle} ${token.modalFooterBorderColorSplit}`,
        borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
        marginTop: 0,
      },
    },

    [confirmComponentCls]: {
      [`${antCls}-modal-body`]: {
        padding: `${token.padding * 2}px ${token.padding * 2}px ${token.paddingLG}px`,
      },
      [`${confirmComponentCls}-body`]: {
        [`> ${token.iconCls}`]: {
          marginInlineEnd: token.margin,

          // `content` after `icon` should set marginLeft
          [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
            marginInlineStart: token.modalConfirmIconSize + token.margin,
          },
        },
      },
      [`${confirmComponentCls}-btns`]: {
        marginTop: token.marginLG,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Modal',
  (token) => {
    const headerPaddingVertical = token.padding;
    const headerFontSize = token.fontSizeHeading5;
    const headerLineHeight = token.lineHeightHeading5;

    const modalToken = mergeToken<ModalToken>(token, {
      modalBodyPadding: token.paddingLG,
      modalHeaderPadding: `${headerPaddingVertical}px ${token.paddingLG}px`,
      modalHeaderBorderWidth: token.lineWidth,
      modalHeaderBorderStyle: token.lineType,
      modalHeaderBorderColorSplit: token.colorSplit,
      modalHeaderHeight: headerLineHeight * headerFontSize + headerPaddingVertical * 2,
      modalFooterBorderColorSplit: token.colorSplit,
      modalFooterBorderStyle: token.lineType,
      modalFooterPaddingVertical: token.paddingXS,
      modalFooterPaddingHorizontal: token.padding,
      modalFooterBorderWidth: token.lineWidth,
      modalIconHoverColor: token.colorIconHover,
      modalCloseIconColor: token.colorIcon,
      modalCloseBtnSize: token.fontSize * token.lineHeight,
      modalConfirmIconSize: token.fontSize * token.lineHeight,
    });
    return [
      genModalStyle(modalToken),
      genModalConfirmStyle(modalToken),
      genRTLStyle(modalToken),
      genModalMaskStyle(modalToken),
      token.wireframe && genWireframeStyle(modalToken),
      initZoomMotion(modalToken, 'zoom'),
    ];
  },
  (token) => ({
    footerBg: 'transparent',
    headerBg: token.colorBgElevated,
    titleLineHeight: token.lineHeightHeading5,
    titleFontSize: token.fontSizeHeading5,
    contentBg: token.colorBgElevated,
    titleColor: token.colorTextHeading,
  }),
);
