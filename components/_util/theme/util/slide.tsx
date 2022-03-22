import { CSSInterpolation, Keyframes } from '@ant-design/cssinjs';
import type { DerivativeToken } from '..';
import { initMotion } from './motion';

export const initSlideMotion = (
  hashId: string,
  rootPrefixCls: string,
  motionName: string,
  inKeyframes: Keyframes,
  outKeyframes: Keyframes,
  token: DerivativeToken,
): CSSInterpolation => {
  const rootMotionName = `${rootPrefixCls}-${motionName}`;
  const motionCls = `.${rootMotionName}`;

  return [
    initMotion(hashId, rootMotionName, inKeyframes, outKeyframes, token.durationMid),

    {
      [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
        opacity: 0,
        animationTimingFunction: token.motionEaseOutQuint,
      },

      [`${motionCls}-leave`]: {
        animationTimingFunction: token.motionEaseInQuint,
      },
    },
  ];
};

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
