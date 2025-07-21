import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genVerticalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, calc } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-vertical`]: {
      '--steps-vertical-rail-margin': calc(token.marginXXS).mul(1.5).equal(),

      flexDirection: 'column',
      alignItems: 'stretch',

      // Item
      [`> ${itemCls}`]: {
        minHeight: calc(token.controlHeight).mul(1.5).equal(),
        paddingBottom: token.paddingSM,

        '&:last-child': {
          paddingBottom: 0,
        },

        // Icon
        [`${itemCls}-icon`]: {
          marginInlineStart: 'calc((var(--steps-icon-size-max) - var(--steps-icon-size)) / 2)',
        },

        // >>> Rail
        [`${itemCls}-rail`]: {
          '--steps-rail-offset': calc('var(--steps-heading-height)')
            .sub('var(--steps-icon-size)')
            .div(2)
            .equal(),

          borderInlineStartWidth: 'var(--steps-rail-size)',
          position: 'absolute',
          top: calc(`var(--steps-icon-size)`)
            .add('var(--steps-item-wrapper-padding-top)')
            .add('var(--steps-rail-offset)')
            .add('var(--steps-vertical-rail-margin)')
            .equal(),
          insetInlineStart: calc(`var(--steps-icon-size-max)`).div(2).equal(),
          bottom: calc('var(--steps-vertical-rail-margin)').sub('var(--steps-rail-offset)').equal(),
          marginInlineStart: `calc(var(--steps-rail-size) / -2)`,
        },
      },
    },
  };
};

export default genVerticalStyle;
