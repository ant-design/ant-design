import type { CSSObject } from '@ant-design/cssinjs';
import {
  genBasicInputStyle,
  genInputSmallStyle,
  initInputToken,
  type InputToken,
} from '../../input/style';
import { genFocusOutline, genFocusStyle, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  itemBg: string;
  itemSize: number;
  itemActiveBg: string;
  itemSizeSM: number;
  itemLinkBg: string;
  itemActiveBgDisabled: string;
  itemActiveColorDisabled: string;
  itemInputBg: string;
  miniOptionsSizeChangerTop: number;
}

interface PaginationToken extends InputToken<FullToken<'Pagination'>> {
  inputOutlineOffset: number;
  paginationMiniOptionsMarginInlineStart: number;
  paginationMiniQuickJumperInputWidth: number;
  paginationItemPaddingInline: number;
  paginationEllipsisLetterSpacing: number;
  paginationEllipsisTextIndent: string;
  paginationSlashMarginInlineStart: number;
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
      [`&${componentCls}-mini`]: {
        [`
          &:hover ${componentCls}-item:not(${componentCls}-item-active),
          &:active ${componentCls}-item:not(${componentCls}-item-active),
          &:hover ${componentCls}-item-link,
          &:active ${componentCls}-item-link
        `]: {
          backgroundColor: 'transparent',
        },
      },
      [`${componentCls}-item`]: {
        cursor: 'not-allowed',

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
    [`&${componentCls}-simple`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        [`&${componentCls}-disabled ${componentCls}-item-link`]: {
          '&:hover, &:active': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  };
};

const genPaginationMiniStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-mini ${componentCls}-total-text, &${componentCls}-mini ${componentCls}-simple-pager`]:
      {
        height: token.itemSizeSM,
        lineHeight: `${token.itemSizeSM}px`,
      },

    [`&${componentCls}-mini ${componentCls}-item`]: {
      minWidth: token.itemSizeSM,
      height: token.itemSizeSM,
      margin: 0,
      lineHeight: `${token.itemSizeSM - 2}px`,
    },

    [`&${componentCls}-mini ${componentCls}-item:not(${componentCls}-item-active)`]: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
      '&:active': {
        backgroundColor: token.colorBgTextActive,
      },
    },

    [`&${componentCls}-mini ${componentCls}-prev, &${componentCls}-mini ${componentCls}-next`]: {
      minWidth: token.itemSizeSM,
      height: token.itemSizeSM,
      margin: 0,
      lineHeight: `${token.itemSizeSM}px`,
      [`&:hover ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextHover,
      },
      [`&:active ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextActive,
      },
      [`&${componentCls}-disabled:hover ${componentCls}-item-link`]: {
        backgroundColor: 'transparent',
      },
    },

    [`
    &${componentCls}-mini ${componentCls}-prev ${componentCls}-item-link,
    &${componentCls}-mini ${componentCls}-next ${componentCls}-item-link
    `]: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',

      '&::after': {
        height: token.itemSizeSM,
        lineHeight: `${token.itemSizeSM}px`,
      },
    },

    [`&${componentCls}-mini ${componentCls}-jump-prev, &${componentCls}-mini ${componentCls}-jump-next`]:
      {
        height: token.itemSizeSM,
        marginInlineEnd: 0,
        lineHeight: `${token.itemSizeSM}px`,
      },

    [`&${componentCls}-mini ${componentCls}-options`]: {
      marginInlineStart: token.paginationMiniOptionsMarginInlineStart,

      [`&-size-changer`]: {
        top: token.miniOptionsSizeChangerTop,
      },

      [`&-quick-jumper`]: {
        height: token.itemSizeSM,
        lineHeight: `${token.itemSizeSM}px`,

        input: {
          ...genInputSmallStyle(token),

          width: token.paginationMiniQuickJumperInputWidth,
          height: token.controlHeightSM,
        },
      },
    },
  };
};

const genPaginationSimpleStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`
    &${componentCls}-simple ${componentCls}-prev,
    &${componentCls}-simple ${componentCls}-next
    `]: {
      height: token.itemSizeSM,
      lineHeight: `${token.itemSizeSM}px`,
      verticalAlign: 'top',
      [`${componentCls}-item-link`]: {
        height: token.itemSizeSM,
        backgroundColor: 'transparent',
        border: 0,
        '&:hover': {
          backgroundColor: token.colorBgTextHover,
        },
        '&:active': {
          backgroundColor: token.colorBgTextActive,
        },
        '&::after': {
          height: token.itemSizeSM,
          lineHeight: `${token.itemSizeSM}px`,
        },
      },
    },

    [`&${componentCls}-simple ${componentCls}-simple-pager`]: {
      display: 'inline-block',
      height: token.itemSizeSM,
      marginInlineEnd: token.marginXS,

      input: {
        boxSizing: 'border-box',
        height: '100%',
        marginInlineEnd: token.marginXS,
        padding: `0 ${token.paginationItemPaddingInline}px`,
        textAlign: 'center',
        backgroundColor: token.itemInputBg,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
        borderRadius: token.borderRadius,
        outline: 'none',
        transition: `border-color ${token.motionDurationMid}`,
        color: 'inherit',

        '&:hover': {
          borderColor: token.colorPrimary,
        },

        '&:focus': {
          borderColor: token.colorPrimaryHover,
          boxShadow: `${token.inputOutlineOffset}px 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
        },

