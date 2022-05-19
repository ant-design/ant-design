// deps-lint-skip-all
import type React from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import type { TokenWithCommonCls } from 'antd/es/_util/theme/util/genComponentStyleHook';
import { genComponentStyleHook, mergeToken, resetComponent, clearFix } from '../../_util/theme';
import type { FullToken, GenerateStyle, AliasToken } from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface ModalToken extends FullToken<'Modal'> {
  // Custom token here
  modalBodyPadding: number;
  modalHeaderBg: string;
  modalHeaderPadding: string;
  modalHeaderBorderWidth: number;
  modalHeaderBorderStyle: string;
  modalHeaderTitleLineHeight: number;
  modalHeaderTitleFontSize: number;
  modalHeaderBorderColorSplit: string;
  modalHeaderCloseSize: number;
  modalContentBg: string;
  modalHeadingColor: string;
  modalCloseColor: string;
  modalFooterBg: string;
  modalFooterBorderColorSplit: string;
  modalFooterBorderStyle: string;
  modalFooterPaddingVertical: number;
  modalFooterPaddingHorizontal: number;
  modalFooterBorderWidth: number;
  modalConfirmTitleFontSize: number;
  modalIconHoverColor: string;
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

export function modalMask(componentCls: string, token: TokenWithCommonCls<AliasToken>): CSSObject {
  return {
    [`${componentCls}${token.antCls}-zoom-enter, ${componentCls}${token.antCls}-zoom-appear`]: {
      // reset scale avoid mousePosition bug
      transform: 'none',
      opacity: 0,
      animationDuration: token.motionDurationSlow,
      // https://github.com/ant-design/ant-design/issues/11777
      userSelect: 'none',
    },

    [`${componentCls}-mask`]: {
      ...box('fixed'),
      zIndex: token.zIndexPopupBase,
      height: '100%',
      backgroundColor: token.colorPopupBg,

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
  };
}

const genModalStyle: GenerateStyle<ModalToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-root`]: {
      ...modalMask(componentCls, token),

      [componentCls]: {
        ...resetComponent(token),
        pointerEvents: 'none',
        position: 'relative',
        top: 100,
        width: 'auto',
        maxWidth: `calc(100vw - ${token.margin * 2}px)`,
        margin: '0 auto',
        paddingBottom: token.paddingLG,

        '&-title': {
          margin: 0,
          color: token.modalHeadingColor,
          fontWeight: token.fontWeightStrong,
          fontSize: token.modalHeaderTitleFontSize,
          lineHeight: token.modalHeaderTitleLineHeight,
          wordWrap: 'break-word',
        },

        '&-content': {
          position: 'relative',
          backgroundColor: token.modalContentBg,
          backgroundClip: 'padding-box',
          border: 0,
          borderRadius: token.controlRadius,
          boxShadow: token.boxShadow,
          pointerEvents: 'auto',
        },

        '&-close': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          zIndex: token.zIndexPopupBase + 10,
          padding: 0,
          color: token.modalCloseColor,
          fontWeight: token.fontWeightStrong,
          lineHeight: 1,
          textDecoration: 'none',
          background: 'transparent',
          border: 0,
          outline: 0,
          cursor: 'pointer',
          transition: `color ${token.motionDurationSlow}`,

          '&-x': {
            display: 'block',
            width: token.modalHeaderCloseSize,
            height: token.modalHeaderCloseSize,
            fontSize: token.fontSizeLG,
            fontStyle: 'normal',
            lineHeight: `${token.modalHeaderCloseSize}px`,
            textAlign: 'center',
            textTransform: 'none',
            textRendering: 'auto',
          },

          '&:focus, &:hover': {
            color: token.modalIconHoverColor,
            textDecoration: 'none',
          },
        },

        '&-header': {
          padding: token.modalHeaderPadding,
          color: token.colorText,
          background: token.modalHeaderBg,
          borderBottom: `${token.modalHeaderBorderWidth}px ${token.modalHeaderBorderStyle} ${token.modalHeaderBorderColorSplit}`,
          borderRadius: `${token.controlRadius}px ${token.controlRadius}px 0 0`,
        },

        '&-body': {
          padding: token.modalBodyPadding,
          fontSize: token.fontSizeBase,
          lineHeight: token.lineHeight,
          wordWrap: 'break-word',
        },

        '&-footer': {
          padding: `${token.modalFooterPaddingVertical}px ${token.modalFooterPaddingHorizontal}px`,
          textAlign: 'end',
          background: token.modalFooterBg,
          borderTop: `${token.modalFooterBorderWidth}px ${token.modalFooterBorderStyle} ${token.modalFooterBorderColorSplit}`,
          borderRadius: `0 0 ${token.controlRadius}px ${token.controlRadius}px`,

          [`${token.antCls}-btn + ${token.antCls}-btn:not(${token.antCls}-dropdown-trigger)`]: {
            marginBottom: 0,
            marginInlineStart: token.marginXS,
          },
        },

        '&-open': {
          overflow: 'hidden',
        },
      },

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
  };
};

const genModalConfirmStyle: GenerateStyle<ModalToken> = token => {
  const { componentCls } = token;
  const confirmComponentCls = `${componentCls}-confirm`;

  return {
    [`${componentCls}-root`]: {
      [confirmComponentCls]: {
        '&-rtl': {
          direction: 'rtl',
        },
        [`${token.antCls}-modal-header`]: {
          display: 'none',
        },
        [`${token.antCls}-modal-body`]: {
          padding: `${token.padding * 2}px ${token.padding * 2}px ${token.paddingLG}px`,
        },
        [`${confirmComponentCls}-body-wrapper`]: {
          ...clearFix(),
        },
        [`${confirmComponentCls}-body`]: {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',

          [`${confirmComponentCls}-title`]: {
            flex: 1,
            display: 'block',
            // create BFC to avoid
            // https://user-images.githubusercontent.com/507615/37702510-ba844e06-2d2d-11e8-9b67-8e19be57f445.png
            overflow: 'hidden',
            color: token.colorTextHeading,
            fontWeight: token.fontWeightStrong,
            fontSize: token.modalHeaderTitleFontSize,
            lineHeight: token.modalHeaderTitleLineHeight,
          },

          [`${confirmComponentCls}-content`]: {
            marginTop: token.marginXS,
            color: token.colorText,
            fontSize: token.fontSizeBase,
            flexBasis: '100%',
          },

          [`> ${token.iconCls}`]: {
            flex: 'none',
            marginInlineEnd: token.margin,
            fontSize: token.modalConfirmIconSize,

            // `content` after `icon` should set marginLeft
            [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
              marginInlineStart: token.modalConfirmIconSize + token.margin,
            },
          },
        },
        [`${confirmComponentCls}-btns`]: {
          textAlign: 'end',
          marginTop: token.marginLG,

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
    },
  };
};

const genRTLStyle: GenerateStyle<ModalToken> = token => {
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

// ============================== Export ==============================
export default genComponentStyleHook('Modal', token => {
  const headerPaddingVertical = token.padding;
  const headerFontSize = token.fontSizeHeading5;
  const headerLineHeight = token.lineHeightHeading5;

  const modalToken = mergeToken<ModalToken>(token, {
    modalBodyPadding: token.paddingLG,
    modalHeaderBg: token.colorBgComponent,
    modalHeaderPadding: `${headerPaddingVertical}px ${token.paddingLG}px`,
    modalHeaderBorderWidth: token.controlLineWidth,
    modalHeaderBorderStyle: token.controlLineType,
    modalHeaderTitleLineHeight: headerLineHeight,
    modalHeaderTitleFontSize: headerFontSize,
    modalHeaderBorderColorSplit: token.colorSplit,
    modalHeaderCloseSize: headerLineHeight * headerFontSize + headerPaddingVertical * 2,
    modalContentBg: token.colorBgComponent,
    modalHeadingColor: token.colorTextHeading,
    modalCloseColor: token.colorTextSecondary,
    modalFooterBg: 'transparent',
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.controlLineType,
    modalFooterPaddingVertical: token.paddingXS,
    modalFooterPaddingHorizontal: token.padding,
    modalFooterBorderWidth: token.controlLineWidth,
    modalConfirmTitleFontSize: token.fontSizeLG,
    modalIconHoverColor: token.colorActionHover,
    modalConfirmIconSize: token.fontSize * token.lineHeight,
  });
  return [genModalStyle(modalToken), genModalConfirmStyle(modalToken), genRTLStyle(modalToken)];
});
