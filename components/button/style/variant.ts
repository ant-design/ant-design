import { PresetColors } from '../../theme/interface';
import type { GenerateStyle } from '../../theme/interface';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { ButtonToken } from './token';

const genVariantStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, antCls } = token;

  // Default: '--ant-btn-'
  const getCssVar = genCssVar(antCls, 'btn');

  return {
    [componentCls]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        // Border
        [getCssVar('border-width')]: '1px',

        [getCssVar('border-color')]: '#000',
        [getCssVar('border-color-hover')]: `var(${getCssVar('border-color')})`,
        [getCssVar('border-color-active')]: `var(${getCssVar('border-color')})`,
        [getCssVar('border-color-disabled')]: `var(${getCssVar('border-color')})`,

        [getCssVar('border-style')]: 'solid',

        // Text
        [getCssVar('text-color')]: '#000',
        [getCssVar('text-color-hover')]: `var(${getCssVar('text-color')})`,
        [getCssVar('text-color-active')]: `var(${getCssVar('text-color')})`,
        [getCssVar('text-color-disabled')]: `var(${getCssVar('text-color')})`,

        // Background
        [getCssVar('bg-color')]: '#ddd',
        [getCssVar('bg-color-hover')]: `var(${getCssVar('bg-color')})`,
        [getCssVar('bg-color-active')]: `var(${getCssVar('bg-color')})`,
        [getCssVar('bg-color-disabled')]: token.colorBgContainerDisabled,
        [getCssVar('bg-color-container')]: token.colorBgContainer,

        // Shadow
        [getCssVar('shadow')]: 'none',
      },
      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        // Basic
        border: `var(${getCssVar('border-width')}) var(${getCssVar('border-style')}) var(${getCssVar('border-color')})`,
        color: `var(${getCssVar('text-color')})`,
        backgroundColor: `var(${getCssVar('bg-color')})`,

        // Status
        [`&:not(:disabled):not(${componentCls}-disabled)`]: {
          // Hover
          '&:hover': {
            border: `var(${getCssVar('border-width')}) var(${getCssVar('border-style')}) var(${getCssVar('border-color-hover')})`,
            color: `var(${getCssVar('text-color-hover')})`,
            backgroundColor: `var(${getCssVar('bg-color-hover')})`,
          },

          // Active
          '&:active': {
            border: `var(${getCssVar('border-width')}) var(${getCssVar('border-style')}) var(${getCssVar('border-color-active')})`,
            color: `var(${getCssVar('text-color-active')})`,
            backgroundColor: `var(${getCssVar('bg-color-active')})`,
          },
        },
      },

      // ==============================================================
      // ==                         Variants                         ==
      // ==============================================================
      {
        // >>>>> Solid
        [`&${componentCls}-variant-solid`]: {
          // Solid Variables
          [getCssVar('solid-bg-color')]: `var(${getCssVar('color-base')})`,
          [getCssVar('solid-bg-color-hover')]: `var(${getCssVar('color-hover')})`,
          [getCssVar('solid-bg-color-active')]: `var(${getCssVar('color-active')})`,

          // Variables
          [getCssVar('border-color')]: 'transparent',

          [getCssVar('text-color')]: token.colorTextLightSolid,

          [getCssVar('bg-color')]: `var(${getCssVar('solid-bg-color')})`,
          [getCssVar('bg-color-hover')]: `var(${getCssVar('solid-bg-color-hover')})`,
          [getCssVar('bg-color-active')]: `var(${getCssVar('solid-bg-color-active')})`,

          // Box Shadow
          boxShadow: `var(${getCssVar('shadow')})`,
        },

        // >>>>> Outlined & Dashed
        [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
          [getCssVar('border-color')]: `var(${getCssVar('color-base')})`,
          [getCssVar('border-color-hover')]: `var(${getCssVar('color-hover')})`,
          [getCssVar('border-color-active')]: `var(${getCssVar('color-active')})`,

          [getCssVar('bg-color')]: `var(${getCssVar('bg-color-container')})`,

          [getCssVar('text-color')]: `var(${getCssVar('color-base')})`,
          [getCssVar('text-color-hover')]: `var(${getCssVar('color-hover')})`,
          [getCssVar('text-color-active')]: `var(${getCssVar('color-active')})`,

          // Box Shadow
          boxShadow: `var(${getCssVar('shadow')})`,
        },

        // >>>>> Dashed
        [`&${componentCls}-variant-dashed`]: {
          [getCssVar('border-style')]: 'dashed',
          [getCssVar('bg-color-disabled')]: token.dashedBgDisabled,
        },

        // >>>>> Filled
        [`&${componentCls}-variant-filled`]: {
          [getCssVar('border-color')]: 'transparent',

          [getCssVar('text-color')]: `var(${getCssVar('color-base')})`,

          [getCssVar('bg-color')]: `var(${getCssVar('color-light')})`,
          [getCssVar('bg-color-hover')]: `var(${getCssVar('color-light-hover')})`,
          [getCssVar('bg-color-active')]: `var(${getCssVar('color-light-active')})`,
        },

        // >>>>> Text & Link
        [`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
          [getCssVar('border-color')]: 'transparent',

          [getCssVar('text-color')]: `var(${getCssVar('color-base')})`,
          [getCssVar('text-color-hover')]: `var(${getCssVar('color-hover')})`,
          [getCssVar('text-color-active')]: `var(${getCssVar('color-active')})`,

          [getCssVar('bg-color')]: 'transparent',
          [getCssVar('bg-color-hover')]: 'transparent',
          [getCssVar('bg-color-active')]: 'transparent',

          [`&:disabled, &${token.componentCls}-disabled`]: {
            background: 'transparent',
            borderColor: 'transparent',
          },
        },

        // >>>>> Text
        [`&${componentCls}-variant-text`]: {
          [getCssVar('bg-color-hover')]: `var(${getCssVar('color-light')})`,
          [getCssVar('bg-color-active')]: `var(${getCssVar('color-light-active')})`,
        },
      },

      // ==============================================================
      // ==                          Colors                          ==
      // ==============================================================
      {
        // ======================== By Default ========================
        // >>>>> Link
        [`&${componentCls}-variant-link`]: {
          [getCssVar('color-base')]: token.colorLink,
          [getCssVar('color-hover')]: token.colorLinkHover,
          [getCssVar('color-active')]: token.colorLinkActive,
        },

        // ======================== Compatible ========================
        // >>>>> Primary
        [`&${componentCls}-color-primary`]: {
          [getCssVar('color-base')]: token.colorPrimary,
          [getCssVar('color-hover')]: token.colorPrimaryHover,
          [getCssVar('color-active')]: token.colorPrimaryActive,
          [getCssVar('color-light')]: token.colorPrimaryBg,
          [getCssVar('color-light-hover')]: token.colorPrimaryBgHover,
          [getCssVar('color-light-active')]: token.colorPrimaryBorder,

          [getCssVar('shadow')]: token.primaryShadow,
        },

        // >>>>> Danger
        [`&${componentCls}-color-dangerous`]: {
          [getCssVar('color-base')]: token.colorError,
          [getCssVar('color-hover')]: token.colorErrorHover,
          [getCssVar('color-active')]: token.colorErrorActive,
          [getCssVar('color-light')]: token.colorErrorBg,
          [getCssVar('color-light-hover')]: token.colorErrorBgFilledHover,
          [getCssVar('color-light-active')]: token.colorErrorBgActive,

          [getCssVar('shadow')]: token.dangerShadow,
        },

        // >>>>> Default
        [`&${componentCls}-color-default`]: {
          [getCssVar('solid-bg-color')]: token.colorBgSolid,
          [getCssVar('solid-bg-color-hover')]: token.colorBgSolidHover,
          [getCssVar('solid-bg-color-active')]: token.colorBgSolidActive,

          [getCssVar('color-base')]: token.defaultBorderColor,
          [getCssVar('color-hover')]: token.defaultHoverBorderColor,
          [getCssVar('color-active')]: token.defaultActiveBorderColor,

          [getCssVar('color-light')]: token.colorFillTertiary,
          [getCssVar('color-light-hover')]: token.colorFillSecondary,
          [getCssVar('color-light-active')]: token.colorFill,

          [getCssVar('text-color')]: token.colorText,
          [getCssVar('text-color-hover')]: token.defaultHoverBorderColor,
          [getCssVar('text-color-active')]: token.defaultActiveBorderColor,

          [getCssVar('shadow')]: token.defaultShadow,

          [`&${componentCls}-variant-solid`]: {
            [getCssVar('text-color')]: token.solidTextColor,
            [getCssVar('text-color-hover')]: `var(${getCssVar('text-color')})`,
            [getCssVar('text-color-active')]: `var(${getCssVar('text-color')})`,
          },

          [`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
            [getCssVar('text-color-hover')]: `var(${getCssVar('text-color')})`,
            [getCssVar('text-color-active')]: `var(${getCssVar('text-color')})`,
          },

          [`&${componentCls}-background-ghost`]: {
            [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
              [getCssVar('text-color')]: token.defaultGhostColor,
              [getCssVar('border-color')]: token.defaultGhostBorderColor,
            },
          },
        },
      },

      // >>>>> Preset Colors
      PresetColors.map((colorKey) => {
        const darkColor = token[`${colorKey}6`];
        const lightColor = token[`${colorKey}1`];
        const hoverColor = token[`${colorKey}5`];
        const lightHoverColor = token[`${colorKey}2`];
        const lightActiveColor = token[`${colorKey}3`];
        const activeColor = token[`${colorKey}7`];

        const shadowColor = token[`${colorKey}ShadowColor`];

        return {
          [`&${componentCls}-color-${colorKey}`]: {
            [getCssVar('color-base')]: darkColor,
            [getCssVar('color-hover')]: hoverColor,
            [getCssVar('color-active')]: activeColor,
            [getCssVar('color-light')]: lightColor,
            [getCssVar('color-light-hover')]: lightHoverColor,
            [getCssVar('color-light-active')]: lightActiveColor,
            [getCssVar('shadow')]: shadowColor,
          },
        };
      }),

      // ==============================================================
      // ==                         Disabled                         ==
      // ==============================================================
      {
        // Disabled
        [`&:disabled, &${token.componentCls}-disabled`]: {
          cursor: 'not-allowed',
          borderColor: token.colorBorderDisabled,
          background: `var(${getCssVar('bg-color-disabled')})`,
          color: token.colorTextDisabled,
          boxShadow: 'none',
        },
      },

      // ==============================================================
      // ==                          Ghost                           ==
      // ==============================================================
      {
        // Ghost
        [`&${componentCls}-background-ghost`]: {
          [getCssVar('bg-color')]: 'transparent',
          [getCssVar('shadow')]: 'none',
        },
      },
    ],
  };
};

export default genVariantStyle;
