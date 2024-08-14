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
  const prefixCls = `${componentCls}-group-wrap`;
  return [
    {
      [prefixCls]: {
        '&-top': initMotion(prefixCls, moveTopIn, moveTopOut, motionDurationSlow, true),
        '&-bottom': initMotion(prefixCls, moveBottomIn, moveBottomOut, motionDurationSlow, true),
        '&-left': initMotion(prefixCls, moveLeftIn, moveLeftOut, motionDurationSlow, true),
        '&-right': initMotion(prefixCls, moveRightIn, moveRightOut, motionDurationSlow, true),
      },
    },
    {
      [prefixCls]: {
        [`&${prefixCls}-enter, &${prefixCls}-appear`]: {
          opacity: 0,
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`&${prefixCls}-leave`]: {
          animationTimingFunction: motionEaseInOutCirc,
        },
      },
    },
  ];
};

export default floatButtonGroupMotion;
