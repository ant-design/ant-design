import type { DrawerToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

type Direction = 'left' | 'right' | 'top' | 'bottom';

const getMoveTranslate = (direction: Direction) => {
  const value = '100%';
  switch (direction) {
    case 'left':
      return `translateX(-${value}) !important`;
    case 'right':
      return `translateX(${value}) !important`;
    case 'top':
      return `translateY(-${value}) !important`;
    case 'bottom':
      return `translateY(${value}) !important`;
    default:
      return '';
  }
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
  const { componentCls, motionDurationSlow } = token;

  const styles = ['left', 'right', 'top', 'bottom'].reduce(
    (obj, direction: Direction) => ({
      ...obj,
      [`&-${direction}`]: getPanelMotionStyles(direction, motionDurationSlow),
    }),
    {},
  );

  return {
    [componentCls]: {
      // ======================== Mask ========================
      [`${componentCls}-mask-motion`]: {
        '&-enter, &-appear, &-leave': {
          '&-active': {
            transition: `all ${motionDurationSlow}`,
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
