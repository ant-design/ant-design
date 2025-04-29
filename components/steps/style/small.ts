import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genSmallStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSizeSM, fontSizeSM, fontSize, lineHeight, colorTextDescription } =
    token;

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}${componentCls}-small`]: {
      // Item
      [itemCls]: {
        marginInlineStart: token.paddingSM,
      },

      // Icon
      [`${itemCls}-icon`]: {
        width: iconSizeSM,
        height: iconSizeSM,
      },

      // Header
      [`${itemCls}-header`]: {
        height: iconSizeSM,
      },

      // >>> Title
      [`${itemCls}-title`]: {
        fontSize,
        lineHeight,
      },

      // >>> Rail
      [`${itemCls}-rail`]: {
        marginTop: token.calc(iconSizeSM).div(2).equal(),
        marginInlineStart: token.paddingXS,
      },
    },
  };
};
export default genSmallStyle;
