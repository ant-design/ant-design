import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsCustomIconStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsIconCustomTop,
    stepsIconCustomSize,
    stepsIconCustomFontSize,
    processIconColor,
  } = token;

  return {
    [`${componentCls}-item-custom`]: {
      [`> ${componentCls}-item-container > ${componentCls}-item-icon`]: {
        height: 'auto',
        background: 'none',
        border: 0,
        [`> ${componentCls}-icon`]: {
          top: stepsIconCustomTop,
          insetInlineStart: 0.5,
          width: stepsIconCustomSize,
          height: stepsIconCustomSize,
          fontSize: stepsIconCustomFontSize,
          lineHeight: `${stepsIconCustomSize}px`,
        },
      },
      [`&${componentCls}-item-process`]: {
        [`${componentCls}-item-icon > ${componentCls}-icon`]: {
          color: processIconColor,
        },
      },
    },

    // Only adjust horizontal customize icon width
    [`&:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          width: 'auto',
          background: 'none',
        },
      },
    },
  };
};

export default genStepsCustomIconStyle;
