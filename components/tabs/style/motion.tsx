import type { TabsToken } from '.';
import { initSlideMotion } from '../../style/motion';
import type { GenerateStyle } from '../../theme/internal';

const genMotionStyle: GenerateStyle<TabsToken> = (token) => {
  const { componentCls, motionDurationSlow } = token;

  return [
    {
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
    },

    // Follow code may reuse in other components
    [initSlideMotion(token, 'slide-up'), initSlideMotion(token, 'slide-down')],
  ];
};

export default genMotionStyle;
