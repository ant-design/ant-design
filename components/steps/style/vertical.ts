import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genVerticalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, marginXXS, paddingSM, controlHeight, antCls, calc } = token;
  const itemCls = `${componentCls}-item`;
  const [varName, varRef] = genCssVar(antCls, 'steps');
  return {
    [`${componentCls}-vertical`]: {
      [varName('vertical-rail-margin')]: calc(marginXXS).mul(1.5).equal(),

      flexDirection: 'column',
      alignItems: 'stretch',

      // Item
      [`> ${itemCls}`]: {
        minHeight: calc(controlHeight).mul(1.5).equal(),
        paddingBottom: paddingSM,

        '&:last-child': {
          paddingBottom: 0,
        },

        // Icon
        [`${itemCls}-icon`]: {
          marginInlineStart: `calc((${varRef('icon-size-max')} - ${varRef('icon-size')}) / 2)`,
        },

        // >>> Rail
        [`${itemCls}-rail`]: {
          [varName('rail-offset')]: calc(varRef('heading-height'))
            .sub(varRef('icon-size'))
            .div(2)
            .equal(),

          borderInlineStartWidth: varRef('rail-size'),
          position: 'absolute',
          top: calc(varRef('icon-size'))
            .add(varRef('item-wrapper-padding-top'))
            .add(varRef('rail-offset'))
            .add(varRef('vertical-rail-margin'))
            .equal(),
          insetInlineStart: calc(varRef('icon-size-max')).div(2).equal(),
          bottom: calc(varRef('vertical-rail-margin')).sub(varRef('rail-offset')).equal(),
          marginInlineStart: `calc(${varRef('rail-size')} / -2)`,
        },
      },
    },
  };
};

export default genVerticalStyle;
