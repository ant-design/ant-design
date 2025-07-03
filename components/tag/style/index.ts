import { unit } from '@ant-design/cssinjs';
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import { resetComponent } from '../../style';
import type { FullToken, GenStyleFn, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 默认背景色
   * @descEN Default background color
   */
  defaultBg: string;
  /**
   * @desc 默认文字颜色
   * @descEN Default text color
   */
  defaultColor: string;
  /**
   * @desc 默认行高
   * @descEN Default line height
   */
  lineHeight: string | number;
  /**
   * @desc 小尺寸行高
   * @descEN Small size line height
   */
  lineHeightSM: string | number;
  /**
   * @desc 大尺寸行高
   * @descEN Large size line height
   */
  lineHeightLG: string | number;
}

export interface TagToken extends FullToken<'Tag'> {
  tagFontSize: number;
  tagIconSize: number | string;
  paddingInline: number;
  paddingInlineSM: number;
  paddingInlineLG: number;
  tagBorderlessBg: string;
}

// ============================== Styles ==============================

const genBaseStyle = (token: TagToken): CSSInterpolation => {
  const { paddingXXS, lineWidth, componentCls, calc } = token;
  const paddingInline = calc(token.paddingInline).sub(lineWidth).equal();
  const iconMarginInline = calc(paddingXXS).sub(lineWidth).equal();
  return {
    // Result
    [componentCls]: {
      ...resetComponent(token),
      display: 'inline-block',
      height: 'auto',
      // https://github.com/ant-design/ant-design/pull/47504
      marginInlineEnd: token.marginXS,
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: token.lineHeightSM,
      whiteSpace: 'nowrap',
      background: token.defaultBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusSM,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,
      textAlign: 'start',
      position: 'relative',

      // RTL
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      '&, a, a:hover': {
        color: token.defaultColor,
      },

      [`${componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        fontSize: token.tagIconSize,
        color: token.colorIcon,
        cursor: 'pointer',
        transition: `all ${token.motionDurationMid}`,

        '&:hover': {
          color: token.colorTextHeading,
        },
      },

      [`&${componentCls}-has-color`]: {
        borderColor: 'transparent',

        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid,
        },
      },

      '&-checkable': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        cursor: 'pointer',

        [`&:not(${componentCls}-checkable-checked):hover`]: {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary,
        },

        '&:active, &-checked': {
          color: token.colorTextLightSolid,
        },

        '&-checked': {
          backgroundColor: token.colorPrimary,
          '&:hover': {
            backgroundColor: token.colorPrimaryHover,
          },
        },

        '&:active': {
          backgroundColor: token.colorPrimaryActive,
        },
      },

      '&-hidden': {
        display: 'none',
      },

      '&-large': {
        fontSize: token.fontSize,
        paddingInline: token.paddingInlineLG,
      },

      '&-small': {
        fontSize: token.fontSizeSM,
        paddingInline: token.paddingInlineSM,
      },

      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline,
      },
    },
    [`${componentCls}-borderless`]: {
      borderColor: 'transparent',
      background: token.tagBorderlessBg,
    },
  };
};

// ============================== Export ==============================
export const prepareToken: (token: Parameters<GenStyleFn<'Tag'>>[0]) => TagToken = (token) => {
  const { lineWidth, fontSizeIcon, calc } = token;
  const tagFontSize = token.fontSizeSM;
  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
    tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(), // Tag icon is much smaller
    paddingInline: 8, // Fixed padding.
    paddingInlineSM: 4,
    paddingInlineLG: 12,
    tagBorderlessBg: token.defaultBg,
  });
  return tagToken;
};

export const prepareComponentToken: GetDefaultToken<'Tag'> = (token) => ({
  defaultBg: new FastColor(token.colorFillQuaternary)
    .onBackground(token.colorBgContainer)
    .toHexString(),
  defaultColor: token.colorText,
});

export default genStyleHooks<'Tag'>(
  'Tag',
  (token) => {
    const tagToken = prepareToken(token);
    return genBaseStyle(tagToken);
  },
  prepareComponentToken,
);
