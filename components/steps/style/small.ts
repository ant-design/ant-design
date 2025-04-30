import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genSmallStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { calc, componentCls, iconSizeSM, fontSizeSM, fontSize, lineHeight, colorTextDescription } =
    token;

  const itemCls = `${componentCls}-item`;

  const verticalRailMargin = calc(token.marginXXS).mul(1.5).equal();

  return {
    [`${componentCls}${componentCls}-small`]: {
      // Item
      [`&${componentCls}-horizontal${componentCls}-label-horizontal ${itemCls}:not(:first-child)`]:
        {
          marginInlineStart: token.marginSM,
        },

      [`&${componentCls}-label-vertical ${itemCls}`]: {
        rowGap: token.paddingXS,
      },

      // Icon
      [`&:not(${componentCls}-dot) ${itemCls}-icon`]: {
        width: iconSizeSM,
        height: iconSizeSM,
      },

      // Header
      [`&${componentCls}-label-horizontal ${itemCls}-header`]: {
        height: iconSizeSM,
      },

      // >>> Title
      [`${itemCls}-title`]: {
        fontSize,
        lineHeight,
      },

      // >>> Rail
      // >>>>>> Horizontal
      [`&${componentCls}-horizontal ${itemCls}-rail`]: {
        marginTop: token.calc(iconSizeSM).div(2).equal(),
      },

      // >>>>>> Horizontal: label horizontal
      [`&${componentCls}-horizontal${componentCls}-label-horizontal ${itemCls}-rail`]: {
        marginInlineStart: token.paddingXS,
      },

      // >>>>>> Horizontal: label vertical
      [`&${componentCls}-horizontal${componentCls}-label-vertical ${itemCls}-rail`]: {
        width: calc('100%').sub(iconSizeSM).sub(calc(token.marginXXS).mul(2).equal()).equal(),
        insetInlineStart: calc('50%')
          .add(calc(iconSizeSM).div(2).equal())
          .add(token.marginXXS)
          .equal(),
      },

      // >>>>>> Vertical
      [`&${componentCls}-vertical:not(${componentCls}-dot) ${itemCls}-rail`]: {
        top: token.calc(iconSizeSM).add(verticalRailMargin).equal(),
        insetInlineStart: token.calc(iconSizeSM).div(2).equal(),
      },
    },
  };
};
export default genSmallStyle;
