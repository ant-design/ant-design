import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle, resetComponent, resetIcon } from '../../style';
import { genCollapseMotion } from '../../style/motion';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
  /**
   * @desc 折叠面板头部内边距
   * @descEN Padding of header
   */
  headerPadding: CSSProperties['padding'];
  /**
   * @desc 小号折叠面板头部内边距
   * @descEN Padding of small header
   */
  headerPaddingSM: CSSProperties['padding'];
  /**
   * @desc 大号折叠面板头部内边距
   * @descEN Padding of large header
   */
  headerPaddingLG: CSSProperties['padding'];
  /**
   * @desc 折叠面板头部背景
   * @descEN Background of header
   */
  headerBg: string;
  /**
   * @desc 折叠面板内容内边距
   * @descEN Padding of content
   */
  contentPadding: CSSProperties['padding'];
  /**
   * @desc 小号折叠面板内容内边距
   * @descEN Padding of small content
   */
  contentPaddingSM: CSSProperties['padding'];
  /**
   * @desc 大号折叠面板内容内边距
   * @descEN Padding of large content
   */
  contentPaddingLG: CSSProperties['padding'];
  /**
   * @desc 折叠面板内容背景
   * @descEN Background of content
   */
  contentBg: string;
  /**
   * @desc 简约风格折叠面板的内容内边距
   * @descEN Padding of content in borderless style
   */
  borderlessContentPadding: CSSProperties['padding'];
  /**
   * @desc 简约风格折叠面板的内容背景
   * @descEN Background of content in borderless style
   */
  borderlessContentBg: string;
}

type CollapseToken = FullToken<'Collapse'> & {
  /**
   * @desc 折叠面板边框圆角
   * @descEN Border radius of collapse panel
   */
  collapsePanelBorderRadius: number;
};

