import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/interface';
import type { SelectToken } from './token';

const genSelectInputCustomizeStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-customize`]: {
      border: 0,
      padding: 0,
      fontSize: 'inherit',
      lineHeight: 'inherit',
      height: 'auto',

      [`${componentCls}-placeholder`]: {
        display: 'none',
      },

      [`${componentCls}-content`]: {
        margin: 0,
        padding: 0,

        '&:before': {
          display: 'none',
        },

        '&-value': {
          display: 'none',
        },
      },
    },
  };
};

export default genSelectInputCustomizeStyle;
