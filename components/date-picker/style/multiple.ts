import type { CSSInterpolation } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genOverflowStyle, getMultipleSelectorUnit } from '../../select/style/multiple';
import { mergeToken } from '../../theme/internal';
import type { GenerateStyle } from '../../theme/internal';
import type { PickerToken } from './token';

const genSize = (token: PickerToken, suffix?: string): CSSInterpolation => {
  const { componentCls, controlHeight } = token;

  const suffixCls = suffix ? `${componentCls}-${suffix}` : '';

  const multipleSelectorUnit = getMultipleSelectorUnit(token);

  return [
    // genSelectionStyle(token, suffix),
    {
      [`${componentCls}-multiple${suffixCls}`]: {
        paddingBlock: multipleSelectorUnit.containerPadding,
        paddingInlineStart: multipleSelectorUnit.basePadding,
        minHeight: controlHeight,

        // ======================== Selections ========================
        [`${componentCls}-selection-item`]: {
          height: multipleSelectorUnit.itemHeight,
          lineHeight: unit(multipleSelectorUnit.itemLineHeight),
        },
      },
    },
  ];
};

const genPickerMultipleStyle: GenerateStyle<PickerToken> = (token) => {
  const { componentCls, calc, lineWidth } = token;

  const smallToken = mergeToken<PickerToken>(token, {
    fontHeight: token.fontSize,
    selectHeight: token.controlHeightSM,
    multipleSelectItemHeight: token.multipleItemHeightSM,
    borderRadius: token.borderRadiusSM,
    borderRadiusSM: token.borderRadiusXS,
    controlHeight: token.controlHeightSM,
  });

  const largeToken = mergeToken<PickerToken>(token, {
    fontHeight: calc(token.multipleItemHeightLG)
      .sub(calc(lineWidth).mul(2).equal())
      .equal() as number,
    fontSize: token.fontSizeLG,
    selectHeight: token.controlHeightLG,
    multipleSelectItemHeight: token.multipleItemHeightLG,
    borderRadius: token.borderRadiusLG,
    borderRadiusSM: token.borderRadius,
    controlHeight: token.controlHeightLG,
  });

  return [
    // ======================== Size ========================
    genSize(smallToken, 'small'),
    genSize(token),
    genSize(largeToken, 'large'),

    // ====================== Selection ======================
    {
      [`${componentCls}${componentCls}-multiple`]: {
        width: '100%',
        cursor: 'text',

        // ==================== Selector =====================
        [`${componentCls}-selector`]: {
          flex: 'auto',
          padding: 0,
          position: 'relative',

          '&:after': {
            margin: 0,
          },

          // ================== placeholder ==================
          [`${componentCls}-selection-placeholder`]: {
            position: 'absolute',
            top: '50%',
            insetInlineStart: token.inputPaddingHorizontalBase,
            insetInlineEnd: 0,
            transform: 'translateY(-50%)',
            transition: `all ${token.motionDurationSlow}`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            flex: 1,
            color: token.colorTextPlaceholder,
            pointerEvents: 'none',
          },
        },

        // ===================== Overflow ====================
        ...genOverflowStyle(token),

        // ====================== Input ======================
        // Input is `readonly`, which is used for a11y only
        [`${componentCls}-multiple-input`]: {
          width: 0,
          height: 0,
          border: 0,
          visibility: 'hidden',
          position: 'absolute',
          zIndex: -1,
        },
      },
    },
  ];
};

export default genPickerMultipleStyle;
