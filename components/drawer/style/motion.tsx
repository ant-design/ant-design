import type { DrawerToken } from '.';
import type { GenerateStyle } from '../../theme';

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
              transform: 'translateX(-100%)',
              '&-active': {
                transform: 'translateX(0)',
              },
            },
            '&-leave': {
              transform: 'translateX(0)',
              '&-active': {
                transform: 'translateX(-100%)',
              },
            },
          },
        ],

        // Right
        '&-right': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              transform: 'translateX(100%)',
              '&-active': {
                transform: 'translateX(0)',
              },
            },
            '&-leave': {
              transform: 'translateX(0)',
              '&-active': {
                transform: 'translateX(100%)',
              },
            },
          },
        ],

        // Top
        '&-top': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              transform: 'translateY(-100%)',
              '&-active': {
                transform: 'translateY(0)',
              },
            },
            '&-leave': {
              transform: 'translateY(0)',
              '&-active': {
                transform: 'translateY(-100%)',
              },
            },
          },
        ],

        // Bottom
        '&-bottom': [
          sharedPanelMotion,
          {
            '&-enter, &-appear': {
              transform: 'translateY(100%)',
              '&-active': {
                transform: 'translateY(0)',
              },
            },
            '&-leave': {
              transform: 'translateY(0)',
              '&-active': {
                transform: 'translateY(100%)',
              },
            },
          },
        ],
      },
    },
  };
};

export default genMotionStyle;
