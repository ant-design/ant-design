// deps-lint-skip-all
// import '../../style/index.less';
// import './index.less';

// style dependencies
// deps-lint-skip: grid
// import '../../progress/style';
import { TinyColor } from '@ctrl/tinycolor';
import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import genStepsCustomIconStyle from './custom-icon';
import genStepsSmallStyle from './small';
import genStepsVerticalStyle from './vertical';
import genStepsLabelPlacementStyle from './label-placement';
import genStepsProgressDotStyle from './progress-dot';
import genStepsProgressStyle from './progress';
import genStepsNavStyle from './nav';
import genStepsRTLStyle from './rtl';

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
  const stepsBackground = '#fff'; // FIXME: hardcode in v4
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

const genStepsItemStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { componentCls, motionDurationSlow } = token;
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
      // margin: token.stepsIconMargin,
      marginTop: 0, // FIXME: hardcode in v4
      marginBottom: 0, // FIXME: hardcode in v4
      marginInline: '0 8px', // FIXME: hardcode in v4
      fontSize: token.stepsIconFontSize,
      fontFamily: token.fontFamily,
      lineHeight: `${token.stepsIconSize}px`,
      textAlign: 'center',
      border: `${token.controlLineWidth}px ${token.controlLineType} ${new TinyColor('#000')
        .setAlpha(0.25)
        .toRgbString()}`, // FIXME: hardcode in v4
      borderRadius: token.stepsIconSize,
      transition: `background-color ${motionDurationSlow}, border-color ${motionDurationSlow}`,
      [`${componentCls}-icon`]: {
        position: 'relative',
        top: token.stepsIconTop,
        color: token.colorPrimary,
        lineHeight: 1,
      },
    },
    [`${stepsItemCls}-tail`]: {
      position: 'absolute',
      top: 12, // FIXME: hardcode in v4
      insetInlineStart: 0, // FIXME: hardcode in v4
      width: '100%', // FIXME: hardcode in v4
      padding: '0 10px', // FIXME: hardcode in v4

      '&::after': {
        display: 'inline-block',
        width: '100%', // FIXME: hardcode in v4
        height: 1, // FIXME: hardcode in v4
        background: token.colorSplit,
        borderRadius: 1, // FIXME: hardcode in v4
        transition: `background ${motionDurationSlow}`,
        content: '""',
      },
    },
    [`${stepsItemCls}-title`]: {
      position: 'relative',
      display: 'inline-block',
      paddingInlineEnd: 16, // FIXME: hardcode in v4
      color: token.colorText,
      fontSize: token.fontSizeLG,
      lineHeight: `${token.stepsTitleLineHeight}px`,

      '&::after': {
        position: 'absolute',
        top: token.stepsTitleLineHeight / 2,
        insetInlineStart: '100%', // FIXME: hardcode in v4
        display: 'block',
        width: 9999, // FIXME: hardcode in v4
        height: 1, // FIXME: hardcode in v4
        background: token.processTailColor,
        content: '""',
      },
    },
    [`${stepsItemCls}-subtitle`]: {
      display: 'inline',
      marginInlineStart: 8, // FIXME: hardcode in v4
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
      fontWeight: 500, // FIXME: hardcode in v4
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
const genStepsClickableStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { componentCls, motionDurationSlow } = token;

  return {
    [`& ${componentCls}-item`]: {
      [`&:not(${componentCls}-item-active)`]: {
        [`& > ${componentCls}-item-container[role='button']`]: {
          cursor: 'pointer',
          [`${componentCls}-item`]: {
            [`&-title, &-subtitle, &-description, &-icon ${componentCls}-icon`]: {
              transition: `color ${motionDurationSlow}`,
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
        paddingInlineStart: 16, // FIXME: hardcode in v4
        whiteSpace: 'nowrap',

        '&:first-child': {
          paddingInlineStart: 0, // FIXME: hardcode in v4
        },
        [`&:last-child ${componentCls}-item-title`]: {
          paddingInlineEnd: 0, // FIXME: hardcode in v4
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

const genStepsStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { componentCls } = token; // .ant-steps

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      width: '100%',
      fontSize: 0, // FIXME: hardcode in v4
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
  const stepsIconSize = 32; // FIXME: hardcode in v4
  const processTailColor = token.colorSplit;
  const processIconColor = token.colorPrimary;

  const stepsToken = mergeToken<StepsToken>(token, {
    // Steps variable default.less
    processTailColor,
    stepsNavArrowColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), //  fade(@black, 25%),
    stepsBackground: token.colorBgComponent,
    stepsIconSize,
    stepsIconCustomSize: stepsIconSize,
    stepsIconCustomTop: 0, // FIXME: hardcode in v4
    stepsIconCustomFontSize: 24, // FIXME: hardcode in v4
    stepsIconTop: -0.5, // FIXME: hardcode in v4
    stepsIconFontSize: token.fontSizeLG,
    stepsIconMargin: '0 8px 0 0', // FIXME: hardcode in v4
    stepsTitleLineHeight: 32, // FIXME: hardcode in v4
    stepsSmallIconSize: 24, // FIXME: hardcode in v4
    stepsSmallIconMargin: '0 8px 0 0', // FIXME: hardcode in v4
    stepsDotSize: 8, // FIXME: hardcode in v4
    stepsDotTop: 2, // FIXME: hardcode in v4
    stepsCurrentDotSize: 10, // FIXME: hardcode in v4
    stepsDescriptionMaxWidth: 140, // FIXME: hardcode in v4
    stepsNavContentMaxWidth: 'auto',
    stepsVerticalIconWidth: 16, // FIXME: hardcode in v4
    stepsVerticalTailWidth: 16, // FIXME: hardcode in v4
    stepsVerticalTailWidthSm: 12, // FIXME: hardcode in v4
    // Steps component less variable
    processIconColor,
    processTitleColor: new TinyColor('#000').setAlpha(0.85).toRgbString(), // @heading-color: fade(@black, 85%) FIXME: hardcode in v4
    processDescriptionColor: token.colorText,
    processIconTextColor: '#fff', // FIXME: hardcode in v4
    waitIconColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // @disabled-color FIXME: hardcode in v4
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
