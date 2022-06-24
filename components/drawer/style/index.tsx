// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken } from '../../_util/theme';

export interface DrawerToken extends FullToken<'Drawer'> {
  drawerFooterPaddingVertical: number;
  drawerFooterPaddingHorizontal: number;
}

const antdDrawerFadeIn = new Keyframes('antDrawerFadeIn', {
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<DrawerToken> = (token: DrawerToken): CSSObject => {
  const {
    componentCls,
    motionEaseOut,
    motionDurationSlow,
    fontSizeLG,
    paddingLG,
    lineWidth,
    radiusBase,
    fontSize,
    lineHeight,
    drawerFooterPaddingVertical,
    drawerFooterPaddingHorizontal,
    zIndexPopupBase,
    colorText,
    padding,
    lineType,
    colorSplit,
  } = token;

  return {
    [`${componentCls}`]: {
      position: 'fixed',
      zIndex: zIndexPopupBase,
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
          backgroundColor: token.colorBgElevated,
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
              padding: `${padding}px ${paddingLG}px`,
              color: colorText,
              background: token.colorBgElevated,
              borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
              borderRadius: `${radiusBase}px ${radiusBase}px 0 0`,

              [`${componentCls}-header-title`]: {
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                [`${componentCls}-title`]: {
                  flex: 1,
                  margin: 0,
                  color: colorText,
                  fontWeight: token.fontWeightStrong,
                  fontSize: fontSizeLG,
                  lineHeight: token.lineHeightLG,
                },
                [`${componentCls}-close`]: {
                  display: 'inline-block',
                  marginInlineEnd: token.marginSM,
                  color: token.colorAction,
                  fontWeight: token.fontWeightStrong,
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

                  [`&:focus, &:hover`]: {
                    color: token.colorActionHover,
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
              padding: `${drawerFooterPaddingVertical}px ${drawerFooterPaddingHorizontal}px`,
              borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
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
        backgroundColor: token.controlMaskBg,
        opacity: 0,
        transition: `opacity ${motionDurationSlow} linear, height 0s ease ${motionDurationSlow}`,
        pointerEvents: 'none',
      },
    },
    [`${componentCls}${componentCls}-open ${componentCls}-mask`]: {
      height: '100%',
      opacity: 1,
      transition: 'none',
      animationName: antdDrawerFadeIn,
      animationDuration: token.motionDurationSlow,
      animationTimingFunction: motionEaseOut,
      pointerEvents: 'auto',
    },
  };
};

const genDrawerStyle: GenerateStyle<DrawerToken> = (token: DrawerToken) => {
  const { componentCls, motionDurationSlow, lineWidth, motionEaseOut } = token;

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
        boxShadow: token.boxShadowDrawerRight,
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
        boxShadow: token.boxShadowDrawerLeft,
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
        boxShadow: token.boxShadowDrawerDown,
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
        boxShadow: token.boxShadowDrawerUp,
      },
    },

    [`${componentCls}-bottom${componentCls}-bottom-open.no-mask`]: {
      insetBlockEnd: lineWidth,
      transform: `translateY(${lineWidth})`,
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Drawer', token => {
  const drawerToken = mergeToken<DrawerToken>(token, {
    drawerFooterPaddingVertical: token.paddingXS,
    drawerFooterPaddingHorizontal: token.padding,
  });

  return [genBaseStyle(drawerToken), genDrawerStyle(drawerToken)];
});
