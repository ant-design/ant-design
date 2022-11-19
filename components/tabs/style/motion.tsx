import type { TabsToken } from '.';
import type { GenerateStyle } from '../../theme';

const genMotionStyle: GenerateStyle<TabsToken> = (token) => {
  const { componentCls, motionDurationSlow } = token;

  return {
    [componentCls]: {
      [`${componentCls}-switch`]: {
        '&-appear, &-enter': {
          transition: 'none',

          '&-start': {
            opacity: 0,
          },
          '&-active': {
            opacity: 1,
            transition: `opacity ${motionDurationSlow}`,
          },
        },

        '&-leave': {
          position: 'absolute',
          transition: 'none',
          inset: 0,

          '&-start': {
            opacity: 1,
          },
          '&-active': {
            opacity: 0,
            transition: `opacity ${motionDurationSlow}`,
          },
        },
      },
    },
  };
};

export default genMotionStyle;
