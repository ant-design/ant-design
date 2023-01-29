import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent, resetIcon, textEllipsis } from '../../style';

export interface ComponentToken {
  listWidth: number;
  listWidthLG: number;
  listHeight: number;
}

interface TransferToken extends FullToken<'Transfer'> {
  transferItemHeight: number;
  transferHeaderVerticalPadding: number;
  transferItemPaddingVertical: number;
  transferHeaderHeight: number;
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
    transferItemHeight,
    transferHeaderHeight,
    transferHeaderVerticalPadding,
    transferItemPaddingVertical,
    controlItemBgActive,
    controlItemBgActiveHover,
    colorTextDisabled,
    listHeight,
    listWidth,
    listWidthLG,
    fontSizeIcon,
    marginXS,
    paddingSM,
    lineType,
    iconCls,
    motionDurationSlow,
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
      height: transferHeaderHeight,
      // border-top is on the transfer dom. We should minus 1px for this
      padding: `${
        transferHeaderVerticalPadding - lineWidth
      }px ${paddingSM}px ${transferHeaderVerticalPadding}px`,
      color: token.colorText,
      background: token.colorBgContainer,
      borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,

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
      overflow: 'hidden',
      fontSize: token.fontSize,

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
        minHeight: transferItemHeight,
        padding: `${transferItemPaddingVertical}px ${paddingSM}px`,
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
            insert: `-${transferItemPaddingVertical}px -50%`,
            content: '""',
          },
        },

        [`&:not(${componentCls}-list-content-item-disabled)`]: {
          '&:hover': {
            backgroundColor: token.controlItemBgHover,
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
  };
};

const genTransferStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const {
    antCls,
    iconCls,
    componentCls,
    transferHeaderHeight,
    marginXS,
    marginXXS,
    fontSizeIcon,
    fontSize,
    lineHeight,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',

      [`${componentCls}-disabled`]: {
        [`${componentCls}-list`]: {
          background: token.colorBgContainerDisabled,
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
        maxHeight: transferHeaderHeight / 2 - Math.round(fontSize * lineHeight),
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
    const { fontSize, lineHeight, lineWidth, controlHeightLG, controlHeight } = token;

    const fontHeight = Math.round(fontSize * lineHeight);
    const transferHeaderHeight = controlHeightLG;
    const transferItemHeight = controlHeight;

    const transferToken = mergeToken<TransferToken>(token, {
      transferItemHeight,
      transferHeaderHeight,
      transferHeaderVerticalPadding: Math.ceil((transferHeaderHeight - lineWidth - fontHeight) / 2),
      transferItemPaddingVertical: (transferItemHeight - fontHeight) / 2,
    });

    return [
      genTransferStyle(transferToken),
      genTransferCustomizeStyle(transferToken),
      genTransferStatusStyle(transferToken),
      genTransferRTLStyle(transferToken),
    ];
  },
  {
    listWidth: 180,
    listHeight: 200,
    listWidthLG: 250,
  },
);
