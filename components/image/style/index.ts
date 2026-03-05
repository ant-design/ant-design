import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes, unit } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 预览浮层 z-index
   * @descEN z-index of preview popup
   */
  zIndexPopup: number;
  /**
   * @desc 预览操作图标大小
   * @descEN Size of preview operation icon
   */
  previewOperationSize: number;
  /**
   * @desc 预览操作图标颜色
   * @descEN Color of preview operation icon
   */
  previewOperationColor: string;
  /**
   * @desc 预览操作图标悬浮颜色
   * @descEN Color of hovered preview operation icon
   */
  previewOperationHoverColor: string;
  /**
   * @desc 预览操作图标禁用颜色
   * @descEN Disabled color of preview operation icon
   */
  previewOperationColorDisabled: string;
  /**
   * @desc 进度遮罩背景色
   * @descEN Background color of progress overlay
   */
  progressBgColor: string;
  /**
   * @desc 进度条高度
   * @descEN Height of progress bar
   */
  progressBarHeight: number;
  /**
   * @desc 进度条背景色
   * @descEN Background color of progress bar
   */
  progressBarBgColor: string;
  /**
   * @desc 进度条填充渐变
   * @descEN Gradient of progress bar fill
   */
  progressBarGradient: string;
}

// Progress active animation - subtle shimmer effect (reverse direction)
const progressActive = new Keyframes('antImageProgressActive', {
  '0%': {
    backgroundPosition: '200% 0',
  },
  '100%': {
    backgroundPosition: '-200% 0',
  },
});

// Ink flow 1 - large drift
const inkFlow1 = new Keyframes('antImageInkFlow1', {
  '0%': {
    transform: 'translate(0%, 0%) scale(1)',
    opacity: 0.8,
  },
  '50%': {
    transform: 'translate(15%, -20%) scale(1.25)',
    opacity: 0.5,
  },
  '100%': {
    transform: 'translate(0%, 0%) scale(1)',
    opacity: 0.8,
  },
});

// Ink flow 2 - opposite direction
const inkFlow2 = new Keyframes('antImageInkFlow2', {
  '0%': {
    transform: 'translate(0%, 0%) scale(1.1) rotate(0deg)',
    opacity: 0.7,
  },
  '50%': {
    transform: 'translate(-18%, 15%) scale(0.85) rotate(8deg)',
    opacity: 0.9,
  },
  '100%': {
    transform: 'translate(0%, 0%) scale(1.1) rotate(0deg)',
    opacity: 0.7,
  },
});

// Ink flow 3 - center pulse
const inkFlow3 = new Keyframes('antImageInkFlow3', {
  '0%': {
    transform: 'translate(0%, 0%) scale(0.8)',
    opacity: 0.6,
  },
  '50%': {
    transform: 'translate(10%, 12%) scale(1.2)',
    opacity: 0.85,
  },
  '100%': {
    transform: 'translate(0%, 0%) scale(0.8)',
    opacity: 0.6,
  },
});

// Ink flow 4 - corner drift
const inkFlow4 = new Keyframes('antImageInkFlow4', {
  '0%': {
    transform: 'translate(0%, 0%) scale(1)',
    opacity: 0.7,
  },
  '33%': {
    transform: 'translate(-20%, -12%) scale(1.15)',
    opacity: 0.5,
  },
  '66%': {
    transform: 'translate(12%, 18%) scale(0.9)',
    opacity: 0.8,
  },
  '100%': {
    transform: 'translate(0%, 0%) scale(1)',
    opacity: 0.7,
  },
});

/**
 * @desc Image 组件的 Token
 * @descEN Token for Image component
 */
export interface ImageToken extends FullToken<'Image'> {
  /**
   * @desc 预览类名
   * @descEN Preview class name
   */
  previewCls: string;
  /**
   * @desc 预览切换按钮尺寸
   * @descEN Size of preview switch button
   */
  imagePreviewSwitchSize: number;
}

export type PositionType = 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined;

export const genBoxStyle = (position?: PositionType): CSSObject => ({
  position: position || 'absolute',
  inset: 0,
});

