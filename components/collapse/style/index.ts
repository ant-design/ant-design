import { resetComponent, resetIcon } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

type CollapseToken = FullToken<'Collapse'> & {
  collapseContentBg: string;
  collapseHeaderBg: string;
  collapseHeaderPadding: string;
  collapseHeaderPaddingSM: string;
  collapseHeaderPaddingLG: string;
  collapsePanelBorderRadius: number;
  collapseContentPaddingHorizontal: number;
};

export const genBaseStyle: GenerateStyle<CollapseToken> = (token) => {
  const {
    componentCls,
    collapseContentBg,
    padding,
    collapseContentPaddingHorizontal,
    collapseHeaderBg,
    collapseHeaderPadding,
    collapseHeaderPaddingSM,
    collapseHeaderPaddingLG,
    collapsePanelBorderRadius,

    lineWidth,
    lineType,
    colorBorder,
    colorText,
    colorTextHeading,
    colorTextDisabled,
    fontSize,
    fontSizeLG,
    lineHeight,
    marginSM,
    paddingSM,
    paddingLG,
    paddingXS,
    motionDurationSlow,
    fontSizeIcon,
  } = token;

  const borderBase = `${lineWidth}px ${lineType} ${colorBorder}`;

  return {
    [componentCls]: {
      ...resetComponent(token),
      backgroundColor: collapseHeaderBg,
      border: borderBase,
      borderBottom: 0,
      borderRadius: `${collapsePanelBorderRadius}px`,

      [`&-rtl`]: {
        direction: 'rtl',
      },

      [`& > ${componentCls}-item`]: {
        borderBottom: borderBase,
        [`&:last-child`]: {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `0 0 ${collapsePanelBorderRadius}px ${collapsePanelBorderRadius}px`,
          },
        },

        [`> ${componentCls}-header`]: {
          position: 'relative', // Compatible with old version of antd, should remove in next version
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          padding: collapseHeaderPadding,
          paddingInlineStart: paddingSM,
          color: colorTextHeading,
          lineHeight,
          cursor: 'pointer',
          transition: `all ${motionDurationSlow}, visibility 0s`,

          [`> ${componentCls}-header-text`]: {
            flex: 'auto',
          },

          '&:focus': {
            outline: 'none',
          },

          // >>>>> Arrow
          [`${componentCls}-expand-icon`]: {
            height: fontSize * lineHeight,
            display: 'flex',
            alignItems: 'center',
            paddingInlineEnd: marginSM,
            // Arrow offset
            marginInlineStart: padding - paddingSM,
          },

          [`${componentCls}-arrow`]: {
            ...resetIcon(),
            fontSize: fontSizeIcon,

            svg: {
              transition: `transform ${motionDurationSlow}`,
            },
          },

          // >>>>> Text
          [`${componentCls}-header-text`]: {
            marginInlineEnd: 'auto',
          },
        },

        [`${componentCls}-header-collapsible-only`]: {
          cursor: 'default',

          [`${componentCls}-header-text`]: {
            flex: 'none',
            cursor: 'pointer',
          },
        },

        [`${componentCls}-icon-collapsible-only`]: {
          cursor: 'default',

          [`${componentCls}-expand-icon`]: {
            cursor: 'pointer',
          },
        },
      },

      [`${componentCls}-content`]: {
        color: colorText,
        backgroundColor: collapseContentBg,
        borderTop: borderBase,

        [`& > ${componentCls}-content-box`]: {
          padding: `${padding}px ${collapseContentPaddingHorizontal}px`,
        },

        [`&-hidden`]: {
          display: 'none',
        },
      },

      [`&-small`]: {
        [`> ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            padding: collapseHeaderPaddingSM,
            paddingInlineStart: paddingXS,

            [`> ${componentCls}-expand-icon`]: {
              // Arrow offset
              marginInlineStart: paddingSM - paddingXS,
            },
          },
          [`> ${componentCls}-content > ${componentCls}-content-box`]: {
            padding: paddingSM,
          },
        },
      },

      [`&-large`]: {
        [`> ${componentCls}-item`]: {
          fontSize: fontSizeLG,

          [`> ${componentCls}-header`]: {
            padding: collapseHeaderPaddingLG,
            paddingInlineStart: padding,

            [`> ${componentCls}-expand-icon`]: {
              height: fontSizeLG * lineHeight,
              // Arrow offset
              marginInlineStart: paddingLG - padding,
            },
          },
          [`> ${componentCls}-content > ${componentCls}-content-box`]: {
            padding: paddingLG,
          },
        },
      },

      [`${componentCls}-item:last-child`]: {
        [`> ${componentCls}-content`]: {
          borderRadius: `0 0 ${collapsePanelBorderRadius}px ${collapsePanelBorderRadius}px`,
        },
      },

      [`& ${componentCls}-item-disabled > ${componentCls}-header`]: {
        [`
          &,
          & > .arrow
        `]: {
          color: colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      // ========================== Icon Position ==========================
      [`&${componentCls}-icon-position-end`]: {
        [`& > ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            [`${componentCls}-expand-icon`]: {
              order: 1,
              paddingInlineEnd: 0,
              paddingInlineStart: marginSM,
            },
          },
        },
      },
    },
  };
};

