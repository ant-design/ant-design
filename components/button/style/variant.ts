import { PresetColors } from '../../theme/interface';
import type { GenerateStyle } from '../../theme/interface';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { ButtonToken } from './token';

const genVariantStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls, antCls } = token;

  const [varName, varRef] = genCssVar(antCls, 'btn');

  return {
    [componentCls]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        // Border
        [varName('border-width')]: '1px',

        [varName('border-color')]: '#000',
        [varName('border-color-hover')]: varRef('border-color'),
        [varName('border-color-active')]: varRef('border-color'),
        [varName('border-color-disabled')]: varRef('border-color'),

        [varName('border-style')]: 'solid',

        // Text
        [varName('text-color')]: '#000',
        [varName('text-color-hover')]: varRef('text-color'),
        [varName('text-color-active')]: varRef('text-color'),
        [varName('text-color-disabled')]: varRef('text-color'),

        // Background
        [varName('bg-color')]: '#ddd',
        [varName('bg-color-hover')]: varRef('bg-color'),
        [varName('bg-color-active')]: varRef('bg-color'),
        [varName('bg-color-disabled')]: token.colorBgContainerDisabled,
        [varName('bg-color-container')]: token.colorBgContainer,

        // Shadow
        [varName('shadow')]: 'none',
      },
      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        // Basic
        border: [varRef('border-width'), varRef('border-style'), varRef('border-color')].join(' '),
        color: varRef('text-color'),
        backgroundColor: varRef('bg-color'),

        // Status
        [`&:not(:disabled):not(${componentCls}-disabled)`]: {
          // Hover
          '&:hover': {
            border: [
              varRef('border-width'),
              varRef('border-style'),
              varRef('border-color-hover'),
            ].join(' '),
            color: varRef('text-color-hover'),
            backgroundColor: varRef('bg-color-hover'),
          },

          // Active
          '&:active': {
            border: [
              varRef('border-width'),
              varRef('border-style'),
              varRef('border-color-active'),
            ].join(' '),
            color: varRef('text-color-active'),
            backgroundColor: varRef('bg-color-active'),
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
          [varName('solid-bg-color')]: varRef('color-base'),
          [varName('solid-bg-color-hover')]: varRef('color-hover'),
          [varName('solid-bg-color-active')]: varRef('color-active'),

          // Variables
          [varName('border-color')]: 'transparent',

          [varName('text-color')]: token.colorTextLightSolid,

          [varName('bg-color')]: varRef('solid-bg-color'),
          [varName('bg-color-hover')]: varRef('solid-bg-color-hover'),
          [varName('bg-color-active')]: varRef('solid-bg-color-active'),

          // Box Shadow
          boxShadow: varRef('shadow'),
        },

        // >>>>> Outlined & Dashed
        [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
          [varName('border-color')]: varRef('color-base'),
          [varName('border-color-hover')]: varRef('color-hover'),
          [varName('border-color-active')]: varRef('color-active'),

          [varName('bg-color')]: varRef('bg-color-container'),
          [varName('text-color')]: varRef('color-base'),
          [varName('text-color-hover')]: varRef('color-hover'),
          [varName('text-color-active')]: varRef('color-active'),

          // Box Shadow
          boxShadow: varRef('shadow'),
        },

        // >>>>> Dashed
        [`&${componentCls}-variant-dashed`]: {
          [varName('border-style')]: 'dashed',
          [varName('bg-color-disabled')]: token.dashedBgDisabled,
        },

        // >>>>> Filled
        [`&${componentCls}-variant-filled`]: {
          [varName('border-color')]: 'transparent',

          [varName('text-color')]: varRef('color-base'),

          [varName('bg-color')]: varRef('color-light'),
          [varName('bg-color-hover')]: varRef('color-light-hover'),
          [varName('bg-color-active')]: varRef('color-light-active'),
        },

        // >>>>> Text & Link
        [`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
          [varName('border-color')]: 'transparent',

          [varName('text-color')]: varRef('color-base'),
          [varName('text-color-hover')]: varRef('color-hover'),
          [varName('text-color-active')]: varRef('color-active'),
          [varName('bg-color')]: 'transparent',
          [varName('bg-color-hover')]: 'transparent',
          [varName('bg-color-active')]: 'transparent',

          [`&:disabled, &${token.componentCls}-disabled`]: {
            background: 'transparent',
            borderColor: 'transparent',
          },
        },

        // >>>>> Text
        [`&${componentCls}-variant-text`]: {
          [varName('bg-color-hover')]: varRef('color-light'),
          [varName('bg-color-active')]: varRef('color-light-active'),
        },
      },

      // ==============================================================
      // ==                          Colors                          ==
      // ==============================================================
      {
        // ======================== By Default ========================
        // >>>>> Link
        [`&${componentCls}-variant-link`]: {
          [varName('color-base')]: token.colorLink,
          [varName('color-hover')]: token.colorLinkHover,
          [varName('color-active')]: token.colorLinkActive,
        },

        // ======================== Compatible ========================
        // >>>>> Primary
        [`&${componentCls}-color-primary`]: {
          [varName('color-base')]: token.colorPrimary,
          [varName('color-hover')]: token.colorPrimaryHover,
          [varName('color-active')]: token.colorPrimaryActive,
          [varName('color-light')]: token.colorPrimaryBg,
          [varName('color-light-hover')]: token.colorPrimaryBgHover,
          [varName('color-light-active')]: token.colorPrimaryBorder,

          [varName('shadow')]: token.primaryShadow,

          [`&${componentCls}-variant-solid`]: {
            [varName('text-color')]: token.primaryColor,
            [varName('text-color-hover')]: varRef('text-color'),
            [varName('text-color-active')]: varRef('text-color'),
          },
        },

        // >>>>> Danger
        [`&${componentCls}-color-dangerous`]: {
          [varName('color-base')]: token.colorError,
          [varName('color-hover')]: token.colorErrorHover,
          [varName('color-active')]: token.colorErrorActive,
          [varName('color-light')]: token.colorErrorBg,
          [varName('color-light-hover')]: token.colorErrorBgFilledHover,
          [varName('color-light-active')]: token.colorErrorBgActive,

          [varName('shadow')]: token.dangerShadow,

          [`&${componentCls}-variant-solid`]: {
            [varName('text-color')]: token.dangerColor,
            [varName('text-color-hover')]: varRef('text-color'),
            [varName('text-color-active')]: varRef('text-color'),
          },
        },

        // >>>>> Default
        [`&${componentCls}-color-default`]: {
          [varName('solid-bg-color')]: token.colorBgSolid,
          [varName('solid-bg-color-hover')]: token.colorBgSolidHover,
          [varName('solid-bg-color-active')]: token.colorBgSolidActive,

          [varName('color-base')]: token.defaultBorderColor,
          [varName('color-hover')]: token.defaultHoverBorderColor,
          [varName('color-active')]: token.defaultActiveBorderColor,

          [varName('color-light')]: token.colorFillTertiary,
          [varName('color-light-hover')]: token.colorFillSecondary,
          [varName('color-light-active')]: token.colorFill,

          [varName('text-color')]: token.defaultColor,
          [varName('text-color-hover')]: token.defaultHoverColor,
          [varName('text-color-active')]: token.defaultActiveColor,
          [varName('shadow')]: token.defaultShadow,

          [`&${componentCls}-variant-solid`]: {
            [varName('text-color')]: token.solidTextColor,
            [varName('text-color-hover')]: varRef('text-color'),
            [varName('text-color-active')]: varRef('text-color'),
          },

          [`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
            [varName('text-color-hover')]: varRef('text-color'),
            [varName('text-color-active')]: varRef('text-color'),
          },

          [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
            [varName('text-color')]: token.defaultColor,
            [varName('text-color-hover')]: token.defaultHoverColor,
            [varName('text-color-active')]: token.defaultActiveColor,
            [varName('bg-color-hover')]: token.defaultHoverBg,
            [varName('bg-color-active')]: token.defaultActiveBg,
          },

          [`&${componentCls}-variant-text`]: {
            [varName('text-color')]: token.textTextColor,
            [varName('text-color-hover')]: token.textTextHoverColor,
            [varName('text-color-active')]: token.textTextActiveColor,
            [varName('bg-color-hover')]: token.textHoverBg,
          },

          [`&${componentCls}-background-ghost`]: {
            [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
              [varName('text-color')]: token.defaultGhostColor,
              [varName('border-color')]: token.defaultGhostBorderColor,
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
            [varName('color-base')]: darkColor,
            [varName('color-hover')]: hoverColor,
            [varName('color-active')]: activeColor,
            [varName('color-light')]: lightColor,
            [varName('color-light-hover')]: lightHoverColor,
            [varName('color-light-active')]: lightActiveColor,
            [varName('shadow')]: shadowColor,
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
          background: varRef('bg-color-disabled'),
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
          [varName('bg-color')]: 'transparent',
          [varName('shadow')]: 'none',
        },
      },
    ],
  };
};

export default genVariantStyle;
