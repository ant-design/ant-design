import { genCompactItemStyle } from '../../style/compact-item';
import { genStyleHooks } from '../../theme/internal';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

interface AddonToken extends FullToken<'Addon'> {
  // Custom token here
}

const genSpaceAddonStyle: GenerateStyle<AddonToken> = (token) => {
  const {
    componentCls,
    borderRadius,
    paddingInline,
    colorBorder,
    paddingInlineSM,
    fontSizeLG,
    fontSizeSM,
    borderRadiusLG,
    borderRadiusSM,
    colorBgContainerDisabled,
    lineWidth,
    antCls,
  } = token;

  const [varName, varRef] = genCssVar(antCls, 'space');

  return {
    [componentCls]: [
      // ==========================================================
      // ==                         Base                         ==
      // ==========================================================
      {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        paddingInline,
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
          paddingInline: paddingInlineSM,
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
        [varName('addon-border-color')]: colorBorder,
        [varName('addon-background')]: colorBgContainerDisabled,

        // Filled
        [varName('addon-border-color-outlined')]: colorBorder,
        [varName('addon-background-filled')]: colorBgContainerDisabled,

        borderColor: varRef('addon-border-color'),
        background: varRef('addon-background'),

        // ======================= Outlined =======================
        '&-variant-outlined': {
          [varName('addon-border-color')]: varRef('addon-border-color-outlined'),
        },

        // ======================== Filled ========================
        '&-variant-filled': {
          [varName('addon-border-color')]: 'transparent',
          [varName('addon-background')]: varRef('addon-background-filled'),

          // Disabled
          [`&${componentCls}-disabled`]: {
            [varName('addon-border-color')]: colorBorder,
            [varName('addon-background')]: colorBgContainerDisabled,
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
          [varName('addon-border-color-outlined')]: token.colorError,
          [varName('addon-background-filled')]: token.colorErrorBg,
          color: token.colorError,
        },
        '&-status-warning': {
          [varName('addon-border-color-outlined')]: token.colorWarning,
          [varName('addon-background-filled')]: token.colorWarningBg,
          color: token.colorWarning,
        },
      },
    ],
  };
};

// ============================== Export ==============================
export default genStyleHooks('Addon', (token) => [
  genSpaceAddonStyle(token),
  genCompactItemStyle(token, { focus: false }),
]);
