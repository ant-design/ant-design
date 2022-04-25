// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  GenerateStyle,
  resetComponent,
  FullToken,
  genComponentStyleHook,
  mergeToken,
  DerivativeToken,
} from '../../_util/theme';

interface ListToken extends FullToken<'List'> {
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
    componentCls,
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
      [`${componentCls}-header,${componentCls}-footer,${componentCls}-item`]: {
        paddingInline: paddingLG,
      },

      [`${componentCls}-pagination`]: {
        margin: `${margin}px ${marginLG}px`,
      },
    },
    [`${listBorderedCls}${componentCls}-sm`]: {
      [`${componentCls}-item,${componentCls}-header,${componentCls}-footer`]: {
        padding: listItemPaddingSm,
      },
    },

    [`${listBorderedCls}${componentCls}-lg`]: {
      [`${componentCls}-item,${componentCls}-header,${componentCls}-footer`]: {
        padding: `${padding}px ${paddingLG}px`,
      },
    },
  };
};
const genResponsiveStyle = (token: ListToken): CSSObject => {
  const { minWidth, componentCls, screenSM, screenMD, marginLG, marginSM, margin } = token;
  return {
    [`@media screen and (max-width:${screenMD})`]: {
      [`${componentCls}`]: {
        [`${componentCls}-item`]: {
          [`${componentCls}-item-action`]: {
            marginInlineStart: marginLG,
          },
        },
      },

      [`${componentCls}-vertical`]: {
        [`${componentCls}-item`]: {
          [`${componentCls}-item-extra`]: {
            marginInlineStart: marginLG,
          },
        },
      },
    },

    [`@media screen and (max-width: ${screenSM})`]: {
      [`${componentCls}`]: {
        [`${componentCls}-item`]: {
          flexWrap: 'wrap',

          [`${componentCls}-action`]: {
            marginInlineStart: marginSM,
          },
        },
      },

      [`${componentCls}-vertical`]: {
        [`${componentCls}-item`]: {
          flexWrap: 'wrap-reverse',

          [`${componentCls}-item-main`]: {
            minWidth,
          },

          [`${componentCls}-item-extra`]: {
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
    componentCls,
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
    [`${componentCls}`]: {
      ...resetComponent(
        mergeToken<DerivativeToken>(token, {
          colorText,
          fontSize: fontSizeBase,
          lineHeight: lineHeightBase,
        }),
      ),
      position: 'relative',
      '*': {
        outline: 'none',
      },
      [`${componentCls}-header, ${componentCls}-footer`]: {
        background: 'transparent',
        paddingBlock: paddingSM,
      },
      [`${componentCls}-pagination`]: {
        marginBlockStart: marginLG,
        textAlign: 'end',

        // https://github.com/ant-design/ant-design/issues/20037
        [`${antPrefix}-pagination-options`]: {
          textAlign: 'start',
        },
      },

      [`${componentCls}-more`]: {
        marginBlockStart: marginSM,
        textAlign: 'center',
        button: {
          paddingInline: `${controlHeight}px`,
        },
      },
      [`${componentCls}-spin`]: {
        minHeight,
        textAlign: 'center',
      },

      [`${componentCls}-items`]: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      [`${componentCls}-item`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: listItemPadding,
        color: colorText,

        [`${componentCls}-item-meta`]: {
          display: 'flex',
          flex: 1,
          alignItems: 'flex-start',
          maxWidth: '100%',

          [`${componentCls}-item-meta-avatar`]: {
            marginInlineEnd: padding,
          },

          [`${componentCls}-item-meta-content`]: {
            flex: '1 0',
            width: 0,
            color: colorText,
          },

          [`${componentCls}-item-meta-title`]: {
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

          [`${componentCls}-item-meta-description`]: {
            color: colorTextSecondary,
            fontSize: fontSizeBase,
            lineHeight: lineHeightBase,
          },
        },

        [`${componentCls}-item-action`]: {
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

          [`${componentCls}-item-action-split`]: {
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

      [`${componentCls}-empty`]: {
        padding: `${padding}px 0`,
        color: colorTextSecondary,
        fontSize: fontSizeSm,
        textAlign: 'center',
      },

      [`${componentCls}-empty-text`]: {
        padding,
        color: disabledColor,
        fontSize: fontSizeBase,
        textAlign: 'center',
      },

      // ============================ without flex ============================
      [`${componentCls}-item-no-flex`]: {
        display: 'block',
      },
    },
    [`${componentCls}-grid ${antPrefix}-col > ${componentCls}-item`]: {
      display: 'block',
      maxWidth: '100%',
      marginBlockEnd: margin,
      paddingBlock: 0,
      borderBlockEnd: 'none',
    },
    [`${componentCls}-vertical ${componentCls}-item`]: {
      alignItems: 'initial',

      [`${componentCls}-item-main`]: {
        display: 'block',
        flex: 1,
      },

      [`${componentCls}-item-extra`]: {
        marginInlineStart: marginLG,
      },

      [`${componentCls}-item-meta`]: {
        marginBlockEnd: padding,

        [`${componentCls}-item-meta-title`]: {
          marginBlockEnd: paddingSM,
          color: colorText,
          fontSize: fontSizeLg,
          lineHeight,
        },
      },

      [`${componentCls}-item-action`]: {
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

    [`${componentCls}-split ${componentCls}-item`]: {
      borderBlockEnd: `1px solid ${borderColorSplit}`,

      [`&:last-child`]: {
        borderBlockEnd: 'none',
      },
    },

    [`${componentCls}-split ${componentCls}-header`]: {
      borderBlockEnd: `1px solid ${borderColorSplit}`,
    },
    [`${componentCls}-split${componentCls}-empty ${componentCls}-footer`]: {
      borderTop: `1px solid ${borderColorSplit}`,
    },
    [`${componentCls}-loading ${componentCls}-spin-nested-loading`]: {
      minHeight: controlHeight,
    },
    [`${componentCls}-split${componentCls}-something-after-last-item ${antPrefix}-spin-container > ${componentCls}-items > ${componentCls}-item:last-child`]:
      {
        borderBlockEnd: `1px solid ${borderColorSplit}`,
      },
    [`${componentCls}-lg ${componentCls}-item`]: {
      padding: listItemPaddingLg,
    },
    [`${componentCls}-sm ${componentCls}-item`]: {
      padding: listItemPaddingSm,
    },
    // Horizontal
    [`${componentCls}:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-no-flex`]: {
        [`${componentCls}-item-action`]: {
          float: 'right',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('List', token => {
  const listToken = mergeToken<ListToken>(token, {
    listBorderedCls: `${token.componentCls}-bordered`,
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
  });

  return [genBaseStyle(listToken), genBorderedStyle(listToken), genResponsiveStyle(listToken)];
});
