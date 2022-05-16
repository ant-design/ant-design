// import '../../style/index.less';
// import './index.less';

// style dependencies
// import '../../empty/style';
// import '../../checkbox/style';
// import '../../button/style';
// import '../../input/style';
// import '../../menu/style';
// import '../../dropdown/style';
// import '../../pagination/style';

// deps-lint-skip: form

// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import {
  resetComponent,
  genComponentStyleHook,
  mergeToken,
  operationUnit,
} from '../../_util/theme';
import type { FullToken, GenerateStyle } from '../../_util/theme';

import { genHoverStyle, genActiveStyle, initInputToken } from '../../input/style';
import type { InputToken } from '../../input/style';

// FIXME: need full token check
type TransferToken = InputToken<FullToken<'Transfer'>> & {
  borderColorBase: string;
  borderColorSplit: string;
  heightBase: number;
  disabledColor: string;
  backgroundColorLight: string;
  transferListHeight: number;
  transferHeaderHeight: number;
  transferHeaderVerticalPadding: number;
  transferItemPaddingVertical: number;
  transferItemSelectedHoverBg: string;
};

const genTransferCustomizeStyle: GenerateStyle<TransferToken> = (
  token: TransferToken,
): CSSObject => {
  const { antCls, componentCls, borderColorSplit, backgroundColorLight, transferListHeight } =
    token;

  const tableCls = `${antCls}-table`;
  const inputCls = `${antCls}-input`;

  return {
    [`${componentCls}-customize-list`]: {
      [`${componentCls}-list`]: {
        flex: '1 1 50%',
        width: 'auto',
        height: 'auto',
        minHeight: transferListHeight,
      },

      // =================== Hook Components ===================
      [`${tableCls}-wrapper`]: {
        [`${tableCls}-small`]: {
          border: 0,
          borderRadius: 0,

          [`${tableCls}-selection-column`]: {
            width: 40, // FIXME: hardcode in v4,
            minWidth: 40, // FIXME: hardcode in v4,
          },

          [`> ${tableCls}-content`]: {
            // Header background color
            [`> ${tableCls}-body > table > ${tableCls}-thead > tr > th`]: {
              background: backgroundColorLight,
            },

            [`${tableCls}-row:last-child td`]: {
              borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
            },
          },

          [`${tableCls}-body`]: {
            margin: 0,
          },
        },

        [`${tableCls}-pagination${tableCls}-pagination`]: {
          margin: '16px 0 4px', // FIXME: hardcode in v4,
        },
      },

      [`${inputCls}[disabled]`]: {
        backgroundColor: 'transparent',
      },
    },
  };
};

