import type { DrawerToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

type Direction = 'left' | 'right' | 'top' | 'bottom';

const getMoveTranslate = (direction: Direction) => {
  const value = '10%';
  return {
    left: `translateX(-${value})`,
    right: `translateX(${value})`,
    top: `translateY(-${value})`,
    bottom: `translateY(${value})`,
  }[direction];
};

const getFadeStyle = (duration: string) => ({
  '&-enter, &-appear, &-leave': {
    '&-start': {
      transition: 'none',
    },
    '&-active': {
      transition: `all ${duration}`,
    },
  },
  '&-enter, &-appear': {
    opacity: 0,
    '&-active': {
      opacity: 1,
    },
  },
  '&-leave': {
    opacity: 1,
    '&-active': {
      opacity: 0,
    },
  },
});

const getPanelMotionStyles = (direction: Direction, duration: string) => {
  const transform = getMoveTranslate(direction);
  return [
    getFadeStyle(duration),
    {
      '&-enter, &-appear': {
        '&-start': {
          transform,
        },
        '&-active': {
          transform: 'translateX(0)',
        },
      },
      '&-leave': {
        transform: 'translateX(0)',
        '&-active': {
          transform,
        },
      },
    },
  ];
};

const genMotionStyle: GenerateStyle<DrawerToken> = (token) => {
  const { componentCls, motionDurationMid } = token;

  return {
    [componentCls]: {
      // ======================== Mask ========================
      [`${componentCls}-mask-motion`]: getFadeStyle(motionDurationMid),

      // ======================= Panel ========================
      [`${componentCls}-panel-motion`]: ['left', 'right', 'top', 'bottom'].reduce(
        (obj, direction: Direction) => ({
          ...obj,
          [`&-${direction}`]: getPanelMotionStyles(direction, motionDurationMid),
        }),
        {},
      ),
    },
  };
};

export default genMotionStyle;
