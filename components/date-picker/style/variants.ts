import type { PickerToken } from './token';
import type { CSSObject } from '@ant-design/cssinjs';
import { genBorderlessStyle, genFilledStyle, genOutlinedStyle } from '../../input/style/variants';

const genVariantsStyle = (token: PickerToken): CSSObject => ({
  [token.componentCls]: {
    ...genOutlinedStyle(token),
    ...genFilledStyle(token),
    ...genBorderlessStyle(token),
  },
});

export default genVariantsStyle;
