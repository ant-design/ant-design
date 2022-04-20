// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import {
  resetComponent,
  GenerateStyle,
  FullToken,
  genComponentStyleHook,
  mergeToken,
} from '../../_util/theme';

interface SpinToken extends FullToken<'Spin'> {
  spinDotDefault: string;
  spinDotSize: number;
  spinDotSizeSM: number;
  spinDotSizeLG: number;
}

const antSpinMove = new Keyframes('antSpinMove', {
  to: { opacity: 1 },
});

const antRotate = new Keyframes('antRotate', {
  to: { transform: 'rotate(405deg)' },
});

const genSpinStyle: GenerateStyle<SpinToken> = (token: SpinToken): CSSObject => ({
  [`${token.componentCls}`]: {
    ...resetComponent(token),
    position: 'absolute',
    display: 'none',
    color: token.colorPrimary,
    textAlign: 'center',
    verticalAlign: 'middle',
    opacity: 0,
    transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,

    '&-spinning': {
      position: 'static',
      display: 'inline-block',
      opacity: 1,
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
        maxHeight: 400, // FIXME: hard code in v4

        [`${token.componentCls}-dot`]: {
          position: 'absolute',
          top: '50%',
          insetInlineStart: '50%',
          margin: -token.spinDotSize / 2,
        },

        [`${token.componentCls}-text`]: {
          position: 'absolute',
          top: '50%',
          width: '100%',
          paddingTop: (token.spinDotSize - token.fontSize) / 2 + 2,
          textShadow: `0 1px 2px ${token.colorBgComponent}`,
        },

        [`&${token.componentCls}-show-text ${token.componentCls}-dot`]: {
          marginTop: -(token.spinDotSize / 2) - 10,
        },

        [`> div > ${token.componentCls}-sm`]: {
          [`${token.componentCls}-dot`]: {
            margin: -token.spinDotSizeSM / 2,
          },
          [`${token.componentCls}-text`]: {
            paddingTop: (token.spinDotSizeSM - token.fontSize) / 2 + 2,
          },
          [`&${token.componentCls}-show-text ${token.componentCls}-dot`]: {
            marginTop: -(token.spinDotSizeSM / 2) - 10,
          },
        },

        [`> div > ${token.componentCls}-lg`]: {
          [`${token.componentCls}-dot`]: {
            margin: -(token.spinDotSizeLG / 2),
          },
          [`${token.componentCls}-text`]: {
            paddingTop: (token.spinDotSizeLG - token.fontSize) / 2 + 2,
          },
          [`&${token.componentCls}-show-text ${token.componentCls}-dot`]: {
            marginTop: -(token.spinDotSizeLG / 2) - 10,
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
          background: token.colorBgComponent,
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
      fontSize: token.spinDotSize,
      width: '1em',
      height: '1em',

      '&-item': {
        position: 'absolute',
        display: 'block',
        width: 9, // FIXME: hard code in v4
        height: 9, // FIXME: hard code in v4
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
      fontSize: token.spinDotSizeSM,

      i: {
        width: 6, // FIXME: hard code in v4
        height: 6, // FIXME: hard code in v4
      },
    },

    // large
    [`&-lg ${token.componentCls}-dot`]: {
      fontSize: token.spinDotSizeLG,

      i: {
        width: 14, // FIXME: hard code in v4
        height: 14, // FIXME: hard code in v4
      },
    },

    [`&${token.componentCls}-show-text ${token.componentCls}-text`]: {
      display: 'block',
    },
  },
});

// ============================== Export ==============================
export default genComponentStyleHook('Spin', token => {
  const spinToken = mergeToken<SpinToken>(token, {
    spinDotDefault: token.colorTextSecondary,
    spinDotSize: 20, // FIXME: hard code in v4
    spinDotSizeSM: 14, // FIXME: hard code in v4
    spinDotSizeLG: 32, // FIXME: hard code in v4
  });
  return [genSpinStyle(spinToken), antSpinMove, antRotate];
});
