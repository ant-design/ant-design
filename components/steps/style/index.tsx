// import '../../style/index.less';
// import './index.less';

// style dependencies
// deps-lint-skip: grid
// import '../../progress/style';
import { TinyColor } from '@ctrl/tinycolor';
import { CSSObject } from '@ant-design/cssinjs';
import { resetComponent, FullToken, genComponentStyleHook, mergeToken } from '../../_util/theme';
import genStepsCustomIconStyle from './custom-icon';
import genStepsSmallStyle from './small';
import genStepsVerticalStyle from './vertical';
import genStepsLabelPlacementStyle from './label-placement';
import genStepsProgressDotStyle from './progress-dot';
import genStepsProgressStyle from './progress';
import genStepsNavStyle from './nav';
import genStepsRTLStyle from './rtl';

export const withPx = (size: number) => `${size}px`;

export interface StepsToken extends FullToken<'Steps'> {
  // Steps variable default.less
  processTailColor: string;
  stepsNavArrowColor: string;
  stepsBackground: string;
  stepsIconSize: number;
  stepsIconCustomSize: number;
  stepsIconCustomTop: number;
  stepsIconCustomFontSize: number;
  stepsIconTop: number;
  stepsIconFontSize: number;
  stepsIconMargin: string;
  stepsTitleLineHeight: number;
  stepsSmallIconSize: number;
  stepsSmallIconMargin: string;
  stepsDotSize: number;
  stepsDotTop: number;
  stepsCurrentDotSize: number;
  stepsDescriptionMaxWidth: number;
  stepsNavContentMaxWidth: string;
  stepsVerticalIconWidth: number;
  stepsVerticalTailWidth: number;
  stepsVerticalTailWidthSm: number;
  // Steps component less variable
  processIconColor: string;
  processTitleColor: string;
  processDescriptionColor: string;
  processIconTextColor: string;
  waitIconColor: string;
  waitTitleColor: string;
  waitDescriptionColor: string;
  waitTailColor: string;
  finishIconColor: string;
  finishTitleColor: string;
  finishDescriptionColor: string;
  finishTailColor: string;
  errorIconColor: string;
  errorTitleColor: string;
  errorDescriptionColor: string;
  errorTailColor: string;
  stepsNavActiveColor: string;
}

enum StepItemStatusEnum {
  wait = 'wait',
  process = 'process',
  finish = 'finish',
  error = 'error',
}

