import type { ButtonToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genButtonBorderStyle = (buttonTypeCls: string, borderColor: string) => ({
  // Border
  [`> span, > ${buttonTypeCls}`]: {
    '&:not(:last-child)': {
      [`&, & > ${buttonTypeCls}`]: {
        '&:not(:disabled)': {
          borderInlineEndColor: borderColor,
        },
      },
    },

    '&:not(:first-child)': {
      [`&, & > ${buttonTypeCls}`]: {
        '&:not(:disabled)': {
          borderInlineStartColor: borderColor,
        },
      },
    },
  },
});

const genGroupStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, fontSize, lineWidth, groupBorderColor, colorErrorHover } = token;

  return {
    [`${componentCls}-group`]: [
      {
        position: 'relative',
        display: 'inline-flex',

        // Border
        [`> span, > ${componentCls}`]: {
          '&:not(:last-child)': {
            [`&, & > ${componentCls}`]: {
              borderStartEndRadius: 0,
              borderEndEndRadius: 0,
            },
          },

          '&:not(:first-child)': {
            marginInlineStart: -lineWidth,

            [`&, & > ${componentCls}`]: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0,
            },
          },
        },

        [componentCls]: {
          position: 'relative',
          zIndex: 1,

          [`&:hover,
          &:focus,
          &:active`]: {
            zIndex: 2,
          },

          '&[disabled]': {
            zIndex: 0,
          },
        },

        [`${componentCls}-icon-only`]: {
          fontSize,
        },
      },

      // Border Color
      genButtonBorderStyle(`${componentCls}-primary`, groupBorderColor),
      genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover),
    ],
  };
};

export default genGroupStyle;