export const genImageCoverStyle: GenerateStyle<ImageToken, CSSObject> = (token) => {
  const { componentCls, motionDurationSlow, colorTextLightSolid } = token;
  return {
    [componentCls]: {
      [`${componentCls}-cover`]: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colorTextLightSolid,
        background: new FastColor('#000').setA(0.3).toRgbString(),
        cursor: 'pointer',
        opacity: 0,
        transition: `opacity ${motionDurationSlow}`,
      },
      '&:hover': {
        [`${componentCls}-cover`]: {
          opacity: 1,
        },
      },
      [`${componentCls}-cover-top`]: {
        inset: '0 0 auto 0',
        justifyContent: 'center',
      },
      [`${componentCls}-cover-bottom`]: {
        inset: 'auto 0 0 0',
        justifyContent: 'center',
      },
    },
  };
};

export const genImageProgressStyle: GenerateStyle<ImageToken, CSSObject> = (token) => {
  const { componentCls, motionDurationMid, motionDurationSlow, motionEaseInOut } = token;

  return {
    // Progress wrapper style
    [`${componentCls}-progress-wrapper`]: {
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      borderRadius: 'inherit',

      // Main progress container with frosted glass effect
      [`${componentCls}-progress`]: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Frosted glass base
        backgroundColor: token.progressBgColor,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: 'inherit',
        zIndex: 1,
      },

      // Ink 1 - Top left blue cloud
      [`${componentCls}-progress-ink-1`]: {
        position: 'absolute',
        width: '150%',
        height: '150%',
        left: '-25%',
        top: '-25%',
        background: `radial-gradient(ellipse 65% 55% at 25% 30%, rgba(100, 180, 255, 0.85) 0%, transparent 55%)`,
        animationName: inkFlow1,
        animationDuration: motionDurationSlow,
        animationTimingFunction: motionEaseInOut,
        animationIterationCount: 'infinite',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      },

      // Ink 2 - Center right lavender
      [`${componentCls}-progress-ink-2`]: {
        position: 'absolute',
        width: '150%',
        height: '150%',
        left: '-25%',
        top: '-25%',
        background: `radial-gradient(ellipse 60% 65% at 75% 45%, rgba(180, 140, 255, 0.8) 0%, transparent 50%)`,
        animationName: inkFlow2,
        animationDuration: '5s',
        animationTimingFunction: motionEaseInOut,
        animationIterationCount: 'infinite',
        animationDelay: '-1s',
        filter: 'blur(45px)',
        pointerEvents: 'none',
      },

      // Ink 3 - Bottom center cyan
      [`${componentCls}-progress-ink-3`]: {
        position: 'absolute',
        width: '150%',
        height: '150%',
        left: '-25%',
        top: '-25%',
        background: `radial-gradient(ellipse 55% 50% at 50% 70%, rgba(100, 220, 220, 0.75) 0%, transparent 45%)`,
        animationName: inkFlow3,
        animationDuration: '3.5s',
        animationTimingFunction: motionEaseInOut,
        animationIterationCount: 'infinite',
        animationDelay: '-2s',
        filter: 'blur(38px)',
        pointerEvents: 'none',
      },

      // Ink 4 - Scattered pink blossom
      [`${componentCls}-progress-ink-4`]: {
        position: 'absolute',
        width: '150%',
        height: '150%',
        left: '-25%',
        top: '-25%',
        background: `radial-gradient(ellipse 45% 40% at 60% 20%, rgba(255, 150, 200, 0.7) 0%, transparent 45%)`,
        animationName: inkFlow4,
        animationDuration: '4.5s',
        animationTimingFunction: motionEaseInOut,
        animationIterationCount: 'infinite',
        animationDelay: '-3s',
        filter: 'blur(42px)',
        pointerEvents: 'none',
      },

      // Ink 5 - Soft periwinkle accent
      [`${componentCls}-progress-ink-5`]: {
        position: 'absolute',
        width: '150%',
        height: '150%',
        left: '-25%',
        top: '-25%',
        background: `radial-gradient(ellipse 50% 55% at 20% 75%, rgba(160, 190, 255, 0.7) 0%, transparent 50%)`,
        animationName: inkFlow1,
        animationDuration: '5.5s',
        animationTimingFunction: motionEaseInOut,
        animationIterationCount: 'infinite',
        animationDelay: '-2.5s',
        filter: 'blur(35px)',
        pointerEvents: 'none',
      },

      // Frosted overlay layer for matte finish
      [`${componentCls}-progress-frosted`]: {
        position: 'absolute',
        inset: 0,
        // Noise texture for matte finish (simulated with gradient)
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 1,
      },

      // Progress content container - centered by default
      [`${componentCls}-progress-content`]: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },

      // Progress content with progress bar - adjusted position
      [`${componentCls}-progress-content-bar`]: {
        position: undefined,
        top: undefined,
        transform: undefined,
        padding: `0 ${token.paddingLG}px`,
        marginTop: '8%',
      },

      // Percent text
      [`${componentCls}-progress-percent`]: {
        fontSize: token.fontSize,
        color: 'rgba(50, 70, 110, 0.85)',
      },

      // Percent text margin when preceded by progress bar
      [`${componentCls}-progress-bar + ${componentCls}-progress-percent`]: {
        marginTop: token.marginXS,
      },

      // Progress bar container
      [`${componentCls}-progress-bar`]: {
        width: '100%',
        height: token.progressBarHeight,
        backgroundColor: token.progressBarBgColor,
        borderRadius: token.borderRadiusXS,
        overflow: 'hidden',
        backdropFilter: 'blur(4px)',
      },

      // Progress bar fill with subtle shimmer animation
      [`${componentCls}-progress-bar-inner`]: {
        height: '100%',
        background: token.progressBarGradient,
        backgroundSize: '200% 100%',
        borderRadius: token.borderRadiusXXS,
        transition: `width ${motionDurationMid} ease`,
        animationName: progressActive,
        animationDuration: motionDurationMid,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      },
    },
  };
};

