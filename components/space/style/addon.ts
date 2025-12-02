import { genCompactItemStyle } from '../../style/compact-item';
import { genStyleHooks } from '../../theme/internal';
import type { FullToken, GenerateStyle } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

interface SpaceToken extends FullToken<'Space'> {
  // Custom token here
}

const genSpaceAddonStyle: GenerateStyle<SpaceToken> = (token) => {
  const {
    componentCls,
    borderRadius,
    paddingSM,
    colorBorder,
    paddingXS,
    fontSizeLG,
    fontSizeSM,
    borderRadiusLG,
    borderRadiusSM,
    colorBgContainerDisabled,
    lineWidth,
  } = token;

  return {
    [componentCls]: [
      // ==========================================================
      // ==                         Base                         ==
      // ==========================================================
      {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        paddingInline: paddingSM,
        margin: 0,
        borderWidth: lineWidth,
        borderStyle: 'solid',
        borderRadius,

        '&:hover': {
          zIndex: 0,
        },

        [`&${componentCls}-disabled`]: {
          color: token.colorTextDisabled,
        },

        '&-large': {
          fontSize: fontSizeLG,
          borderRadius: borderRadiusLG,
        },
        '&-small': {
          paddingInline: paddingXS,
          borderRadius: borderRadiusSM,
          fontSize: fontSizeSM,
        },
        '&-compact-last-item': {
          borderEndStartRadius: 0,
          borderStartStartRadius: 0,
        },
        '&-compact-first-item': {
          borderEndEndRadius: 0,
          borderStartEndRadius: 0,
        },
        '&-compact-item:not(:first-child):not(:last-child)': {
          borderRadius: 0,
        },
        '&-compact-item:not(:last-child)': {
          borderInlineEndWidth: 0,
        },
        '&-compact-item:not(:first-child)': {
          borderInlineStartWidth: 0,
        },
      },

      // ==========================================================
      // ==                       Variants                       ==
      // ==========================================================
      {
        '--space-addon-border-color': colorBorder,
        '--space-addon-background': colorBgContainerDisabled,

        // Filled
        '--space-addon-border-color-outlined': colorBorder,
        '--space-addon-background-filled': colorBgContainerDisabled,

        borderColor: 'var(--space-addon-border-color)',
        background: 'var(--space-addon-background)',

        // ======================= Outlined =======================
        '&-variant-outlined': {
          '--space-addon-border-color': 'var(--space-addon-border-color-outlined)',
        },

        // ======================== Filled ========================
        '&-variant-filled': {
          '--space-addon-border-color': 'transparent',
          '--space-addon-background': 'var(--space-addon-background-filled)',

          // Disabled
          [`&${componentCls}-disabled`]: {
            '--space-addon-border-color': colorBorder,
            '--space-addon-background': colorBgContainerDisabled,
          },
        },

        // ====================== Borderless ======================
        '&-variant-borderless': {
          border: 'none',
          background: 'transparent',
        },

        // ====================== Underlined ======================
        '&-variant-underlined': {
          border: 'none',
          background: 'transparent',
        },
      },

      // ==========================================================
      // ==                        Status                        ==
      // ==========================================================
      {
        '&-status-error': {
          '--space-addon-border-color-outlined': token.colorError,
          '--space-addon-background-filled': token.colorErrorBg,

          color: token.colorError,
        },

        '&-status-warning': {
          '--space-addon-border-color-outlined': token.colorWarning,
          '--space-addon-background-filled': token.colorWarningBg,

          color: token.colorWarning,
        },
      },
    ],
  };
};

// ============================== Export ==============================
export default genStyleHooks(['Space', 'Addon'], (token) => [
  genSpaceAddonStyle(token),
  genCompactItemStyle(token, { focus: false }),
]);
