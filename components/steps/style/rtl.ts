import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genRTLStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, lineWidthBold } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}${componentCls}-rtl`]: {
      direction: 'rtl',

      // nav
      [`&${componentCls}-navigation${componentCls}-horizontal`]: {
        [`${itemCls}:after`]: {
          transform: 'translateY(-50%) rotate(-45deg)',
        },
      },

      // panel
      [`&${componentCls}-panel`]: {
        [`${componentCls}-panel-arrow`]: {
          transform: `scaleX(-1)`,
        },

        [`&${componentCls}-filled`]: {
          [itemCls]: {
            '&:not(:first-child)': {
              clipPath: `polygon(${[
                `calc(0px - var(--steps-item-base-width)) 0px`,
                `calc(100% - ${unit(lineWidthBold)}) 0px`,
                `calc(100% - var(--steps-item-base-width) - ${unit(lineWidthBold)}) 50%`,
                `calc(100% - ${unit(lineWidthBold)}) 100%`,
                `calc(0px - var(--steps-item-base-width)) 100%`,
              ].join(',')})`,
            },
          },
        },
      },
    },
  };
};
export default genRTLStyle;
