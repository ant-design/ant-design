// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { FullToken, genComponentStyleHook, GenerateStyle, mergeToken } from '../../_util/theme';

export interface DrawerToken extends FullToken<'Drawer'> {
  drawerHeaderCloseSize: number;
  shadow1Right: string;
  shadow1Left: string;
  shadow1Up: string;
  shadow1Down: string;
  drawerTitleLineHeight: number;
  closeRight: number;
  white: string;
  black: string;
  paddingMd: number;
  modalFooterPaddingVertical: number;
  modalFooterPaddingHorizontal: number;
  hoverColor: string;
  borderColorSplit: string;
  borderStyle: string;
  textColorSecondary: string;
  motionEaseOut: string;
  componentCls: string;
}

const antdDrawerFadeIn = new Keyframes('antDrawerFadeIn', {
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<DrawerToken> = (
  token: DrawerToken,
  hashId: string,
): CSSObject => {
  const {
    componentCls,
    motionEaseOut,
    motionDurationSlow,
    fontSizeLG,
    drawerTitleLineHeight,
    white,
    closeRight,
    paddingLG,
    paddingMd,
    lineWidth,
    borderStyle,
    radiusBase,
    fontSize,
    lineHeight,
    modalFooterPaddingVertical,
    modalFooterPaddingHorizontal,
    borderColorSplit,
    zIndexPopup,
    colorText,
    textColorSecondary,
    hoverColor,
  } = token;

  return {
    [`${componentCls}`]: {
      // FIXME: Seems useless?
      // @drawer-header-close-padding: ceil(((drawerHeaderCloseSize - @font-size-lg) / 2));
      position: 'fixed',
      zIndex: zIndexPopup,
      width: 0,
      height: '100%',
      transition: `width 0s ease ${motionDurationSlow}, height 0s ease ${motionDurationSlow}`,
      [`${componentCls}-content-wrapper`]: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transition: `transform ${motionDurationSlow} ${motionEaseOut},box-shadow ${motionDurationSlow} ${motionEaseOut}`,
        [`${componentCls}-content`]: {
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          overflow: 'auto',
          backgroundColor: white,
          backgroundClip: `padding-box`,
          border: 0,
          [`${componentCls}-wrapper-body`]: {
            display: 'flex',
            flexFlow: 'column nowrap',
            width: '100%',
            height: '100%',
            [`${componentCls}-header`]: {
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${paddingMd}px ${paddingLG}px`, // FIXME px
              color: colorText,
              background: white,
              borderBottom: `${lineWidth}px ${borderStyle} ${borderColorSplit}`, // FIXME px
              borderRadius: `${radiusBase}px ${radiusBase}px 0 0`, // FIXME px

              [`${componentCls}-header-title`]: {
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                [`${componentCls}-title`]: {
                  flex: 1,
                  margin: 0,
                  color: colorText,
                  fontWeight: 500,
                  fontSize: fontSizeLG,
                  lineHeight: drawerTitleLineHeight,
                },
                [`${componentCls}-close`]: {
                  display: 'inline-block',
                  marginInlineEnd: closeRight,
                  color: textColorSecondary,
                  fontWeight: 700,
                  fontSize: fontSizeLG,
                  fontStyle: 'normal',
                  lineHeight: 1,
                  textAlign: 'center',
                  textTransform: 'none',
                  textDecoration: 'none',
                  background: 'transparent',
                  border: 0,
                  outline: 0,
                  cursor: 'pointer',
                  transition: `color ${motionDurationSlow}`,
                  textRendering: 'auto',

                  [`${componentCls}:focus,${componentCls}:hover`]: {
                    color: hoverColor,
                    textDecoration: 'none',
                  },
                },
              },
              [`${componentCls}-header-close-only`]: {
                paddingBottom: 0,
                border: 'none',
              },
            },
            [`${componentCls}-body`]: {
              flexGrow: 1,
              padding: paddingLG,
              overflow: 'auto',
              fontSize,
              lineHeight,
              wordWrap: 'break-word',
            },
            [`${componentCls}-footer`]: {
              flexShrink: 0,
              padding: `${modalFooterPaddingVertical}px ${modalFooterPaddingHorizontal}px`, // FIXME px
              borderTop: `${lineWidth}px ${borderStyle} ${borderColorSplit}`, // FIXME px
            },
          },
        },
      },
      [`${componentCls}-mask`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: '100%',
        height: 0,
        backgroundColor: textColorSecondary,
        opacity: 0,
        transition: `opacity ${motionDurationSlow} linear, height 0s ease ${motionDurationSlow}`,
        pointerEvents: 'none',
      },
    },
    [`${componentCls}${componentCls}-open ${componentCls}-mask`]: {
      height: '100%',
      opacity: 1,
      transition: 'none',
      animation: `${antdDrawerFadeIn.getName(hashId)} ${motionDurationSlow} ${motionEaseOut}`,
      pointerEvents: 'auto',
    },
  };
};

const genDrawerStyle: GenerateStyle<DrawerToken> = (token: DrawerToken) => {
  const {
    componentCls,
    motionDurationSlow,
    shadow1Right,
    shadow1Left,
    shadow1Down,
    shadow1Up,
    lineWidth,
    motionEaseOut,
  } = token;

  return {
    // =================== left,right ===================
    [`${componentCls}-left`]: {
      insetInlineStart: 0,
      insetBlockStart: 0,
      width: 0,
      height: '100%',
      [`${componentCls}-content-wrapper`]: {
        height: '100%',
        insetInlineStart: 0,
      },
    },
    [`${componentCls}-left${componentCls}-open`]: {
      width: '100%',
      transition: `transform ${motionDurationSlow} ${motionEaseOut}`,
      [`${componentCls}-content-wrapper`]: {
        boxShadow: shadow1Right,
      },
    },
    [`${componentCls}-right`]: {
      insetInlineEnd: 0,
      insetBlockStart: 0,
      width: 0,
      height: '100%',
      [`${componentCls}-content-wrapper`]: {
        height: '100%',
        insetInlineEnd: 0,
      },
    },
    [`${componentCls}-right${componentCls}-open`]: {
      width: '100%',
      transition: `transform ${motionDurationSlow} ${motionEaseOut}`,
      [`${componentCls}-content-wrapper`]: {
        boxShadow: shadow1Left,
      },
    },
    // https://github.com/ant-design/ant-design/issues/18607, Avoid edge alignment bug.
    [`${componentCls}-right${componentCls}-open.no-mask`]: {
      insetInlineEnd: lineWidth,
      transform: `translateX(${lineWidth})`,
    },

    // =================== top,bottom ===================
    [`${componentCls}-top,${componentCls}-bottom`]: {
      insetInlineStart: 0,
      width: '100%',
      height: 0,
      [`${componentCls}-content-wrapper`]: {
        width: '100%',
      },
    },

    [`${componentCls}-top${componentCls}-open,${componentCls}-bottom${componentCls}-open`]: {
      height: '100%',
      transition: `transform ${motionDurationSlow} ${motionEaseOut}`,
    },

    [`${componentCls}-top`]: {
      insetBlockStart: 0,
    },

    [`${componentCls}-top${componentCls}-open`]: {
      [`${componentCls}-content-wrapper`]: {
        boxShadow: shadow1Down,
      },
    },

    [`${componentCls}-bottom`]: {
      bottom: 0,
      [`${componentCls}-content-wrapper`]: {
        bottom: 0,
      },
    },

    [`${componentCls}-bottom${componentCls}-bottom-open`]: {
      [`${componentCls}-content-wrapper`]: {
        boxShadow: shadow1Up,
      },
    },

    [`${componentCls}-bottom${componentCls}-bottom-open.no-mask`]: {
      insetBlockEnd: lineWidth,
      transform: `translateY(${lineWidth})`,
    },

    // ==================== Hook Components ===================
    //  FIXME: Seems useless?
    // .@{picker-prefix-cls} {
    //   &-clear {
    //     background: @popover-background,
    //   }
    // }
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Drawer', (token, { hashId }) => {
  const drawerToken = mergeToken<DrawerToken>(token, {
    black: '#000', // FIXME: hard code
    white: '#fff', // FIXME: hard code
    drawerHeaderCloseSize: 56, // FIXME: hard code
    shadow1Right:
      '6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05),12px 0 48px 16px rgba(0, 0, 0, 0.03)', // FIXME: hard code in v4
    shadow1Left:
      '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)', // FIXME: hard code in v4
    shadow1Up:
      '0 -6px 16px -8px rgba(0, 0, 0, 0.32), 0 -9px 28px 0 rgba(0, 0, 0, 0.2),0 -12px 48px 16px rgba(0, 0, 0, 0.12)', // FIXME: hard code in v4
    shadow1Down:
      '0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)', // FIXME: hard code in v4
    drawerTitleLineHeight: 1.375, // FIXME: hard code
    closeRight: 22, // FIXME: hard code
    paddingMd: 16, // FIXME: hard code
    modalFooterPaddingVertical: 10, // FIXME: hard code
    modalFooterPaddingHorizontal: 16, // FIXME: hard code
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hard code
    hoverColor: new TinyColor('#000').setAlpha(0.75).toRgbString(), // FIXME: hard code
    textColorSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(), // FIXME: hard code
    borderStyle: 'solid', // FIXME: hard code
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // FIXME: hard code
  });

  return [genBaseStyle(drawerToken, hashId), genDrawerStyle(drawerToken), antdDrawerFadeIn];
});
