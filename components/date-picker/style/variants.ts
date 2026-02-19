import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import {
  genBorderlessStyle,
  genFilledStyle,
  genOutlinedStyle,
  genUnderlinedStyle,
} from '../../input/style/variants';
import type { GenerateStyle } from '../../theme/interface';
import type { PickerToken } from './token';

const genVariantsStyle: GenerateStyle<PickerToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: [
      {
        ...genOutlinedStyle(token),
        ...genUnderlinedStyle(token),
        ...genFilledStyle(token),
        ...genBorderlessStyle(token),
      },
      // ========================= Multiple =========================
      {
        '&-outlined': {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
          },
        },
        '&-filled': {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.colorBgContainer,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
          },
        },
        '&-borderless': {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
          },
        },
        '&-underlined': {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
          },
        },
      },
    ],
  };
};

export default genVariantsStyle;
