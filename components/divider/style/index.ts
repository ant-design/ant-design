import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * @desc 文本横向内间距
   * @descEN Horizontal padding of text
   */
  textPaddingInline: CSSProperties['paddingInline'];
  /**
   * @desc 文本与边缘距离，取值 0 ～ 1
   * @descEN Distance between text and edge, which should be a number between 0 and 1.
   */
  orientationMargin: number;
  /**
   * @desc 纵向分割线的横向外间距
   * @descEN Horizontal margin of vertical Divider
   */
  verticalMarginInline: CSSProperties['marginInline'];
}

/**
 * @desc Divider 组件的 Token
 * @descEN Token for Divider component
 */
interface DividerToken extends FullToken<'Divider'> {
  /**
   * @desc 尺寸边距
   * @descEN Size padding edge horizontal
   */
  sizePaddingEdgeHorizontal: number | string;
  /**
   * @desc 带文本的水平分割线的外边距
   * @descEN Horizontal margin of divider with text
   */
  dividerHorizontalWithTextGutterMargin: number | string;
  /**
   * @desc 水平分割线的外边距
   * @descEN Horizontal margin of divider
   */
  dividerHorizontalGutterMargin: number | string;
}

// ============================== Shared ==============================
const genSharedDividerStyle: GenerateStyle<DividerToken> = (token): CSSObject => {
  const {
    componentCls,
    sizePaddingEdgeHorizontal,
    colorSplit,
    lineWidth,
    textPaddingInline,
    orientationMargin,
    verticalMarginInline,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      borderBlockStart: `${unit(lineWidth)} solid ${colorSplit}`,

      // vertical
      '&-vertical': {
        position: 'relative',
        top: '-0.06em',
        display: 'inline-block',
        height: '0.9em',
        marginInline: verticalMarginInline,
        marginBlock: 0,
        verticalAlign: 'middle',
        borderTop: 0,
        borderInlineStart: `${unit(lineWidth)} solid ${colorSplit}`,
      },

      '&-horizontal': {
        display: 'flex',
        clear: 'both',
        width: '100%',
        minWidth: '100%', // Fix https://github.com/ant-design/ant-design/issues/10914
        margin: `${unit(token.dividerHorizontalGutterMargin)} 0`,
      },

      [`&-horizontal${componentCls}-with-text`]: {
        display: 'flex',
        alignItems: 'center',
        margin: `${unit(token.dividerHorizontalWithTextGutterMargin)} 0`,
        color: token.colorTextHeading,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderBlockStart: `0 ${colorSplit}`,

        '&::before, &::after': {
          position: 'relative',
          width: '50%',
          borderBlockStart: `${unit(lineWidth)} solid transparent`,
          // Chrome not accept `inherit` in `border-top`
          borderBlockStartColor: 'inherit',
          borderBlockEnd: 0,
          transform: 'translateY(50%)',
          content: "''",
        },
      },

      [`&-horizontal${componentCls}-with-text-start`]: {
        '&::before': {
          width: `calc(${orientationMargin} * 100%)`,
        },
        '&::after': {
          width: `calc(100% - ${orientationMargin} * 100%)`,
        },
      },

      [`&-horizontal${componentCls}-with-text-end`]: {
        '&::before': {
          width: `calc(100% - ${orientationMargin} * 100%)`,
        },
        '&::after': {
          width: `calc(${orientationMargin} * 100%)`,
        },
      },

      [`${componentCls}-inner-text`]: {
        display: 'inline-block',
        paddingBlock: 0,
        paddingInline: textPaddingInline,
      },

      '&-dashed': {
        background: 'none',
        borderColor: colorSplit,
        borderStyle: 'dashed',
        borderWidth: `${unit(lineWidth)} 0 0`,
      },

      [`&-horizontal${componentCls}-with-text${componentCls}-dashed`]: {
        '&::before, &::after': {
          borderStyle: 'dashed none none',
        },
      },

      [`&-vertical${componentCls}-dashed`]: {
        borderInlineStartWidth: lineWidth,
        borderInlineEnd: 0,
        borderBlockStart: 0,
        borderBlockEnd: 0,
      },

      '&-dotted': {
        background: 'none',
        borderColor: colorSplit,
        borderStyle: 'dotted',
        borderWidth: `${unit(lineWidth)} 0 0`,
      },

      [`&-horizontal${componentCls}-with-text${componentCls}-dotted`]: {
        '&::before, &::after': {
          borderStyle: 'dotted none none',
        },
      },

      [`&-vertical${componentCls}-dotted`]: {
        borderInlineStartWidth: lineWidth,
        borderInlineEnd: 0,
        borderBlockStart: 0,
        borderBlockEnd: 0,
      },

      [`&-plain${componentCls}-with-text`]: {
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
      },

      [`&-horizontal${componentCls}-with-text-start${componentCls}-no-default-orientation-margin-start`]:
        {
          '&::before': {
            width: 0,
          },

          '&::after': {
            width: '100%',
          },

          [`${componentCls}-inner-text`]: {
            paddingInlineStart: sizePaddingEdgeHorizontal,
          },
        },

      [`&-horizontal${componentCls}-with-text-end${componentCls}-no-default-orientation-margin-end`]:
        {
          '&::before': {
            width: '100%',
          },

          '&::after': {
            width: 0,
          },

          [`${componentCls}-inner-text`]: {
            paddingInlineEnd: sizePaddingEdgeHorizontal,
          },
        },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Divider'> = (token) => ({
  textPaddingInline: '1em',
  orientationMargin: 0.05,
  verticalMarginInline: token.marginXS,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Divider',
  (token) => {
    const dividerToken = mergeToken<DividerToken>(token, {
      dividerHorizontalWithTextGutterMargin: token.margin,
      dividerHorizontalGutterMargin: token.marginLG,
      sizePaddingEdgeHorizontal: 0,
    });
    return [genSharedDividerStyle(dividerToken)];
  },
  prepareComponentToken,
  {
    unitless: {
      orientationMargin: true,
    },
  },
);
