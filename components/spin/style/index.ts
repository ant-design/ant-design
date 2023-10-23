import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 内容区域高度
   * @descEN Height of content area
   */
  contentHeight: number;
  /**
   * @desc 加载图标尺寸
   * @descEN Loading icon size
   */
  dotSize: number;
  /**
   * @desc 小号加载图标尺寸
   * @descEN Small loading icon size
   */
  dotSizeSM: number;
  /**
   * @desc 大号加载图标尺寸
   * @descEN Large loading icon size
   */
  dotSizeLG: number;
}

interface SpinToken extends FullToken<'Spin'> {
  spinDotDefault: string;
}

const antSpinMove = new Keyframes('antSpinMove', {
  to: { opacity: 1 },
});

const antRotate = new Keyframes('antRotate', {
  to: { transform: 'rotate(405deg)' },
});

const dotPadding = (token: SpinToken) => (token.dotSize - token.fontSize) / 2 + 2;

const genSpinStyle: GenerateStyle<SpinToken> = (token: SpinToken): CSSObject => ({
  [`${token.componentCls}`]: {
    ...resetComponent(token),
    position: 'absolute',
    display: 'none',
    color: token.colorPrimary,
    fontSize: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
    opacity: 0,
    transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,

    '&-spinning': {
      position: 'static',
      display: 'inline-block',
      opacity: 1,
    },

    [`${token.componentCls}-text`]: {
      fontSize: token.fontSize,
      paddingTop: dotPadding(token),
    },
    '&-fullscreen': {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      backgroundColor: token.colorBgMask,
      zIndex: token.zIndexPopupBase,
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      pointerEvents: 'none',
      opacity: 0,
      visibility: 'hidden',
      transition: `all ${token.motionDurationMid}`,
      '&-show': {
        opacity: 1,
        visibility: 'visible',
      },
      [`${token.componentCls}-dot ${token.componentCls}-dot-item`]: {
        backgroundColor: token.colorWhite,
      },
      [`${token.componentCls}-text`]: {
        color: token.colorTextLightSolid,
      },
    },

    '&-nested-loading': {
      position: 'relative',
      [`> div > ${token.componentCls}`]: {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        zIndex: 4,
        display: 'block',
        width: '100%',
        height: '100%',
        maxHeight: token.contentHeight,

        [`${token.componentCls}-dot`]: {
          position: 'absolute',
          top: '50%',
          insetInlineStart: '50%',
          margin: -token.dotSize / 2,
        },

        [`${token.componentCls}-text`]: {
          position: 'absolute',
          top: '50%',
          width: '100%',
          textShadow: `0 1px 2px ${token.colorBgContainer}`, // FIXME: shadow
        },

        [`&${token.componentCls}-show-text ${token.componentCls}-dot`]: {
          marginTop: -(token.dotSize / 2) - 10,
        },

        '&-sm': {
          [`${token.componentCls}-dot`]: {
            margin: -token.dotSizeSM / 2,
          },
          [`${token.componentCls}-text`]: {
            paddingTop: (token.dotSizeSM - token.fontSize) / 2 + 2,
          },
          [`&${token.componentCls}-show-text ${token.componentCls}-dot`]: {
            marginTop: -(token.dotSizeSM / 2) - 10,
          },
        },

        '&-lg': {
          [`${token.componentCls}-dot`]: {
            margin: -(token.dotSizeLG / 2),
          },
          [`${token.componentCls}-text`]: {
            paddingTop: (token.dotSizeLG - token.fontSize) / 2 + 2,
          },
          [`&${token.componentCls}-show-text ${token.componentCls}-dot`]: {
            marginTop: -(token.dotSizeLG / 2) - 10,
          },
        },
      },

      [`${token.componentCls}-container`]: {
        position: 'relative',
        transition: `opacity ${token.motionDurationSlow}`,

        '&::after': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          zIndex: 10,
          width: '100%',
          height: '100%',
          background: token.colorBgContainer,
          opacity: 0,
          transition: `all ${token.motionDurationSlow}`,
          content: '""',
          pointerEvents: 'none',
        },
      },

      [`${token.componentCls}-blur`]: {
        clear: 'both',
        opacity: 0.5,
        userSelect: 'none',
        pointerEvents: 'none',

        [`&::after`]: {
          opacity: 0.4,
          pointerEvents: 'auto',
        },
      },
    },

    // tip
    // ------------------------------
    [`&-tip`]: {
      color: token.spinDotDefault,
    },

    // dots
    // ------------------------------
    [`${token.componentCls}-dot`]: {
      position: 'relative',
      display: 'inline-block',
      fontSize: token.dotSize,
      width: '1em',
      height: '1em',

      '&-item': {
        position: 'absolute',
        display: 'block',
        width: (token.dotSize - token.marginXXS / 2) / 2,
        height: (token.dotSize - token.marginXXS / 2) / 2,
        backgroundColor: token.colorPrimary,
        borderRadius: '100%',
        transform: 'scale(0.75)',
        transformOrigin: '50% 50%',
        opacity: 0.3,
        animationName: antSpinMove,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationDirection: 'alternate',

        '&:nth-child(1)': {
          top: 0,
          insetInlineStart: 0,
        },

        '&:nth-child(2)': {
          top: 0,
          insetInlineEnd: 0,
          animationDelay: '0.4s',
        },

        '&:nth-child(3)': {
          insetInlineEnd: 0,
          bottom: 0,
          animationDelay: '0.8s',
        },

        '&:nth-child(4)': {
          bottom: 0,
          insetInlineStart: 0,
          animationDelay: '1.2s',
        },
      },

      '&-spin': {
        transform: 'rotate(45deg)',
        animationName: antRotate,
        animationDuration: '1.2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      },
    },

    // Sizes
    // ------------------------------

    // small
    [`&-sm ${token.componentCls}-dot`]: {
      fontSize: token.dotSizeSM,

      i: {
        width: (token.dotSizeSM - token.marginXXS / 2) / 2,
        height: (token.dotSizeSM - token.marginXXS / 2) / 2,
      },
    },

    // large
    [`&-lg ${token.componentCls}-dot`]: {
      fontSize: token.dotSizeLG,

      i: {
        width: (token.dotSizeLG - token.marginXXS) / 2,
        height: (token.dotSizeLG - token.marginXXS) / 2,
      },
    },

    [`&${token.componentCls}-show-text ${token.componentCls}-text`]: {
      display: 'block',
    },
  },
});

// ============================== Export ==============================
export default genComponentStyleHook(
  'Spin',
  (token) => {
    const spinToken = mergeToken<SpinToken>(token, {
      spinDotDefault: token.colorTextDescription,
    });
    return [genSpinStyle(spinToken)];
  },
  (token) => ({
    contentHeight: 400,
    dotSize: token.controlHeightLG / 2,
    dotSizeSM: token.controlHeightLG * 0.35,
    dotSizeLG: token.controlHeight,
  }),
);
