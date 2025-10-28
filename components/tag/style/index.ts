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
}

export interface TagToken extends FullToken<'Tag'> {
  tagIconSize: number | string;
  tagPaddingHorizontal: number;
  tagHeight: number;
  tagHeightSM: number;
  tagHeightLG: number;
  tagBorderlessBg: string;
}

// ============================== Styles ==============================

const genBaseStyle = (token: TagToken): CSSInterpolation => {
  const { lineWidth, componentCls, calc } = token;
  return {
    // Result
    [componentCls]: {
      ...resetComponent(token),
      display: 'inline-flex',
      alignItems: 'center',
      gap: token.paddingXXS,
      height: token.tagHeight,
      // https://github.com/ant-design/ant-design/pull/47504
      marginInlineEnd: token.marginXS,
      paddingInline: calc(token.tagPaddingHorizontal).sub(lineWidth).equal(),
      fontSize: token.fontSizeSM,
      background: token.defaultBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusSM,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,

      // RTL
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      '&, a, a:hover': {
        color: token.defaultColor,
      },

      [`${componentCls}-close-icon`]: {
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

      // ========== Size =========
      '&-lg': {
        gap: token.paddingXS,
        fontSize: token.fontSize,
        height: token.tagHeightLG,
        paddingInline: calc(token.paddingSM).sub(lineWidth).equal(),

        [`${componentCls}-close-icon`]: {
          fontSize: token.fontSizeSM,
        },
      },

      '&-sm': {
        height: token.tagHeightSM,
        marginInlineEnd: token.marginXXS,
        paddingInline: calc(token.paddingXXS).sub(lineWidth).equal(),
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
  const { fontSizeIcon, lineWidth, calc, defaultBg } = token;
  const tagToken = mergeToken<TagToken>(token, {
    tagIconSize: calc(fontSizeIcon).sub(calc(lineWidth).mul(2)).equal(), // Tag icon is much smaller
    tagPaddingHorizontal: 8, // Fixed padding.
    tagHeightSM: 18,
    tagHeight: 22,
    tagHeightLG: 28,
    tagBorderlessBg: defaultBg,
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
