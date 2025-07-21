import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { getShadowStyle } from './fixed';
import type { TableToken } from './index';

const genStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls } = token;

  const [leftShadowStyle, rightShadowStyle] = getShadowStyle(token);

  return {
    [`${componentCls}-wrapper-rtl`]: {
      direction: 'rtl',
      table: {
        direction: 'rtl',
      },

      [`${componentCls}-row-expand-icon`]: {
        float: 'right',

        '&::after': {
          transform: 'rotate(-90deg)',
        },

        '&-collapsed::before': {
          transform: 'rotate(180deg)',
        },

        '&-collapsed::after': {
          transform: 'rotate(0deg)',
        },
      },

      // ====================== Cell ======================
      [`${componentCls}-cell-fix`]: {
        '&-start-shadow-show:after': rightShadowStyle,
        '&-end-shadow-show:after': leftShadowStyle,
      },

      // =================== Container ====================
      [`${componentCls}-container`]: {
        [`${componentCls}-row-indent`]: {
          float: 'right',
        },
      },

      [`${componentCls}-fix-start-shadow-show ${componentCls}-container:before`]: rightShadowStyle,
      [`${componentCls}-fix-end-shadow-show ${componentCls}-container:after`]: leftShadowStyle,
    },
  };
};

export default genStyle;
