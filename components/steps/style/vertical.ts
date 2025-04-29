import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genVerticalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSize, calc } = token;
  const itemCls = `${componentCls}-item`;

  const railMargin = calc(token.marginXXS).mul(1.5).equal();

  return {
    [`${componentCls}-vertical`]: {
      flexDirection: 'column',
      alignItems: 'stretch',

      // Item
      [itemCls]: {
        minHeight: token.calc(token.controlHeight).mul(1.5).equal(),
      },

      // Header
      // >>> Description
      [`${itemCls}-description`]: {
        paddingBottom: token.paddingSM,
      },

      // >>> Rail
      [`${itemCls}-rail`]: {
        width: token.lineWidth,
        background: token.processTailColor,
        position: 'absolute',
        top: token.calc(iconSize).add(railMargin).equal(),
        insetInlineStart: token.calc(iconSize).div(2).equal(),
        bottom: railMargin,
        transform: 'translateX(-50%)',
      },
    },
  };
};

export default genVerticalStyle;
