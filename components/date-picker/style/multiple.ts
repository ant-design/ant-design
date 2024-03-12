import type { CSSInterpolation } from '@ant-design/cssinjs';

import { FIXED_ITEM_MARGIN, genSelectionStyle } from '../../select/style/multiple';
import { mergeToken, type GenerateStyle } from '../../theme/internal';
import type { PickerToken } from './token';

const genSize = (token: PickerToken, suffix?: string): CSSInterpolation => {
  const { componentCls, selectHeight, fontHeight, lineWidth, controlHeight, calc } = token;

  const suffixCls = suffix ? `${componentCls}-${suffix}` : '';

  const height = token.calc(fontHeight).add(2).equal();
  const restHeight = () => calc(selectHeight).sub(height).sub(calc(lineWidth).mul(2));

  const paddingBase = token.max(restHeight().div(2).equal(), 0);
  const paddingTop = token.max(token.calc(paddingBase).sub(FIXED_ITEM_MARGIN).equal(), 0);
  const paddingBottom = token.max(
    restHeight()
      .sub(paddingTop)
      .sub(FIXED_ITEM_MARGIN * 2)
      .equal(),
    0,
  );

  return [
    genSelectionStyle(token, suffix),
    {
      [`${componentCls}-multiple${suffixCls}`]: {
        paddingTop,
        paddingBottom,
        paddingInlineStart: paddingBase,
        minHeight: controlHeight,
      },
    },
  ];
};

const genPickerMultipleStyle: GenerateStyle<PickerToken> = (token) => {
  const { componentCls, calc, lineWidth } = token;

  const smallToken = mergeToken<PickerToken>(token, {
    fontHeight: token.fontSize,
    selectHeight: token.controlHeightSM,
    multipleSelectItemHeight: token.controlHeightXS,
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
    genSelectionStyle(token),
    {
      [`${componentCls}${componentCls}-multiple`]: {
        width: '100%',

        // ==================== Selector =====================
        [`${componentCls}-selector`]: {
          flex: 'auto',
          padding: 0,

          '&:after': {
            margin: 0,
          },
        },

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