export const genBaseStyle: GenerateStyle<CollapseToken, CSSObject> = (token) => {
  const {
    componentCls,
    contentBg,
    padding,
    headerBg,
    headerPadding,
    headerPaddingSM,
    headerPaddingLG,
    collapsePanelBorderRadius,

    lineWidth,
    lineType,
    colorBorder,
    colorText,
    colorTextHeading,
    colorTextDisabled,
    fontSizeLG,
    lineHeight,
    lineHeightLG,
    marginSM,
    paddingSM,
    paddingLG,
    paddingXS,
    motionDurationSlow,
    fontSizeIcon,
    contentPadding,
    contentPaddingSM,
    contentPaddingLG,
    fontHeight,
    fontHeightLG,
  } = token;

  const borderBase = `${unit(lineWidth)} ${lineType} ${colorBorder}`;

  return {
    [componentCls]: {
      ...resetComponent(token),
      backgroundColor: headerBg,
      border: borderBase,
      borderRadius: collapsePanelBorderRadius,

      '&-rtl': {
        direction: 'rtl',
      },

      [`& > ${componentCls}-item`]: {
        borderBottom: borderBase,
        '&:first-child': {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)} 0 0`,
          },
        },

        '&:last-child': {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(
              collapsePanelBorderRadius,
            )}`,
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
          ...genFocusStyle(token),

          [`> ${componentCls}-title`]: {
            flex: 'auto',
          },

          // >>>>> Arrow
          [`${componentCls}-expand-icon`]: {
            height: fontHeight,
            display: 'flex',
            alignItems: 'center',
            marginInlineEnd: marginSM,
          },

          [`${componentCls}-arrow`]: {
            ...resetIcon(),
            fontSize: fontSizeIcon,
            // when `transform: rotate()` is applied to icon's root element
            transition: `transform ${motionDurationSlow}`,
            // when `transform: rotate()` is applied to icon's child element
            svg: {
              transition: `transform ${motionDurationSlow}`,
            },
          },

          // >>>>> Text
          [`${componentCls}-title`]: {
            marginInlineEnd: 'auto',
          },
        },

        [`${componentCls}-collapsible-header`]: {
          cursor: 'default',
          [`${componentCls}-title`]: {
            flex: 'none',
            cursor: 'pointer',
          },
          [`${componentCls}-expand-icon`]: {
            cursor: 'pointer',
          },
        },

        [`${componentCls}-collapsible-icon`]: {
          cursor: 'unset',

          [`${componentCls}-expand-icon`]: {
            cursor: 'pointer',
          },
        },
      },

      [`${componentCls}-panel`]: {
        color: colorText,
        backgroundColor: contentBg,
        borderTop: borderBase,

        [`& > ${componentCls}-body`]: {
          padding: contentPadding,
        },

        '&-hidden': {
          display: 'none',
        },
      },

      '&-small': {
        [`> ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            padding: headerPaddingSM,

            [`> ${componentCls}-expand-icon`]: {
              // Arrow offset
              marginInlineStart: token.calc(paddingSM).sub(paddingXS).equal(),
            },
          },
          [`> ${componentCls}-panel > ${componentCls}-body`]: {
            padding: contentPaddingSM,
          },
        },
      },

      '&-large': {
        [`> ${componentCls}-item`]: {
          fontSize: fontSizeLG,
          lineHeight: lineHeightLG,
          [`> ${componentCls}-header`]: {
            padding: headerPaddingLG,

            [`> ${componentCls}-expand-icon`]: {
              height: fontHeightLG,
              // Arrow offset
              marginInlineStart: token.calc(paddingLG).sub(padding).equal(),
            },
          },
          [`> ${componentCls}-panel > ${componentCls}-body`]: {
            padding: contentPaddingLG,
          },
        },
      },

      [`${componentCls}-item:last-child`]: {
        borderBottom: 0,

        [`> ${componentCls}-panel`]: {
          borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}`,
        },
      },

      [`& ${componentCls}-item-disabled > ${componentCls}-header`]: {
        '&, & > .arrow': {
          color: colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      // ========================== Icon Placement ==========================
      [`&${componentCls}-icon-placement-end`]: {
        [`& > ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            [`${componentCls}-expand-icon`]: {
              order: 1,
              marginInlineEnd: 0,
              marginInlineStart: marginSM,
            },
          },
        },
      },
    },
  };
};

const genArrowStyle: GenerateStyle<CollapseToken, CSSObject> = (token) => {
  const { componentCls } = token;

  const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow`;

  return {
    [`${componentCls}-rtl`]: {
      [fixedSelector]: {
        transform: `rotate(180deg)`,
      },
    },
  };
};

const genBorderlessStyle: GenerateStyle<CollapseToken, CSSObject> = (token) => {
  const { componentCls, headerBg, borderlessContentPadding, borderlessContentBg, colorBorder } =
    token;

  return {
    [`${componentCls}-borderless`]: {
      backgroundColor: headerBg,
      border: 0,

      [`> ${componentCls}-item`]: {
        borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${colorBorder}`,
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

      [`> ${componentCls}-item > ${componentCls}-panel`]: {
        backgroundColor: borderlessContentBg,
        borderTop: 0,
      },

      [`> ${componentCls}-item > ${componentCls}-panel > ${componentCls}-body`]: {
        padding: borderlessContentPadding,
      },
    },
  };
};

const genGhostStyle: GenerateStyle<CollapseToken, CSSObject> = (token) => {
  const { componentCls, paddingSM } = token;

  return {
    [`${componentCls}-ghost`]: {
      backgroundColor: 'transparent',
      border: 0,
      [`> ${componentCls}-item`]: {
        borderBottom: 0,
        [`> ${componentCls}-panel`]: {
          backgroundColor: 'transparent',
          border: 0,
          [`> ${componentCls}-body`]: {
            paddingBlock: paddingSM,
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Collapse'> = (token) => {
  const componentToken: ComponentToken = {
    headerPadding: `${unit(token.paddingSM)} ${unit(token.padding)}`,
    headerPaddingSM: `${unit(token.paddingXS)} ${unit(token.paddingSM)} ${unit(token.paddingXS)} ${unit(token.paddingXS)}`,
    headerPaddingLG: `${unit(token.padding)} ${unit(token.paddingLG)} ${unit(token.padding)} ${unit(token.padding)}`,
    headerBg: token.colorFillAlter,
    contentPadding: `${unit(token.padding)} ${unit(16)}`, // Fixed Value
    contentPaddingSM: token.paddingSM,
    contentPaddingLG: token.paddingLG,
    contentBg: token.colorBgContainer,
    borderlessContentPadding: `${unit(token.paddingXXS)} ${unit(16)} ${unit(token.padding)}`,
    borderlessContentBg: 'transparent',
  };

  return componentToken;
};

export default genStyleHooks(
  'Collapse',
  (token) => {
    const collapseToken = mergeToken<CollapseToken>(token, {
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
  prepareComponentToken,
);
