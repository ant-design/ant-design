// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
} from '../../_util/theme';

interface ListToken extends DerivativeToken {
  listCls: string;
  minHeight: number;
  fontSizeSm: number;
  antPrefix: string;
  listBorderedCls: string;
  minWidth: number;
  marginSM: number;
  lineHeightBase: number;
  fontSizeLg: number;
  height4: number;
  height14: number;
  height7: number;
  height48: number;
  disabledColor: string;
  listItemPaddingLg: string;
  listItemPaddingSm: string;
  listItemPadding: string;
  borderColorSplit: string;
  borderColorBase: string;
}

const genBorderedStyle = (token: ListToken): CSSObject => {
  const {
    listBorderedCls,
    listCls,
    paddingLG,
    margin,
    padding,
    listItemPaddingSm,
    marginLG,
    borderColorBase,
    radiusBase,
  } = token;
  return {
    [`${listBorderedCls}`]: {
      border: `1px solid ${borderColorBase}`,
      borderRadius: radiusBase,
      [`${listCls}-header,${listCls}-footer,${listCls}-item`]: {
        paddingInline: paddingLG,
      },

      [`${listCls}-pagination`]: {
        margin: `${margin}px ${marginLG}px`,
      },
    },
    [`${listBorderedCls}${listCls}-sm`]: {
      [`${listCls}-item,${listCls}-header,${listCls}-footer`]: {
        padding: listItemPaddingSm,
      },
    },

    [`${listBorderedCls}${listCls}-lg`]: {
      [`${listCls}-item,${listCls}-header,${listCls}-footer`]: {
        padding: `${padding}px ${paddingLG}px`,
      },
    },
  };
};
const genResponsiveStyle = (token: ListToken): CSSObject => {
  const { minWidth, listCls, screenSM, screenMD, marginLG, marginSM, margin } = token;
  return {
    [`@media screen and (max-width:${screenMD})`]: {
      [`${listCls}`]: {
        [`${listCls}-item`]: {
          [`${listCls}-item-action`]: {
            marginInlineStart: marginLG,
          },
        },
      },

      [`${listCls}-vertical`]: {
        [`${listCls}-item`]: {
          [`${listCls}-item-extra`]: {
            marginInlineStart: marginLG,
          },
        },
      },
    },

    [`@media screen and (max-width: ${screenSM})`]: {
      [`${listCls}`]: {
        [`${listCls}-item`]: {
          flexWrap: 'wrap',

          [`${listCls}-action`]: {
            marginInlineStart: marginSM,
          },
        },
      },

      [`${listCls}-vertical`]: {
        [`${listCls}-item`]: {
          flexWrap: 'wrap-reverse',

          [`${listCls}-item-main`]: {
            minWidth,
          },

          [`${listCls}-item-extra`]: {
            margin: `auto auto ${margin}px`,
          },
        },
      },
    },
  };
};

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<ListToken> = token => {
  const {
    listCls,
    antPrefix,
    controlHeight,
    minHeight,
    height48,
    fontSizeSm,
    paddingSM,
    marginLG,
    marginSM,
    padding,
    disabledColor,
    lineHeightBase,
    fontSizeBase,
    listItemPadding,
    colorPrimary,
    borderColorSplit,
    listItemPaddingSm,
    listItemPaddingLg,
    paddingXS,
    fontSize,
    fontSizeLg,
    margin,
    colorText,
    colorTextSecondary,
    lineHeight,
    height4,
    motionDurationSlow,
    lineWidth,
    height14,
    height7,
  } = token;

  return {
    [`${listCls}`]: {
      ...resetComponent({
        ...token,
        colorText,
        fontSize: fontSizeBase,
        lineHeight: lineHeightBase,
      }),
      position: 'relative',
      '*': {
        outline: 'none',
      },
      [`${listCls}-header, ${listCls}-footer`]: {
        background: 'transparent',
        paddingBlock: paddingSM,
      },
      [`${listCls}-pagination`]: {
        marginBlockStart: marginLG,
        textAlign: 'end',

        // https://github.com/ant-design/ant-design/issues/20037
        [`${antPrefix}-pagination-options`]: {
          textAlign: 'start',
        },
      },

      [`${listCls}-more`]: {
        marginBlockStart: marginSM,
        textAlign: 'center',
        button: {
          paddingInline: `${controlHeight}px`,
        },
      },
      [`${listCls}-spin`]: {
        minHeight,
        textAlign: 'center',
      },

      [`${listCls}-items`]: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      [`${listCls}-item`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: listItemPadding,
        color: colorText,

        [`${listCls}-item-meta`]: {
          display: 'flex',
          flex: 1,
          alignItems: 'flex-start',
          maxWidth: '100%',

          [`${listCls}-item-meta-avatar`]: {
            marginInlineEnd: padding,
          },

          [`${listCls}-item-meta-content`]: {
            flex: '1 0',
            width: 0,
            color: colorText,
          },

          [`${listCls}-item-meta-title`]: {
            marginBlockEnd: height4,
            color: colorText,
            fontSize,
            lineHeight: lineHeightBase,

            '> a': {
              color: colorText,
              transition: `all ${motionDurationSlow}`,

              [`&:hover`]: {
                color: colorPrimary,
              },
            },
          },

          [`${listCls}-item-meta-description`]: {
            color: colorTextSecondary,
            fontSize: fontSizeBase,
            lineHeight: lineHeightBase,
          },
        },

        [`${listCls}-item-action`]: {
          flex: '0 0 auto',
          marginInlineStart: height48,
          padding: 0,
          fontSize: 0,
          listStyle: 'none',

          [`& > li`]: {
            position: 'relative',
            display: 'inline-block',
            padding: `0 ${paddingXS}px`,
            color: colorTextSecondary,
            fontSize: fontSizeBase,
            lineHeight: lineHeightBase,
            textAlign: 'center',

            [`&:first-child`]: {
              paddingInlineStart: 0,
            },
          },

          [`${listCls}-item-action-split`]: {
            position: 'absolute',
            insetBlockStart: '50%',
            insetInlineEnd: 0,
            width: lineWidth,
            height: height14,
            marginBlockStart: -height7,
            backgroundColor: borderColorSplit,
          },
        },
      },

      [`${listCls}-empty`]: {
        padding: `${padding}px 0`,
        color: colorTextSecondary,
        fontSize: fontSizeSm,
        textAlign: 'center',
      },

      [`${listCls}-empty-text`]: {
        padding,
        color: disabledColor,
        fontSize: fontSizeBase,
        textAlign: 'center',
      },

      // ============================ without flex ============================
      [`${listCls}-item-no-flex`]: {
        display: 'block',
      },
    },
    [`${listCls}-grid ${antPrefix}-col > ${listCls}-item`]: {
      display: 'block',
      maxWidth: '100%',
      marginBlockEnd: margin,
      paddingBlock: 0,
      borderBlockEnd: 'none',
    },
    [`${listCls}-vertical ${listCls}-item`]: {
      alignItems: 'initial',

      [`${listCls}-item-main`]: {
        display: 'block',
        flex: 1,
      },

      [`${listCls}-item-extra`]: {
        marginInlineStart: marginLG,
      },

      [`${listCls}-item-meta`]: {
        marginBlockEnd: padding,

        [`${listCls}-item-meta-title`]: {
          marginBlockEnd: paddingSM,
          color: colorText,
          fontSize: fontSizeLg,
          lineHeight,
        },
      },

      [`${listCls}-item-action`]: {
        marginBlockStart: padding,
        marginInlineStart: 'auto',

        '> li': {
          padding: `0 ${padding}px`,

          [`&:first-child`]: {
            paddingInlineStart: 0,
          },
        },
      },
    },

    [`${listCls}-split ${listCls}-item`]: {
      borderBlockEnd: `1px solid ${borderColorSplit}`,

      [`&:last-child`]: {
        borderBlockEnd: 'none',
      },
    },

    [`${listCls}-split ${listCls}-header`]: {
      borderBlockEnd: `1px solid ${borderColorSplit}`,
    },
    [`${listCls}-split${listCls}-empty ${listCls}-footer`]: {
      borderTop: `1px solid ${borderColorSplit}`,
    },
    [`${listCls}-loading ${listCls}-spin-nested-loading`]: {
      minHeight: controlHeight,
    },
    [`${listCls}-split${listCls}-something-after-last-item ${antPrefix}-spin-container > ${listCls}-items > ${listCls}-item:last-child`]:
      {
        borderBlockEnd: `1px solid ${borderColorSplit}`,
      },
    [`${listCls}-lg ${listCls}-item`]: {
      padding: listItemPaddingLg,
    },
    [`${listCls}-sm ${listCls}-item`]: {
      padding: listItemPaddingSm,
    },
    // Horizontal
    [`${listCls}:not(${listCls}-vertical)`]: {
      [`${listCls}-item-no-flex`]: {
        [`${listCls}-item-action`]: {
          float: 'right',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const listToken: ListToken = {
    ...token,
    listCls: `.${prefixCls}`,
    listBorderedCls: `.${prefixCls}-bordered`,
    antPrefix: '.ant', // FIXME: hard code in v4
    minHeight: 40, // FIXME: hard code in v4,
    colorTextSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(), // FIXME: hard code in v4,
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hard code in v4,
    borderColorBase: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(), // FIXME: hard code in v4,
    disabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // FIXME: hard code in v4,
    minWidth: 220, // FIXME: hard code in v4,

    height4: 4, // FIXME: hard code in v4,
    height14: 14, // FIXME: hard code in v4,
    height7: 7, // FIXME: hard code in v4,
    height48: 48, // FIXME: hard code in v4,

    fontSizeSm: 12, // FIXME: hard code in v4,
    fontSize: 14, // FIXME: hard code in v4,
    fontSizeLg: 16, // FIXME: hard code in v4,

    listItemPadding: '12px 0', // FIXME: hard code in v4,
    listItemPaddingSm: '8px 16px', // FIXME: hard code in v4,
    listItemPaddingLg: '16px 24px', // FIXME: hard code in v4,

    lineHeightBase: 1.5715, // FIXME: hard code in v4,
    lineHeight: 1.5,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(listToken, hashId),
      genBorderedStyle(listToken),
      genResponsiveStyle(listToken),
    ]),
    hashId,
  ];
}
