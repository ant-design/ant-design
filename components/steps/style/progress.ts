import { CSSObject } from '@ant-design/cssinjs';

import { StepsToken } from '.';

export default function genStepsProgressStyle(token: StepsToken): CSSObject {
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
          right: -5,
          bottom: -5,
          left: -5,
        },
      },
    },
  };
}
