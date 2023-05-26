import type { CSSInterpolation } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { AliasToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
import { initMotion } from './motion';

export const slideUpIn = new Keyframes('antSlideUpIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: 1,
  },
});

export const slideUpOut = new Keyframes('antSlideUpOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '0% 0%',
    opacity: 1,
  },

  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },
});

export const slideDownIn = new Keyframes('antSlideDownIn', {
  '0%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '100% 100%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleY(1)',
    transformOrigin: '100% 100%',
    opacity: 1,
  },
});

export const slideDownOut = new Keyframes('antSlideDownOut', {
  '0%': {
    transform: 'scaleY(1)',
    transformOrigin: '100% 100%',
    opacity: 1,
  },

  '100%': {
    transform: 'scaleY(0.8)',
    transformOrigin: '100% 100%',
    opacity: 0,
  },
});

export const slideLeftIn = new Keyframes('antSlideLeftIn', {
  '0%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: 1,
  },
});

export const slideLeftOut = new Keyframes('antSlideLeftOut', {
  '0%': {
    transform: 'scaleX(1)',
    transformOrigin: '0% 0%',
    opacity: 1,
  },

  '100%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '0% 0%',
    opacity: 0,
  },
});

export const slideRightIn = new Keyframes('antSlideRightIn', {
  '0%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '100% 0%',
    opacity: 0,
  },

  '100%': {
    transform: 'scaleX(1)',
    transformOrigin: '100% 0%',
    opacity: 1,
  },
});

export const slideRightOut = new Keyframes('antSlideRightOut', {
  '0%': {
    transform: 'scaleX(1)',
    transformOrigin: '100% 0%',
    opacity: 1,
  },

  '100%': {
    transform: 'scaleX(0.8)',
    transformOrigin: '100% 0%',
    opacity: 0,
  },
});

type SlideMotionTypes = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
const slideMotion: Record<SlideMotionTypes, { inKeyframes: Keyframes; outKeyframes: Keyframes }> = {
  'slide-up': {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut,
  },
  'slide-down': {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut,
  },
  'slide-left': {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut,
  },
  'slide-right': {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut,
  },
};

export const initSlideMotion = (
  token: TokenWithCommonCls<AliasToken>,
  motionName: SlideMotionTypes,
): CSSInterpolation => {
  const { antCls } = token;
  const motionCls = `${antCls}-${motionName}`;
  const { inKeyframes, outKeyframes } = slideMotion[motionName];

  return [
    initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid),

    {
      [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
        transform: 'scale(0)',
        transformOrigin: '0% 0%',
        opacity: 0,
        animationTimingFunction: token.motionEaseOutQuint,

        [`&-prepare`]: {
          transform: 'scale(1)',
        },
      },

      [`${motionCls}-leave`]: {
        animationTimingFunction: token.motionEaseInQuint,
      },
    },
  ];
};
