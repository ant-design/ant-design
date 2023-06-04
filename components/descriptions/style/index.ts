import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  labelBg: string;
  titleMarginBottom: number;
  itemPaddingBottom: number;
  colonMarginRight: number;
  colonMarginLeft: number;
  extraColor: string;
}

interface DescriptionsToken extends FullToken<'Descriptions'> {}

const genBorderedStyle = (token: DescriptionsToken): CSSObject => {
  const { componentCls, labelBg } = token;
  return {
    [`&${componentCls}-bordered`]: {
      [`${componentCls}-view`]: {
        border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        '> table': {
          tableLayout: 'auto',
          borderCollapse: 'collapse',
        },
      },
      [`${componentCls}-item-label, ${componentCls}-item-content`]: {
        padding: `${token.padding}px ${token.paddingLG}px`,
        borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        '&:last-child': {
          borderInlineEnd: 'none',
        },
      },
      [`${componentCls}-item-label`]: {
        color: token.colorTextSecondary,
        backgroundColor: labelBg,
        '&::after': {
          display: 'none',
        },
      },
      [`${componentCls}-row`]: {
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        '&:last-child': {
          borderBottom: 'none',
        },
      },
      [`&${componentCls}-middle`]: {
        [`${componentCls}-item-label, ${componentCls}-item-content`]: {
          padding: `${token.paddingSM}px ${token.paddingLG}px`,
        },
      },
      [`&${componentCls}-small`]: {
        [`${componentCls}-item-label, ${componentCls}-item-content`]: {
          padding: `${token.paddingXS}px ${token.padding}px`,
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
        color: token.colorText,
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
        textAlign: `start`,

        '&::after': {
          content: '":"',
          position: 'relative',
          top: -0.5, // magic for position
          marginInline: `${colonMarginLeft}px ${colonMarginRight}px`,
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
        color: token.colorText,
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
// ============================== Export ==============================
export default genComponentStyleHook(
  'Descriptions',
  (token) => {
    const descriptionToken = mergeToken<DescriptionsToken>(token, {});
    return [genDescriptionStyles(descriptionToken)];
  },
  (token) => ({
    labelBg: token.colorFillAlter,
    titleMarginBottom: token.fontSizeSM * token.lineHeightSM,
    itemPaddingBottom: token.padding,
    colonMarginRight: token.marginXS,
    colonMarginLeft: token.marginXXS / 2,
    extraColor: token.colorText,
  }),
);
