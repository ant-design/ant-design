import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { RadioToken } from '.';

const genSizeStyle: GenerateStyle<RadioToken, CSSObject> = (token) => {
  const {
    componentCls,
    antCls,
    lineWidth,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    radioSize,
    dotSize,
    fontSize,
    fontSizeLG,
    fontSizeSM,
    lineHeight,
    lineHeightLG,
    lineHeightSM,
    fontHeight,
    fontHeightLG,
    fontHeightSM,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    buttonPaddingInline,
    padding,
    paddingXS,
    calc,
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  const [varName] = genCssVar(antCls, 'cmp-radio');

  const genGroupSizeStyle = (
    offset: number | string,
    labelFontSize: number | string,
    labelLineHeight: number | string,
    buttonHeight: number | string,
    buttonFontSize: number | string,
    buttonBorderRadius: number | string,
    buttonPaddingSize: number | string,
  ): CSSObject => ({
    [varName('size')]: `calc(${radioSize} * 1px + ${unit(offset)})`,
    [varName('dot-size')]: `calc(${dotSize} * 1px + ${unit(offset)})`,
    [varName('font-size')]: labelFontSize,
    [varName('line-height')]: labelLineHeight,
    [varName('button-height')]: buttonHeight,
    [varName('button-font-size')]: buttonFontSize,
    [varName('button-line-height')]: unit(
      calc(buttonHeight).sub(calc(lineWidth).mul(2)).equal(),
    ),
    [varName('button-border-radius')]: buttonBorderRadius,
    [varName('button-padding-inline')]: calc(buttonPaddingInline)
      .add(buttonPaddingSize)
      .sub(padding)
      .equal(),
  });

  return {
    [groupPrefixCls]: {
      [varName('size')]: `calc(${radioSize} * 1px)`,
      [varName('dot-size')]: `calc(${dotSize} * 1px)`,
      [varName('font-size')]: fontSize,
      [varName('line-height')]: lineHeight,
      [varName('button-height')]: controlHeight,
      [varName('button-padding-inline')]: buttonPaddingInline,
      [varName('button-font-size')]: fontSize,
      [varName('button-line-height')]: unit(
        calc(controlHeight).sub(calc(lineWidth).mul(2)).equal(),
      ),
      [varName('button-border-radius')]: borderRadius,

      [`&${groupPrefixCls}-large`]: genGroupSizeStyle(
        calc(fontHeightLG).sub(fontHeight).equal(),
        fontSizeLG,
        lineHeightLG,
        controlHeightLG,
        fontSizeLG,
        borderRadiusLG,
        padding,
      ),

      [`&${groupPrefixCls}-small`]: genGroupSizeStyle(
        calc(fontHeightSM).sub(fontHeight).equal(),
        fontSizeSM,
        lineHeightSM,
        controlHeightSM,
        fontSize,
        borderRadiusSM,
        paddingXS,
      ),
    },
  };
};

export default genSizeStyle;
