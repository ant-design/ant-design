import type React from 'react';
import { unit } from '@ant-design/cssinjs';

import { getMediaSize } from '../../grid/style';
import { genFocusStyle, resetComponent } from '../../style';
import { initFadeMotion, initZoomMotion } from '../../style/motion';
import type {
  AliasToken,
  FullToken,
  GenerateStyle,
  GenStyleFn,
  GlobalToken,
  TokenWithCommonCls,
} from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  /**
   * @desc 顶部背景色
   * @descEN Background color of header
   */
  headerBg: string;
  /**
   * @desc 标题行高
   * @descEN Line height of title
   */
  titleLineHeight: number | string;
  /**
   * @desc 标题字体大小
   * @descEN Font size of title
   */
  titleFontSize: number;
  /**
   * @desc 标题字体颜色
   * @descEN Font color of title
   */
  titleColor: string;
  /**
   * @desc 内容区域背景色
   * @descEN Background color of content
   */
  contentBg: string;
  /**
   * @desc 底部区域背景色
   * @descEN Background color of footer
   */
  footerBg: string;

  /** @internal */
  contentPadding: number | string;
  /** @internal */
  headerPadding: string | number;
  /** @internal */
  headerBorderBottom: string;
  /** @internal */
  headerMarginBottom: number;
  /** @internal */
  bodyPadding: number;
  /** @internal */
  footerPadding: string | number;
  /** @internal */
  footerBorderTop: string;
  /** @internal */
  footerBorderRadius: string | number;
  /** @internal */
  footerMarginTop: string | number;
  /** @internal */
  confirmBodyPadding: string | number;
  /** @internal */
  confirmIconMarginInlineEnd: string | number;
  /** @internal */
  confirmBtnsMarginTop: string | number;
}

/**
 * @desc Modal 组件的 Token
 * @descEN Token for Modal component
 */
export interface ModalToken extends FullToken<'Modal'> {
  /**
   * @desc 模态框头部高度
   * @descEN Height of modal header
   */
  modalHeaderHeight: number | string;
  /**
   * @desc 模态框底部边框颜色
   * @descEN Border color of modal footer
   */
  modalFooterBorderColorSplit: string;
  /**
   * @desc 模态框底部边框样式
   * @descEN Border style of modal footer
   */
  modalFooterBorderStyle: string;
  /**
   * @desc 模态框底部边框宽度
   * @descEN Border width of modal footer
   */
  modalFooterBorderWidth: number | string;
  /**
   * @desc 模态框关闭图标颜色
   * @descEN Color of modal close icon
   */
  modalCloseIconColor: string;
  /**
   * @desc 模态框关闭图标悬停颜色
   * @descEN Hover color of modal close icon
   */
  modalCloseIconHoverColor: string;
  /**
   * @desc 模态框关闭按钮尺寸
   * @descEN Size of modal close button
   */
  modalCloseBtnSize: number | string;
  /**
   * @desc 模态框确认图标尺寸
   * @descEN Size of modal confirm icon
   */
  modalConfirmIconSize: number | string;
  /**
   * @desc 模态框标题高度
   * @descEN Height of modal title
   */
  modalTitleHeight: number | string;
}

