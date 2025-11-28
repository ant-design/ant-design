import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/interface';
import genSelectInputCustomizeStyle from './select-input-customize';
import genSelectInputMultipleStyle from './select-input-multiple';
import type { SelectToken } from './token';

interface VariableColors {
  border: string;
  borderHover: string;
  borderActive: string;
  borderOutline: string;
  borderDisabled?: string;

  background?: string;
  backgroundHover?: string;
  backgroundActive?: string;
  backgroundDisabled?: string;

  color?: string;
}

/** Set CSS variables and hover/focus styles for a Select input based on provided colors. */
const genSelectInputVariableStyle = (token: SelectToken, colors: VariableColors): CSSObject => {
  const { componentCls } = token;
  const { border, borderHover, borderActive, borderOutline } = colors;

  const baseBG = colors.background || token.colorBgContainer;

  return {
    '--select-border-color': border,
    '--select-background': baseBG,
    '--select-color': colors.color || token.colorText,

    [`&:not(${componentCls}-disabled)`]: {
      '&:hover': {
        '--select-border-color': borderHover,
        '--select-background': colors.backgroundHover || baseBG,
      },

      [`&${componentCls}-focused`]: {
        '--select-border-color': borderActive,
        '--select-background': colors.backgroundActive || baseBG,

        boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${borderOutline}`,
      },
    },

    [`&${componentCls}-disabled`]: {
      '--select-border-color': colors.borderDisabled || colors.border,
      '--select-background': colors.backgroundDisabled || colors.background,
    },
  };
};

/** Generate variant-scoped variable styles and status overrides for a Select input. */
const genSelectInputVariantStyle = (
  token: SelectToken,
  variant: string,
  colors: VariableColors,
  errorColors: Partial<VariableColors> = {},
  warningColors: Partial<VariableColors> = {},
  patchStyle?: CSSObject,
): CSSObject => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-${variant}`]: [
      genSelectInputVariableStyle(token, colors),
      {
        [`&${componentCls}-status-error`]: genSelectInputVariableStyle(token, {
          ...colors,
          color: errorColors.color || token.colorError,
          ...errorColors,
        }),
        [`&${componentCls}-status-warning`]: genSelectInputVariableStyle(token, {
          ...colors,
          color: warningColors.color || token.colorWarning,
          ...warningColors,
        }),
      },
      patchStyle,
    ],
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

        '--select-padding-horizontal': calc(token.paddingSM).sub(token.lineWidth).equal(),
        '--select-padding-vertical':
          'calc((var(--select-height) - var(--select-font-height)) / 2 - var(--select-border-size))',

        // ==========================================================
        // ==                         Base                         ==
        // ==========================================================
        ...resetComponent(token, true),

        display: 'inline-flex',
        // gap: calc(token.paddingXXS).mul(1.5).equal(),
        flexWrap: 'nowrap',
        position: 'relative',
        transition: `all ${token.motionDurationSlow}`,
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
          lineHeight: 1,
        },

        // ====================== Placeholder =======================
        [`${componentCls}-placeholder`]: {
          ...textEllipsis,
          color: token.colorTextPlaceholder,
          pointerEvents: 'none',
          zIndex: 1,
        },

        // ======================== Content =========================
        [`${componentCls}-content`]: {
          flex: 'auto',
          minWidth: 0,
          position: 'relative',
          display: 'flex',
          marginInlineEnd: calc(token.paddingXXS).mul(1.5).equal(),

          '&:before': {
            content: '"\\a0"',
            width: 0,
            overflow: 'hidden',
          },

          // >>> Value
          '&-value': {
            ...textEllipsis,
            transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
            zIndex: 1,
          },

          // >>> Input: should only take effect for not customize mode

          // input element with readOnly use cursor pointer
          'input[readonly]': {
            cursor: 'inherit',
          },
        },

        [`&-open ${componentCls}-content-value`]: {
          color: token.colorTextPlaceholder,
        },

        // ========================= Suffix =========================
        [`${componentCls}-suffix`]: {
          flex: 'none',
          color: token.colorTextQuaternary,
          fontSize: token.fontSizeIcon,
          lineHeight: 1,

          '> :not(:last-child)': {
            marginInlineEnd: token.marginXS,
          },
        },

        [`${componentCls}-prefix, ${componentCls}-suffix`]: {
          alignSelf: 'center',

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

        // ==========================================================
        // ==                         Size                         ==
        // ==========================================================
        '&-sm': {
          '--select-height': token.controlHeightSM,
          '--select-padding-horizontal': calc(token.paddingXS).sub(token.lineWidth).equal(),
          '--select-border-radius': token.borderRadiusSM,
        },

        '&-lg': {
          '--select-height': token.controlHeightLG,
          '--select-font-size': token.fontSizeLG,
          '--select-line-height': token.lineHeightLG,
          '--select-font-height': token.fontHeightLG,
          '--select-border-radius': token.borderRadiusLG,
        },
      },

      // ============================================================
      // ==                         Input                          ==
      // ============================================================
      {
        [`&:not(${componentCls}-customize)`]: {
          [`${componentCls}-input`]: {
            outline: 'none',
            background: 'transparent',
            appearance: 'none',
            border: 0,
            margin: 0,
            padding: 0,
            color: 'inherit',

            '&::-webkit-search-cancel-button': {
              display: 'none',
              appearance: 'none',
            },
          },
        },
      },

      // ============================================================
      // ==                         Single                         ==
      // ============================================================
      {
        [`&-single:not(${componentCls}-customize)`]: {
          [`${componentCls}-input`]: {
            position: 'absolute',
            insetInline: 0,
            insetBlock: 'calc(var(--select-padding-vertical) * -1)',
            lineHeight: 'calc(var(--select-font-height) + var(--select-padding-vertical) * 2)',
          },

          // Content center align
          [`${componentCls}-content`]: {
            alignSelf: 'center',
          },
        },
      },

      // ============================================================
      // ==                        Multiple                        ==
      // ============================================================
      genSelectInputMultipleStyle(token),

      // ========================= Variant ==========================
      // >>> Outlined
      genSelectInputVariantStyle(
        token,
        'outlined',
        {
          border: token.colorBorder,
          borderHover: token.hoverBorderColor,
          borderActive: token.activeBorderColor,
          borderOutline: token.activeOutlineColor,
          borderDisabled: token.colorBorderDisabled,
        },
        // Error
        {
          border: token.colorError,
          borderHover: token.colorErrorHover,
          borderActive: token.colorError,
          borderOutline: token.colorErrorOutline,
        },
        // Warning
        {
          border: token.colorWarning,
          borderHover: token.colorWarningHover,
          borderActive: token.colorWarning,
          borderOutline: token.colorWarningOutline,
        },
      ),

      // >>> Filled
      genSelectInputVariantStyle(
        token,
        'filled',
        {
          border: 'transparent',
          borderHover: 'transparent',
          borderActive: token.activeBorderColor,
          borderOutline: 'transparent',
          borderDisabled: token.colorBorderDisabled,

          background: token.colorFillTertiary,
          backgroundHover: token.colorFillSecondary,
          backgroundActive: token.colorBgContainer,
        },
        // Error
        {
          background: token.colorErrorBg,
          backgroundHover: token.colorErrorBgHover,
          borderActive: token.colorError,
        },
        // Warning
        {
          background: token.colorWarningBg,
          backgroundHover: token.colorWarningBgHover,
          borderActive: token.colorWarning,
        },
      ),

      // >>> Borderless
      genSelectInputVariantStyle(token, 'borderless', {
        border: 'transparent',
        borderHover: 'transparent',
        borderActive: 'transparent',
        borderOutline: 'transparent',

        background: 'transparent',
      }),

      // Underlined
      genSelectInputVariantStyle(
        token,
        'underlined',
        {
          border: token.colorBorder,
          borderHover: token.hoverBorderColor,
          borderActive: token.activeBorderColor,
          borderOutline: 'transparent',
        },
        // Error
        {
          border: token.colorError,
          borderHover: token.colorErrorHover,
          borderActive: token.colorError,
        },
        // Warning
        {
          border: token.colorWarning,
          borderHover: token.colorWarningHover,
          borderActive: token.colorWarning,
        },
        {
          borderRadius: 0,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
        },
      ),

      // ============================================================
      // ==                         Custom                         ==
      // ============================================================
      genSelectInputCustomizeStyle(token),
    ],
  };
};

export default genSelectInputStyle;
