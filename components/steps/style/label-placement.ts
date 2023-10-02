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
          marginInlineStart: iconSize / 2 + token.controlHeightLG,
          padding: `${token.paddingXXS}px ${token.paddingLG}px`,
        },

        '&-content': {
          display: 'block',
          width: (iconSize / 2 + token.controlHeightLG) * 2,
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
            marginInlineStart: token.controlHeightLG + (iconSize - iconSizeSM) / 2,
          },
        },
      },
    },
  };
};
export default genStepsLabelPlacementStyle;
