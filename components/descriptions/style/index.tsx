// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  GenerateStyle,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
} from '../../_util/theme';

interface DescriptionsToken extends DerivativeToken {
  prefixCls: string;
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
    prefixCls,
    descriptionsSmallPadding,
    descriptionsDefaultPadding,
    descriptionsMiddlePadding,
    descriptionsBg,
  } = token;
  return {
    '&-bordered': {
      [`${prefixCls}-view`]: {
        border: `1px solid ${token.colorSplit}`,
        '> table': {
          tableLayout: 'auto',
          borderCollapse: 'collapse',
        },
      },
      [`${prefixCls}-item-label, ${prefixCls}-item-content`]: {
        padding: descriptionsDefaultPadding,
        borderRight: `1px solid ${token.colorSplit}`,
        '&:last-child': {
          borderRight: 'none',
        },

        [`${prefixCls}-rtl &`]: {
          borderRight: 'none',
          borderLeft: `1px solid ${token.colorSplit}`,
          '&:last-child': {
            borderLeft: 'none',
          },
        },
      },
      [`${prefixCls}-item-label`]: {
        backgroundColor: descriptionsBg,
        '&::after': {
          display: 'none',
        },
      },
      [`${prefixCls}-row`]: {
        borderBottom: `1px solid ${token.colorSplit}`,
        '&:last-child': {
          borderBottom: 'none',
        },
      },
      [`&${prefixCls}-middle`]: {
        [`${prefixCls}-item-label, ${prefixCls}-item-content`]: {
          padding: descriptionsMiddlePadding,
        },
      },
      [`&${prefixCls}-small`]: {
        [`${prefixCls}-item-label, ${prefixCls}-item-content`]: {
          padding: descriptionsSmallPadding,
        },
      },
    },
  };
};

const genDescriptionStyles: GenerateStyle<DescriptionsToken> = (token: DescriptionsToken) => {
  const {
    prefixCls,
    descriptionsExtraColor,
    descriptionItemPaddingBottom,
    descriptionItemTrailingColon,
    descriptionsItemLabelColonMarginRight,
    descriptionsItemLabelColonMarginLeft,
    descriptionsTitleMarginBottom,
  } = token;
  return {
    [prefixCls]: {
      ...resetComponent(token),
      ...genBorderedStyle(token),
      [`${prefixCls}-rtl`]: {
        direction: 'rtl',
      },
      [`${prefixCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: descriptionsTitleMarginBottom,
      },
      [`${prefixCls}-title`]: {
        flex: 'auto',
        overflow: 'hidden',
        color: token.colorText,
        fontWeight: 'bold',
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeight,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      [`${prefixCls}-extra`]: {
        marginLeft: 'auto',
        color: descriptionsExtraColor,
        fontSize: token.fontSize,
      },
      [`${prefixCls}-view`]: {
        width: '100%',
        borderRadius: token.radiusBase,
        table: {
          width: '100%',
          tableLayout: 'fixed',
        },
      },
      [`${prefixCls}-row`]: {
        '> th, > td': {
          paddingBottom: descriptionItemPaddingBottom,
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      },
      [`${prefixCls}-item-label`]: {
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        textAlign: `start`,

        '&::after': {
          content: descriptionItemTrailingColon ? '":"' : '" "',
          position: 'relative',
          top: '-0.5px',
          margin: `0 ${descriptionsItemLabelColonMarginRight}px 0 ${descriptionsItemLabelColonMarginLeft}px`,

          [`${prefixCls}-rtl&`]: {
            margin: `0 ${descriptionsItemLabelColonMarginLeft}px 0 ${descriptionsItemLabelColonMarginRight}px`,
          },
        },

        [`&${prefixCls}-item-no-colon::after`]: {
          content: '""',
        },
      },
      [`${prefixCls}-item-no-label`]: {
        '&::after': {
          margin: 0,
          content: '""',
        },
      },
      [`${prefixCls}-item-content`]: {
        display: 'table-cell',
        flex: 1,
        color: token.colorText,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      },
      [`${prefixCls}-item`]: {
        paddingBottom: 0,
        verticalAlign: 'top',
        '&-container': {
          display: 'flex',
          [`${prefixCls}-item-label`]: {
            display: 'inline-flex',
            alignItems: 'baseline',
          },
          [`${prefixCls}-item-content`]: {
            display: 'inline-flex',
            alignItems: 'baseline',
          },
        },
      },
      [`${prefixCls}-middle`]: {
        [`${prefixCls}-row`]: {
          '> th, > td': {
            paddingBottom: token.paddingSM,
          },
        },
      },
      [`${prefixCls}-small`]: {
        [`${prefixCls}-row`]: {
          '> th, > td': {
            paddingBottom: token.paddingXS,
          },
        },
      },
    },
  };
};
// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

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

  const descriptionToken: DescriptionsToken = {
    ...token,
    prefixCls: `.${prefixCls}`,
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
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genDescriptionStyles(descriptionToken),
    ]),
    hashId,
  ];
}
