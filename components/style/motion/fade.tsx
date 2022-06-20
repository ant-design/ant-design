import type { CSSInterpolation } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../../_util/theme';
import { initMotion } from './motion';

export const fadeIn = new Keyframes('antFadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOut = new Keyframes('antFadeOut', {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const initFadeMotion = (antCls: string, token: DerivativeToken): CSSInterpolation => {
  const motionCls = `${antCls}-fade`;

  return [
    initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid),
    {
      [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: 'linear',
      },

      [`${motionCls}-leave`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
};
