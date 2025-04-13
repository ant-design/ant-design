import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { ColorPickerToken } from './index';

const genPickerStyle: GenerateStyle<ColorPickerToken, CSSObject> = (token) => {
  const {
    componentCls,
    controlHeightLG,
    borderRadiusSM,
    colorPickerInsetShadow,
    marginSM,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSize,
  } = token;

  return {
    userSelect: 'none',

    [`${componentCls}-select`]: {
      [`${componentCls}-palette`]: {
        minHeight: token.calc(controlHeightLG).mul(4).equal(),
        overflow: 'hidden',
        borderRadius: borderRadiusSM,
      },
      [`${componentCls}-saturation`]: {
        position: 'absolute',
        borderRadius: 'inherit',
        boxShadow: colorPickerInsetShadow,
        inset: 0,
      },
      marginBottom: marginSM,
    },

    // ======================== Panel =========================
    [`${componentCls}-handler`]: {
      width: colorPickerHandlerSize,
      height: colorPickerHandlerSize,
      border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
      position: 'relative',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
    },
  };
};

export default genPickerStyle;
