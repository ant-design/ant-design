import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsSmallStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsSmallIconSize,
    stepsSmallIconMargin,
    fontSizeSM,
    fontSizeBase,
    colorTextSecondary,
  } = token;

  return {
    [`&${componentCls}-small`]: {
      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
        paddingLeft: 12,
        '&:first-child': {
          paddingLeft: 0,
        },
      },

      [`${componentCls}-item-icon`]: {
        width: stepsSmallIconSize,
        height: stepsSmallIconSize,
        margin: stepsSmallIconMargin,
        fontSize: fontSizeSM,
        lineHeight: `${stepsSmallIconSize}px`,
        textAlign: 'center',
        borderRadius: stepsSmallIconSize,
      },
      [`${componentCls}-item-title`]: {
        paddingRight: 12,
        fontSize: fontSizeBase,
        lineHeight: `${stepsSmallIconSize}px`,

        '&::after': {
          top: stepsSmallIconSize / 2,
        },
      },
      [`${componentCls}-item-description`]: {
        color: colorTextSecondary,
        fontSize: fontSizeBase,
      },
      [`${componentCls}-item-tail`]: {
        top: 8,
      },
      [`${componentCls}-item-custom ${componentCls}-item-icon`]: {
        width: 'inherit',
        height: 'inherit',
        lineHeight: 'inherit',
        background: 'none',
        border: 0,
        borderRadius: 0,
        [`> ${componentCls}-icon`]: {
          fontSize: stepsSmallIconSize,
          lineHeight: `${stepsSmallIconSize}px`,
          transform: 'none',
        },
      },
    },
  };
};
export default genStepsSmallStyle;
