import type { CSSObject } from '@ant-design/cssinjs';
import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsInlineStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, inlineDotSize, inlineTitleColor, inlineTailColor } = token;
  const containerPaddingTop = token.paddingXS + token.lineWidth;
  const titleStyle = {
    [`${componentCls}-item-container ${componentCls}-item-content ${componentCls}-item-title`]: {
      color: inlineTitleColor,
    },
  };

  return {
    [`&${componentCls}-inline`]: {
      width: 'auto',
      display: 'inline-flex',

      [`${componentCls}-item`]: {
        flex: 'none',

        '&-container': {
          padding: `${containerPaddingTop}px ${token.paddingXXS}px 0`,
          margin: `0 ${token.marginXXS / 2}px`,
          borderRadius: token.borderRadiusSM,
          cursor: 'pointer',
          transition: `background-color ${token.motionDurationMid}`,
          '&:hover': {
            background: token.controlItemBgHover,
          },
          [`&[role='button']:hover`]: {
            opacity: 1,
          },
        },

        '&-icon': {
          width: inlineDotSize,
          height: inlineDotSize,
          marginInlineStart: `calc(50% - ${inlineDotSize / 2}px)`,
          [`> ${componentCls}-icon`]: {
            top: 0,
          },
          [`${componentCls}-icon-dot`]: {
            borderRadius: token.fontSizeSM / 4,
          },
        },

        '&-content': {
          width: 'auto',
          marginTop: token.marginXS - token.lineWidth,
        },
        '&-title': {
          color: inlineTitleColor,
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          fontWeight: 'normal',
          marginBottom: token.marginXXS / 2,
        },
        '&-description': {
          display: 'none',
        },

        '&-tail': {
          marginInlineStart: 0,
          top: containerPaddingTop + inlineDotSize / 2,
          transform: `translateY(-50%)`,
          '&:after': {
            width: '100%',
            height: token.lineWidth,
            borderRadius: 0,
            marginInlineStart: 0,
            background: inlineTailColor,
          },
        },

        [`&:first-child ${componentCls}-item-tail`]: {
          width: '50%',
          marginInlineStart: '50%',
        },
        [`&:last-child ${componentCls}-item-tail`]: {
          display: 'block',
          width: '50%',
        },

        '&-wait': {
          [`${componentCls}-item-icon ${componentCls}-icon ${componentCls}-icon-dot`]: {
            backgroundColor: token.colorBorderBg,
            border: `${token.lineWidth}px ${token.lineType} ${inlineTailColor}`,
          },
          ...titleStyle,
        },
        '&-finish': {
          [`${componentCls}-item-tail::after`]: {
            backgroundColor: inlineTailColor,
          },
          [`${componentCls}-item-icon ${componentCls}-icon ${componentCls}-icon-dot`]: {
            backgroundColor: inlineTailColor,
            border: `${token.lineWidth}px ${token.lineType} ${inlineTailColor}`,
          },
          ...titleStyle,
        },
        '&-error': titleStyle,
        '&-active, &-process': {
          [`${componentCls}-item-icon`]: {
            width: inlineDotSize,
            height: inlineDotSize,
            marginInlineStart: `calc(50% - ${inlineDotSize / 2}px)`,
            top: 0,
          },
          ...titleStyle,
        },

        [`&:not(${componentCls}-item-active) > ${componentCls}-item-container[role='button']:hover`]:
          {
            [`${componentCls}-item-title`]: {
              color: inlineTitleColor,
            },
          },
      },
    },
  };
};

export default genStepsInlineStyle;
