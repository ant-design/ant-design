// deps-lint-skip-all
import { TinyColor } from '@ctrl/tinycolor';
import { CSSObject } from '@ant-design/cssinjs';
import {
  initInputToken,
  genBasicInputStyle,
  genInputSmallStyle,
  type InputToken,
} from '../../input/style';
import {
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  GenerateStyle,
} from '../../_util/theme';

interface PaginationToken extends DerivativeToken {
  paginationItemSzie: number;
  paginationFontFamily: string;
  paginationItemBg: string;
  paginationItemBgActive: string;
  paginationFontWeightActive: number;
  paginationItemSizeSM: number;
  pagniationItemInputBg: string;
  paginationMiniOptionsSizeChangerTop: number;
  paginationItemDisabledBgActive: string;
  paginationItemDisabledColorActive: string;
  paginationItemLinkBg: string;
  screenLG: number;
  screenSM: number;
  inputOutlineOffset: string;
  antPrefixCls: string;
  paginationCls: string;
  iconPrefixCls: string;
  inputToken: InputToken;
}

const genPaginationDisabledStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { paginationCls } = token;

  return {
    [`${paginationCls}-disabled`]: {
      '&, &:hover': {
        cursor: 'not-allowed',

        [`${paginationCls}-item-link`]: {
          color: token.colorTextDisabled,
          borderColor: token.colorBorder,
          cursor: 'not-allowed',
        },
      },

      '&:focus-visible': {
        cursor: 'not-allowed',

        [`${paginationCls}-item-link`]: {
          color: token.colorTextDisabled,
          borderColor: token.colorBorder,
          cursor: 'not-allowed',
        },
      },
    },

    [`&${paginationCls}-disabled`]: {
      cursor: 'not-allowed',

      [`${paginationCls}-item`]: {
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

      [`${paginationCls}-item-link`]: {
        color: token.colorTextDisabled,
        background: token.colorBgComponentDisabled,
        borderColor: token.colorBorder,
        cursor: 'not-allowed',

        [`${paginationCls}-simple&`]: {
          background: 'transparent',
        },
      },

      [`${paginationCls}-item-link-icon`]: {
        opacity: 0,
      },

      [`${paginationCls}-item-ellipsis`]: {
        opacity: 1,
      },

      [`${paginationCls}-simple-pager`]: {
        color: token.colorTextDisabled,
      },
    },
  };
};

const genPaginationMiniStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { paginationCls } = token;

  return {
    [`&.mini ${paginationCls}-total-text, &.mini ${paginationCls}-simple-pager`]: {
      height: token.paginationItemSizeSM,
      lineHeight: `${token.paginationItemSizeSM}px`,
    },

    [`&.mini ${paginationCls}-item`]: {
      minWidth: token.paginationItemSizeSM,
      height: token.paginationItemSizeSM,
      margin: 0,
      lineHeight: `${token.paginationItemSizeSM - 2}px`,
    },

    [`&.mini ${paginationCls}-item:not(${paginationCls}-item-active)`]: {
      background: 'transparent',
      borderColor: 'transparent',
    },

    [`&.mini ${paginationCls}-prev, &.mini ${paginationCls}-next`]: {
      minWidth: token.paginationItemSizeSM,
      height: token.paginationItemSizeSM,
      margin: 0,
      lineHeight: `${token.paginationItemSizeSM}px`,
    },

    [`
    &.mini ${paginationCls}-prev ${paginationCls}-item-link,
    &.mini ${paginationCls}-next ${paginationCls}-item-link
    `]: {
      background: 'transparent',
      borderColor: 'transparent',

      '&::after': {
        height: token.paginationItemSizeSM,
        lineHeight: `${token.paginationItemSizeSM}px`,
      },
    },

    [`&.mini ${paginationCls}-jump-prev, &.mini ${paginationCls}-jump-next`]: {
      height: token.paginationItemSizeSM,
      marginInlineEnd: 0,
      lineHeight: `${token.paginationItemSizeSM}px`,
    },

    [`&.mini ${paginationCls}-options`]: {
      // FIXME
      marginInlineStart: 2,

      [`&-size-changer`]: {
        top: token.paginationMiniOptionsSizeChangerTop,
      },

      [`&-quick-jumper`]: {
        height: token.paginationItemSizeSM,
        lineHeight: `${token.paginationItemSizeSM}px`,

        input: {
          ...genInputSmallStyle(token.inputToken),

          // FIXME
          width: 44,
          height: token.controlHeightSM,
        },
      },
    },
  };
};

