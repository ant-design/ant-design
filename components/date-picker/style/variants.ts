import { unit, type CSSObject } from '@ant-design/cssinjs';

import { genBorderlessStyle, genFilledStyle, genOutlinedStyle } from '../../input/style/variants';
import type { PickerToken } from './token';

const genVariantsStyle = (token: PickerToken): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: [
      {
        ...genOutlinedStyle(token),
        ...genFilledStyle(token),
        ...genBorderlessStyle(token),
      },
      // Multiple
      {
        [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
          background: token.multipleItemBg,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
        },
      },
    ],
  };
};

export default genVariantsStyle;
