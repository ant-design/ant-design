// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  FullToken,
  genComponentStyleHook,
  GenerateStyle,
  mergeToken,
  resetComponent,
} from '../../_util/theme';

interface DescriptionsToken extends FullToken<'Descriptions'> {
  descriptionsTitleMarginBottom: number;
  descriptionsExtraColor: string;
  descriptionItemPaddingBottom: number;
  descriptionItemTrailingColon: boolean;
  descriptionsDefaultPadding: string;
  descriptionsBg: string;
  descriptionsMiddlePadding: string;
  descriptionsSmallPadding: string;
  descriptionsItemLabelColonMarginRight: number;
  descriptionsItemLabelColonMarginLeft: number;
}

const genBorderedStyle = (token: DescriptionsToken): CSSObject => {
  const {
    componentCls,
    descriptionsSmallPadding,
    descriptionsDefaultPadding,
    descriptionsMiddlePadding,
    descriptionsBg,
  } = token;
  return {
    [`&${componentCls}-bordered`]: {
      [`${componentCls}-view`]: {
        border: `1px solid ${token.colorSplit}`,
        '> table': {
          tableLayout: 'auto',
          borderCollapse: 'collapse',
        },
      },
      [`${componentCls}-item-label, ${componentCls}-item-content`]: {
        padding: descriptionsDefaultPadding,
        borderInlineEnd: `1px solid ${token.colorSplit}`,
        '&:last-child': {
          borderInlineEnd: 'none',
        },
      },
      [`${componentCls}-item-label`]: {
        backgroundColor: descriptionsBg,
        '&::after': {
          display: 'none',
        },
      },
      [`${componentCls}-row`]: {
        borderBottom: `1px solid ${token.colorSplit}`,
        '&:last-child': {
          borderBottom: 'none',
        },
      },
      [`&${componentCls}-middle`]: {
        [`${componentCls}-item-label, ${componentCls}-item-content`]: {
          padding: descriptionsMiddlePadding,
        },
      },
      [`&${componentCls}-small`]: {
        [`${componentCls}-item-label, ${componentCls}-item-content`]: {
          padding: descriptionsSmallPadding,
        },
      },
    },
  };
};

const genDescriptionStyles: GenerateStyle<DescriptionsToken> = (token: DescriptionsToken) => {
  const {
    componentCls,
    descriptionsExtraColor,
    descriptionItemPaddingBottom,
    descriptionItemTrailingColon,
    descriptionsItemLabelColonMarginRight,
    descriptionsItemLabelColonMarginLeft,
    descriptionsTitleMarginBottom,
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
        // FIXME: hardcode in v4
        marginBottom: descriptionsTitleMarginBottom,
      },
      [`${componentCls}-title`]: {
        flex: 'auto',
        overflow: 'hidden',
        color: token.colorText,
        fontWeight: 'bold',
        // FIXME: hardcode in v4
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeight,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      [`${componentCls}-extra`]: {
        marginInlineStart: 'auto',
        color: descriptionsExtraColor,
        // FIXME: hardcode in v4
        fontSize: token.fontSize,
      },
      [`${componentCls}-view`]: {
        width: '100%',
        // FIXME: hardcode in v4
        borderRadius: token.radiusBase,
        table: {
          width: '100%',
          tableLayout: 'fixed',
        },
      },
      [`${componentCls}-row`]: {
        '> th, > td': {
          // FIXME: hardcode in v4
          paddingBottom: descriptionItemPaddingBottom,
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      },
      [`${componentCls}-item-label`]: {
        color: token.colorText,
        fontWeight: 'normal',
        // FIXME: hardcode in v4
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        textAlign: `start`,

        '&::after': {
          content: descriptionItemTrailingColon ? '":"' : '" "',
          position: 'relative',
          // FIXME: hardcode in v4
          top: -0.5,
          marginInline: `${descriptionsItemLabelColonMarginLeft}px ${descriptionsItemLabelColonMarginRight}px`,
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
        // FIXME: hardcode in v4
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
            // FIXME: hardcode in v4
            paddingBottom: token.paddingSM,
          },
        },
      },
      '&-small': {
        [`${componentCls}-row`]: {
          '> th, > td': {
            // FIXME: hardcode in v4
            paddingBottom: token.paddingXS,
          },
        },
      },
    },
  };
};
// ============================== Export ==============================
export default genComponentStyleHook('Descriptions', token => {
  const descriptionsBg = '#fafafa';
  const descriptionsTitleMarginBottom = 20;
  const descriptionsExtraColor = token.colorText;
  const descriptionsSmallPadding = `${token.paddingXS}px ${token.padding}px`;
  const descriptionsDefaultPadding = `${token.padding}px ${token.paddingLG}px`;
  const descriptionsMiddlePadding = `${token.paddingSM}px ${token.paddingLG}px`;
  const descriptionItemPaddingBottom = token.padding;
  const descriptionItemTrailingColon = true;
  const descriptionsItemLabelColonMarginRight = 8;
  const descriptionsItemLabelColonMarginLeft = 2;

  const descriptionToken = mergeToken<DescriptionsToken>(token, {
    descriptionsBg,
    descriptionsTitleMarginBottom,
    descriptionsExtraColor,
    descriptionItemPaddingBottom,
    descriptionItemTrailingColon,
    descriptionsSmallPadding,
    descriptionsDefaultPadding,
    descriptionsMiddlePadding,
    descriptionsItemLabelColonMarginRight,
    descriptionsItemLabelColonMarginLeft,
  });

  return [genDescriptionStyles(descriptionToken)];
});
