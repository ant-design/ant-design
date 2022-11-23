import type { CSSObject } from '@ant-design/cssinjs';
import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsRTLStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-rtl`]: {
      direction: 'rtl',

      [`${componentCls}-item`]: {
        '&-subtitle': {
          float: 'left',
        },
      },

      // nav
      [`&${componentCls}-navigation`]: {
        [`${componentCls}-item::after`]: {
          transform: 'rotate(-45deg)',
        },
      },

      // vertical
      [`&${componentCls}-vertical`]: {
        [`> ${componentCls}-item`]: {
          '&::after': {
            transform: 'rotate(225deg)',
          },
          [`${componentCls}-item-icon`]: {
            float: 'right',
          },
        },
      },

      // progress-dot
      [`&${componentCls}-dot`]: {
        [`${componentCls}-item-icon ${componentCls}-icon-dot, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot`]:
          {
            float: 'right',
          },
      },
    },
  };
};
export default genStepsRTLStyle;
