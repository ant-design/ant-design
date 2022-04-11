// deps-lint-skip-all
import { TinyColor } from '@ctrl/tinycolor';
import { CSSObject } from '@ant-design/cssinjs';
import {
  initInputToken,
  genBasicInputStyle,
  genInputSmallStyle,
  type InputToken,
} from '../../input/style';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

interface PaginationToken extends InputToken<FullToken<'Pagination'>> {
  paginationItemSize: number;
  paginationFontFamily: string;
  paginationItemBg: string;
  paginationItemBgActive: string;
  paginationFontWeightActive: number;
  paginationItemSizeSM: number;
  paginationItemInputBg: string;
  paginationMiniOptionsSizeChangerTop: number;
  paginationItemDisabledBgActive: string;
  paginationItemDisabledColorActive: string;
  paginationItemLinkBg: string;
  inputOutlineOffset: string;
}

const genPaginationDisabledStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-disabled`]: {
      '&, &:hover': {
        cursor: 'not-allowed',

        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          borderColor: token.colorBorder,
          cursor: 'not-allowed',
        },
      },

      '&:focus-visible': {
        cursor: 'not-allowed',

        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          borderColor: token.colorBorder,
          cursor: 'not-allowed',
        },
      },
    },

    [`&${componentCls}-disabled`]: {
      cursor: 'not-allowed',

      [`${componentCls}-item`]: {
        background: token.colorBgComponentDisabled,
        borderColor: token.colorBorder,
        cursor: 'not-allowed',

        a: {
          color: token.colorTextDisabled,
          background: 'transparent',
          border: 'none',
          cursor: 'not-allowed',
        },

        '&-active': {
          background: token.paginationItemDisabledBgActive,

          a: {
            color: token.paginationItemDisabledColorActive,
          },
        },
      },

      [`${componentCls}-item-link`]: {
        color: token.colorTextDisabled,
        background: token.colorBgComponentDisabled,
        borderColor: token.colorBorder,
        cursor: 'not-allowed',

        [`${componentCls}-simple&`]: {
          background: 'transparent',
        },
      },

      [`${componentCls}-item-link-icon`]: {
        opacity: 0,
      },

      [`${componentCls}-item-ellipsis`]: {
        opacity: 1,
      },

      [`${componentCls}-simple-pager`]: {
        color: token.colorTextDisabled,
      },
    },
  };
};

const genPaginationMiniStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`&.mini ${componentCls}-total-text, &.mini ${componentCls}-simple-pager`]: {
      height: token.paginationItemSizeSM,
      lineHeight: `${token.paginationItemSizeSM}px`,
    },

    [`&.mini ${componentCls}-item`]: {
      minWidth: token.paginationItemSizeSM,
      height: token.paginationItemSizeSM,
      margin: 0,
      lineHeight: `${token.paginationItemSizeSM - 2}px`,
    },

    [`&.mini ${componentCls}-item:not(${componentCls}-item-active)`]: {
      background: 'transparent',
      borderColor: 'transparent',
    },

    [`&.mini ${componentCls}-prev, &.mini ${componentCls}-next`]: {
      minWidth: token.paginationItemSizeSM,
      height: token.paginationItemSizeSM,
      margin: 0,
      lineHeight: `${token.paginationItemSizeSM}px`,
    },

    [`
    &.mini ${componentCls}-prev ${componentCls}-item-link,
    &.mini ${componentCls}-next ${componentCls}-item-link
    `]: {
      background: 'transparent',
      borderColor: 'transparent',

      '&::after': {
        height: token.paginationItemSizeSM,
        lineHeight: `${token.paginationItemSizeSM}px`,
      },
    },

    [`&.mini ${componentCls}-jump-prev, &.mini ${componentCls}-jump-next`]: {
      height: token.paginationItemSizeSM,
      marginInlineEnd: 0,
      lineHeight: `${token.paginationItemSizeSM}px`,
    },

    [`&.mini ${componentCls}-options`]: {
      // FIXME
      marginInlineStart: 2,

      [`&-size-changer`]: {
        top: token.paginationMiniOptionsSizeChangerTop,
      },

      [`&-quick-jumper`]: {
        height: token.paginationItemSizeSM,
        lineHeight: `${token.paginationItemSizeSM}px`,

        input: {
          ...genInputSmallStyle(token),

          // FIXME
          width: 44,
          height: token.controlHeightSM,
        },
      },
    },
  };
};

const genPaginationSimpleStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`
    &${componentCls}-simple ${componentCls}-prev,
    &${componentCls}-simple ${componentCls}-next
    `]: {
      height: token.paginationItemSizeSM,
      lineHeight: `${token.paginationItemSizeSM}px`,
      verticalAlign: 'top',
      [`${componentCls}-item-link`]: {
        height: token.paginationItemSizeSM,
        backgroundColor: 'transparent',
        border: 0,

        '&::after': {
          height: token.paginationItemSizeSM,
          lineHeight: `${token.paginationItemSizeSM}px`,
        },
      },
    },

    [`&${componentCls}-simple ${componentCls}-simple-pager`]: {
      display: 'inline-block',
      height: token.paginationItemSizeSM,
      marginInlineEnd: token.marginXS,

      input: {
        boxSizing: 'border-box',
        height: '100%',
        marginInlineEnd: token.marginXS,
        // FIXME: hardcode in v4
        padding: '0 6px',
        textAlign: 'center',
        backgroundColor: token.paginationItemInputBg,
        border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
        borderRadius: token.radiusBase,
        outline: 'none',
        transition: `border-color ${token.motionDurationSlow}`,

        '&:hover': {
          borderColor: token.colorPrimary,
        },

        '&:focus': {
          borderColor: token.colorPrimaryHover,
          boxShadow: `${token.inputOutlineOffset} 0 ${token.controlOutlineWidth} ${token.colorPrimaryOutline}`,
        },

        '&[disabled]': {
          color: token.colorTextDisabled,
          background: token.colorBgComponentDisabled,
          borderColor: token.colorBorder,
          cursor: 'not-allowed',
        },
      },
    },
  };
};

const genPaginationJumpStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
      outline: 0,

      [`${componentCls}-item-container`]: {
        position: 'relative',

        [`${componentCls}-item-link-icon`]: {
          color: token.colorPrimary,
          fontSize: token.fontSizeSM,
          // FIXME
          letterSpacing: -1,
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
          // FIXME
          letterSpacing: 2,
          textAlign: 'center',
          // FIXME
          textIndent: '0.13em',
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
      minWidth: token.paginationItemSize,
      height: token.paginationItemSize,
      color: token.colorText,
      fontFamily: token.paginationFontFamily,
      lineHeight: `${token.paginationItemSize}px`,
      textAlign: 'center',
      verticalAlign: 'middle',
      listStyle: 'none',
      borderRadius: token.radiusBase,
      cursor: 'pointer',
      transition: `all ${token.motionDurationSlow}`,
    },

    [`${componentCls}-prev, ${componentCls}-next`]: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      outline: 0,

      button: {
        color: token.colorText,
        cursor: 'pointer',
        userSelect: 'none',
      },

      '&:hover button': {
        borderColor: token.colorPrimaryHover,
      },

      [`${componentCls}-item-link`]: {
        display: 'block',
        // FIXME
        width: '100%',
        height: '100%',
        padding: 0,
        fontSize: token.fontSizeSM,
        textAlign: 'center',
        backgroundColor: token.paginationItemLinkBg,
        border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
        borderRadius: token.radiusBase,
        outline: 'none',
        transition: `all ${token.motionDurationSlow}`,
      },

      [`&:focus-visible ${componentCls}-item-link`]: {
        color: token.colorPrimary,
        borderColor: token.colorPrimary,
      },

      [`&:hover ${componentCls}-item-link`]: {
        color: token.colorPrimary,
        borderColor: token.colorPrimary,
      },
    },

    [`${componentCls}-slash`]: {
      // FIXME
      marginInlineEnd: 10,
      marginInlineStart: 5,
    },

    [`${componentCls}-options`]: {
      display: 'inline-block',
      marginInlineStart: token.margin,
      verticalAlign: 'middle',

      // IE11 css hack. `*::-ms-backdrop,` is a must have
      '@media all and (-ms-high-contrast: none)': {
        [`*::-ms-backdrop, &-options`]: {
          verticalAlign: 'top',
        },
      },

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

          // FIXME
          width: 50,
          height: token.controlHeight,
          margin: 0,
          marginInlineStart: token.marginXS,
          marginInlineEnd: token.marginXS,
        },
      },
    },
  };
};

const genPaginationItemStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-item`]: {
      display: 'inline-block',
      minWidth: token.paginationItemSize,
      height: token.paginationItemSize,
      marginInlineEnd: token.marginXS,
      fontFamily: token.paginationFontFamily,
      lineHeight: `${token.paginationItemSize - 2}px`,
      textAlign: 'center',
      verticalAlign: 'middle',
      listStyle: 'none',
      backgroundColor: token.paginationItemBg,
      border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
      borderRadius: token.radiusBase,
      outline: 0,
      cursor: 'pointer',
      userSelect: 'none',

      a: {
        display: 'block',
        // FIXME
        padding: '0 6px',
        color: token.colorText,
        transition: 'none',

        '&:hover': {
          textDecoration: 'none',
        },
      },

      '&:hover': {
        borderColor: token.colorPrimary,
        transition: `all ${token.motionDurationSlow}`,

        a: {
          color: token.colorPrimary,
        },
      },

      // cannot merge with `&:hover`
      // see https://github.com/ant-design/ant-design/pull/34002
      '&:focus-visible': {
        borderColor: token.colorPrimary,
        transition: `all ${token.motionDurationSlow}`,

        a: {
          color: token.colorPrimary,
        },
      },

      '&-active': {
        fontWeight: token.paginationFontWeightActive,
        background: token.paginationItemBgActive,
        borderColor: token.colorPrimary,

        a: {
          color: token.colorPrimary,
        },

        '&:hover': {
          borderColor: token.colorPrimaryHover,
        },

        '&:focus-visible': {
          borderColor: token.colorPrimaryHover,
        },

        '&:hover a': {
          color: token.colorPrimaryHover,
        },

        '&:focus-visible a': {
          color: token.colorPrimaryHover,
        },
      },
    },
  };
};

const genPaginationStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
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
        height: token.paginationItemSize,
        marginInlineEnd: token.marginXS,
        lineHeight: `${token.paginationItemSize - 2}px`,
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

// ============================== Export ==============================
export default genComponentStyleHook('Pagination', token => {
  const paginationToken = mergeToken<PaginationToken>(
    token,
    {
      // FIXME: missing token
      paginationItemSize: token.controlHeight,
      paginationFontFamily: token.fontFamily,
      paginationItemBg: token.colorBgComponent,
      paginationItemBgActive: token.colorBgComponent,
      paginationFontWeightActive: 500,
      paginationItemSizeSM: 24,
      paginationItemInputBg: token.colorBgComponent,
      paginationMiniOptionsSizeChangerTop: 0,
      paginationItemDisabledBgActive: new TinyColor('#000').tint(90).toString(), // tint(@black, 90%)
      paginationItemDisabledColorActive: token.colorTextDisabled,
      paginationItemLinkBg: token.colorBgComponent,
      inputOutlineOffset: '0 0',
    },
    initInputToken(token),
  );
  return [genPaginationStyle(paginationToken)];
});
