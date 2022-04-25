import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { antCls, componentCls } = token;

  return {
    [`&${componentCls}-with-progress`]: {
      [`${componentCls}-item`]: {
        paddingTop: 4, // FIXME: hardcode in v4

        [`${componentCls}-item-tail`]: {
          top: '4px !important', // FIXME: hardcode in v4
        },
      },

      [`&${componentCls}-horizontal ${componentCls}-item:first-child`]: {
        paddingBottom: 4, // FIXME: hardcode in v4
        paddingInlineStart: 4, // FIXME: hardcode in v4
      },

      [`${componentCls}-item-icon`]: {
        position: 'relative',

        [`${antCls}-progress`]: {
          position: 'absolute',
          top: -5, // FIXME: hardcode in v4
          insetInlineEnd: -5, // FIXME: hardcode in v4
          bottom: -5, // FIXME: hardcode in v4
          insetInlineStart: -5, // FIXME: hardcode in v4
        },
      },
    },
  };
};

export default genStepsProgressStyle;
