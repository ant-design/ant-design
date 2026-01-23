import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import {
  genBasicInputStyle,
  genInputLargeStyle,
  genInputSmallStyle,
  initComponentToken,
  initInputToken,
} from '../../input/style';
import type { SharedComponentToken, SharedInputToken } from '../../input/style/token';
import { genBaseOutlinedStyle, genDisabledStyle } from '../../input/style/variants';
import { genFocusOutline, genFocusStyle, resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GenStyleFn, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

export interface ComponentToken {
  /**
   * @desc 页码选项背景色
   * @descEN Background color of Pagination item
   */
  itemBg: string;
  /**
   * @desc 页码尺寸
   * @descEN Size of Pagination item
   */
  itemSize: number;
  /**
   * @desc 小号页码尺寸
   * @descEN Size of small Pagination item
   */
  itemSizeSM: number;
  /**
   * @desc 大号页码尺寸
   * @descEN Size of large Pagination item
   */
  itemSizeLG: number;
  /**
   * @desc 页码激活态背景色
   * @descEN Background color of active Pagination item
   */
  itemActiveBg: string;
  /**
   * @desc 页码激活态文字颜色
   * @descEN Text color of active Pagination item
   */
  itemActiveColor: string;
  /**
   * @desc 页码激活态文字颜色悬停态
   * @descEN Text color of active Pagination item hover
   */
  itemActiveColorHover: string;
  /**
   * @desc 页码链接背景色
   * @descEN Background color of Pagination item link
   */
  itemLinkBg: string;
  /**
   * @desc 页码激活态禁用状态背景色
   * @descEN Background color of disabled active Pagination item
   */
  itemActiveBgDisabled: string;
  /**
   * @desc 页码激活态禁用状态文字颜色
   * @descEN Text color of disabled active Pagination item
   */
  itemActiveColorDisabled: string;
  /**
   * @desc 输入框背景色
   * @descEN Background color of input
   */
  itemInputBg: string;
  /**
   * @desc 每页展示数量选择器 top
   * @descEN Top of Pagination size changer
   */
  miniOptionsSizeChangerTop: number;
}

/**
 * @desc Pagination 组件的 Token
 * @descEN Token for Pagination component
 */
export interface PaginationToken
  extends FullToken<'Pagination'>,
    SharedComponentToken,
    SharedInputToken {
  /**
   * @desc 输入框轮廓偏移量
   * @descEN Outline offset of input
   */
  inputOutlineOffset: number;
  /**
   * @desc 快速跳转输入框宽度
   * @descEN Width of quick jumper input
   */
  quickJumperInputWidth: number | string;
  /**
   * @desc 迷你选项横向外边距
   * @descEN Horizontal margin of mini options
   */
  paginationMiniOptionsMarginInlineStart: number | string;
  /**
   * @desc 迷你快速跳转输入框宽度
   * @descEN Width of mini quick jumper input
   */
  paginationMiniQuickJumperInputWidth: number | string;
  /**
   * @desc 页码横向内边距
   * @descEN Horizontal padding of Pagination item
   */
  paginationItemPaddingInline: number | string;
  /**
   * @desc 省略号字母间距
   * @descEN Letter spacing of ellipsis
   */
  paginationEllipsisLetterSpacing: number | string;
  /**
   * @desc 省略号文本缩进
   * @descEN Text indent of ellipsis
   */
  paginationEllipsisTextIndent: string;
  /**
   * @desc 斜杠横向外边距
   * @descEN Horizontal margin of slash
   */
  paginationSlashMarginInlineStart: number;
  /**
   * @desc 斜杠横向外边距
   * @descEN Horizontal margin of slash
   */
  paginationSlashMarginInlineEnd: number;
}

const genPaginationDisabledStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-disabled`]: {
      '&, &:hover': {
        cursor: 'not-allowed',

        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      '&:focus-visible': {
        cursor: 'not-allowed',

        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          cursor: 'not-allowed',
        },
      },
    },

    [`&${componentCls}-disabled`]: {
      cursor: 'not-allowed',
      [`${componentCls}-item`]: {
        cursor: 'not-allowed',
        backgroundColor: 'transparent',

        '&:hover, &:active': {
          backgroundColor: 'transparent',
        },

        a: {
          color: token.colorTextDisabled,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'not-allowed',
        },

        '&-active': {
          borderColor: token.colorBorder,
          backgroundColor: token.itemActiveBgDisabled,

          '&:hover, &:active': {
            backgroundColor: token.itemActiveBgDisabled,
          },

          a: {
            color: token.itemActiveColorDisabled,
          },
        },
      },

      [`${componentCls}-item-link`]: {
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
        '&:hover, &:active': {
          backgroundColor: 'transparent',
        },
        [`${componentCls}-simple&`]: {
          backgroundColor: 'transparent',
          '&:hover, &:active': {
            backgroundColor: 'transparent',
          },
        },
      },

      [`${componentCls}-simple-pager`]: {
        color: token.colorTextDisabled,
      },

      [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
        [`${componentCls}-item-link-icon`]: {
          opacity: 0,
        },

        [`${componentCls}-item-ellipsis`]: {
          opacity: 1,
        },
      },
    },
  };
};

const genPaginationSmallStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-small ${componentCls}-options`]: {
      marginInlineStart: token.paginationMiniOptionsMarginInlineStart,

      '&-quick-jumper': {
        input: {
          ...genInputSmallStyle(token),

          width: token.paginationMiniQuickJumperInputWidth,
        },
      },
    },
  };
};

const genPaginationLargeStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-large ${componentCls}-options`]: {
      '&-quick-jumper': {
        input: {
          ...genInputLargeStyle(token),
        },
      },
    },
  };
};

const genPaginationSimpleStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;

  const [, varRef] = genCssVar(antCls, 'pagination');

  return {
    [`&${componentCls}-simple`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        height: varRef(`item-size-actual`),
        lineHeight: varRef(`item-size-actual`),
        [`${componentCls}-item-link`]: {
          height: varRef(`item-size-actual`),
          backgroundColor: 'transparent',
          border: 0,
          '&:hover': {
            backgroundColor: token.colorBgTextHover,
          },
          '&:active': {
            backgroundColor: token.colorBgTextActive,
          },
          '&::after': {
            height: varRef(`item-size-actual`),
            lineHeight: varRef(`item-size-actual`),
          },
        },
      },

      [`${componentCls}-simple-pager`]: {
        display: 'inline-flex',
        alignItems: 'center',
        height: varRef(`item-size-actual`),
        marginInlineEnd: varRef(`item-spacing-actual`),

        input: {
          boxSizing: 'border-box',
          height: '100%',
          width: token.quickJumperInputWidth,
          padding: `0 ${unit(token.paginationItemPaddingInline)}`,
          textAlign: 'center',
          backgroundColor: token.itemInputBg,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadius,
          outline: 'none',
          transition: `border-color ${token.motionDurationMid}`,
          color: 'inherit',

          '&:hover': {
            borderColor: token.colorPrimary,
          },

          '&:focus': {
            borderColor: token.colorPrimaryHover,
            boxShadow: `${unit(token.inputOutlineOffset)} 0 ${unit(token.controlOutlineWidth)} ${
              token.controlOutline
            }`,
          },

          '&[disabled]': {
            color: token.colorTextDisabled,
            backgroundColor: token.colorBgContainerDisabled,
            borderColor: token.colorBorder,
            cursor: 'not-allowed',
          },
        },
      },

      [`&${componentCls}-disabled`]: {
        [`${componentCls}-prev, ${componentCls}-next`]: {
          [`${componentCls}-item-link`]: {
            '&:hover, &:active': {
              backgroundColor: 'transparent',
            },
          },
        },
      },

      [`&${componentCls}-small`]: {
        [`${componentCls}-simple-pager`]: {
          input: {
            width: token.paginationMiniQuickJumperInputWidth,
          },
        },
      },
    },
  };
};

const genPaginationJumpStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;

  const [, varRef] = genCssVar(antCls, 'pagination');

  return {
    [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
      outline: 0,

      [`${componentCls}-item-container`]: {
        position: 'relative',

        [`${componentCls}-item-link-icon`]: {
          color: token.colorPrimary,
          fontSize: token.fontSizeSM,
          opacity: 0,
          transition: `all ${token.motionDurationMid}`,

          '&-svg': {
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            margin: 'auto',
          },
        },

        [`${componentCls}-item-ellipsis`]: {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          display: 'block',
          margin: 'auto',
          color: token.colorTextDisabled,
          letterSpacing: token.paginationEllipsisLetterSpacing,
          textAlign: 'center',
          textIndent: token.paginationEllipsisTextIndent,
          opacity: 1,
          transition: `all ${token.motionDurationMid}`,
        },
      },

      '&:hover': {
        [`${componentCls}-item-link-icon`]: {
          opacity: 1,
        },
        [`${componentCls}-item-ellipsis`]: {
          opacity: 0,
        },
      },
    },

    [`
    ${componentCls}-prev,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      marginInlineEnd: varRef(`item-spacing-actual`),
    },

    [`
    ${componentCls}-prev,
    ${componentCls}-next,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: varRef(`item-size-actual`),
      height: varRef(`item-size-actual`),
      color: token.colorText,
      fontFamily: token.fontFamily,
      lineHeight: varRef(`item-size-actual`),
      textAlign: 'center',
      listStyle: 'none',
      borderRadius: token.borderRadius,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid}`,
    },

    [`${componentCls}-prev, ${componentCls}-next`]: {
      outline: 0,

      button: {
        color: token.colorText,
        cursor: 'pointer',
        userSelect: 'none',
      },

      [`${componentCls}-item-link`]: {
        display: 'block',
        width: '100%',
        height: '100%',
        padding: 0,
        fontSize: token.fontSizeSM,
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
        borderRadius: token.borderRadius,
        outline: 'none',
        transition: `all ${token.motionDurationMid}`,
      },

      [`&:hover ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextHover,
      },

      [`&:active ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextActive,
      },

      [`&${componentCls}-disabled:hover`]: {
        [`${componentCls}-item-link`]: {
          backgroundColor: 'transparent',
        },
      },
    },

    [`${componentCls}-slash`]: {
      marginInlineEnd: token.paginationSlashMarginInlineEnd,
      marginInlineStart: token.paginationSlashMarginInlineStart,
    },

    [`${componentCls}-options`]: {
      display: 'inline-flex',
      alignItems: 'center',
      marginInlineStart: token.margin,

      '&-size-changer': {
        width: 'auto',
      },

      '&-quick-jumper': {
        display: 'inline-flex',
        alignItems: 'center',
        height: varRef(`item-size-actual`),
        marginInlineStart: token.marginXS,
        lineHeight: varRef(`item-size-actual`),

        input: {
          ...genBasicInputStyle(token),
          ...genBaseOutlinedStyle(token, {
            borderColor: token.colorBorder,
            hoverBorderColor: token.colorPrimaryHover,
            activeBorderColor: token.colorPrimary,
            activeShadow: token.activeShadow,
          }),
          '&[disabled]': {
            ...genDisabledStyle(token),
          },

          width: token.quickJumperInputWidth,
          height: varRef(`item-size-actual`),
          boxSizing: 'border-box',
          margin: 0,
          marginInlineStart: varRef(`item-spacing-actual`),
          marginInlineEnd: varRef(`item-spacing-actual`),
        },
      },
    },
  };
};

const genPaginationItemStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;

  const [, varRef] = genCssVar(antCls, 'pagination');

  return {
    [`${componentCls}-item`]: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: varRef(`item-size-actual`),
      height: varRef(`item-size-actual`),
      marginInlineEnd: varRef(`item-spacing-actual`),
      fontFamily: token.fontFamily,
      lineHeight: unit(token.calc(varRef('item-size-actual')).sub(2).equal()),
      textAlign: 'center',
      listStyle: 'none',
      backgroundColor: token.itemBg,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      borderRadius: token.borderRadius,
      outline: 0,
      cursor: 'pointer',
      userSelect: 'none',

      a: {
        display: 'block',
        padding: `0 ${unit(token.paginationItemPaddingInline)}`,
        color: token.colorText,

        '&:hover': {
          textDecoration: 'none',
        },
      },

      [`&:not(${componentCls}-item-active)`]: {
        '&:hover': {
          transition: `all ${token.motionDurationMid}`,
          backgroundColor: token.colorBgTextHover,
        },

        '&:active': {
          backgroundColor: token.colorBgTextActive,
        },
      },

      '&-active': {
        fontWeight: token.fontWeightStrong,
        backgroundColor: token.itemActiveBg,
        borderColor: token.colorPrimary,

        a: {
          color: token.itemActiveColor,
        },

        '&:hover': {
          borderColor: token.colorPrimaryHover,
        },

        '&:hover a': {
          color: token.itemActiveColorHover,
        },
      },
    },
  };
};

const genPaginationStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;

  const [varName, varRef] = genCssVar(antCls, 'pagination');

  return {
    [componentCls]: {
      [varName(`item-size-actual`)]: unit(token.itemSize),
      [varName(`item-spacing-actual`)]: unit(token.marginXS),
      '&-small': {
        [varName(`item-size-actual`)]: unit(token.itemSizeSM),
        [varName(`item-spacing-actual`)]: unit(token.marginXXS),
      },
      '&-large': {
        [varName(`item-size-actual`)]: unit(token.itemSizeLG),
        [varName(`item-spacing-actual`)]: unit(token.marginSM),
      },

      ...resetComponent(token),
      display: 'flex',
      alignItems: 'center',

      '&-start': {
        justifyContent: 'start',
      },

      '&-center': {
        justifyContent: 'center',
      },

      '&-end': {
        justifyContent: 'end',
      },

      'ul, ol': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      '&::after': {
        display: 'block',
        clear: 'both',
        height: 0,
        overflow: 'hidden',
        visibility: 'hidden',
        content: '""',
      },

      [`${componentCls}-total-text`]: {
        display: 'inline-flex',
        alignItems: 'center',
        height: varRef(`item-size-actual`),
        marginInlineEnd: varRef(`item-spacing-actual`),
        lineHeight: unit(token.calc(varRef(`item-size-actual`)).sub(2).equal()),
      },

      // item style
      ...genPaginationItemStyle(token),

      // jump btn style
      ...genPaginationJumpStyle(token),

      // simple style
      ...genPaginationSimpleStyle(token),

      // size style
      ...genPaginationSmallStyle(token),
      ...genPaginationLargeStyle(token),

      // disabled style
      ...genPaginationDisabledStyle(token),

      // media query style
      [`@media only screen and (max-width: ${token.screenLG}px)`]: {
        [`${componentCls}-item`]: {
          '&-after-jump-prev, &-before-jump-next': {
            display: 'none',
          },
        },
      },

      [`@media only screen and (max-width: ${token.screenSM}px)`]: {
        [`${componentCls}-options`]: {
          display: 'none',
        },
      },
    },

    // rtl style
    [`&${token.componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

const genPaginationFocusStyle: GenerateStyle<PaginationToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}:not(${componentCls}-disabled)`]: {
      [`${componentCls}-item`]: {
        ...genFocusStyle(token),
      },

      [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
        '&:focus-visible': {
          [`${componentCls}-item-link-icon`]: {
            opacity: 1,
          },
          [`${componentCls}-item-ellipsis`]: {
            opacity: 0,
          },
          ...genFocusOutline(token),
        },
      },

      [`${componentCls}-prev, ${componentCls}-next`]: {
        [`&:focus-visible ${componentCls}-item-link`]: genFocusOutline(token),
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Pagination'> = (token) => ({
  itemBg: token.colorBgContainer,
  itemSize: token.controlHeight,
  itemSizeSM: token.controlHeightSM,
  itemSizeLG: token.controlHeightLG,
  itemActiveBg: token.colorBgContainer,
  itemActiveColor: token.colorPrimary,
  itemActiveColorHover: token.colorPrimaryHover,
  itemLinkBg: token.colorBgContainer,
  itemActiveColorDisabled: token.colorTextDisabled,
  itemActiveBgDisabled: token.controlItemBgActiveDisabled,
  itemInputBg: token.colorBgContainer,
  miniOptionsSizeChangerTop: 0,
  ...initComponentToken(token),
});

export const prepareToken = (token: Parameters<GenStyleFn<'Pagination'>>[0]) =>
  mergeToken<PaginationToken>(
    token,
    {
      inputOutlineOffset: 0,
      quickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.25).equal(),
      paginationMiniOptionsMarginInlineStart: token.calc(token.marginXXS).div(2).equal(),
      paginationMiniQuickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.1).equal(),
      paginationItemPaddingInline: token.calc(token.marginXXS).mul(1.5).equal(),
      paginationEllipsisLetterSpacing: token.calc(token.marginXXS).div(2).equal(),
      paginationSlashMarginInlineStart: token.marginSM,
      paginationSlashMarginInlineEnd: token.marginSM,
      paginationEllipsisTextIndent: '0.13em', // magic for ui experience
    },
    initInputToken(token),
  );

// ============================== Export ==============================
export default genStyleHooks(
  'Pagination',
  (token) => {
    const paginationToken = prepareToken(token);
    return [genPaginationStyle(paginationToken), genPaginationFocusStyle(paginationToken)];
  },
  prepareComponentToken,
);
