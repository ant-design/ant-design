import { type CSSObject, unit } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  /**
   * @desc 标签背景色
   * @descEN Background color of label
   */
  labelBg: string;
  /**
   * @desc 标题文字颜色
   * @descEN Text color of title
   */
  titleColor: string;
  /**
   * @desc 标题下间距
   * @descEN Bottom margin of title
   */
  titleMarginBottom: number;
  /**
   * @desc 子项下间距
   * @descEN Bottom padding of item
   */
  itemPaddingBottom: number;
  /**
   * @desc 冒号右间距
   * @descEN Right margin of colon
   */
  colonMarginRight: number;
  /**
   * @desc 冒号左间距
   * @descEN Left margin of colon
   */
  colonMarginLeft: number;
  /**
   * @desc 内容区域文字颜色
   * @descEN Text color of content
   */
  contentColor: string;
  /**
   * @desc 额外区域文字颜色
   * @descEN Text color of extra area
   */
  extraColor: string;
}

interface DescriptionsToken extends FullToken<'Descriptions'> {}

const genBorderedStyle = (token: DescriptionsToken): CSSObject => {
  const { componentCls, labelBg } = token;
  return {
    [`&${componentCls}-bordered`]: {
      [`> ${componentCls}-view`]: {
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        '> table': {
          tableLayout: 'auto',
        },
        [`${componentCls}-row`]: {
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
          '&:last-child': {
            borderBottom: 'none',
          },
          [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
            padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
            borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            '&:last-child': {
              borderInlineEnd: 'none',
            },
          },
          [`> ${componentCls}-item-label`]: {
            color: token.colorTextSecondary,
            backgroundColor: labelBg,
            '&::after': {
              display: 'none',
            },
          },
        },
      },
      [`&${componentCls}-middle`]: {
        [`${componentCls}-row`]: {
          [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
            padding: `${unit(token.paddingSM)} ${unit(token.paddingLG)}`,
          },
        },
      },
      [`&${componentCls}-small`]: {
        [`${componentCls}-row`]: {
          [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
            padding: `${unit(token.paddingXS)} ${unit(token.padding)}`,
          },
        },
      },
    },
  };
};

const genDescriptionStyles: GenerateStyle<DescriptionsToken> = (token) => {
  const {
    componentCls,
    extraColor,
    itemPaddingBottom,
    colonMarginRight,
    colonMarginLeft,
    titleMarginBottom,
  } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genBorderedStyle(token),
      [`&-rtl`]: {
        direction: 'rtl',
      },
      [`${componentCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: titleMarginBottom,
      },
      [`${componentCls}-title`]: {
        ...textEllipsis,
        flex: 'auto',
        color: token.titleColor,
        fontWeight: token.fontWeightStrong,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG,
      },
      [`${componentCls}-extra`]: {
        marginInlineStart: 'auto',
        color: extraColor,
        fontSize: token.fontSize,
      },
      [`${componentCls}-view`]: {
        width: '100%',
        borderRadius: token.borderRadiusLG,
        table: {
          width: '100%',
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
        },
      },
      [`${componentCls}-row`]: {
        '> th, > td': {
          paddingBottom: itemPaddingBottom,
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      },
      [`${componentCls}-item-label`]: {
        color: token.colorTextTertiary,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        textAlign: 'start',

        '&::after': {
          content: '":"',
          position: 'relative',
          top: -0.5, // magic for position
          marginInline: `${unit(colonMarginLeft)} ${unit(colonMarginRight)}`,
        },

        [`&${componentCls}-item-no-colon::after`]: {
          content: '""',
        },
      },
      [`${componentCls}-item-no-label`]: {
        '&::after': {
          margin: 0,
          content: '""',
        },
      },
      [`${componentCls}-item-content`]: {
        display: 'table-cell',
        flex: 1,
        color: token.contentColor,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      },
      [`${componentCls}-item`]: {
        paddingBottom: 0,
        verticalAlign: 'top',
        '&-container': {
          display: 'flex',
          [`${componentCls}-item-label`]: {
            display: 'inline-flex',
            alignItems: 'baseline',
          },
          [`${componentCls}-item-content`]: {
            display: 'inline-flex',
            alignItems: 'baseline',
          },
        },
      },
      '&-middle': {
        [`${componentCls}-row`]: {
          '> th, > td': {
            paddingBottom: token.paddingSM,
          },
        },
      },
      '&-small': {
        [`${componentCls}-row`]: {
          '> th, > td': {
            paddingBottom: token.paddingXS,
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Descriptions'> = (token) => ({
  labelBg: token.colorFillAlter,
  titleColor: token.colorText,
  titleMarginBottom: token.fontSizeSM * token.lineHeightSM,
  itemPaddingBottom: token.padding,
  colonMarginRight: token.marginXS,
  colonMarginLeft: token.marginXXS / 2,
  contentColor: token.colorText,
  extraColor: token.colorText,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Descriptions',
  (token) => {
    const descriptionToken = mergeToken<DescriptionsToken>(token, {});
    return genDescriptionStyles(descriptionToken);
  },
  prepareComponentToken,
);
