import type { FormToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genFormValidateMotionStyle: GenerateStyle<FormToken> = (token) => {
  const { componentCls } = token;

  const helpCls = `${componentCls}-show-help`;
  const helpItemCls = `${componentCls}-show-help-item`;

  return {
    [helpCls]: {
      // Explain holder
      transition: `opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,

      '&-appear, &-enter': {
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

      // Explain
      [helpItemCls]: {
        overflow: 'hidden',
        transition: `height ${token.motionDurationSlow} ${token.motionEaseInOut},
                     opacity ${token.motionDurationSlow} ${token.motionEaseInOut},
                     transform ${token.motionDurationSlow} ${token.motionEaseInOut} !important`,

        [`&${helpItemCls}-appear, &${helpItemCls}-enter`]: {
          transform: `translateY(-5px)`,
          opacity: 0,

          [`&-active`]: {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },

        [`&${helpItemCls}-leave-active`]: {
          transform: `translateY(-5px)`,
        },
      },
    },
  };
};

export default genFormValidateMotionStyle;
