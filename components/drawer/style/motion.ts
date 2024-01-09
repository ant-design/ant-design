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

const getPanelMotionStyles = (direction: Direction, duration: string) => {
  const transform = getMoveTranslate(direction);
  return [
    {
      '&-enter, &-appear, &-leave': {
        '&-start': {
          transition: 'none',
        },
        '&-active': {
          transition: `all ${duration}`,
        },
      },
    },
    {
      '&-enter, &-appear': {
        '&-start': {
          transform,
          opacity: 0,
        },
        '&-active': {
          transform: 'translateX(0)',
          opacity: 1,
        },
      },
      '&-leave': {
        transform: 'translateX(0)',
        opacity: 1,
        '&-active': {
          transform,
          opacity: 0,
        },
      },
    },
  ];
};

const genMotionStyle: GenerateStyle<DrawerToken> = (token) => {
  const { componentCls, motionDurationMid } = token;

  const styles = ['left', 'right', 'top', 'bottom'].reduce(
    (obj, direction: Direction) => ({
      ...obj,
      [`&-${direction}`]: getPanelMotionStyles(direction, motionDurationMid),
    }),
    {},
  );

  return {
    [componentCls]: {
      // ======================== Mask ========================
      [`${componentCls}-mask-motion`]: {
        '&-enter, &-appear, &-leave': {
          '&-active': {
            transition: `all ${motionDurationMid}`,
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
      },

      // ======================= Panel ========================
      [`${componentCls}-panel-motion`]: styles,
    },
  };
};

export default genMotionStyle;
