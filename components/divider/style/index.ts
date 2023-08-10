import type { CSSObject } from '@ant-design/cssinjs';
import type { CSSProperties } from 'react';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

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

interface DividerToken extends FullToken<'Divider'> {
  sizePaddingEdgeHorizontal: number;
  dividerHorizontalWithTextGutterMargin: number;
  dividerHorizontalGutterMargin: number;
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
      borderBlockStart: `${lineWidth}px solid ${colorSplit}`,

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
        borderInlineStart: `${lineWidth}px solid ${colorSplit}`,
      },

      '&-horizontal': {
        display: 'flex',
        clear: 'both',
        width: '100%',
        minWidth: '100%', // Fix https://github.com/ant-design/ant-design/issues/10914
        margin: `${token.dividerHorizontalGutterMargin}px 0`,
      },

      [`&-horizontal${componentCls}-with-text`]: {
        display: 'flex',
        alignItems: 'center',
        margin: `${token.dividerHorizontalWithTextGutterMargin}px 0`,
        color: token.colorTextHeading,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderBlockStart: `0 ${colorSplit}`,

        '&::before, &::after': {
          position: 'relative',
          width: '50%',
          borderBlockStart: `${lineWidth}px solid transparent`,
          // Chrome not accept `inherit` in `border-top`
          borderBlockStartColor: 'inherit',
          borderBlockEnd: 0,
          transform: 'translateY(50%)',
          content: "''",
        },
      },

      [`&-horizontal${componentCls}-with-text-left`]: {
        '&::before': {
          width: `${orientationMargin * 100}%`,
        },

        '&::after': {
          width: `${100 - orientationMargin * 100}%`,
        },
      },

      [`&-horizontal${componentCls}-with-text-right`]: {
        '&::before': {
          width: `${100 - orientationMargin * 100}%`,
        },

        '&::after': {
          width: `${orientationMargin * 100}%`,
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
        borderWidth: `${lineWidth}px 0 0`,
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

      [`&-plain${componentCls}-with-text`]: {
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
      },

      [`&-horizontal${componentCls}-with-text-left${componentCls}-no-default-orientation-margin-left`]:
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

      [`&-horizontal${componentCls}-with-text-right${componentCls}-no-default-orientation-margin-right`]:
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

// ============================== Export ==============================
export default genComponentStyleHook(
  'Divider',
  (token) => {
    const dividerToken = mergeToken<DividerToken>(token, {
      dividerHorizontalWithTextGutterMargin: token.margin,
      dividerHorizontalGutterMargin: token.marginLG,
      sizePaddingEdgeHorizontal: 0,
    });
    return [genSharedDividerStyle(dividerToken)];
  },
  (token) => ({
    textPaddingInline: '1em',
    orientationMargin: 0.05,
    verticalMarginInline: token.marginXS,
  }),
);