        '&[disabled]': {
          color: token.colorTextDisabled,
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          cursor: 'not-allowed',
        },
      },
    },
  };
};

const genPaginationJumpStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

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
          fontFamily: 'Arial, Helvetica, sans-serif',
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

    [`
    ${componentCls}-prev,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      marginInlineEnd: token.marginXS,
    },

    [`
    ${componentCls}-prev,
    ${componentCls}-next,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      display: 'inline-block',
      minWidth: token.itemSize,
      height: token.itemSize,
      color: token.colorText,
      fontFamily: token.fontFamily,
      lineHeight: `${token.itemSize}px`,
      textAlign: 'center',
      verticalAlign: 'middle',
      listStyle: 'none',
      borderRadius: token.borderRadius,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid}`,
    },

    [`${componentCls}-prev, ${componentCls}-next`]: {
      fontFamily: 'Arial, Helvetica, sans-serif',
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
        border: `${token.lineWidth}px ${token.lineType} transparent`,
        borderRadius: token.borderRadius,
        outline: 'none',
        transition: `border ${token.motionDurationMid}`,
      },

      [`&:focus-visible ${componentCls}-item-link`]: {
        ...genFocusOutline(token),
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
      display: 'inline-block',
      marginInlineStart: token.margin,
      verticalAlign: 'middle',

      '&-size-changer.-select': {
        display: 'inline-block',
        width: 'auto',
      },

      '&-quick-jumper': {
        display: 'inline-block',
        height: token.controlHeight,
        marginInlineStart: token.marginXS,
        lineHeight: `${token.controlHeight}px`,
        verticalAlign: 'top',

        input: {
          ...genBasicInputStyle(token),

          width: token.controlHeightLG * 1.25,
          height: token.controlHeight,
          boxSizing: 'border-box',
          margin: 0,
          marginInlineStart: token.marginXS,
          marginInlineEnd: token.marginXS,
        },
      },
    },
  };
};

const genPaginationItemStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-item`]: {
      display: 'inline-block',
      minWidth: token.itemSize,
      height: token.itemSize,
      marginInlineEnd: token.marginXS,
      fontFamily: token.fontFamily,
      lineHeight: `${token.itemSize - 2}px`,
      textAlign: 'center',
      verticalAlign: 'middle',
      listStyle: 'none',
      backgroundColor: 'transparent',
      border: `${token.lineWidth}px ${token.lineType} transparent`,
      borderRadius: token.borderRadius,
      outline: 0,
      cursor: 'pointer',
      userSelect: 'none',

      a: {
        display: 'block',
        padding: `0 ${token.paginationItemPaddingInline}px`,
        color: token.colorText,
        transition: 'none',

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

      // cannot merge with `&:hover`
      // see https://github.com/ant-design/ant-design/pull/34002
      ...genFocusStyle(token),

      '&-active': {
        fontWeight: token.fontWeightStrong,
        backgroundColor: token.itemActiveBg,
        borderColor: token.colorPrimary,

        a: {
          color: token.colorPrimary,
        },

        '&:hover': {
          borderColor: token.colorPrimaryHover,
        },

        '&:hover a': {
          color: token.colorPrimaryHover,
        },
      },
    },
  };
};

