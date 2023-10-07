import type { CSSProperties } from 'react';
import { resetComponent, resetIcon } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  /**
   * @desc 折叠面板头部内边距
   * @descEN Padding of header
   */
  headerPadding: CSSProperties['padding'];
  /**
   * @desc 折叠面板头部背景
   * @descEN Background of header
   */
  headerBg: string;
  /**
   * @desc 折叠面板内容内部编辑
   * @descEN Padding of content
   */
  contentPadding: CSSProperties['padding'];
  /**
   * @desc 折叠面板内容背景
   * @descEN Background of content
   */
  contentBg: string;
}

type CollapseToken = FullToken<'Collapse'> & {
  collapseHeaderPaddingSM: string;
  collapseHeaderPaddingLG: string;
  collapsePanelBorderRadius: number;
};

export const genBaseStyle: GenerateStyle<CollapseToken> = (token) => {
  const {
    componentCls,
    contentBg,
    padding,
    headerBg,
    headerPadding,
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
    contentPadding,
  } = token;

  const borderBase = `${lineWidth}px ${lineType} ${colorBorder}`;

  return {
    [componentCls]: {
      ...resetComponent(token),
      backgroundColor: headerBg,
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
          padding: headerPadding,
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
        backgroundColor: contentBg,
        borderTop: borderBase,

        [`& > ${componentCls}-content-box`]: {
          padding: contentPadding,
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
    headerBg,
    paddingXXS,

    colorBorder,
  } = token;

  return {
    [`${componentCls}-borderless`]: {
      backgroundColor: headerBg,
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

export default genComponentStyleHook(
  'Collapse',
  (token) => {
    const collapseToken = mergeToken<CollapseToken>(token, {
      collapseHeaderPaddingSM: `${token.paddingXS}px ${token.paddingSM}px`,
      collapseHeaderPaddingLG: `${token.padding}px ${token.paddingLG}px`,
      collapsePanelBorderRadius: token.borderRadiusLG,
    });

    return [
      genBaseStyle(collapseToken),
      genBorderlessStyle(collapseToken),
      genGhostStyle(collapseToken),
      genArrowStyle(collapseToken),
      genCollapseMotion(collapseToken),
    ];
  },
  (token) => ({
    headerPadding: `${token.paddingSM}px ${token.padding}px`,
    headerBg: token.colorFillAlter,
    contentPadding: `${token.padding}px 16px`, // Fixed Value
    contentBg: token.colorBgContainer,
  }),
);
