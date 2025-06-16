import { PresetColors, type GenerateStyle } from '../../theme/interface';
import type { ButtonToken } from './token';

const genVariantStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        // Border
        '--ant-btn-border-width': '1px',

        '--ant-btn-border-color': '#000',
        '--ant-btn-border-color-hover': 'var(--ant-btn-border-color)',
        '--ant-btn-border-color-active': 'var(--ant-btn-border-color)',
        '--ant-btn-border-color-disabled': 'var(--ant-btn-border-color)',

        '--ant-btn-border-style': 'solid',

        // Text
        '--ant-btn-text-color': '#000',
        '--ant-btn-text-color-hover': 'var(--ant-btn-text-color)',
        '--ant-btn-text-color-active': 'var(--ant-btn-text-color)',
        '--ant-btn-text-color-disabled': 'var(--ant-btn-text-color)',

        // Background
        '--ant-btn-bg-color': '#ddd',
        '--ant-btn-bg-color-hover': 'var(--ant-btn-bg-color)',
        '--ant-btn-bg-color-active': 'var(--ant-btn-bg-color)',
        '--ant-btn-bg-color-disabled': 'var(--ant-btn-bg-color)',
        '--ant-btn-bg-color-container': token.colorBgContainer,

        // Shadow
        '--ant-btn-shadow': 'none',
      },
      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        // Basic
        border:
          'var(--ant-btn-border-width) var(--ant-btn-border-style) var(--ant-btn-border-color)',
        color: 'var(--ant-btn-text-color)',
        backgroundColor: 'var(--ant-btn-bg-color)',

        // Status
        [`&:not(:disabled):not(${componentCls}-disabled)`]: {
          // Hover
          '&:hover': {
            border: `var(--ant-btn-border-width) var(--ant-btn-border-style) var(--ant-btn-border-color-hover)`,
            color: 'var(--ant-btn-text-color-hover)',
            backgroundColor: 'var(--ant-btn-bg-color-hover)',
          },

          // Active
          '&:active': {
            border: `var(--ant-btn-border-width) var(--ant-btn-border-style) var(--ant-btn-border-color-active)`,
            color: 'var(--ant-btn-text-color-active)',
            backgroundColor: 'var(--ant-btn-bg-color-active)',
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
          '--ant-btn-solid-bg-color': 'var(--ant-btn-color-base)',
          '--ant-btn-solid-bg-color-hover': 'var(--ant-btn-color-hover)',
          '--ant-btn-solid-bg-color-active': 'var(--ant-btn-color-active)',

          // Variables
          '--ant-btn-border-color': 'transparent',

          '--ant-btn-text-color': token.colorTextLightSolid,

          '--ant-btn-bg-color': 'var(--ant-btn-solid-bg-color)',
          '--ant-btn-bg-color-hover': 'var(--ant-btn-solid-bg-color-hover)',
          '--ant-btn-bg-color-active': 'var(--ant-btn-solid-bg-color-active)',

          // Box Shadow
          boxShadow: 'var(--ant-btn-shadow)',
        },

        // >>>>> Outlined & Dashed
        [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
          '--ant-btn-border-color': 'var(--ant-btn-color-base)',
          '--ant-btn-border-color-hover': 'var(--ant-btn-color-hover)',
          '--ant-btn-border-color-active': 'var(--ant-btn-color-active)',

          '--ant-btn-bg-color': 'var(--ant-btn-bg-color-container)',

          '--ant-btn-text-color': 'var(--ant-btn-color-base)',
          '--ant-btn-text-color-hover': 'var(--ant-btn-color-hover)',
          '--ant-btn-text-color-active': 'var(--ant-btn-color-active)',

          // Box Shadow
          boxShadow: 'var(--ant-btn-shadow)',
        },

        // >>>>> Dashed
        [`&${componentCls}-variant-dashed`]: {
          '--ant-btn-border-style': 'dashed',
        },

        // >>>>> Filled
        [`&${componentCls}-variant-filled`]: {
          '--ant-btn-border-color': 'transparent',

          '--ant-btn-text-color': 'var(--ant-btn-color-base)',

          '--ant-btn-bg-color': 'var(--ant-btn-color-light)',
          '--ant-btn-bg-color-hover': 'var(--ant-btn-color-light-hover)',
          '--ant-btn-bg-color-active': 'var(--ant-btn-color-light-active)',
        },

        // >>>>> Text & Link
        [`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
          '--ant-btn-border-color': 'transparent',

          '--ant-btn-text-color': 'var(--ant-btn-color-base)',
          '--ant-btn-text-color-hover': 'var(--ant-btn-color-hover)',
          '--ant-btn-text-color-active': 'var(--ant-btn-color-active)',

          '--ant-btn-bg-color': 'transparent',
          '--ant-btn-bg-color-hover': 'transparent',
          '--ant-btn-bg-color-active': 'transparent',

          [`&:disabled, &${token.componentCls}-disabled`]: {
            background: 'transparent',
            borderColor: 'transparent',
          },
        },

        // >>>>> Text
        [`&${componentCls}-variant-text`]: {
          '--ant-btn-bg-color-hover': 'var(--ant-btn-color-light)',
          '--ant-btn-bg-color-active': 'var(--ant-btn-color-light-active)',
        },
      },

      // ==============================================================
      // ==                          Ghost                           ==
      // ==============================================================
      {
        // Ghost
        [`&${componentCls}-background-ghost`]: {
          '--ant-btn-bg-color': 'transparent',
        },
      },

      // ==============================================================
      // ==                          Colors                          ==
      // ==============================================================
      {
        // ======================== By Default ========================
        // >>>>> Link
        [`&${componentCls}-variant-link`]: {
          '--ant-btn-color-base': token.colorLink,
          '--ant-btn-color-hover': token.colorLinkHover,
          '--ant-btn-color-active': token.colorLinkActive,
        },

        // ======================== Compatible ========================
        // >>>>> Primary
        [`&${componentCls}-color-primary`]: {
          '--ant-btn-color-base': token.colorPrimary,
          '--ant-btn-color-hover': token.colorPrimaryHover,
          '--ant-btn-color-active': token.colorPrimaryActive,
          '--ant-btn-color-light': token.colorPrimaryBg,
          '--ant-btn-color-light-hover': token.colorPrimaryBgHover,
          '--ant-btn-color-light-active': token.colorPrimaryBorder,

          '--ant-btn-shadow': token.primaryShadow,
        },

        // >>>>> Danger
        [`&${componentCls}-color-dangerous`]: {
          '--ant-btn-color-base': token.colorError,
          '--ant-btn-color-hover': token.colorErrorHover,
          '--ant-btn-color-active': token.colorErrorActive,
          '--ant-btn-color-light': token.colorErrorBg,
          '--ant-btn-color-light-hover': token.colorErrorBgFilledHover,
          '--ant-btn-color-light-active': token.colorErrorBgActive,

          '--ant-btn-shadow': token.dangerShadow,
        },

        // >>>>> Default
        [`&${componentCls}-color-default`]: {
          '--ant-btn-solid-bg-color': token.colorBgSolid,
          '--ant-btn-solid-bg-color-hover': token.colorBgSolidHover,
          '--ant-btn-solid-bg-color-active': token.colorBgSolidActive,

          '--ant-btn-color-base': token.defaultBorderColor,
          '--ant-btn-color-hover': token.defaultHoverBorderColor,
          '--ant-btn-color-active': token.defaultActiveBorderColor,

          '--ant-btn-color-light': token.colorFillTertiary,
          '--ant-btn-color-light-hover': token.colorFillSecondary,
          '--ant-btn-color-light-active': token.colorFill,

          '--ant-btn-text-color': token.colorText,
          '--ant-btn-text-color-hover': token.defaultHoverBorderColor,
          '--ant-btn-text-color-active': token.defaultActiveBorderColor,

          '--ant-btn-shadow': token.defaultShadow,

          [`&${componentCls}-variant-solid`]: {
            '--ant-btn-text-color': token.colorTextLightSolid,
            '--ant-btn-text-color-hover': 'var(--ant-btn-text-color)',
            '--ant-btn-text-color-active': 'var(--ant-btn-text-color)',
          },

          [`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
            '--ant-btn-text-color-hover': 'var(--ant-btn-text-color)',
            '--ant-btn-text-color-active': 'var(--ant-btn-text-color)',
          },

          [`&${componentCls}-background-ghost`]: {
            [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
              '--ant-btn-text-color': token.defaultGhostColor,
              '--ant-btn-border-color': token.defaultGhostBorderColor,
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
            '--ant-btn-color-base': darkColor,
            '--ant-btn-color-hover': hoverColor,
            '--ant-btn-color-active': activeColor,
            '--ant-btn-color-light': lightColor,
            '--ant-btn-color-light-hover': lightHoverColor,
            '--ant-btn-color-light-active': lightActiveColor,
            '--ant-btn-shadow': shadowColor,
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
          color: token.colorTextDisabled,
          background: token.colorBgContainerDisabled,
          boxShadow: 'none',
        },
      },
    ],
  };
};

export default genVariantStyle;
