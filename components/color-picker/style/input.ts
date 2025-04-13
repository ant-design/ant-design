import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { ColorPickerToken } from './index';

const genInputStyle: GenerateStyle<ColorPickerToken, CSSObject> = (token) => {
  const {
    componentCls,
    antCls,
    fontSizeSM,
    lineHeightSM,
    colorPickerAlphaInputWidth,
    marginXXS,
    paddingXXS,
    controlHeightSM,
    marginXS,
    fontSizeIcon,
    paddingXS,
    colorTextPlaceholder,
    colorPickerInputNumberHandleWidth,
    lineWidth,
  } = token;

  return {
    [`${componentCls}-input-container`]: {
      display: 'flex',
      [`${componentCls}-steppers${antCls}-input-number`]: {
        fontSize: fontSizeSM,
        lineHeight: lineHeightSM,
        [`${antCls}-input-number-input`]: {
          paddingInlineStart: paddingXXS,
          paddingInlineEnd: 0,
        },
        [`${antCls}-input-number-handler-wrap`]: {
          width: colorPickerInputNumberHandleWidth,
        },
      },

      [`${componentCls}-steppers${componentCls}-alpha-input`]: {
        flex: `0 0 ${unit(colorPickerAlphaInputWidth)}`,
        marginInlineStart: marginXXS,
      },

      [`${componentCls}-format-select${antCls}-select`]: {
        marginInlineEnd: marginXS,
        width: 'auto',
        '&-single': {
          [`${antCls}-select-selector`]: {
            padding: 0,
            border: 0,
          },
          [`${antCls}-select-arrow`]: {
            insetInlineEnd: 0,
          },
          [`${antCls}-select-selection-item`]: {
            paddingInlineEnd: token.calc(fontSizeIcon).add(marginXXS).equal(),
            fontSize: fontSizeSM,
            lineHeight: unit(controlHeightSM),
          },
          [`${antCls}-select-item-option-content`]: {
            fontSize: fontSizeSM,
            lineHeight: lineHeightSM,
          },
          [`${antCls}-select-dropdown`]: {
            [`${antCls}-select-item`]: {
              minHeight: 'auto',
            },
          },
        },
      },

      [`${componentCls}-input`]: {
        gap: marginXXS,
        alignItems: 'center',
        flex: 1,
        width: 0,
        [`${componentCls}-hsb-input,${componentCls}-rgb-input`]: {
          display: 'flex',
          gap: marginXXS,
          alignItems: 'center',
        },
        [`${componentCls}-steppers`]: {
          flex: 1,
        },
        [`${componentCls}-hex-input${antCls}-input-affix-wrapper`]: {
          flex: 1,
          padding: `0 ${unit(paddingXS)}`,
          [`${antCls}-input`]: {
            fontSize: fontSizeSM,
            textTransform: 'uppercase',
            lineHeight: unit(token.calc(controlHeightSM).sub(token.calc(lineWidth).mul(2)).equal()),
          },
          [`${antCls}-input-prefix`]: {
            color: colorTextPlaceholder,
          },
        },
      },
    },
  };
};

export default genInputStyle;
