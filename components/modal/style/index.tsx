// deps-lint-skip-all
import React from 'react';
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  genComponentStyleHook,
  GenerateStyle,
  mergeToken,
  resetComponent,
  clearFix,
} from '../../_util/theme';
import type { FullToken } from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface ModalToken extends FullToken<'Modal'> {
  // Custom token here
  modalHeaderPaddingVertical: number;
  modalHeaderPaddingHorizontal: number;
  modalBodyPadding: number;
  modalHeaderBg: string;
  modalHeaderPadding: string;
  modalHeaderBorderWidth: number;
  modalHeaderBorderStyle: string;
  modalHeaderTitleLineHeight: string;
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
  modalMaskBg: string;
  modalConfirmBodyPadding: string;
  modalConfirmTitleFontSize: number;
  modalIconHoverColor: string;
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

function modalMask(componentCls: string, token: ModalToken): CSSObject {
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
      zIndex: token.zIndexPopup,
      height: '100%',
      backgroundColor: token.modalMaskBg,

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
        maxWidth: 'calc(100vw - 32px)',
        margin: '0 auto',
        paddingBottom: token.paddingLG,

        '&-title': {
          margin: 0,
          color: token.modalHeadingColor,
          fontWeight: 500,
          fontSize: token.fontSizeLG,
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
          // FIXME: hard code
          zIndex: token.zIndexBase + 10,
          padding: 0,
          color: token.modalCloseColor,
          // FIXME: hard code
          fontWeight: 700,
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
        zIndex: token.zIndexPopup,
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
          // FIXME: hard code
          padding: `${token.padding * 2}px ${token.padding * 2}px ${token.paddingLG}px`,
        },
        [`${confirmComponentCls}-body-wrapper`]: {
          ...clearFix(),
        },
        [`${confirmComponentCls}-body`]: {
          [`${confirmComponentCls}-title`]: {
            display: 'block',
            // create BFC to avoid
            // https://user-images.githubusercontent.com/507615/37702510-ba844e06-2d2d-11e8-9b67-8e19be57f445.png
            overflow: 'hidden',
            color: token.colorTextHeading,
            // FIXME: hard code
            fontWeight: 500,
            fontSize: token.modalConfirmTitleFontSize,
            // FIXME: hard code
            lineHeight: 1.4,
          },

          [`${confirmComponentCls}-content`]: {
            marginTop: token.marginXS,
            color: token.colorText,
            fontSize: token.fontSizeBase,
          },

          [`> ${token.iconCls}`]: {
            float: 'left',
            marginInlineEnd: token.margin,
            // FIXME: hard code
            fontSize: 22,

            // `content` after `icon` should set marginLeft
            [`+ ${confirmComponentCls}-title + ${confirmComponentCls}-content`]: {
              // FIXME: hard code
              marginInlineStart: 38,
            },
          },
        },
        [`${confirmComponentCls}-btns`]: {
          // FIXME: 改成 flex 布局
          float: 'right',
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
          // FIXME: duplicated style
          // direction: 'rtl',

          [`>${token.iconCls}`]: {
            float: 'right',
          },
        },

        [`${componentCls}-confirm-btns`]: {
          float: 'left',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Modal', token => {
  const modalToken = mergeToken<ModalToken>(token, {
    modalHeaderPaddingVertical: token.paddingXS,
    modalHeaderPaddingHorizontal: token.paddingLG,
    modalBodyPadding: token.paddingLG,
    modalHeaderBg: token.colorBgComponent,
    modalHeaderPadding: `${token.padding}px ${token.paddingLG}px`,
    modalHeaderBorderWidth: token.controlLineWidth,
    modalHeaderBorderStyle: token.controlLineType,
    //
    modalHeaderTitleLineHeight: '22px',
    modalHeaderTitleFontSize: token.fontSizeLG,
    modalHeaderBorderColorSplit: token.colorSplit,
    // FIXME: hard code
    modalHeaderCloseSize: 56,
    modalContentBg: token.colorBgComponent,
    modalHeadingColor: token.colorTextHeading,
    modalCloseColor: token.colorTextSecondary,
    modalFooterBg: 'transparent',
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.controlLineType,
    // FIXME: hard code
    modalFooterPaddingVertical: token.paddingXS + 2,
    // FIXME: hard code
    modalFooterPaddingHorizontal: token.padding,
    modalFooterBorderWidth: token.controlLineWidth,
    modalMaskBg: token.colorTextSecondary,
    modalConfirmBodyPadding: `${token.padding * 2}px ${token.padding}px ${token.paddingLG}px`,
    modalConfirmTitleFontSize: token.fontSizeLG,
    // FIXME: hard code
    modalIconHoverColor: new TinyColor('#000').setAlpha(0.75).toRgbString(),
  });
  return [genModalStyle(modalToken), genModalConfirmStyle(modalToken), genRTLStyle(modalToken)];
});
