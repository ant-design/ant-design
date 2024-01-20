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

const getEnterLeaveStyle = (startStyle: React.CSSProperties, endStyle: React.CSSProperties) => ({
  '&-enter, &-appear': {
    ...startStyle,
    '&-active': endStyle,
  },
  '&-leave': {
    ...endStyle,
    '&-active': startStyle,
  },
});

const getFadeStyle = (duration: string) => ({
  '&-enter, &-appear, &-leave': {
    '&-start': {
      transition: 'none',
    },
    '&-active': {
      transition: `all ${duration}`,
    },
  },
  ...getEnterLeaveStyle(
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  ),
});

const getPanelMotionStyles = (direction: Direction, duration: string) => [
  getFadeStyle(duration),
  getEnterLeaveStyle(
    {
      transform: getMoveTranslate(direction),
    },
    {
      transform: 'none',
    },
  ),
];

const genMotionStyle: GenerateStyle<DrawerToken> = (token) => {
  const { componentCls, motionDurationSlow } = token;

  return {
    [componentCls]: {
      // ======================== Mask ========================
      [`${componentCls}-mask-motion`]: getFadeStyle(motionDurationSlow),

      // ======================= Panel ========================
      [`${componentCls}-panel-motion`]: (['left', 'right', 'top', 'bottom'] as const).reduce(
        (obj, direction: Direction) => ({
          ...obj,
          [`&-${direction}`]: getPanelMotionStyles(direction, motionDurationSlow),
        }),
        {},
      ),
    },
  };
};

export default genMotionStyle;
