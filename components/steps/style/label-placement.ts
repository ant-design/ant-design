import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { componentCls, stepsIconSize, lineHeight } = token;

  return {
    [`&${componentCls}-label-vertical`]: {
      [`${componentCls}-item`]: {
        overflow: 'visible',

        '&-tail': {
          marginLeft: 58,
          padding: '3.5px 24px',
        },

        '&-content': {
          display: 'block',
          width: (stepsIconSize / 2 + 42) * 2,
          marginTop: 8,
          textAlign: 'center',
        },

        '&-icon': {
          display: 'inline-block',
          marginLeft: 42,
        },

        '&-title': {
          paddingRight: 0,
          paddingLeft: 0,

          '&::after': {
            display: 'none',
          },
        },

        '&-subtitle': {
          display: 'block',
          marginBottom: 4,
          marginLeft: 0,
          lineHeight,
        },
      },
      [`&${componentCls}-small:not(${componentCls}-dot)`]: {
        [`${componentCls}-item`]: {
          '&-icon': {
            marginLeft: 46,
          },
        },
      },
    },
  };
};
export default genStepsLabelPlacementStyle;
