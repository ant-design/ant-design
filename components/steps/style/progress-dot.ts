import type { CSSObject } from '@ant-design/cssinjs';
import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsProgressDotStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    descriptionMaxWidth,
    lineHeight,
    dotCurrentSize,
    dotSize,
    motionDurationSlow,
  } = token;

  return {
    [`&${componentCls}-dot, &${componentCls}-dot${componentCls}-small`]: {
      [`${componentCls}-item`]: {
        '&-title': {
          lineHeight,
        },

        '&-tail': {
          top: Math.floor((token.dotSize - token.lineWidth * 3) / 2),
          width: '100%',
          marginTop: 0,
          marginBottom: 0,
          marginInline: `${descriptionMaxWidth / 2}px 0`,
          padding: 0,

          '&::after': {
            width: `calc(100% - ${token.marginSM * 2}px)`,
            height: token.lineWidth * 3,
            marginInlineStart: token.marginSM,
          },
        },
        '&-icon': {
          width: dotSize,
          height: dotSize,
          marginInlineStart: (token.descriptionMaxWidth - dotSize) / 2,
          paddingInlineEnd: 0,
          lineHeight: `${dotSize}px`,
          background: 'transparent',
          border: 0,

          [`${componentCls}-icon-dot`]: {
            position: 'relative',
            float: 'left',
            width: '100%',
            height: '100%',
            borderRadius: 100, // very large number
            transition: `all ${motionDurationSlow}`,

            /* expand hover area */
            '&::after': {
              position: 'absolute',
              top: -token.marginSM,
              insetInlineStart: (dotSize - token.controlHeightLG * 1.5) / 2,
              width: token.controlHeightLG * 1.5,
              height: token.controlHeight,
              background: 'transparent',
              content: '""',
            },
          },
        },

        '&-content': {
          width: descriptionMaxWidth,
        },
        [`&-process ${componentCls}-item-icon`]: {
          position: 'relative',
          top: (dotSize - dotCurrentSize) / 2,
          width: dotCurrentSize,
          height: dotCurrentSize,
          lineHeight: `${dotCurrentSize}px`,
          background: 'none',
          marginInlineStart: (token.descriptionMaxWidth - dotCurrentSize) / 2,
        },
        [`&-process ${componentCls}-icon`]: {
          [`&:first-child ${componentCls}-icon-dot`]: {
            insetInlineStart: 0,
          },
        },
      },
    },
    [`&${componentCls}-vertical${componentCls}-dot`]: {
      [`${componentCls}-item-icon`]: {
        marginTop: (token.controlHeight - dotSize) / 2,
        marginInlineStart: 0,
        background: 'none',
      },
      [`${componentCls}-item-process ${componentCls}-item-icon`]: {
        marginTop: (token.controlHeight - dotCurrentSize) / 2,
        top: 0,
        insetInlineStart: (dotSize - dotCurrentSize) / 2,
        marginInlineStart: 0,
      },

      // https://github.com/ant-design/ant-design/issues/18354
      [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        top: (token.controlHeight - dotSize) / 2,
        insetInlineStart: 0,
        margin: 0,
        padding: `${dotSize + token.paddingXS}px 0 ${token.paddingXS}px`,

        '&::after': {
          marginInlineStart: (dotSize - token.lineWidth) / 2,
        },
      },

      [`&${componentCls}-small`]: {
        [`${componentCls}-item-icon`]: {
          marginTop: (token.controlHeightSM - dotSize) / 2,
        },
        [`${componentCls}-item-process ${componentCls}-item-icon`]: {
          marginTop: (token.controlHeightSM - dotCurrentSize) / 2,
        },

        [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: (token.controlHeightSM - dotSize) / 2,
        },
      },

      [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        insetInlineStart: 0,
      },
      [`${componentCls}-item-content`]: {
        width: 'inherit',
      },
    },
  };
};

export default genStepsProgressDotStyle;
