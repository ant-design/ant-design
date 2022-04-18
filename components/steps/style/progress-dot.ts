import { TinyColor } from '@ctrl/tinycolor';
import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsProgressDotStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsDotTop,
    stepsDescriptionMaxWidth,
    lineHeight,
    stepsCurrentDotSize,
    stepsDotSize,
    motionDurationSlow,
  } = token;

  return {
    [`&${componentCls}-dot, &${componentCls}-dot${componentCls}-small`]: {
      [`${componentCls}-item`]: {
        '&-title': {
          lineHeight,
        },

        '&-tail': {
          top: stepsDotTop,
          width: '100%', // FIXME: hardcode in v4
          // margin: `0 0 0 ${stepsDescriptionMaxWidth / 2}px`, // FIXME: hardcode in v4
          marginTop: 0, // FIXME: hardcode in v4
          marginBottom: 0, // FIXME: hardcode in v4
          marginInline: `${stepsDescriptionMaxWidth / 2}px 0`, // FIXME: hardcode in v4
          padding: 0, // FIXME: hardcode in v4

          '&::after': {
            width: 'calc(100% - 20px)', // FIXME: hardcode in v4
            height: 3, // FIXME: hardcode in v4
            marginInlineStart: 12, // FIXME: hardcode in v4
          },
        },
        [`&:first-child ${componentCls}-icon-dot`]: {
          insetInlineStart: 2, // FIXME: hardcode in v4
        },
        '&-icon': {
          width: stepsDotSize,
          height: stepsDotSize,
          marginInlineStart: 67, // FIXME: hardcode in v4
          paddingInlineEnd: 0, // FIXME: hardcode in v4
          lineHeight: `${stepsDotSize}px`,
          background: 'transparent',
          border: 0, // FIXME: hardcode in v4

          [`${componentCls}-icon-dot`]: {
            position: 'relative',
            float: 'left',
            width: '100%', // FIXME: hardcode in v4
            height: '100%', // FIXME: hardcode in v4
            borderRadius: 100, // FIXME: hardcode in v4
            transition: `all ${motionDurationSlow}`,

            /* expand hover area */
            '&::after': {
              position: 'absolute',
              top: -12, // FIXME: hardcode in v4
              insetInlineStart: -26, // FIXME: hardcode in v4
              width: 60, // FIXME: hardcode in v4
              height: 32, // FIXME: hardcode in v4
              background: new TinyColor('#000').setAlpha(0.001).toRgbString(), // FIXME: hardcode in v4
              content: '""',
            },
          },
        },

        '&-content': {
          width: stepsDescriptionMaxWidth,
        },
        [`&-process ${componentCls}-item-icon`]: {
          position: 'relative',
          top: -1, // FIXME: hardcode in v4
          width: stepsCurrentDotSize,
          height: stepsCurrentDotSize,
          lineHeight: `${stepsCurrentDotSize}px`,
          background: 'none',
        },
        [`&-process ${componentCls}-icon`]: {
          [`&:first-child ${componentCls}-icon-dot`]: {
            insetInlineStart: 0, // FIXME: hardcode in v4
          },
        },
      },
    },
    [`&${componentCls}-vertical${componentCls}-dot`]: {
      [`${componentCls}-item-icon`]: {
        marginTop: 13, // FIXME: hardcode in v4
        marginInlineStart: 0, // FIXME: hardcode in v4
        background: 'none',
      },

      // https://github.com/ant-design/ant-design/issues/18354
      [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        top: 6.5, // FIXME: hardcode in v4
        insetInlineStart: -9, // FIXME: hardcode in v4
        margin: 0, // FIXME: hardcode in v4
        padding: '22px 0 4px', // FIXME: hardcode in v4
      },

      [`&${componentCls}-small`]: {
        [`${componentCls}-item-icon`]: {
          marginTop: 10, // FIXME: hardcode in v4
        },

        [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: 3.5, // FIXME: hardcode in v4
        },
      },

      [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        insetInlineStart: 0, // FIXME: hardcode in v4
      },
      [`${componentCls}-item-content`]: {
        width: 'inherit',
      },
      [`${componentCls}-item-process ${componentCls}-item-container ${componentCls}-item-icon ${componentCls}-icon-dot`]:
        {
          top: -1, // FIXME: hardcode in v4
          insetInlineStart: -1, // FIXME: hardcode in v4
        },
    },
  };
};

export default genStepsProgressDotStyle;
