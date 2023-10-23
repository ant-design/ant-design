import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent, resetIcon, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 列表宽度
   * @descEN Width of list
   */
  listWidth: number;
  /**
   * @desc 大号列表宽度
   * @descEN Width of large list
   */
  listWidthLG: number;
  /**
   * @desc 列表高度
   * @descEN Height of list
   */
  listHeight: number;
  /**
   * @desc 列表项高度
   * @descEN Height of list item
   */
  itemHeight: number;
  /**
   * @desc 列表项纵向内边距
   * @descEN Vertical padding of list item
   */
  itemPaddingBlock: number;
  /**
   * @desc 顶部高度
   * @descEN Height of header
   */
  headerHeight: number;
}

interface TransferToken extends FullToken<'Transfer'> {
  transferHeaderVerticalPadding: number;
}

const genTransferCustomizeStyle: GenerateStyle<TransferToken> = (
  token: TransferToken,
): CSSObject => {
  const { antCls, componentCls, listHeight, controlHeightLG, marginXXS, margin } = token;

  const tableCls = `${antCls}-table`;
  const inputCls = `${antCls}-input`;

  return {
    [`${componentCls}-customize-list`]: {
      [`${componentCls}-list`]: {
        flex: '1 1 50%',
        width: 'auto',
        height: 'auto',
        minHeight: listHeight,
      },

      // =================== Hook Components ===================
      [`${tableCls}-wrapper`]: {
        [`${tableCls}-small`]: {
          border: 0,
          borderRadius: 0,

          [`${tableCls}-selection-column`]: {
            width: controlHeightLG,
            minWidth: controlHeightLG,
          },
        },

        [`${tableCls}-pagination${tableCls}-pagination`]: {
          margin: `${margin}px 0 ${marginXXS}px`,
        },
      },

      [`${inputCls}[disabled]`]: {
        backgroundColor: 'transparent',
      },
    },
  };
};

const genTransferStatusColor = (token: TransferToken, color: string): CSSObject => {
  const { componentCls, colorBorder } = token;
  return {
    [`${componentCls}-list`]: {
      borderColor: color,

      '&-search:not([disabled])': {
        borderColor: colorBorder,
      },
    },
  };
};

const genTransferStatusStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}-status-error`]: {
      ...genTransferStatusColor(token, token.colorError),
    },
    [`${componentCls}-status-warning`]: {
      ...genTransferStatusColor(token, token.colorWarning),
    },
  };
};

const genTransferListStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const {
    componentCls,
    colorBorder,
    colorSplit,
    lineWidth,
    itemHeight,
    headerHeight,
    transferHeaderVerticalPadding,
    itemPaddingBlock,
    controlItemBgActive,
    colorTextDisabled,
    listHeight,
    listWidth,
    listWidthLG,
    fontSizeIcon,
    marginXS,
    paddingSM,
    lineType,
    antCls,
    iconCls,
    motionDurationSlow,
    controlItemBgHover,
    borderRadiusLG,
    colorBgContainer,
    colorText,
    controlItemBgActiveHover,
  } = token;

  return {
    display: 'flex',
    flexDirection: 'column',
    width: listWidth,
    height: listHeight,
    border: `${lineWidth}px ${lineType} ${colorBorder}`,
    borderRadius: token.borderRadiusLG,

    '&-with-pagination': {
      width: listWidthLG,
      height: 'auto',
    },

    '&-search': {
      [`${iconCls}-search`]: {
        color: colorTextDisabled,
      },
    },

    '&-header': {
      display: 'flex',
      flex: 'none',
      alignItems: 'center',
      height: headerHeight,
      // border-top is on the transfer dom. We should minus 1px for this
      padding: `${
        transferHeaderVerticalPadding - lineWidth
      }px ${paddingSM}px ${transferHeaderVerticalPadding}px`,
      color: colorText,
      background: colorBgContainer,
      borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      borderRadius: `${borderRadiusLG}px ${borderRadiusLG}px 0 0`,

      '> *:not(:last-child)': {
        marginInlineEnd: 4, // This is magic and fixed number, DO NOT use token since it may change.
      },

      '> *': {
        flex: 'none',
      },

      '&-title': {
        ...textEllipsis,
        flex: 'auto',
        textAlign: 'end',
      },

      '&-dropdown': {
        ...resetIcon(),

        fontSize: fontSizeIcon,
        transform: 'translateY(10%)',
        cursor: 'pointer',

        '&[disabled]': {
          cursor: 'not-allowed',
        },
      },
    },

    '&-body': {
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',
      fontSize: token.fontSize,
      // https://blog.csdn.net/qq449245884/article/details/107373672/
      minHeight: 0,

      '&-search-wrapper': {
        position: 'relative',
        flex: 'none',
        padding: paddingSM,
      },
    },

    '&-content': {
      flex: 'auto',
      margin: 0,
      padding: 0,
      overflow: 'auto',
      listStyle: 'none',

      '&-item': {
        display: 'flex',
        alignItems: 'center',
        minHeight: itemHeight,
        padding: `${itemPaddingBlock}px ${paddingSM}px`,
        transition: `all ${motionDurationSlow}`,

        '> *:not(:last-child)': {
          marginInlineEnd: marginXS,
        },

        '> *': {
          flex: 'none',
        },

        '&-text': {
          ...textEllipsis,
          flex: 'auto',
        },

        '&-remove': {
          position: 'relative',
          color: colorBorder,

          cursor: 'pointer',
          transition: `all ${motionDurationSlow}`,

          '&:hover': {
            color: token.colorLinkHover,
          },

          '&::after': {
            position: 'absolute',
            inset: `-${itemPaddingBlock}px -50%`,
            content: '""',
          },
        },

        [`&:not(${componentCls}-list-content-item-disabled)`]: {
          '&:hover': {
            backgroundColor: controlItemBgHover,
            cursor: 'pointer',
          },

          [`&${componentCls}-list-content-item-checked:hover`]: {
            backgroundColor: controlItemBgActiveHover,
          },
        },

        '&-checked': {
          backgroundColor: controlItemBgActive,
        },

        '&-disabled': {
          color: colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      // Do not change hover style when `oneWay` mode
      [`&-show-remove ${componentCls}-list-content-item:not(${componentCls}-list-content-item-disabled):hover`]:
        {
          background: 'transparent',
          cursor: 'default',
        },
    },

    '&-pagination': {
      padding: `${token.paddingXS}px 0`,
      textAlign: 'end',
      borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,

      [`${antCls}-pagination-options`]: {
        paddingInlineEnd: token.paddingXS,
      },
    },

    '&-body-not-found': {
      flex: 'none',
      width: '100%',
      margin: 'auto 0',
      color: colorTextDisabled,
      textAlign: 'center',
    },

    '&-footer': {
      borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
    },

    // fix: https://github.com/ant-design/ant-design/issues/44489
    '&-checkbox': {
      lineHeight: 1,
    },
  };
};

const genTransferStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const {
    antCls,
    iconCls,
    componentCls,
    headerHeight,
    marginXS,
    marginXXS,
    fontSizeIcon,
    fontSize,
    lineHeight,
    colorBgContainerDisabled,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',

      [`${componentCls}-disabled`]: {
        [`${componentCls}-list`]: {
          background: colorBgContainerDisabled,
        },
      },

      [`${componentCls}-list`]: genTransferListStyle(token),

      [`${componentCls}-operation`]: {
        display: 'flex',
        flex: 'none',
        flexDirection: 'column',
        alignSelf: 'center',
        margin: `0 ${marginXS}px`,
        verticalAlign: 'middle',

        [`${antCls}-btn`]: {
          display: 'block',

          '&:first-child': {
            marginBottom: marginXXS,
          },

          [iconCls]: {
            fontSize: fontSizeIcon,
          },
        },
      },

      [`${antCls}-empty-image`]: {
        maxHeight: headerHeight / 2 - Math.round(fontSize * lineHeight),
      },
    },
  };
};

const genTransferRTLStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Transfer',
  (token) => {
    const { fontSize, lineHeight, lineWidth, controlHeightLG } = token;
    const fontHeight = Math.round(fontSize * lineHeight);
    const transferToken = mergeToken<TransferToken>(token, {
      transferHeaderVerticalPadding: Math.ceil((controlHeightLG - lineWidth - fontHeight) / 2),
    });

    return [
      genTransferStyle(transferToken),
      genTransferCustomizeStyle(transferToken),
      genTransferStatusStyle(transferToken),
      genTransferRTLStyle(transferToken),
    ];
  },
  (token) => {
    const { fontSize, lineHeight, controlHeight, controlHeightLG } = token;
    const fontHeight = Math.round(fontSize * lineHeight);
    return {
      listWidth: 180,
      listHeight: 200,
      listWidthLG: 250,
      headerHeight: controlHeightLG,
      itemHeight: controlHeight,
      itemPaddingBlock: (controlHeight - fontHeight) / 2,
    };
  },
);
