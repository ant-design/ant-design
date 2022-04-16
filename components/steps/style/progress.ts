import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { antCls, componentCls } = token;

  return {
    [`&${componentCls}-with-progress`]: {
      [`${componentCls}-item`]: {
        paddingTop: 4,

        [`${componentCls}-item-tail`]: {
          top: '4px !important',
        },
      },

      [`&${componentCls}-horizontal ${componentCls}-item:first-child`]: {
        paddingBottom: 4,
        paddingLeft: 4,
      },

      [`${componentCls}-item-icon`]: {
        position: 'relative',

        [`${antCls}-progress`]: {
          position: 'absolute',
          top: -5,
          insetInlineEnd: -5,
          bottom: -5,
          insetInlineStart: -5,
        },
      },
    },
  };
};

export default genStepsProgressStyle;
