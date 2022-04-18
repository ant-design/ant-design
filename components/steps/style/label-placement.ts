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
          marginInlineStart: 58, // FIXME: hardcode in v4
          padding: '3.5px 24px', // FIXME: hardcode in v4
        },

        '&-content': {
          display: 'block',
          width: (stepsIconSize / 2 + 42) * 2, // FIXME: hardcode in v4
          marginTop: 8, // FIXME: hardcode in v4
          textAlign: 'center',
        },

        '&-icon': {
          display: 'inline-block',
          marginInlineStart: 42, // FIXME: hardcode in v4
        },

        '&-title': {
          paddingInlineEnd: 0, // FIXME: hardcode in v4
          paddingInlineStart: 0, // FIXME: hardcode in v4

          '&::after': {
            display: 'none',
          },
        },

        '&-subtitle': {
          display: 'block',
          marginBottom: 4, // FIXME: hardcode in v4
          marginInlineStart: 0, // FIXME: hardcode in v4
          lineHeight,
        },
      },
      [`&${componentCls}-small:not(${componentCls}-dot)`]: {
        [`${componentCls}-item`]: {
          '&-icon': {
            marginInlineStart: 46, // FIXME: hardcode in v4
          },
        },
      },
    },
  };
};
export default genStepsLabelPlacementStyle;
