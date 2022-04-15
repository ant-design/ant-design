import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { StepsToken, withPx } from '.';

export default function genStepsProgressDotStyle(token: StepsToken): CSSObject {
  const {
    componentCls,
    stepsDotTop,
    stepsDescriptionMaxWidth,
    lineHeight,
    stepsCurrentDotSize,
    stepsDotSize,
  } = token;

  return {
    [`&${componentCls}-dot, &${componentCls}-dot${componentCls}-small`]: {
      [`${componentCls}-item`]: {
        '&-title': {
          lineHeight,
        },

        '&-tail': {
          top: stepsDotTop,
          width: '100%',
          margin: `0 0 0 ${withPx(stepsDescriptionMaxWidth / 2)}`,
          padding: 0,

          '&::after': {
            width: 'calc(100% - 20px)',
            height: 3,
            marginLeft: 12,
          },
        },
        [`&:first-child ${componentCls}-icon-dot`]: {
          left: 2,
        },
        '&-icon': {
          width: stepsDotSize,
          height: stepsDotSize,
          marginLeft: 67,
          paddingRight: 0,
          lineHeight: withPx(stepsDotSize),
          background: 'transparent',
          border: 0,

          [`${componentCls}-icon-dot`]: {
            position: 'relative',
            float: 'left',
            width: '100%',
            height: '100%',
            borderRadius: 100,
            transition: 'all 0.3s',

            /* expand hover area */
            '&::after': {
              position: 'absolute',
              top: -12,
              left: -26,
              width: 60,
              height: 32,
              background: new TinyColor('#000').setAlpha(0.001).toRgbString(),
              content: '""',
            },
          },
        },

        '&-content': {
          width: stepsDescriptionMaxWidth,
        },
        [`&-process ${componentCls}-item-icon`]: {
          position: 'relative',
          top: -1,
          width: stepsCurrentDotSize,
          height: stepsCurrentDotSize,
          lineHeight: withPx(stepsCurrentDotSize),
          background: 'none',
        },
        [`&-process ${componentCls}-icon`]: {
          [`&:first-child ${componentCls}-icon-dot`]: {
            left: 0,
          },
        },
      },
    },
    [`&${componentCls}-vertical${componentCls}-dot`]: {
      [`${componentCls}-item-icon`]: {
        marginTop: 13,
        marginLeft: 0,
        background: 'none',
      },

      // https://github.com/ant-design/ant-design/issues/18354
      [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        top: 6.5,
        left: -9,
        margin: 0,
        padding: '22px 0 4px',
      },

      [`&${componentCls}-small`]: {
        [`${componentCls}-item-icon`]: {
          marginTop: 10,
        },

        [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: 3.5,
        },
      },

      [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        left: 0,
      },
      [`${componentCls}-item-content`]: {
        width: 'inherit',
      },
      [`${componentCls}-item-process ${componentCls}-item-container ${componentCls}-item-icon ${componentCls}-icon-dot`]:
        {
          top: -1,
          left: -1,
        },
    },
  };
}
