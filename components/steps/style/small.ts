import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsSmallStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsSmallIconSize,
    // stepsSmallIconMargin,
    fontSizeSM,
    fontSizeBase,
    colorTextSecondary,
  } = token;

  return {
    [`&${componentCls}-small`]: {
      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
        paddingInlineStart: 12, // FIXME: hardcode in v4
        '&:first-child': {
          paddingInlineStart: 0, // FIXME: hardcode in v4
        },
      },

      [`${componentCls}-item-icon`]: {
        width: stepsSmallIconSize,
        height: stepsSmallIconSize,
        // margin: stepsSmallIconMargin,
        marginTop: 0, // FIXME: hardcode in v4
        marginBottom: 0, // FIXME: hardcode in v4
        marginInline: '0 8px', // FIXME: hardcode in v4
        fontSize: fontSizeSM,
        lineHeight: `${stepsSmallIconSize}px`,
        textAlign: 'center',
        borderRadius: stepsSmallIconSize,
      },
      [`${componentCls}-item-title`]: {
        paddingInlineEnd: 12, // FIXME: hardcode in v4
        fontSize: fontSizeBase,
        lineHeight: `${stepsSmallIconSize}px`,

        '&::after': {
          top: stepsSmallIconSize / 2, // FIXME: hardcode in v4
        },
      },
      [`${componentCls}-item-description`]: {
        color: colorTextSecondary,
        fontSize: fontSizeBase,
      },
      [`${componentCls}-item-tail`]: {
        top: 8, // FIXME: hardcode in v4
      },
      [`${componentCls}-item-custom ${componentCls}-item-icon`]: {
        width: 'inherit',
        height: 'inherit',
        lineHeight: 'inherit',
        background: 'none',
        border: 0, // FIXME: hardcode in v4
        borderRadius: 0, // FIXME: hardcode in v4
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
