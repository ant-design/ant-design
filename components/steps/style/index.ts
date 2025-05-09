import type { CSSProperties } from 'react';
import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { genFocusOutline, resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genHorizontalStyle from './horizontal';
import genIconStyle from './icon';
import genInlineStyle from './inline';
import genLabelPlacementStyle from './label-placement';
import genLegacyNavStyle from './nav';
import genPanelStyle from './panel';
import genStepsProgressStyle from './progress';
import genDotStyle from './progress-dot';
import genSmallStyle from './small';
import genStatusStyle from './status';
import genVerticalStyle from './vertical';

export interface ComponentToken {
  /**
   * @desc 描述区域最大宽度
   * @descEN Max width of description area
   */
  descriptionMaxWidth?: number;
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
   * TODO: deprecated warning since not used anymore
   * @desc 标题行高
   * @descEN Line height of title
   */
  titleLineHeight: number | string;
  // /**
  //  * @internal
  //  */
  // waitIconColor: string;
  // /**
  //  * @internal
  //  */
  // waitIconBgColor: string;
  // /**
  //  * @internal
  //  */
  // waitIconBorderColor: string;
  // /**
  //  * @internal
  //  */
  // finishIconBgColor: string;
  // /**
  //  * @internal
  //  */
  // finishIconBorderColor: string;
}

export interface StepsToken extends FullToken<'Steps'> {
  // Steps variable default.less
  // processTailColor: string;
  // Steps component less variable
  // processIconColor: string;
  // processTitleColor: string;
  // processDescriptionColor: string;
  // processIconBgColor: string;
  // processIconBorderColor: string;
  // processDotColor: string;
  // waitTitleColor: string;
  // waitDescriptionColor: string;
  // waitTailColor: string;
  // waitDotColor: string;
  // finishIconColor: string;
  // finishTitleColor: string;
  // finishDescriptionColor: string;
  // finishTailColor: string;
  // finishDotColor: string;
  // errorIconColor: string;
  // errorTitleColor: string;
  // errorDescriptionColor: string;
  // errorTailColor: string;
  // errorIconBgColor: string;
  // errorIconBorderColor: string;
  // errorDotColor: string;
  // stepsNavActiveColor: string;
  stepsProgressSize: number;
  // Steps inline variable
  inlineDotSize: number;
  // inlineTitleColor: string;
  // inlineTailColor: string;
}

// const STEP_ITEM_STATUS_WAIT = 'wait';
// const STEP_ITEM_STATUS_PROCESS = 'process';
// const STEP_ITEM_STATUS_FINISH = 'finish';
// const STEP_ITEM_STATUS_ERROR = 'error';

// type StepItemStatus =
//   | typeof STEP_ITEM_STATUS_WAIT
//   | typeof STEP_ITEM_STATUS_PROCESS
//   | typeof STEP_ITEM_STATUS_FINISH
//   | typeof STEP_ITEM_STATUS_ERROR;

const genBasicStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSize, titleLineHeight } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [componentCls]: {
      '--steps-title-font-size': token.fontSizeLG,
      '--steps-title-line-height': token.lineHeightLG,
      '--steps-subtitle-font-size': token.fontSize,
      '--steps-subtitle-line-height': token.lineHeight,
      '--steps-item-wrapper-padding-top': '0px',
      '--steps-rail-size': token.lineWidth,

      ...resetComponent(token),

      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',

      [itemCls]: {
        flex: 'none',
        position: 'relative',
      },

      [`${itemCls}-wrapper`]: {
        display: 'flex',
        flexWrap: 'nowrap',
        paddingTop: `var(--steps-item-wrapper-padding-top)`,
      },

      // Icon
      // Check `./icon.ts`

      // Header
      [`${itemCls}-header`]: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
      },

      // >>> Title
      [`${itemCls}-title`]: {
        color: token.colorText,
        fontSize: `var(--steps-title-font-size)`,
        lineHeight: `var(--steps-title-line-height)`,
      },

      // >>> Sub Title
      [`${itemCls}-subtitle`]: {
        color: token.colorTextDescription,
        fontWeight: 'normal',
        fontSize: `var(--steps-subtitle-font-size)`,
        lineHeight: `var(--steps-subtitle-line-height)`,
        marginInlineStart: token.marginXS,
      },

      // Description
      [`${itemCls}-description`]: {
        color: token.colorTextDescription,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
      },

      // Motion
      [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-description, ${itemCls}-rail`]: {
        transition: `all ${token.motionDurationSlow}`,
      },

      // ========================== Ellipsis ==========================
      [`&${componentCls}-ellipsis`]: {
        [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-description`]: textEllipsis,
      },

      // ========================= Clickable ==========================
      [`${itemCls}:not(${itemCls}-active) ${itemCls}-wrapper[role='button']:hover`]: {
        cursor: 'pointer',

        // [`${itemCls}-icon`]: {
        //   borderColor: token.colorPrimary,
        //   color: token.colorPrimary,
        // },

        // [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-description`]: {
        //   color: token.colorPrimary,
        // },
      },
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
  navContentMaxWidth: 'unset',
  descriptionMaxWidth: undefined, // should be `undefined` to create css var
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
      // processIconColor: colorTextLightSolid,
      // processTitleColor: colorText,
      // processDescriptionColor: colorText,
      // processIconBgColor: colorPrimary,
      // processIconBorderColor: colorPrimary,
      // processDotColor: colorPrimary,
      // processTailColor: colorPrimary,
      // waitTitleColor: colorTextDescription,
      // waitDescriptionColor: colorTextDescription,
      // waitTailColor: colorSplit,
      // waitDotColor: colorTextDisabled,
      // finishIconColor: colorPrimary,
      // finishTitleColor: colorText,
      // finishDescriptionColor: colorTextDescription,
      // finishTailColor: colorPrimary,
      // finishDotColor: colorPrimary,
      // errorIconColor: colorTextLightSolid,
      // errorTitleColor: colorError,
      // errorDescriptionColor: colorError,
      // errorTailColor: colorError,
      // errorIconBgColor: colorError,
      // errorIconBorderColor: colorError,
      // errorDotColor: colorError,
      // stepsNavActiveColor: colorPrimary,
      stepsProgressSize: controlHeightLG,
      // Steps inline variable
      inlineDotSize: 6,
      // inlineTitleColor: colorTextQuaternary,
      // inlineTailColor: colorBorderSecondary,
      // inlineTailColor: undefined,
    });

    return [
      genBasicStyle(stepsToken),
      genIconStyle(stepsToken),
      genVerticalStyle(stepsToken),
      genHorizontalStyle(stepsToken),
      genLabelPlacementStyle(stepsToken),
      genSmallStyle(stepsToken),
      genDotStyle(stepsToken),
      genStatusStyle(stepsToken),
      genLegacyNavStyle(stepsToken),
      genPanelStyle(stepsToken),
      genInlineStyle(stepsToken),
      genStepsProgressStyle(stepsToken),
    ];
  },
  prepareComponentToken,
);
