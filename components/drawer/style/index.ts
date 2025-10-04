import { unit } from '@ant-design/cssinjs';

import { blurMaskStyle, genFocusStyle } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genMotionStyle from './motion';

export interface ComponentToken {
  /**
   * @desc 弹窗 z-index
   * @descEN z-index of drawer
   */
  zIndexPopup: number;
  /**
   * @desc 底部区域纵向内间距
   * @descEN Vertical padding of footer
   */
  footerPaddingBlock: number;
  /**
   * @desc 底部区域横向内间距
   * @descEN Horizontal padding of footer
   */
  footerPaddingInline: number;
  /**
   * @desc 拖拽手柄大小
   * @descEN Size of resize handle
   */
  draggerSize: number;
}

export interface DrawerToken extends FullToken<'Drawer'> {}

// =============================== Base ===============================
const genDrawerStyle: GenerateStyle<DrawerToken> = (token) => {
  const {
    borderRadiusSM,
    componentCls,
    zIndexPopup,
    colorBgMask,
    colorBgElevated,
    motionDurationSlow,
    motionDurationMid,
    paddingXS,
    padding,
    paddingLG,
    fontSizeLG,
    lineHeightLG,
    lineWidth,
    lineType,
    colorSplit,
    marginXS,
    colorIcon,
    colorIconHover,
    colorBgTextHover,
    colorBgTextActive,
    colorText,
    fontWeightStrong,
    footerPaddingBlock,
    footerPaddingInline,
    draggerSize,
    calc,
  } = token;

  const wrapperCls = `${componentCls}-content-wrapper`;
  const draggerCls = `${componentCls}-resizable-dragger`;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      zIndex: zIndexPopup,
      pointerEvents: 'none',
      color: colorText,

      '&-pure': {
        position: 'relative',
        background: colorBgElevated,
        display: 'flex',
        flexDirection: 'column',

        [`&${componentCls}-left`]: {
          boxShadow: token.boxShadowDrawerLeft,
        },
        [`&${componentCls}-right`]: {
          boxShadow: token.boxShadowDrawerRight,
        },
        [`&${componentCls}-top`]: {
          boxShadow: token.boxShadowDrawerUp,
        },
        [`&${componentCls}-bottom`]: {
          boxShadow: token.boxShadowDrawerDown,
        },
      },

      '&-inline': {
        position: 'absolute',
      },

      // ====================== Mask ======================
      [`${componentCls}-mask`]: {
        position: 'absolute',
        inset: 0,
        zIndex: zIndexPopup,
        background: colorBgMask,
        pointerEvents: 'auto',

        [`&${componentCls}-mask-blur`]: {
          ...blurMaskStyle,
        },
      },

      // ==================== Content =====================
      [wrapperCls]: {
        position: 'absolute',
        zIndex: zIndexPopup,
        maxWidth: '100vw',
        transition: `all ${motionDurationSlow}`,

        '&-hidden': {
          display: 'none',
        },
      },

      // Placement
      [`&-left > ${wrapperCls}`]: {
        top: 0,
        bottom: 0,
        left: {
          _skip_check_: true,
          value: 0,
        },
        boxShadow: token.boxShadowDrawerLeft,
      },
      [`&-right > ${wrapperCls}`]: {
        top: 0,
        right: {
          _skip_check_: true,
          value: 0,
        },
        bottom: 0,
        boxShadow: token.boxShadowDrawerRight,
      },
      [`&-top > ${wrapperCls}`]: {
        top: 0,
        insetInline: 0,
        boxShadow: token.boxShadowDrawerUp,
      },
      [`&-bottom > ${wrapperCls}`]: {
        bottom: 0,
        insetInline: 0,
        boxShadow: token.boxShadowDrawerDown,
      },

      [`${componentCls}-section`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: colorBgElevated,
        pointerEvents: 'auto',
      },

      // Header
      [`${componentCls}-header`]: {
        display: 'flex',
        flex: 0,
        alignItems: 'center',
        padding: `${unit(padding)} ${unit(paddingLG)}`,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG,
        borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,

        '&-title': {
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          minWidth: 0,
          minHeight: 0,
        },
      },

      [`${componentCls}-extra`]: {
        flex: 'none',
      },

      [`${componentCls}-close`]: {
        display: 'inline-flex',
        width: calc(fontSizeLG).add(paddingXS).equal(),
        height: calc(fontSizeLG).add(paddingXS).equal(),
        borderRadius: borderRadiusSM,
        justifyContent: 'center',
        alignItems: 'center',
        color: colorIcon,
        fontWeight: fontWeightStrong,
        fontSize: fontSizeLG,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        textDecoration: 'none',
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        transition: `all ${motionDurationMid}`,
        textRendering: 'auto',

        [`&${componentCls}-close-end`]: {
          marginInlineStart: marginXS,
        },
        [`&:not(${componentCls}-close-end)`]: {
          marginInlineEnd: marginXS,
        },

        '&:hover': {
          color: colorIconHover,
          backgroundColor: colorBgTextHover,
          textDecoration: 'none',
        },

        '&:active': {
          backgroundColor: colorBgTextActive,
        },

        ...genFocusStyle(token),
      },

      [`${componentCls}-title`]: {
        flex: 1,
        margin: 0,
        fontWeight: token.fontWeightStrong,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG,
      },

      // Body
      [`${componentCls}-body`]: {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        padding: paddingLG,
        overflow: 'auto',
        [`${componentCls}-body-skeleton`]: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        },
      },

      // Footer
      [`${componentCls}-footer`]: {
        flexShrink: 0,
        padding: `${unit(footerPaddingBlock)} ${unit(footerPaddingInline)}`,
        borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      },

      // ==================== Resizable ===================
      [draggerCls]: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'transparent',
        userSelect: 'none',
        pointerEvents: 'auto',

        '&:hover': {
          backgroundColor: token.colorPrimary,
          opacity: 0.2,
        },

        '&-dragging': {
          backgroundColor: token.colorPrimary,
          opacity: 0.3,
        },
      },

      [`${draggerCls}-left`]: {
        top: 0,
        bottom: 0,
        insetInlineEnd: 0,
        width: draggerSize,
        cursor: 'col-resize',
      },

      [`${draggerCls}-right`]: {
        top: 0,
        bottom: 0,
        insetInlineStart: 0,
        width: draggerSize,
        cursor: 'col-resize',
      },

      [`${draggerCls}-top`]: {
        insetInline: 0,
        bottom: 0,
        height: draggerSize,
        cursor: 'row-resize',
      },

      [`${draggerCls}-bottom`]: {
        insetInline: 0,
        top: 0,
        height: draggerSize,
        cursor: 'row-resize',
      },

      // Wrapper dragging state - disable transitions for smooth dragging
      [`${wrapperCls}-dragging`]: {
        userSelect: 'none',
        transition: 'none',
        willChange: 'width, height',

        [`${componentCls}-content`]: {
          pointerEvents: 'none',
        },

        [`${componentCls}-section`]: {
          pointerEvents: 'none',
        },
      },

      // ====================== RTL =======================
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Drawer'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase,
  footerPaddingBlock: token.paddingXS,
  footerPaddingInline: token.padding,
  draggerSize: 4,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Drawer',
  (token) => {
    const drawerToken = mergeToken<DrawerToken>(token, {});
    return [genDrawerStyle(drawerToken), genMotionStyle(drawerToken)];
  },
  prepareComponentToken,
);
