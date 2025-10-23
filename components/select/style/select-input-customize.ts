import type { GenerateStyle } from '../../theme/interface';
import type { SelectToken } from './token';

const genSelectInputCustomizeStyle: GenerateStyle<SelectToken> = (token) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-customize`]: {
      border: 0,
      padding: 0,
      fontSize: 'inherit',
      lineHeight: 'inherit',

      [`${componentCls}-content`]: {
        margin: 0,
        padding: 0,

        '&-value': {
          display: 'none',
        },
      },
    },
  };
};

export default genSelectInputCustomizeStyle;