const genArrowStyle: GenerateStyle<CollapseToken> = (token) => {
  const { componentCls } = token;

  const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow svg`;

  return {
    [`${componentCls}-rtl`]: {
      [fixedSelector]: {
        transform: `rotate(180deg)`,
      },
    },
  };
};

const genBorderlessStyle: GenerateStyle<CollapseToken> = (token) => {
  const {
    componentCls,
    collapseHeaderBg,
    paddingXXS,

    colorBorder,
  } = token;

  return {
    [`${componentCls}-borderless`]: {
      backgroundColor: collapseHeaderBg,
      border: 0,

      [`> ${componentCls}-item`]: {
        borderBottom: `1px solid ${colorBorder}`,
      },

      [`
        > ${componentCls}-item:last-child,
        > ${componentCls}-item:last-child ${componentCls}-header
      `]: {
        borderRadius: 0,
      },

      [`> ${componentCls}-item:last-child`]: {
        borderBottom: 0,
      },

      [`> ${componentCls}-item > ${componentCls}-content`]: {
        backgroundColor: 'transparent',
        borderTop: 0,
      },

      [`> ${componentCls}-item > ${componentCls}-content > ${componentCls}-content-box`]: {
        paddingTop: paddingXXS,
      },
    },
  };
};

const genGhostStyle: GenerateStyle<CollapseToken> = (token) => {
  const { componentCls, paddingSM } = token;

  return {
    [`${componentCls}-ghost`]: {
      backgroundColor: 'transparent',
      border: 0,
      [`> ${componentCls}-item`]: {
        borderBottom: 0,
        [`> ${componentCls}-content`]: {
          backgroundColor: 'transparent',
          border: 0,
          [`> ${componentCls}-content-box`]: {
            paddingBlock: paddingSM,
          },
        },
      },
    },
  };
};

export default genComponentStyleHook('Collapse', (token) => {
  const collapseToken = mergeToken<CollapseToken>(token, {
    collapseContentBg: token.colorBgContainer,
    collapseHeaderBg: token.colorFillAlter,
    collapseHeaderPadding: `${token.paddingSM}px ${token.padding}px`,
    collapseHeaderPaddingSM: `${token.paddingXS}px ${token.paddingSM}px`,
    collapseHeaderPaddingLG: `${token.padding}px ${token.paddingLG}px`,
    collapsePanelBorderRadius: token.borderRadiusLG,
    collapseContentPaddingHorizontal: 16, // Fixed value
  });

  return [
    genBaseStyle(collapseToken),
    genBorderlessStyle(collapseToken),
    genGhostStyle(collapseToken),
    genArrowStyle(collapseToken),
    genCollapseMotion(collapseToken),
  ];
});
