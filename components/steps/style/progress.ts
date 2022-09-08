import type { CSSObject } from '@ant-design/cssinjs';
import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { antCls, componentCls } = token;

  return {
    [`&${componentCls}-with-progress`]: {
      [`${componentCls}-item`]: {
        paddingTop: token.paddingXXS,

        [`${componentCls}-item-tail`]: {
          top: `${token.marginXXS}px !important`,
        },
      },

      [`&${componentCls}-horizontal`]: {
        [`${componentCls}-item:first-child`]: {
          paddingBottom: token.paddingXXS,
          paddingInlineStart: token.paddingXXS,
        },
      },

      [`&${componentCls}-label-vertical`]: {
        [`${componentCls}-item ${componentCls}-item-tail`]: {
          top: token.margin - 2 * token.lineWidth,
        },
      },

      [`${componentCls}-item-icon`]: {
        position: 'relative',

        [`${antCls}-progress`]: {
          position: 'absolute',
          insetBlockStart: (token.stepsIconSize - token.stepsProgressSize) / 2,
          insetInlineStart: (token.stepsIconSize - token.stepsProgressSize) / 2,
        },
      },
    },
  };
};

export default genStepsProgressStyle;