const genPaginationStyle: GenerateStyle<PaginationToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

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
        display: 'inline-block',
        height: token.itemSize,
        marginInlineEnd: token.marginXS,
        lineHeight: `${token.itemSize - 2}px`,
        verticalAlign: 'middle',
      },

      // item style
      ...genPaginationItemStyle(token),

      // jump btn style
      ...genPaginationJumpStyle(token),

      // simple style
      ...genPaginationSimpleStyle(token),

      // mini style
      ...genPaginationMiniStyle(token),

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

const genBorderedStyle: GenerateStyle<PaginationToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}${componentCls}-disabled`]: {
      '&, &:hover': {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder,
        },
      },

      '&:focus-visible': {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder,
        },
      },

      [`${componentCls}-item, ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgContainerDisabled,
        borderColor: token.colorBorder,

        [`&:hover:not(${componentCls}-item-active)`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,

          a: {
            color: token.colorTextDisabled,
          },
        },

        [`&${componentCls}-item-active`]: {
          backgroundColor: token.itemActiveBgDisabled,
        },
      },

      [`${componentCls}-prev, ${componentCls}-next`]: {
        '&:hover button': {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          color: token.colorTextDisabled,
        },

        [`${componentCls}-item-link`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
        },
      },
    },

    [componentCls]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        '&:hover button': {
          borderColor: token.colorPrimaryHover,
          backgroundColor: token.itemBg,
        },

        [`${componentCls}-item-link`]: {
          backgroundColor: token.itemLinkBg,
          borderColor: token.colorBorder,
        },

        [`&:hover ${componentCls}-item-link`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,
          color: token.colorPrimary,
        },

        [`&${componentCls}-disabled`]: {
          [`${componentCls}-item-link`]: {
            borderColor: token.colorBorder,
            color: token.colorTextDisabled,
          },
        },
      },

      [`${componentCls}-item`]: {
        backgroundColor: token.itemBg,
        border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,

        [`&:hover:not(${componentCls}-item-active)`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,

          a: {
            color: token.colorPrimary,
          },
        },

        '&-active': {
          borderColor: token.colorPrimary,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Pagination',
  (token) => {
    const paginationToken = mergeToken<PaginationToken>(
      token,
      {
        inputOutlineOffset: 0,
        paginationMiniOptionsMarginInlineStart: token.marginXXS / 2,
        paginationMiniQuickJumperInputWidth: token.controlHeightLG * 1.1,
        paginationItemPaddingInline: token.marginXXS * 1.5,
        paginationEllipsisLetterSpacing: token.marginXXS / 2,
        paginationSlashMarginInlineStart: token.marginXXS,
        paginationSlashMarginInlineEnd: token.marginSM,
        paginationEllipsisTextIndent: '0.13em', // magic for ui experience
      },
      initInputToken(token),
    );
    return [
      genPaginationStyle(paginationToken),
      token.wireframe && genBorderedStyle(paginationToken),
    ];
  },
  (token) => ({
    itemBg: token.colorBgContainer,
    itemSize: token.controlHeight,
    itemSizeSM: token.controlHeightSM,
    itemActiveBg: token.colorBgContainer,
    itemLinkBg: token.colorBgContainer,
    itemActiveColorDisabled: token.colorTextDisabled,
    itemActiveBgDisabled: token.controlItemBgActiveDisabled,
    itemInputBg: token.colorBgContainer,
    miniOptionsSizeChangerTop: 0,
  }),
);
