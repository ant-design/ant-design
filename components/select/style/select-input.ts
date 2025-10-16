import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/interface';
import type { SelectToken } from './token';

const genSelectInputVariantStyle = (
  token: SelectToken,
  variant: string,
  colors: {
    borderColor: string;
    borderColorHover: string;
    borderColorActive: string;
    borderColorOutline: string;

    background?: string;
    backgroundHover?: string;
    backgroundActive?: string;
  },
  patchStyle?: CSSObject,
): CSSObject => {
  const { componentCls } = token;
  const { borderColor, borderColorHover, borderColorActive, borderColorOutline } = colors;

  const baseBG = colors.background || token.colorBgContainer;

  return {
    [`&${componentCls}-${variant}`]: {
      '--select-border-color': borderColor,
      '--select-background': baseBG,

      [`&:not(${componentCls}-disabled)`]: {
        '&:hover': {
          '--select-border-color': borderColorHover,
          '--select-background': colors.backgroundHover || baseBG,
        },

        [`&${componentCls}-focused`]: {
          '--select-border-color': borderColorActive,
          '--select-background': colors.backgroundActive || baseBG,

          boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${borderColorOutline}`,
        },
      },

      ...patchStyle,
    },
  };
};

const genSelectInputStyle: GenerateStyle<SelectToken> = (token) => {
  const { componentCls, calc, fontHeight, controlHeight, iconCls } = token;

  return {
    [componentCls]: [
      {
        // Border
        '--select-border-radius': token.borderRadius,
        '--select-border-color': '#000',
        '--select-border-size': token.lineWidth,
        // Background
        '--select-background': token.colorBgContainer,
        // Font
        '--select-font-size': token.fontSize,
        '--select-line-height': token.lineHeight,
        '--select-font-height': fontHeight,
        '--select-color': token.colorText,
        // Size
        '--select-height': controlHeight,

        '--select-padding-horizontal': calc(token.paddingSM).sub(1).equal(),
        '--select-padding-vertical':
          'calc((var(--select-height) - var(--select-font-height)) / 2 - var(--select-border-size))',

        // ==========================================================
        // ==                         Base                         ==
        // ==========================================================
        ...resetComponent(token, true),

        display: 'inline-flex',
        gap: calc(token.paddingXXS).mul(1.5).equal(),
        flexWrap: 'nowrap',
        position: 'relative',
        transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
        alignItems: 'flex-start',
        outline: 0,

        cursor: 'pointer',

        // Border
        borderRadius: 'var(--select-border-radius)',
        borderWidth: 'var(--select-border-size)',
        borderStyle: token.lineType,
        borderColor: 'var(--select-border-color)',

        // Background
        background: 'var(--select-background)',

        // Font
        fontSize: 'var(--select-font-size)',
        lineHeight: 'var(--select-line-height)',
        color: 'var(--select-color)',

        // Padding
        paddingInline: 'var(--select-padding-horizontal)',
        paddingBlock: 'var(--select-padding-vertical)',

        // ========================= Prefix =========================
        [`${componentCls}-prefix`]: {
          flex: 'none',
        },

        // ======================== Content =========================
        [`${componentCls}-content`]: {
          flex: 'auto',
          minWidth: 0,
          position: 'relative',
          display: 'flex',

          // >>> Value

          // >>> Placeholder
          [`${componentCls}-placeholder`]: {
            ...textEllipsis,
            color: token.colorTextPlaceholder,
            pointerEvents: 'none',
          },

          // >>> Input
          [`${componentCls}-input`]: {
            position: 'absolute',
            insetInline: 0,
            insetBlock: 'calc(var(--select-padding-vertical) * -1)',
            lineHeight: 'calc(var(--select-font-height) + var(--select-padding-vertical) * 2)',
            outline: 'none',
            background: 'transparent',
            appearance: 'none',

            '&::-webkit-search-cancel-button': {
              display: 'none',
              appearance: 'none',
            },
          },

          // input element with readOnly use cursor pointer
          'input[readonly]': {
            cursor: 'inherit',
          },
        },

        // ========================= Suffix =========================
        [`${componentCls}-suffix`]: {
          flex: 'none',
          color: token.colorTextQuaternary,
          fontSize: token.fontSizeIcon,
          lineHeight: 1,
          marginTop: `calc((var(--select-font-height) - ${token.fontSizeIcon}) / 2)`,
        },

        [`${componentCls}-prefix, ${componentCls}-suffix`]: {
          [iconCls]: {
            verticalAlign: 'top',
          },
        },

        // ==========================================================
        // ==                       Disabled                       ==
        // ==========================================================
        '&-disabled': {
          background: token.colorBgContainerDisabled,
          color: token.colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      // ========================= Variant ==========================
      // >>> Outlined
      genSelectInputVariantStyle(token, 'outlined', {
        borderColor: token.colorBorder,
        borderColorHover: token.hoverBorderColor,
        borderColorActive: token.activeBorderColor,
        borderColorOutline: token.activeOutlineColor,
      }),

      // >>> Filled
      genSelectInputVariantStyle(token, 'filled', {
        borderColor: 'transparent',
        borderColorHover: 'transparent',
        borderColorActive: token.activeBorderColor,
        borderColorOutline: 'transparent',

        background: token.colorFillTertiary,
        backgroundHover: token.colorFillSecondary,
        backgroundActive: token.colorBgContainer,
      }),

      // >>> Borderless
      genSelectInputVariantStyle(token, 'borderless', {
        borderColor: 'transparent',
        borderColorHover: 'transparent',
        borderColorActive: 'transparent',
        borderColorOutline: 'transparent',

        background: 'transparent',
      }),

      // Underlined
      genSelectInputVariantStyle(
        token,
        'underlined',
        {
          borderColor: token.colorBorder,
          borderColorHover: token.hoverBorderColor,
          borderColorActive: token.activeBorderColor,
          borderColorOutline: 'transparent',
        },
        {
          borderRadius: 0,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
        },
      ),
    ],
  };
};

export default genSelectInputStyle;
