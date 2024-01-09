import { unit, type CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import type { GenerateStyle } from '../../theme/internal';
import type { PickerToken, SharedPickerToken } from './token';

const genPickerMultipleStyle: GenerateStyle<PickerToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-multiple`]: {
      width: '100%',

      // ====================== Input ======================
      // Input is `readonly`, which is used for a11y only
      [`${componentCls}-multiple-input`]: {
        width: 0,
        height: 0,
        border: 0,
      },
    },
  };
};

export default genPickerMultipleStyle;
