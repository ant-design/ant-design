import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/interface';
import type { SelectToken } from './token';

const genSelectInputCustomizeStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { antCls, componentCls } = token;

  const transparentBackground: CSSObject = {
    background: 'transparent',
  };
  const disabledCustomizedInputSelector = [
    '> input[disabled]',
    '> textarea[disabled]',
    `> ${componentCls}-input`,
    `> ${antCls}-input-affix-wrapper-disabled`,
    `> ${antCls}-input-search`,
  ].join(', ');

  return {
    [`&${componentCls}-customize`]: {
      border: 0,
      padding: 0,
      fontSize: 'inherit',
      lineHeight: 'inherit',

      [`${componentCls}-placeholder`]: {
        display: 'none',
      },

      [`${componentCls}-content`]: {
        margin: 0,
        padding: 0,

        '&-value': {
          display: 'none',
        },
      },

      [`&${componentCls}-disabled ${componentCls}-content`]: {
        [disabledCustomizedInputSelector]: transparentBackground,

        'input[disabled], textarea[disabled]': transparentBackground,
      },
    },
  };
};

export default genSelectInputCustomizeStyle;
