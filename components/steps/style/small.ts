import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsSmallStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    iconSizeSM,
    // stepsSmallIconMargin,
    fontSizeSM,
    fontSize,
    colorTextDescription,
  } = token;

  return {
    [`&${componentCls}-small`]: {
      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
        paddingInlineStart: token.paddingSM,
        '&:first-child': {
          paddingInlineStart: 0,
        },
      },

      [`${componentCls}-item-icon`]: {
        width: iconSizeSM,
        height: iconSizeSM,
        // margin: stepsSmallIconMargin,
        marginTop: 0,
        marginBottom: 0,
        marginInline: `0 ${unit(token.marginXS)}`,
        fontSize: fontSizeSM,
        lineHeight: unit(iconSizeSM),
        textAlign: 'center',
        borderRadius: iconSizeSM,
      },
      [`${componentCls}-item-title`]: {
        paddingInlineEnd: token.paddingSM,
        fontSize,
        lineHeight: unit(iconSizeSM),

        '&::after': {
          top: token.calc(iconSizeSM).div(2).equal(),
        },
      },
      [`${componentCls}-item-description`]: {
        color: colorTextDescription,
        fontSize,
      },
      [`${componentCls}-item-tail`]: {
        top: token.calc(iconSizeSM).div(2).sub(token.paddingXXS).equal(),
      },
      [`${componentCls}-item-custom ${componentCls}-item-icon`]: {
        width: 'inherit',
        height: 'inherit',
        lineHeight: 'inherit',
        background: 'none',
        border: 0,
        borderRadius: 0,
        [`> ${componentCls}-icon`]: {
          fontSize: iconSizeSM,
          lineHeight: unit(iconSizeSM),
          transform: 'none',
        },
      },
    },
  };
};
export default genStepsSmallStyle;
