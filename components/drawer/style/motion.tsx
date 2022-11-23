import type { DrawerToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genMotionStyle: GenerateStyle<DrawerToken> = (token: DrawerToken) => {
  const { componentCls, motionDurationSlow } = token;

  const sharedPanelMotion = {
    '&-enter, &-appear, &-leave': {
      '&-start': {
        transition: 'none',
      },

      '&-active': {
        transition: `all ${motionDurationSlow}`,
      },
    },
  };

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
      [`${componentCls}-panel-motion`]: {
        // Left
        '&-left': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              '&-start': {
                transform: 'translate3d(-100%, 0, 0) !important',
              },
              '&-active': {
                transform: 'translate3d(0, 0, 0)',
              },
            },
            '&-leave': {
              transform: 'translate3d(0, 0, 0)',
              '&-active': {
                transform: 'translate3d(-100%, 0, 0)',
              },
            },
          },
        ],

        // Right
        '&-right': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              '&-start': {
                transform: 'translate3d(100%, 0, 0) !important',
              },
              '&-active': {
                transform: 'translate3d(0, 0, 0)',
              },
            },
            '&-leave': {
              transform: 'translate3d(0, 0, 0)',
              '&-active': {
                transform: 'translate3d(100%, 0, 0)',
              },
            },
          },
        ],

        // Top
        '&-top': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              '&-start': {
                transform: 'translate3d(0, -100%, 0) !important',
              },
              '&-active': {
                transform: 'translate3d(0, 0, 0)',
              },
            },
            '&-leave': {
              transform: 'translate3d(0, 0, 0)',
              '&-active': {
                transform: 'translate3d(0, -100%, 0)',
              },
            },
          },
        ],

        // Bottom
        '&-bottom': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              '&-start': {
                transform: 'translate3d(0, 100%, 0) !important',
              },
              '&-active': {
                transform: 'translate3d(0, 0, 0)',
              },
            },
            '&-leave': {
              transform: 'translate3d(0, 0, 0)',
              '&-active': {
                transform: 'translate3d(0, 100%, 0)',
              },
            },
          },
        ],
      },
    },
  };
};

export default genMotionStyle;
