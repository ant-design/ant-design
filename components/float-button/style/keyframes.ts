import { Keyframes, unit } from '@ant-design/cssinjs';

import type { FloatButtonToken } from '.';
import { initMotion } from '../../style/motion/motion';

const floatButtonGroupMotion = (token: FloatButtonToken) => {
  const { componentCls, floatButtonSize, motionDurationSlow, motionEaseInOutCirc, calc } = token;
  const moveTopIn = new Keyframes('antFloatButtonMoveTopIn', {
    '0%': {
      transform: `translate3d(0, ${unit(floatButtonSize)}, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
  });
  const moveTopOut = new Keyframes('antFloatButtonMoveTopOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
    '100%': {
      transform: `translate3d(0, ${unit(floatButtonSize)}, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
  });
  const moveRightIn = new Keyframes('antFloatButtonMoveRightIn', {
    '0%': {
      transform: `translate3d(${calc(floatButtonSize).mul(-1).equal()}, 0, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
  });
  const moveRightOut = new Keyframes('antFloatButtonMoveRightOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
    '100%': {
      transform: `translate3d(${calc(floatButtonSize).mul(-1).equal()}, 0, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
  });
  const moveBottomIn = new Keyframes('antFloatButtonMoveBottomIn', {
    '0%': {
      transform: `translate3d(0, ${calc(floatButtonSize).mul(-1).equal()}, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
  });
  const moveBottomOut = new Keyframes('antFloatButtonMoveBottomOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
    '100%': {
      transform: `translate3d(0, ${calc(floatButtonSize).mul(-1).equal()}, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
  });
  const moveLeftIn = new Keyframes('antFloatButtonMoveLeftIn', {
    '0%': {
      transform: `translate3d(${unit(floatButtonSize)}, 0, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
  });
  const moveLeftOut = new Keyframes('antFloatButtonMoveLeftOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
    '100%': {
      transform: `translate3d(${unit(floatButtonSize)}, 0, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
  });
  const groupPrefixCls = `${componentCls}-group`;
  return [
    {
      [groupPrefixCls]: {
        [`&${groupPrefixCls}-top ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveTopIn,
          moveTopOut,
          motionDurationSlow,
          true,
        ),
        [`&${groupPrefixCls}-bottom ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveBottomIn,
          moveBottomOut,
          motionDurationSlow,
          true,
        ),
        [`&${groupPrefixCls}-left ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveLeftIn,
          moveLeftOut,
          motionDurationSlow,
          true,
        ),
        [`&${groupPrefixCls}-right ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveRightIn,
          moveRightOut,
          motionDurationSlow,
          true,
        ),
      },
    },
    {
      [`${groupPrefixCls}-wrap`]: {
        [`&${groupPrefixCls}-wrap-enter, &${groupPrefixCls}-wrap-appear`]: {
          opacity: 0,
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`&${groupPrefixCls}-wrap-leave`]: {
          opacity: 1,
          animationTimingFunction: motionEaseInOutCirc,
        },
      },
    },
  ];
};

export default floatButtonGroupMotion;
