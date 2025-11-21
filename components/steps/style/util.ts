import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';

function withoutVar(cssVar: any): string {
  return (cssVar || '--ant-not-exist').replace(/var\((.*)\)/, '$1');
}

/**
 * Force override the width related styles.
 * This should be multiple since will conflict with other `rail` styles.
 */
export function getItemWithWidthStyle(
  token: StepsToken,
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
          marginInlineStart: calc(descriptionMaxWidth).sub(`var(--steps-icon-size)`).div(2).equal(),
        },

        // >>> Rail
        [`${itemCls}-rail`]: {
          width: 'auto',
          insetInlineStart: calc(descriptionMaxWidth)
            .add(`var(--steps-icon-size)`)
            .div(2)
            .add(marginSize)
            .equal(),
          insetInlineEnd: calc(descriptionMaxWidth)
            .sub(`var(--steps-icon-size)`)
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
