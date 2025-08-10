import { unit } from '@ant-design/cssinjs';

import { genFocusStyle } from '../../style';
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
    calc,
  } = token;

  const wrapperCls = `${componentCls}-content-wrapper`;

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

        // 拖拽时禁用 transition
        '&-no-transition': {
          transition: 'none !important',
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
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'auto', // 默认全方向滚动
        background: colorBgElevated,
        pointerEvents: 'auto',
        // 优化调整大小时的性能
        willChange: 'width, height',
      },

      // 根据方向设置不同的 overflow
      [`&-left ${componentCls}-content, &-right ${componentCls}-content`]: {
        overflowX: 'hidden', // 左右方向的 drawer 禁用横向滚动
        overflowY: 'auto', // 允许纵向滚动
      },

      [`&-top ${componentCls}-content, &-bottom ${componentCls}-content`]: {
        overflowX: 'auto', // 允许横向滚动
        overflowY: 'hidden', // 上下方向的 drawer 禁用纵向滚动
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
        marginInlineEnd: marginXS,
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

      // =================== Resize Handle ===================
      [`${componentCls}-resize-handle`]: {
        position: 'absolute',
        zIndex: calc(zIndexPopup).add(1).equal(),
        backgroundColor: 'transparent',
        transition: `background-color ${motionDurationMid}`,
        userSelect: 'none',
        pointerEvents: 'auto',
        // 确保在所有情况下都可见和可交互
        display: 'block',
        visibility: 'visible',

        '&:hover': {
          backgroundColor: token.colorPrimary,
        },

        '&:active': {
          backgroundColor: token.colorPrimary,
        },

        '&-left': {
          top: 0,
          right: 0, // 位于 drawer 右边缘
          bottom: 0,
          width: 4,
          cursor: 'ew-resize',
          // 当 drawer 宽度为 0 时，手柄仍然可见
          minWidth: 4,
          // 确保即使父容器宽度为 0 也能显示
          transform: 'translateX(2px)', // 防止被裁剪
        },

        '&-right': {
          top: 0,
          left: 0, // 位于 drawer 左边缘
          bottom: 0,
          width: 4,
          cursor: 'ew-resize',
          // 当 drawer 宽度为 0 时，手柄仍然可见
          minWidth: 4,
          // 确保即使父容器宽度为 0 也能显示
          transform: 'translateX(-2px)', // 防止被裁剪
        },

        '&-top': {
          left: 0,
          right: 0,
          bottom: 0, // 位于 drawer 底边缘
          height: 4,
          cursor: 'ns-resize',
          // 当 drawer 高度为 0 时，手柄仍然可见
          minHeight: 4,
          // 确保即使父容器高度为 0 也能显示
          transform: 'translateY(2px)', // 防止被裁剪
        },

        '&-bottom': {
          left: 0,
          right: 0,
          top: 0, // 位于 drawer 顶边缘
          height: 4,
          cursor: 'ns-resize',
          // 当 drawer 高度为 0 时，手柄仍然可见
          minHeight: 4,
          // 确保即使父容器高度为 0 也能显示
          transform: 'translateY(-2px)', // 防止被裁剪
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
