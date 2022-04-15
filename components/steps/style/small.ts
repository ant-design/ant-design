import { CSSObject } from '@ant-design/cssinjs';
import { StepsToken, withPx } from '.';

export default function genStepsSmallStyle(token: StepsToken): CSSObject {
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
        lineHeight: withPx(stepsSmallIconSize),
        textAlign: 'center',
        borderRadius: stepsSmallIconSize,
      },
      [`${componentCls}-item-title`]: {
        paddingRight: 12,
        fontSize: fontSizeBase,
        lineHeight: withPx(stepsSmallIconSize),

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
          lineHeight: withPx(stepsSmallIconSize),
          transform: 'none',
        },
      },
    },
  };
}
