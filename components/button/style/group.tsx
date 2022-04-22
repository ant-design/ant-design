import type { GenerateStyle } from '../../_util/theme';
import type { ButtonToken } from '.';

const genGroupStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls, fontSizeBase, controlLineWidth, colorPrimaryHover } = token;

  return {
    [`${componentCls}-group`]: {
      position: 'relative',
      display: 'inline-flex',

      // Border
      [`> span, > ${componentCls}`]: {
        '&:not(:last-child)': {
          [`&, & > ${componentCls}`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,

            '&:not(:disabled)': {
              borderInlineEndColor: colorPrimaryHover,
            },
          },
        },

        '&:not(:first-child)': {
          marginInlineStart: -controlLineWidth,

          [`&, & > ${componentCls}`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,

            '&:not(:disabled)': {
              borderInlineStartColor: colorPrimaryHover,
            },
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
        fontSize: fontSizeBase,
      },
    },
  };
};

export default genGroupStyle;
