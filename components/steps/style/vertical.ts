import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genVerticalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, calc } = token;
  const itemCls = `${componentCls}-item`;

  const railMargin = calc(token.marginXXS).mul(1.5).equal();

  return {
    [`${componentCls}-vertical`]: {
      flexDirection: 'column',
      alignItems: 'stretch',

      // Item
      [itemCls]: {
        minHeight: calc(token.controlHeight).mul(1.5).equal(),
      },

      // Header
      // >>> Content
      [`${itemCls}-content`]: {
        paddingBottom: token.paddingSM,
      },

      // >>> Rail
      [`${itemCls}-rail`]: {
        '--steps-rail-offset': calc('var(--steps-title-horizontal-header-min)')
          .sub('var(--steps-icon-size)')
          .div(2)
          .equal(),

        width: 'var(--steps-rail-size)',
        position: 'absolute',
        top: calc(`var(--steps-icon-size)`)
          .add('var(--steps-item-wrapper-padding-top)')
          .add('var(--steps-rail-offset)')
          .add(railMargin)
          .equal(),
        insetInlineStart: calc(`var(--steps-icon-size)`).div(2).equal(),
        bottom: calc(railMargin).sub('var(--steps-rail-offset)').equal(),
        transform: 'translateX(-50%)',
      },
    },
  };
};

export default genVerticalStyle;
