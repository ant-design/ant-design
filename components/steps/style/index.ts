import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import genHorizontalStyle from './horizontal';
import genIconStyle from './icon';
import genInlineStyle from './inline';
import genLabelPlacementStyle from './label-placement';
import genLegacyNavStyle from './nav';
import genPanelStyle from './panel';
import genStepsProgressStyle from './progress';
import genDotStyle from './progress-dot';
import genRTLStyle from './rtl';
import genSmallStyle from './small';
import genStatusStyle from './status';
import genVerticalStyle from './vertical';

export interface ComponentToken {
  /**
   * @desc 描述区域最大宽度
   * @descEN Max width of description area
   * @deprecated This value has been removed by default since v6
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
   * @deprecated Not used anymore
   */
  titleLineHeight: number | string;
}

export interface StepsToken extends FullToken<'Steps'> {
  inlineDotSize: number;
}

const genBasicStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  const itemCls = `${componentCls}-item`;
  const [varName, varRef] = genCssVar(antCls, 'cmp-steps');
  return {
    [componentCls]: {
      [varName('title-font-size')]: token.fontSizeLG,
      [varName('title-line-height')]: token.lineHeightLG,
      [varName('subtitle-font-size')]: token.fontSize,
      [varName('subtitle-line-height')]: token.lineHeight,
      [varName('item-wrapper-padding-top')]: '0px',
      [varName('rail-size')]: token.lineWidth,
      [varName('rail-line-style')]: token.lineType,

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
        paddingTop: varRef('item-wrapper-padding-top'),
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
        fontSize: varRef('title-font-size'),
        lineHeight: varRef('title-line-height'),
        wordBreak: 'break-word',
      },

      // >>> Sub Title
      [`${itemCls}-subtitle`]: {
        color: token.colorTextDescription,
        fontWeight: 'normal',
        fontSize: varRef('subtitle-font-size'),
        lineHeight: varRef('subtitle-line-height'),
        marginInlineStart: token.marginXS,
        wordBreak: 'break-word',
      },

      // Content
      [`${itemCls}-content`]: {
        color: token.colorTextDescription,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        wordBreak: 'break-word',
      },

      // Rail
      [`${itemCls}-rail`]: {
        borderStyle: varRef('rail-line-style'),
        borderWidth: 0,
      },

      // Motion
      [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content, ${itemCls}-rail`]: {
        transition: `all ${token.motionDurationSlow}`,
      },

      // ========================== Ellipsis ==========================
      [`&${componentCls}-ellipsis`]: {
        [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: textEllipsis,
      },

      // ========================= Clickable ==========================
      [`${itemCls}[role='button']:not(${itemCls}-active):hover`]: {
        cursor: 'pointer',
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
    const stepsToken = mergeToken<StepsToken>(token, {
      inlineDotSize: 6,
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
      genRTLStyle(stepsToken),
    ];
  },
  prepareComponentToken,
);
