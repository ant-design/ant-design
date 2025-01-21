import type { CSSProperties } from 'react';
import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { genFocusOutline, resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genStepsCustomIconStyle from './custom-icon';
import genStepsHorizontalStyle from './horizontal';
import genStepsInlineStyle from './inline';
import genStepsLabelPlacementStyle from './label-placement';
import genStepsNavStyle from './nav';
import genStepsProgressStyle from './progress';
import genStepsProgressDotStyle from './progress-dot';
import genStepsRTLStyle from './rtl';
import genStepsSmallStyle from './small';
import genStepsVerticalStyle from './vertical';

export interface ComponentToken {
  /**
   * @desc 描述区域最大宽度
   * @descEN Max width of description area
   */
  descriptionMaxWidth: number;
  /**
   * @desc 自定义图标容器尺寸
   * @descEN Size of custom icon container
   */
  customIconSize: number;
  /**
   * @desc 自定义图标 top
   * @descEN Top of custom icon
   */
  customIconTop: number;
  /**
   * @desc 自定义图标大小
   * @descEN Font size of custom icon
   */
  customIconFontSize: number;
  /**
   * @desc 图标容器尺寸
   * @descEN Size of icon container
   */
  iconSize: number;
  /**
   * @desc 图标 top
   * @descEN Top of icon
   */
  iconTop: number;
  /**
   * @desc 图标大小
   * @descEN Size of icon
   */
  iconFontSize: number;
  /**
   * @desc 点状步骤点大小
   * @descEN Size of dot
   */
  dotSize: number;
  /**
   * @desc 点状步骤点当前大小
   * @descEN Current size of dot
   */
  dotCurrentSize: number;
  /**
   * @desc 可跳转步骤条箭头颜色
   * @descEN Color of arrow in nav
   */
  navArrowColor: string;
  /**
   * @desc 可跳转步骤条内容最大宽度
   * @descEN Max width of nav content
   */
  navContentMaxWidth: CSSProperties['maxWidth'];
  /**
   * @desc 小号步骤条图标大小
   * @descEN Size of small steps icon
   */
  iconSizeSM: number;
  /**
   * @desc 标题行高
   * @descEN Line height of title
   */
  titleLineHeight: number | string;
  /**
   * @internal
   */
  waitIconColor: string;
  /**
   * @internal
   */
  waitIconBgColor: string;
  /**
   * @internal
   */
  waitIconBorderColor: string;
  /**
   * @internal
   */
  finishIconBgColor: string;
  /**
   * @internal
   */
  finishIconBorderColor: string;
}

export interface StepsToken extends FullToken<'Steps'> {
  // Steps variable default.less
  processTailColor: string;
  // Steps component less variable
  processIconColor: string;
  processTitleColor: string;
  processDescriptionColor: string;
  processIconBgColor: string;
  processIconBorderColor: string;
  processDotColor: string;
  waitTitleColor: string;
  waitDescriptionColor: string;
  waitTailColor: string;
  waitDotColor: string;
  finishIconColor: string;
  finishTitleColor: string;
  finishDescriptionColor: string;
  finishTailColor: string;
  finishDotColor: string;
  errorIconColor: string;
  errorTitleColor: string;
  errorDescriptionColor: string;
  errorTailColor: string;
  errorIconBgColor: string;
  errorIconBorderColor: string;
  errorDotColor: string;
  stepsNavActiveColor: string;
  stepsProgressSize: number;
  // Steps inline variable
  inlineDotSize: number;
  inlineTitleColor: string;
  inlineTailColor: string;
}

const STEP_ITEM_STATUS_WAIT = 'wait';
const STEP_ITEM_STATUS_PROCESS = 'process';
const STEP_ITEM_STATUS_FINISH = 'finish';
const STEP_ITEM_STATUS_ERROR = 'error';

type StepItemStatus =
  | typeof STEP_ITEM_STATUS_WAIT
  | typeof STEP_ITEM_STATUS_PROCESS
  | typeof STEP_ITEM_STATUS_FINISH
  | typeof STEP_ITEM_STATUS_ERROR;

const genStepsItemStatusStyle = (status: StepItemStatus, token: StepsToken): CSSObject => {
  const prefix = `${token.componentCls}-item`;
  const iconColorKey: keyof StepsToken = `${status}IconColor`;
  const titleColorKey: keyof StepsToken = `${status}TitleColor`;
  const descriptionColorKey: keyof StepsToken = `${status}DescriptionColor`;
  const tailColorKey: keyof StepsToken = `${status}TailColor`;
  const iconBgColorKey: keyof StepsToken = `${status}IconBgColor`;
  const iconBorderColorKey: keyof StepsToken = `${status}IconBorderColor`;
  const dotColorKey: keyof StepsToken = `${status}DotColor`;
  return {
    [`${prefix}-${status} ${prefix}-icon`]: {
      backgroundColor: token[iconBgColorKey],
      borderColor: token[iconBorderColorKey],
      [`> ${token.componentCls}-icon`]: {
        color: token[iconColorKey],
        [`${token.componentCls}-icon-dot`]: {
          background: token[dotColorKey],
        },
      },
    },
    [`${prefix}-${status}${prefix}-custom ${prefix}-icon`]: {
      [`> ${token.componentCls}-icon`]: {
        color: token[dotColorKey],
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

const genStepsItemStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, motionDurationSlow } = token;
  const stepsItemCls = `${componentCls}-item`; // .ant-steps-item
  const stepItemIconCls = `${stepsItemCls}-icon`;

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

      '&:focus-visible': {
        [stepItemIconCls]: {
          ...genFocusOutline(token),
        },
      },
    },
    [`${stepItemIconCls}, ${stepsItemCls}-content`]: {
      display: 'inline-block',
      verticalAlign: 'top',
    },
    [stepItemIconCls]: {
      width: token.iconSize,
      height: token.iconSize,
      marginTop: 0,
      marginBottom: 0,
      marginInlineStart: 0,
      marginInlineEnd: token.marginXS,
      fontSize: token.iconFontSize,
      fontFamily: token.fontFamily,
      lineHeight: unit(token.iconSize),
      textAlign: 'center',
      borderRadius: token.iconSize,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      transition: `background-color ${motionDurationSlow}, border-color ${motionDurationSlow}`,
      [`${componentCls}-icon`]: {
        position: 'relative',
        top: token.iconTop,
        color: token.colorPrimary,
        lineHeight: 1,
      },
    },
    [`${stepsItemCls}-tail`]: {
      position: 'absolute',
      top: token.calc(token.iconSize).div(2).equal(),
      insetInlineStart: 0,
      width: '100%',

      '&::after': {
        display: 'inline-block',
        width: '100%',
        height: token.lineWidth,
        background: token.colorSplit,
        borderRadius: token.lineWidth,
        transition: `background ${motionDurationSlow}`,
        content: '""',
      },
    },
    [`${stepsItemCls}-title`]: {
      position: 'relative',
      display: 'inline-block',
      paddingInlineEnd: token.padding,
      color: token.colorText,
      fontSize: token.fontSizeLG,
      lineHeight: unit(token.titleLineHeight),

      '&::after': {
        position: 'absolute',
        top: token.calc(token.titleLineHeight).div(2).equal(),
        insetInlineStart: '100%',
        display: 'block',
        width: 9999,
        height: token.lineWidth,
        background: token.processTailColor,
        content: '""',
      },
    },
    [`${stepsItemCls}-subtitle`]: {
      display: 'inline',
      marginInlineStart: token.marginXS,
      color: token.colorTextDescription,
      fontWeight: 'normal',
      fontSize: token.fontSize,
    },
    [`${stepsItemCls}-description`]: {
      color: token.colorTextDescription,
      fontSize: token.fontSize,
    },
    ...genStepsItemStatusStyle(STEP_ITEM_STATUS_WAIT, token),
    ...genStepsItemStatusStyle(STEP_ITEM_STATUS_PROCESS, token),
    [`${stepsItemCls}-process > ${stepsItemCls}-container > ${stepsItemCls}-title`]: {
      fontWeight: token.fontWeightStrong,
    },
    ...genStepsItemStatusStyle(STEP_ITEM_STATUS_FINISH, token),
    ...genStepsItemStatusStyle(STEP_ITEM_STATUS_ERROR, token),
    [`${stepsItemCls}${componentCls}-next-error > ${componentCls}-item-title::after`]: {
      background: token.colorError,
    },
    [`${stepsItemCls}-disabled`]: {
      cursor: 'not-allowed',
    },
  };
};

// ============================= Clickable ===========================
const genStepsClickableStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
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
              '&-title, &-subtitle, &-description': {
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
        paddingInlineStart: token.padding,
        whiteSpace: 'nowrap',

        '&:first-child': {
          paddingInlineStart: 0,
        },
        [`&:last-child ${componentCls}-item-title`]: {
          paddingInlineEnd: 0,
        },
        '&-tail': {
          display: 'none',
        },
        '&-description': {
          maxWidth: token.descriptionMaxWidth,
          whiteSpace: 'normal',
        },
      },
    },
  };
};

const genStepsStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
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
      // horizontal
      ...genStepsHorizontalStyle(token),
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
      // inline
      ...genStepsInlineStyle(token),
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Steps'> = (token) => ({
  titleLineHeight: token.controlHeight,
  customIconSize: token.controlHeight,
  customIconTop: 0,
  customIconFontSize: token.controlHeightSM,
  iconSize: token.controlHeight,
  iconTop: -0.5, // magic for ui experience
  iconFontSize: token.fontSize,
  iconSizeSM: token.fontSizeHeading3,
  dotSize: token.controlHeight / 4,
  dotCurrentSize: token.controlHeightLG / 4,
  navArrowColor: token.colorTextDisabled,
  navContentMaxWidth: 'auto',
  descriptionMaxWidth: 140,
  waitIconColor: token.wireframe ? token.colorTextDisabled : token.colorTextLabel,
  waitIconBgColor: token.wireframe ? token.colorBgContainer : token.colorFillContent,
  waitIconBorderColor: token.wireframe ? token.colorTextDisabled : 'transparent',
  finishIconBgColor: token.wireframe ? token.colorBgContainer : token.controlItemBgActive,
  finishIconBorderColor: token.wireframe ? token.colorPrimary : token.controlItemBgActive,
});

export default genStyleHooks(
  'Steps',
  (token) => {
    const {
      colorTextDisabled,
      controlHeightLG,
      colorTextLightSolid,
      colorText,
      colorPrimary,
      colorTextDescription,
      colorTextQuaternary,
      colorError,
      colorBorderSecondary,
      colorSplit,
    } = token;

    const stepsToken = mergeToken<StepsToken>(token, {
      // Steps component less variable
      processIconColor: colorTextLightSolid,
      processTitleColor: colorText,
      processDescriptionColor: colorText,
      processIconBgColor: colorPrimary,
      processIconBorderColor: colorPrimary,
      processDotColor: colorPrimary,
      processTailColor: colorSplit,
      waitTitleColor: colorTextDescription,
      waitDescriptionColor: colorTextDescription,
      waitTailColor: colorSplit,
      waitDotColor: colorTextDisabled,
      finishIconColor: colorPrimary,
      finishTitleColor: colorText,
      finishDescriptionColor: colorTextDescription,
      finishTailColor: colorPrimary,
      finishDotColor: colorPrimary,
      errorIconColor: colorTextLightSolid,
      errorTitleColor: colorError,
      errorDescriptionColor: colorError,
      errorTailColor: colorSplit,
      errorIconBgColor: colorError,
      errorIconBorderColor: colorError,
      errorDotColor: colorError,
      stepsNavActiveColor: colorPrimary,
      stepsProgressSize: controlHeightLG,
      // Steps inline variable
      inlineDotSize: 6,
      inlineTitleColor: colorTextQuaternary,
      inlineTailColor: colorBorderSecondary,
    });

    return [genStepsStyle(stepsToken)];
  },
  prepareComponentToken,
);
