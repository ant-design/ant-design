import { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';

function withoutVar(cssVar: any): string {
  return (cssVar || '--ant-not-exist').replace(/var\((.*)\)/, '$1');
}

export function getItemWithWidthStyle(
  token: StepsToken,
  iconSize: number,
  marginSize: number,
  optionalStyle?: CSSObject,
): CSSObject {
  const { calc, componentCls, descriptionMaxWidth } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`@container style(${withoutVar(descriptionMaxWidth)})`]: [
      {
        // Icon
        [`${itemCls}-icon`]: {
          marginInlineStart: calc(descriptionMaxWidth).sub(iconSize).div(2).equal(),
        },

        // >>> Rail
        [`${itemCls}-rail`]: {
          width: 'auto',
          insetInlineStart: calc(descriptionMaxWidth).add(iconSize).div(2).add(marginSize).equal(),
          insetInlineEnd: calc(descriptionMaxWidth)
            .sub(iconSize)
            .div(2)
            .sub(marginSize)
            .mul(-1)
            .equal(),
        },
      },
      optionalStyle,
    ],
  };
}
