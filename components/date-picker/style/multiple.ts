import { genSelectionStyle } from '../../select/style/multiple';
import type { GenerateStyle } from '../../theme/internal';
import type { PickerToken } from './token';

const genPickerMultipleStyle: GenerateStyle<PickerToken> = (token) => {
  const { componentCls } = token;

  return [
    genSelectionStyle(token),
    {
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
    },
  ];
};

export default genPickerMultipleStyle;