const genPaginationSimpleStyle: GenerateStyle<PaginationToken, CSSObject> = token => {
  const { paginationCls } = token;

  return {
    [`
    &${paginationCls}-simple ${paginationCls}-prev,
    &${paginationCls}-simple ${paginationCls}-next
    `]: {
      height: token.paginationItemSizeSM,
      lineHeight: `${token.paginationItemSizeSM}px`,
      verticalAlign: 'top',
      [`${paginationCls}-item-link`]: {
        height: token.paginationItemSizeSM,
        backgroundColor: 'transparent',
        border: 0,

        '&::after': {
          height: token.paginationItemSizeSM,
          lineHeight: `${token.paginationItemSizeSM}px`,
        },
      },
    },

    [`&${paginationCls}-simple ${paginationCls}-simple-pager`]: {
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
        backgroundColor: token.pagniationItemInputBg,
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
  const { paginationCls } = token;

  return {
    [`${paginationCls}-jump-prev, ${paginationCls}-jump-next`]: {
      outline: 0,

      [`${paginationCls}-item-container`]: {
        position: 'relative',

        [`${paginationCls}-item-link-icon`]: {
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

        [`${paginationCls}-item-ellipsis`]: {
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
        [`${paginationCls}-item-link-icon`]: {
          opacity: 1,
        },
        [`${paginationCls}-item-ellipsis`]: {
          opacity: 0,
        },
      },

      '&:focus-visible': {
        [`${paginationCls}-item-link-icon`]: {
          opacity: 1,
        },
        [`${paginationCls}-item-ellipsis`]: {
          opacity: 0,
        },
      },
    },

    [`
    ${paginationCls}-prev,
    ${paginationCls}-jump-prev,
    ${paginationCls}-jump-next
    `]: {
      marginInlineEnd: token.marginXS,
    },

    [`
    ${paginationCls}-prev,
    ${paginationCls}-next,
    ${paginationCls}-jump-prev,
    ${paginationCls}-jump-next
    `]: {
      display: 'inline-block',
      minWidth: token.paginationItemSzie,
      height: token.paginationItemSzie,
      color: token.colorText,
      fontFamily: token.paginationFontFamily,
      lineHeight: `${token.paginationItemSzie}px`,
      textAlign: 'center',
      verticalAlign: 'middle',
      listStyle: 'none',
      borderRadius: token.radiusBase,
      cursor: 'pointer',
      transition: `all ${token.motionDurationSlow}`,
    },

    [`${paginationCls}-prev, ${paginationCls}-next`]: {
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

      [`${paginationCls}-item-link`]: {
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

      [`&:focus-visible ${paginationCls}-item-link`]: {
        color: token.colorPrimary,
        borderColor: token.colorPrimary,
      },

      [`&:hover ${paginationCls}-item-link`]: {
        color: token.colorPrimary,
        borderColor: token.colorPrimary,
      },
    },

    [`${paginationCls}-slash`]: {
      // FIXME
      marginInlineEnd: 10,
      marginInlineStart: 5,
    },

    [`${paginationCls}-options`]: {
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
          ...genBasicInputStyle(token.inputToken),

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
  const { paginationCls } = token;

  return {
    [`${paginationCls}-item`]: {
      display: 'inline-block',
      minWidth: token.paginationItemSzie,
      height: token.paginationItemSzie,
      marginInlineEnd: token.marginXS,
      fontFamily: token.paginationFontFamily,
      lineHeight: `${token.paginationItemSzie - 2}px`,
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
  const { paginationCls } = token;

  return {
    [paginationCls]: {
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

      [`${paginationCls}-total-text`]: {
        display: 'inline-block',
        height: token.paginationItemSzie,
        marginInlineEnd: token.marginXS,
        lineHeight: `${token.paginationItemSzie - 2}px`,
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
        [`${paginationCls}-item`]: {
          '&-after-jump-prev, &-before-jump-next': {
            display: 'none',
          },
        },
      },

      [`@media only screen and (max-width: ${token.screenSM}px)`]: {
        [`${paginationCls}-options`]: {
          display: 'none',
        },
      },
    },

    // rtl style
    [`&${token.paginationCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  antPrefixCls: string,
  paginationPrefixCls: string,
  inputPrefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const paginationToken: PaginationToken = {
    ...token,
    // FIXME: missing token
    paginationItemSzie: token.controlHeight,
    paginationFontFamily: token.fontFamily,
    paginationItemBg: token.colorBgComponent,
    paginationItemBgActive: token.colorBgComponent,
    paginationFontWeightActive: 500,
    paginationItemSizeSM: 24,
    pagniationItemInputBg: token.colorBgComponent,
    paginationMiniOptionsSizeChangerTop: 0,
    paginationItemDisabledBgActive: new TinyColor('#000').tint(90).toString(), // tint(@black, 90%)
    paginationItemDisabledColorActive: token.colorTextDisabled,
    paginationItemLinkBg: token.colorBgComponent,
    inputOutlineOffset: '0 0',
    screenLG: 992,
    screenSM: 576,
    antPrefixCls: `.${antPrefixCls}`,
    paginationCls: `.${paginationPrefixCls}`,
    iconPrefixCls: `.${iconPrefixCls}`,
    inputToken: initInputToken(token, inputPrefixCls, iconPrefixCls),
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [paginationPrefixCls] }, () => [
      genPaginationStyle(paginationToken),
    ]),
    hashId,
  ];
}