export const genImagePreviewStyle: GenerateStyle<ImageToken, CSSObject> = (token) => {
  const {
    motionEaseOut,
    previewCls,
    motionDurationSlow,
    componentCls,
    colorBgMask,
    marginXL,
    marginSM,
    margin,
    colorTextLightSolid,
    paddingSM,
    paddingLG,
    previewOperationHoverColor,
    previewOperationColorDisabled,
    previewOperationSize,
    zIndexPopup,
  } = token;

  const operationBg = new FastColor(colorBgMask).setA(0.1);
  const operationBgHover = operationBg.clone().setA(0.2);

  const singleBtn: CSSObject = {
    position: 'absolute',
    color: colorTextLightSolid,
    backgroundColor: operationBg.toRgbString(),
    borderRadius: '50%',
    padding: paddingSM,
    outline: 0,
    border: 0,
    cursor: 'pointer',
    transition: `all ${motionDurationSlow}`,
    display: 'flex',
    fontSize: previewOperationSize,

    '&:hover': {
      backgroundColor: operationBgHover.toRgbString(),
    },
    '&:active': {
      backgroundColor: operationBg.toRgbString(),
    },
  };

  return {
    [`${componentCls}-preview`]: {
      textAlign: 'center',
      inset: 0,
      position: 'fixed',
      userSelect: 'none',
      zIndex: zIndexPopup,

      // ================= Mask =================
      [`${previewCls}-mask`]: {
        inset: 0,
        position: 'absolute',
        background: colorBgMask,
        [`&${componentCls}-preview-mask-blur`]: {
          backdropFilter: 'blur(4px)',
        },
        [`&${componentCls}-preview-mask-hidden`]: {
          display: 'none',
        },
      },

      // ================= Body =================
      [`${previewCls}-body`]: {
        ...genBoxStyle(),
        'pointer-events': 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '> *': {
          pointerEvents: 'auto',
        },
      },

      // Body > Image
      [`${previewCls}-img`]: {
        maxWidth: '100%',
        maxHeight: '70%',
        verticalAlign: 'middle',
        transform: 'scale3d(1, 1, 1)',
        cursor: 'grab',
        transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
      },

      [`&-moving ${previewCls}-img`]: {
        cursor: 'grabbing',
      },

      // =============== CloseBtn ===============
      [`${previewCls}-close`]: {
        // Shared style
        ...singleBtn,
        top: marginSM,
        insetInlineEnd: marginSM,
      },

      // ================ Switch ================
      [`${previewCls}-switch`]: {
        ...singleBtn,
        top: '50%',
        transform: `translateY(-50%)`,

        '&-disabled': {
          '&, &:hover, &:active': {
            color: previewOperationColorDisabled,
            background: 'transparent',
            cursor: 'not-allowed',
          },
        },

        '&-prev': {
          insetInlineStart: marginSM,
        },
        '&-next': {
          insetInlineEnd: marginSM,
        },
      },

      // ================ Footer ================
      [`${previewCls}-footer`]: {
        position: 'absolute',
        bottom: marginXL,
        left: {
          _skip_check_: true,
          value: '50%',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: token.previewOperationColor,
        transform: 'translateX(-50%)',
        gap: margin,
      },

      // =============== Actions ================
      [`${previewCls}-actions`]: {
        display: 'flex',
        gap: paddingSM,
        padding: `0 ${unit(paddingLG)}`,
        backgroundColor: operationBg.toRgbString(),
        borderRadius: 100,
        fontSize: previewOperationSize,

        '&-action': {
          padding: paddingSM,
          cursor: 'pointer',
          transition: `all ${motionDurationSlow}`,
          display: 'flex',

          [`&:not(${previewCls}-actions-action-disabled):hover`]: {
            color: previewOperationHoverColor,
          },
          '&-disabled': {
            color: previewOperationColorDisabled,
            cursor: 'not-allowed',
          },
        },
      },
    },
  };
};

const genImageStyle: GenerateStyle<ImageToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    // ============================== image ==============================
    [componentCls]: {
      position: 'relative',
      display: 'inline-block',
      [`${componentCls}-img`]: {
        width: '100%',
        height: 'auto',
        verticalAlign: 'middle',
      },
      [`${componentCls}-img-placeholder`]: {
        backgroundColor: token.colorBgContainerDisabled,
        backgroundImage:
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '30%',
      },
      [`${componentCls}-placeholder`]: {
        ...genBoxStyle(),
      },
    },
  };
};