const genTransferStatusColor = (token: TransferToken, color: string): CSSObject => {
  const { componentCls, borderColorBase } = token;
  return {
    [`${componentCls}-list`]: {
      borderColor: color,

      '&-search:not([disabled])': {
        borderColor: borderColorBase,

        '&:hover': {
          ...genHoverStyle(token),
        },

        '&:focus': {
          ...genActiveStyle(token),
        },
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
    borderColorBase,
    borderColorSplit,
    heightBase,
    transferListHeight,
    transferHeaderHeight,
    transferHeaderVerticalPadding,
    transferItemPaddingVertical,
    transferItemSelectedHoverBg,
    disabledColor,
  } = token;

  return {
    display: 'flex',
    flexDirection: 'column',
    width: 180, // FIXME: hardcode in v4,
    height: transferListHeight,
    border: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorBase}`,
    borderRadius: token.radiusBase,

    '&-with-pagination': {
      width: 250, // FIXME: hardcode in v4,
      height: 'auto',
    },

    '&-search': {
      '.anticon-search': {
        color: disabledColor,
      },
    },

    '&-header': {
      display: 'flex',
      flex: 'none',
      alignItems: 'center',
      height: transferHeaderHeight,
      // border-top is on the transfer dom. We should minus 1px for this
      padding: `${transferHeaderVerticalPadding - 1}px ${
        token.paddingSM
      }px ${transferHeaderVerticalPadding}px`,
      color: token.colorText,
      background: token.colorBgComponent,
      borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
      borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,

      '> *:not(:last-child)': {
        marginInlineEnd: 4, // FIXME: hardcode in v4,
      },

      '> *': {
        flex: 'none',
      },

      '&-title': {
        flex: 'auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textAlign: 'end',
        textOverflow: 'ellipsis',
      },

      '&-dropdown': {
        fontSize: 10, // FIXME: hardcode in v4,
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
      fontSize: token.fontSizeBase,

      '&-search-wrapper': {
        position: 'relative',
        flex: 'none',
        padding: token.paddingSM,
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
        minHeight: heightBase,
        padding: `${transferItemPaddingVertical}px ${token.paddingSM}px`,
        lineHeight: `${heightBase - 2 * transferItemPaddingVertical}px`,
        transition: `all ${token.motionDurationSlow}`,

        '> *:not(:last-child)': {
          marginInlineEnd: 8, // FIXME: hardcode in v4,
        },

        '> *': {
          flex: 'none',
        },

        '&-text': {
          flex: 'auto',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },

        '&-remove': {
          ...operationUnit(token),
          position: 'relative',
          color: token.borderColorBase,

          '&::after': {
            position: 'absolute',
            insert: `-${transferItemPaddingVertical}px -50%`,
            content: '""',
          },

          '&:hover': {
            color: token.colorLinkHover,
          },
        },

        '&:not(&-disabled)': {
          '&:hover': {
            backgroundColor: token.controlItemBgHover,
            cursor: 'pointer',
          },

          [`&${componentCls}-list-content-item-checked:hover`]: {
            backgroundColor: transferItemSelectedHoverBg,
          },
        },

        // Do not change hover style when `oneWay` mode
        '&-show-remove &-item:not(&-item-disabled):hover': {
          background: 'transparent',
          cursor: 'default',
        },

        '&-checked': {
          backgroundColor: token.controlItemBgActive,
        },

        '&-disabled': {
          color: disabledColor,
          cursor: 'not-allowed',
        },
      },
    },

    '&-pagination': {
      padding: `${token.paddingXS}px 0`,
      textAlign: 'end',
      borderTop: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
    },

    '&-body-not-found': {
      flex: 'none',
      width: '100%',
      margin: 'auto 0',
      color: disabledColor,
      textAlign: 'center',
    },

    '&-footer': {
      borderTop: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
    },
  };
};

const genTransferStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const { antCls, iconCls, componentCls, transferHeaderHeight } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',

      [`${componentCls}-disabled`]: {
        [`${componentCls}-list`]: {
          background: token.colorBgComponentDisabled,
        },
      },

      [`${componentCls}-list`]: genTransferListStyle(token),

      [`${componentCls}-operation`]: {
        display: 'flex',
        flex: 'none',
        flexDirection: 'column',
        alignSelf: 'center',
        margin: '0 8px', // FIXME: hardcode in v4,
        verticalAlign: 'middle',

        [`${antCls}-btn`]: {
          display: 'block',

          '&:first-child': {
            marginBottom: 4, // FIXME: hardcode in v4,
          },

          [iconCls]: {
            fontSize: 12, // FIXME: hardcode in v4,
          },
        },
      },

      [`${antCls}-empty-image`]: {
        maxHeight: transferHeaderHeight / 2 - 22, // FIXME: hardcode in v4,
      },
    },
  };
};

const genTransferRTLStyle: GenerateStyle<TransferToken> = (token: TransferToken): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl',

      [`${componentCls}-list`]: {
        '&-search': {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: 24, // FIXME: hardcode in v4,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Transfer', token => {
  const transferHeaderHeight = 40;
  const lineHeightBase = 1.5715;

  const transferToken = mergeToken<TransferToken>(initInputToken<FullToken<'Transfer'>>(token), {
    borderColorBase: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(), // FIXME: hardcode in v4
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hardcode in v4
    backgroundColorLight: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(), // FIXME: hardcode in v4
    disabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // FIXME: hardcode in v4
    heightBase: 32, // FIXME: hardcode in v4,
    transferListHeight: 200, // FIXME: hardcode in v4,
    transferHeaderHeight, // FIXME: hardcode in v4,
    transferHeaderVerticalPadding: Math.ceil(
      (transferHeaderHeight - 1 - token.fontSizeBase * lineHeightBase) / 2, // FIXME: hardcode in v4,
    ),
    transferItemPaddingVertical: 6, // FIXME: hardcode in v4,
    transferItemSelectedHoverBg: new TinyColor(token.controlItemBgActive).darken(2).toHexString(), // FIXME: hardcode in v4,
  });

  return [
    genTransferStyle(transferToken),
    genTransferCustomizeStyle(transferToken),
    genTransferStatusStyle(transferToken),
    genTransferRTLStyle(transferToken),
  ];
});