function box(position: React.CSSProperties['position']): React.CSSProperties {
  return {
    position,
    inset: 0,
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
          pointerEvents: 'none',

          [`${componentCls}-hidden`]: {
            display: 'none',
          },
        },

        [`${componentCls}-wrap`]: {
          ...box('fixed'),
          zIndex: token.zIndexPopupBase,
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

        [`@media (max-width: ${token.screenSMMax}px)`]: {
          [componentCls]: {
            maxWidth: 'calc(100vw - 16px)',
            margin: `${unit(token.marginXS)} auto`,
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
        maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
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
          padding: token.contentPadding,
        },

        [`${componentCls}-close`]: {
          position: 'absolute',
          top: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
          insetInlineEnd: token
            .calc(token.modalHeaderHeight)
            .sub(token.modalCloseBtnSize)
            .div(2)
            .equal(),
          zIndex: token.calc(token.zIndexPopupBase).add(10).equal(),
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
            lineHeight: unit(token.modalCloseBtnSize),
            justifyContent: 'center',
            textTransform: 'none',
            textRendering: 'auto',
          },

          '&:disabled': {
            pointerEvents: 'none',
          },

          '&:hover': {
            color: token.modalCloseIconHoverColor,
            backgroundColor: token.colorBgTextHover,
            textDecoration: 'none',
          },

          '&:active': {
            backgroundColor: token.colorBgTextActive,
          },

          ...genFocusStyle(token),
        },

        [`${componentCls}-header`]: {
          color: token.colorText,
          background: token.headerBg,
          borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
          marginBottom: token.headerMarginBottom,
          padding: token.headerPadding,
          borderBottom: token.headerBorderBottom,
        },

        [`${componentCls}-body`]: {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          wordWrap: 'break-word',
          padding: token.bodyPadding,
          [`${componentCls}-body-skeleton`]: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: `${unit(token.margin)} auto`,
          },
        },

        [`${componentCls}-footer`]: {
          textAlign: 'end',
          background: token.footerBg,
          marginTop: token.footerMarginTop,
          padding: token.footerPadding,
          borderTop: token.footerBorderTop,
          borderRadius: token.footerBorderRadius,

          [`> ${token.antCls}-btn + ${token.antCls}-btn`]: {
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

const genResponsiveWidthStyle: GenerateStyle<ModalToken> = (token) => {
  const { componentCls } = token;

  const gridMediaSizesMap: Record<string, number> = getMediaSize(token);
  delete gridMediaSizesMap.xs;

  const responsiveStyles = Object.keys(gridMediaSizesMap).map((key) => ({
    [`@media (min-width: ${unit(gridMediaSizesMap[key])})`]: {
      width: `var(--${componentCls.replace('.', '')}-${key}-width)`,
    },
  }));

  return {
    [`${componentCls}-root`]: {
      [componentCls]: [
        {
          width: `var(--${componentCls.replace('.', '')}-xs-width)`,
        },
        ...responsiveStyles,
      ],
    },
  };
};

// ============================== Export ==============================
export const prepareToken: (token: Parameters<GenStyleFn<'Modal'>>[0]) => ModalToken = (token) => {
  const headerPaddingVertical = token.padding;
  const headerFontSize = token.fontSizeHeading5;
  const headerLineHeight = token.lineHeightHeading5;

  const modalToken = mergeToken<ModalToken>(token, {
    modalHeaderHeight: token
      .calc(token.calc(headerLineHeight).mul(headerFontSize).equal())
      .add(token.calc(headerPaddingVertical).mul(2).equal())
      .equal(),
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.lineType,
    modalFooterBorderWidth: token.lineWidth,
    modalCloseIconColor: token.colorIcon,
    modalCloseIconHoverColor: token.colorIconHover,
    modalCloseBtnSize: token.controlHeight,
    modalConfirmIconSize: token.fontHeight,
    modalTitleHeight: token.calc(token.titleFontSize).mul(token.titleLineHeight).equal(),
  });

  return modalToken;
};

export const prepareComponentToken = (token: GlobalToken) => ({
  footerBg: 'transparent',
  headerBg: token.colorBgElevated,
  titleLineHeight: token.lineHeightHeading5,
  titleFontSize: token.fontSizeHeading5,
  contentBg: token.colorBgElevated,
  titleColor: token.colorTextHeading,

  // internal
  contentPadding: token.wireframe
    ? 0
    : `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
  headerPadding: token.wireframe ? `${unit(token.padding)} ${unit(token.paddingLG)}` : 0,
  headerBorderBottom: token.wireframe
    ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
    : 'none',
  headerMarginBottom: token.wireframe ? 0 : token.marginXS,
  bodyPadding: token.wireframe ? token.paddingLG : 0,
  footerPadding: token.wireframe ? `${unit(token.paddingXS)} ${unit(token.padding)}` : 0,
  footerBorderTop: token.wireframe
    ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
    : 'none',
  footerBorderRadius: token.wireframe
    ? `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
    : 0,
  footerMarginTop: token.wireframe ? 0 : token.marginSM,
  confirmBodyPadding: token.wireframe
    ? `${unit(token.padding * 2)} ${unit(token.padding * 2)} ${unit(token.paddingLG)}`
    : 0,
  confirmIconMarginInlineEnd: token.wireframe ? token.margin : token.marginSM,
  confirmBtnsMarginTop: token.wireframe ? token.marginLG : token.marginSM,
});

export default genStyleHooks(
  'Modal',
  (token) => {
    const modalToken = prepareToken(token);

    return [
      genModalStyle(modalToken),
      genRTLStyle(modalToken),
      genModalMaskStyle(modalToken),
      initZoomMotion(modalToken, 'zoom'),
      genResponsiveWidthStyle(modalToken),
    ];
  },
  prepareComponentToken,
  {
    unitless: {
      titleLineHeight: true,
    },
  },
);
