import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
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
}

export interface DrawerToken extends FullToken<'Drawer'> {}

// =============================== Base ===============================
const genDrawerStyle: GenerateStyle<DrawerToken> = (token: DrawerToken) => {
  const {
    componentCls,
    zIndexPopup,
    colorBgMask,
    colorBgElevated,
    motionDurationSlow,
    motionDurationMid,
    padding,
    paddingLG,
    fontSizeLG,
    lineHeightLG,
    lineWidth,
    lineType,
    colorSplit,
    marginSM,
    colorIcon,
    colorIconHover,
    colorText,
    fontWeightStrong,
    footerPaddingBlock,
    footerPaddingInline,
  } = token;

  const wrapperCls = `${componentCls}-content-wrapper`;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,
      zIndex: zIndexPopup,
      pointerEvents: 'none',

      '&-pure': {
        position: 'relative',
        background: colorBgElevated,

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

      [`${componentCls}-content`]: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: colorBgElevated,
        pointerEvents: 'auto',
      },

      // ===================== Panel ======================
      [`${componentCls}-wrapper-body`]: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },

      // Header
      [`${componentCls}-header`]: {
        display: 'flex',
        flex: 0,
        alignItems: 'center',
        padding: `${padding}px ${paddingLG}px`,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,

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
        display: 'inline-block',
        marginInlineEnd: marginSM,
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
        outline: 0,
        cursor: 'pointer',
        transition: `color ${motionDurationMid}`,
        textRendering: 'auto',

        '&:focus, &:hover': {
          color: colorIconHover,
          textDecoration: 'none',
        },
      },

      [`${componentCls}-title`]: {
        flex: 1,
        margin: 0,
        color: colorText,
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
      },

      // Footer
      [`${componentCls}-footer`]: {
        flexShrink: 0,
        padding: `${footerPaddingBlock}px ${footerPaddingInline}px`,
        borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
      },

      // ====================== RTL =======================
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Drawer',
  (token) => {
    const drawerToken = mergeToken<DrawerToken>(token, {});

    return [genDrawerStyle(drawerToken), genMotionStyle(drawerToken)];
  },
  (token) => ({
    zIndexPopup: token.zIndexPopupBase,
    footerPaddingBlock: token.paddingXS,
    footerPaddingInline: token.padding,
  }),
);
