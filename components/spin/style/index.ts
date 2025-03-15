import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 内容区域高度
   * @descEN Height of content area
   */
  contentHeight: number | string;
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

const genSpinStyle: GenerateStyle<SpinToken> = (token: SpinToken): CSSObject => {
  const { componentCls, calc } = token;
  return {
    [componentCls]: {
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
        position: 'relative',
        display: 'inline-block',
        opacity: 1,
      },

      [`${componentCls}-text`]: {
        fontSize: token.fontSize,
        paddingTop: calc(calc(token.dotSize).sub(token.fontSize)).div(2).add(2).equal(),
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
        opacity: 0,
        visibility: 'hidden',
        transition: `all ${token.motionDurationMid}`,
        '&-show': {
          opacity: 1,
          visibility: 'visible',
        },

        [componentCls]: {
          [`${componentCls}-dot-holder`]: {
            color: token.colorWhite,
          },
          [`${componentCls}-text`]: {
            color: token.colorTextLightSolid,
          },
        },
      },

      '&-nested-loading': {
        position: 'relative',
        [`> div > ${componentCls}`]: {
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          zIndex: 4,
          display: 'block',
          width: '100%',
          height: '100%',
          maxHeight: token.contentHeight,
          [`${componentCls}-dot`]: {
            position: 'absolute',
            top: '50%',
            insetInlineStart: '50%',
            margin: calc(token.dotSize).mul(-1).div(2).equal(),
          },
          [`${componentCls}-text`]: {
            position: 'absolute',
            top: '50%',
            width: '100%',
            textShadow: `0 1px 2px ${token.colorBgContainer}`, // FIXME: shadow
          },

          [`&${componentCls}-show-text ${componentCls}-dot`]: {
            marginTop: calc(token.dotSize).div(2).mul(-1).sub(10).equal(),
          },

          '&-sm': {
            [`${componentCls}-dot`]: {
              margin: calc(token.dotSizeSM).mul(-1).div(2).equal(),
            },
            [`${componentCls}-text`]: {
              paddingTop: calc(calc(token.dotSizeSM).sub(token.fontSize)).div(2).add(2).equal(),
            },
            [`&${componentCls}-show-text ${componentCls}-dot`]: {
              marginTop: calc(token.dotSizeSM).div(2).mul(-1).sub(10).equal(),
            },
          },

          '&-lg': {
            [`${componentCls}-dot`]: {
              margin: calc(token.dotSizeLG).mul(-1).div(2).equal(),
            },
            [`${componentCls}-text`]: {
              paddingTop: calc(calc(token.dotSizeLG).sub(token.fontSize)).div(2).add(2).equal(),
            },
            [`&${componentCls}-show-text ${componentCls}-dot`]: {
              marginTop: calc(token.dotSizeLG).div(2).mul(-1).sub(10).equal(),
            },
          },
        },

        [`${componentCls}-container`]: {
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

        [`${componentCls}-blur`]: {
          clear: 'both',
          opacity: 0.5,
          userSelect: 'none',
          pointerEvents: 'none',

          '&::after': {
            opacity: 0.4,
            pointerEvents: 'auto',
          },
        },
      },

      // tip
      // ------------------------------
      '&-tip': {
        color: token.spinDotDefault,
      },

      // holder
      // ------------------------------
      [`${componentCls}-dot-holder`]: {
        width: '1em',
        height: '1em',
        fontSize: token.dotSize,
        display: 'inline-block',
        transition: `transform ${token.motionDurationSlow} ease, opacity ${token.motionDurationSlow} ease`,
        transformOrigin: '50% 50%',
        lineHeight: 1,
        color: token.colorPrimary,

        '&-hidden': {
          transform: 'scale(0.3)',
          opacity: 0,
        },
      },

      // progress
      // ------------------------------
      [`${componentCls}-dot-progress`]: {
        position: 'absolute',
        inset: 0,
      },

      // dots
      // ------------------------------
      [`${componentCls}-dot`]: {
        position: 'relative',
        display: 'inline-block',
        fontSize: token.dotSize,
        width: '1em',
        height: '1em',

        '&-item': {
          position: 'absolute',
          display: 'block',
          width: calc(token.dotSize).sub(calc(token.marginXXS).div(2)).div(2).equal(),
          height: calc(token.dotSize).sub(calc(token.marginXXS).div(2)).div(2).equal(),
          background: 'currentColor',
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
            animationDelay: '0s',
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

        '&-circle': {
          strokeLinecap: 'round',
          transition: ['stroke-dashoffset', 'stroke-dasharray', 'stroke', 'stroke-width', 'opacity']
            .map((item) => `${item} ${token.motionDurationSlow} ease`)
            .join(','),
          fillOpacity: 0,
          stroke: 'currentcolor',
        },

        '&-circle-bg': {
          stroke: token.colorFillSecondary,
        },
      },
      // small
      [`&-sm ${componentCls}-dot`]: {
        '&, &-holder': {
          fontSize: token.dotSizeSM,
        },
      },
      [`&-sm ${componentCls}-dot-holder`]: {
        i: {
          width: calc(calc(token.dotSizeSM).sub(calc(token.marginXXS).div(2)))
            .div(2)
            .equal(),
          height: calc(calc(token.dotSizeSM).sub(calc(token.marginXXS).div(2)))
            .div(2)
            .equal(),
        },
      },
      // large
      [`&-lg ${componentCls}-dot`]: {
        '&, &-holder': {
          fontSize: token.dotSizeLG,
        },
      },
      [`&-lg ${componentCls}-dot-holder`]: {
        i: {
          width: calc(calc(token.dotSizeLG).sub(token.marginXXS)).div(2).equal(),
          height: calc(calc(token.dotSizeLG).sub(token.marginXXS)).div(2).equal(),
        },
      },

      [`&${componentCls}-show-text ${componentCls}-text`]: {
        display: 'block',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Spin'> = (token) => {
  const { controlHeightLG, controlHeight } = token;
  return {
    contentHeight: 400,
    dotSize: controlHeightLG / 2,
    dotSizeSM: controlHeightLG * 0.35,
    dotSizeLG: controlHeight,
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  'Spin',
  (token) => {
    const spinToken = mergeToken<SpinToken>(token, {
      spinDotDefault: token.colorTextDescription,
    });
    return [genSpinStyle(spinToken)];
  },
  prepareComponentToken,
);