const genPreviewMotion: GenerateStyle<ImageToken, CSSObject> = (token) => {
  const { previewCls, motionDurationSlow } = token;

  return {
    [previewCls]: {
      '&-fade': {
        transition: `opacity ${motionDurationSlow}`,

        '&-enter, &-appear': {
          opacity: 0,

          [`${previewCls}-body`]: {
            transform: 'scale(0)',
          },

          '&-active': {
            opacity: 1,

            [`${previewCls}-body`]: {
              transform: 'scale(1)',
              transition: `transform ${motionDurationSlow}`,
            },
          },
        },

        '&-leave': {
          opacity: 1,

          '&-active': {
            opacity: 0,

            [`${previewCls}-body`]: {
              transform: 'scale(0)',
              transition: `transform ${motionDurationSlow}`,
            },
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Image'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + 80,
  previewOperationColor: new FastColor(token.colorTextLightSolid).setA(0.65).toRgbString(),
  previewOperationHoverColor: new FastColor(token.colorTextLightSolid).setA(0.85).toRgbString(),
  previewOperationColorDisabled: new FastColor(token.colorTextLightSolid).setA(0.25).toRgbString(),
  previewOperationSize: token.fontSizeIcon * 1.5, // FIXME: fontSizeIconLG
  progressBgColor: 'rgba(255, 255, 255, 0.6)',
  progressBarHeight: 6,
  progressBarBgColor: 'rgba(255, 255, 255, 0.5)',
  progressBarGradient: `linear-gradient(
          90deg,
          rgba(120, 170, 255, 0.85) 0%,
          rgba(160, 150, 245, 0.85) 40%,
          rgba(130, 200, 220, 0.85) 60%,
          rgba(120, 170, 255, 0.85) 100%
        )`,
});

export default genStyleHooks(
  'Image',
  (token) => {
    const previewCls = `${token.componentCls}-preview`;

    const imageToken = mergeToken<ImageToken>(token, {
      previewCls,
      imagePreviewSwitchSize: token.controlHeightLG,
    });

    return [
      genImageStyle(imageToken),
      genImageCoverStyle(imageToken),
      genImageProgressStyle(imageToken),
      genImagePreviewStyle(imageToken),
      genPreviewMotion(imageToken),
    ];
  },
  prepareComponentToken,
);