const genStepsItemStatusStyle = (status: StepItemStatusEnum, token: StepsToken): CSSObject => {
  const prefix = `${token.componentCls}-item`;
  const iconColorKey: keyof StepsToken = `${status}IconColor`;
  const titleColorKey: keyof StepsToken = `${status}TitleColor`;
  const descriptionColorKey: keyof StepsToken = `${status}DescriptionColor`;
  const tailColorKey: keyof StepsToken = `${status}TailColor`;
  const stepsBackground = '#fff';
  return {
    [`${prefix}-${status} ${prefix}-icon`]: {
      backgroundColor: stepsBackground,
      borderColor: token[iconColorKey],
      [`> ${token.componentCls}-icon`]: {
        color: token[iconColorKey],
        [`${token.componentCls}-icon-dot`]: {
          background: token[iconColorKey],
        },
      },
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-content > ${prefix}-title`]: {
      color: token[titleColorKey],

      '&::after': {
        backgroundColor: token[tailColorKey],
      },
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-content > ${prefix}-description`]: {
      color: token[descriptionColorKey],
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-tail::after`]: {
      backgroundColor: token[tailColorKey],
    },
  };
};

const genStepsItemStyle = (token: StepsToken): CSSObject => {
  const { componentCls } = token;
  const stepsItemCls = `${componentCls}-item`; // .ant-steps-item

  return {
    [stepsItemCls]: {
      position: 'relative',
      display: 'inline-block',
      flex: 1,
      overflow: 'hidden',
      verticalAlign: 'top',
      '&:last-child': {
        flex: 'none',
        [`> ${stepsItemCls}-container > ${stepsItemCls}-tail, > ${stepsItemCls}-container >  ${stepsItemCls}-content > ${stepsItemCls}-title::after`]:
          {
            display: 'none',
          },
      },
    },
    [`${stepsItemCls}-container`]: {
      outline: 'none',
    },
    [`${stepsItemCls}-icon, ${stepsItemCls}-content`]: {
      display: 'inline-block',
      verticalAlign: 'top',
    },
    [`${stepsItemCls}-icon`]: {
      width: token.stepsIconSize,
      height: token.stepsIconSize,
      margin: token.stepsIconMargin,
      fontSize: token.stepsIconFontSize,
      fontFamily: token.fontFamily,
      lineHeight: `${token.stepsIconSize}px`,
      textAlign: 'center',
      border: `${token.controlLineWidth}px ${token.controlLineType} ${new TinyColor('#000')
        .setAlpha(0.25)
        .toRgbString()}`,
      borderRadius: token.stepsIconSize,
      transition: 'background-color 0.3s, border-color 0.3s',
      [`${componentCls}-icon`]: {
        position: 'relative',
        top: token.stepsIconTop,
        color: token.colorPrimary,
        lineHeight: 1,
      },
    },
    [`${stepsItemCls}-tail`]: {
      position: 'absolute',
      top: 12,
      left: 0,
      width: '100%',
      padding: '0 10px',

      '&::after': {
        display: 'inline-block',
        width: '100%',
        height: 1,
        background: token.colorSplit,
        borderRadius: 1,
        transition: 'background 0.3s',
        content: '""',
      },
    },
    [`${stepsItemCls}-title`]: {
      position: 'relative',
      display: 'inline-block',
      paddingRight: 16,
      color: token.colorText,
      fontSize: token.fontSizeLG,
      lineHeight: `${token.stepsTitleLineHeight}px`,

      '&::after': {
        position: 'absolute',
        top: token.stepsTitleLineHeight / 2,
        left: '100%',
        display: 'block',
        width: 9999,
        height: 1,
        background: token.processTailColor,
        content: '""',
      },
    },
    [`${stepsItemCls}-subtitle`]: {
      display: 'inline',
      marginLeft: 8,
      color: token.colorTextSecondary,
      fontWeight: 'normal',
      fontSize: token.fontSizeBase,
    },
    [`${stepsItemCls}-description`]: {
      color: token.colorTextSecondary,
      fontSize: token.fontSizeBase,
    },
    ...genStepsItemStatusStyle(StepItemStatusEnum.wait, token),
    ...genStepsItemStatusStyle(StepItemStatusEnum.process, token),
    [`${stepsItemCls}-process > ${stepsItemCls}-container > ${stepsItemCls}-icon`]: {
      background: token.processIconColor,

      [`${componentCls}-icon`]: {
        color: token.processIconTextColor,
      },
    },
    [`${stepsItemCls}-process > ${stepsItemCls}-container > ${stepsItemCls}-title`]: {
      fontWeight: 500,
    },
    ...genStepsItemStatusStyle(StepItemStatusEnum.finish, token),
    ...genStepsItemStatusStyle(StepItemStatusEnum.error, token),
    [`${stepsItemCls}${componentCls}-next-error > ${componentCls}-item-title::after`]: {
      background: token.colorError,
    },
    [`${stepsItemCls}-disabled`]: {
      cursor: 'not-allowed',
    },
  };
};

// ============================= Clickable ===========================
const genStepsClickableStyle = (token: StepsToken): CSSObject => {
  const { componentCls } = token;

  return {
    [`& ${componentCls}-item`]: {
      [`&:not(${componentCls}-item-active)`]: {
        [`& > ${componentCls}-item-container[role='button']`]: {
          cursor: 'pointer',
          [`${componentCls}-item`]: {
            [`&-title, &-subtitle, &-description, &-icon ${componentCls}-icon`]: {
              transition: 'color 0.3s',
            },
          },

          '&:hover': {
            [`${componentCls}-item`]: {
              [`&-title, &-subtitle, &-description`]: {
                color: token.colorPrimary,
              },
            },
          },
        },

        [`&:not(${componentCls}-item-process)`]: {
          [`& > ${componentCls}-item-container[role='button']:hover`]: {
            [`${componentCls}-item`]: {
              '&-icon': {
                borderColor: token.colorPrimary,

                [`${componentCls}-icon`]: {
                  color: token.colorPrimary,
                },
              },
            },
          },
        },
      },
    },
    [`&${componentCls}-horizontal:not(${componentCls}-label-vertical)`]: {
      [`${componentCls}-item`]: {
        paddingLeft: 16,
        whiteSpace: 'nowrap',

        '&:first-child': {
          paddingLeft: 0,
        },
        [`&:last-child ${componentCls}-item-title`]: {
          paddingRight: 0,
        },
        '&-tail': {
          display: 'none',
        },
        '&-description': {
          maxWidth: token.stepsDescriptionMaxWidth,
          whiteSpace: 'normal',
        },
      },
    },
  };
};

const genStepsStyle = (token: StepsToken): CSSObject => {
  const { componentCls } = token; // .ant-steps

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      width: '100%',
      fontSize: 0,
      textAlign: 'initial',
      // single Item
      ...genStepsItemStyle(token),
      // Clickable
      ...genStepsClickableStyle(token),
      // custom-icon
      ...genStepsCustomIconStyle(token),
      // small
      ...genStepsSmallStyle(token),
      // vertical
      ...genStepsVerticalStyle(token),
      // label-placement
      ...genStepsLabelPlacementStyle(token),
      // progress-dot
      ...genStepsProgressDotStyle(token),
      // nav
      ...genStepsNavStyle(token),
      // rtl
      ...genStepsRTLStyle(token),
      // progress
      ...genStepsProgressStyle(token),
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Steps', token => {
  const stepsIconSize = 32;
  const processTailColor = token.colorSplit;
  const processIconColor = token.colorPrimary;

  const stepsToken = mergeToken<StepsToken>(token, {
    // Steps variable default.less
    processTailColor,
    stepsNavArrowColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), //  fade(@black, 25%),
    stepsBackground: token.colorBgComponent,
    stepsIconSize,
    stepsIconCustomSize: stepsIconSize,
    stepsIconCustomTop: 0,
    stepsIconCustomFontSize: 24,
    stepsIconTop: -0.5,
    stepsIconFontSize: token.fontSizeLG,
    stepsIconMargin: '0 8px 0 0',
    stepsTitleLineHeight: 32, // @height-base: 32px FIXME: use token.controlHeight?
    stepsSmallIconSize: 24,
    stepsSmallIconMargin: '0 8px 0 0',
    stepsDotSize: 8,
    stepsDotTop: 2,
    stepsCurrentDotSize: 10,
    stepsDescriptionMaxWidth: 140,
    stepsNavContentMaxWidth: 'auto',
    stepsVerticalIconWidth: 16,
    stepsVerticalTailWidth: 16,
    stepsVerticalTailWidthSm: 12,
    // Steps component less variable
    processIconColor,
    processTitleColor: new TinyColor('#000').setAlpha(0.85).toRgbString(), // @heading-color: fade(@black, 85%)
    processDescriptionColor: token.colorText,
    processIconTextColor: '#fff',
    waitIconColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // @disabled-color
    waitTitleColor: token.colorTextSecondary,
    waitDescriptionColor: token.colorTextSecondary,
    waitTailColor: processTailColor,
    finishIconColor: processIconColor,
    finishTitleColor: token.colorText,
    finishDescriptionColor: token.colorTextSecondary,
    finishTailColor: token.colorPrimary,
    errorIconColor: token.colorError,
    errorTitleColor: token.colorError,
    errorDescriptionColor: token.colorError,
    errorTailColor: processTailColor,
    stepsNavActiveColor: token.colorPrimary,
  });

  return [genStepsStyle(stepsToken)];
});
