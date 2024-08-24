import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSize, lineHeight, iconSizeSM } = token;

  return {
    [`&${componentCls}-label-vertical`]: {
      [`${componentCls}-item`]: {
        overflow: 'visible',

        '&-tail': {
          marginInlineStart: token.calc(iconSize).div(2).add(token.controlHeightLG).equal(),
          padding: `0 ${unit(token.paddingLG)}`,
        },

        '&-content': {
          display: 'block',
          width: token.calc(iconSize).div(2).add(token.controlHeightLG).mul(2).equal(),
          marginTop: token.marginSM,
          textAlign: 'center',
        },

        '&-icon': {
          display: 'inline-block',
          marginInlineStart: token.controlHeightLG,
        },

        '&-title': {
          paddingInlineEnd: 0,
          paddingInlineStart: 0,

          '&::after': {
            display: 'none',
          },
        },

        '&-subtitle': {
          display: 'block',
          marginBottom: token.marginXXS,
          marginInlineStart: 0,
          lineHeight,
        },
      },
      [`&${componentCls}-small:not(${componentCls}-dot)`]: {
        [`${componentCls}-item`]: {
          '&-icon': {
            marginInlineStart: token
              .calc(iconSize)
              .sub(iconSizeSM)
              .div(2)
              .add(token.controlHeightLG)
              .equal(),
          },
        },
      },
    },
  };
};
export default genStepsLabelPlacementStyle;
