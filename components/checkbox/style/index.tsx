// deps-lint-skip-all
import { Keyframes } from '@ant-design/cssinjs';
import {
  resetComponent,
  GenerateStyle,
  genComponentStyleHook,
  FullToken,
  mergeToken,
} from '../../_util/theme';

interface CheckboxToken extends FullToken<'Checkbox'> {
  checkboxCls: string;
}

// ============================== Motion ==============================
const antCheckboxEffect = new Keyframes('antCheckboxEffect', {
  '0%': {
    transform: 'scale(1)',
    opacity: 0.5,
  },

  '100%': {
    transform: 'scale(1.6)',
    opacity: 0,
  },
});

// ============================== Styles ==============================
export const genCheckboxStyle: GenerateStyle<CheckboxToken> = token => {
  const { checkboxCls } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;

  return [
    // ===================== Basic =====================
    {
      // Group
      [`${checkboxCls}-group`]: {
        ...resetComponent(token),

        display: 'inline-flex',
      },

      // Wrapper
      [wrapperCls]: {
        ...resetComponent(token),

        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 'unset',
        cursor: 'pointer',

        // Fix checkbox & radio in flex align #30260
        '&:after': {
          display: 'inline-block',
          width: 0,
          overflow: 'hidden',
          content: "'\\a0'",
        },

        // Checkbox near checkbox
        '& + &': {
          marginInlineStart: token.marginXS,
        },

        '&&-in-form-item': {
          'input[type="checkbox"]': {
            width: 14, // FIXME: magic
            height: 14, // FIXME: magic
          },
        },
      },

      // Wrapper > Checkbox
      [checkboxCls]: {
        ...resetComponent(token),

        top: '0.2em',
        position: 'relative',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        cursor: 'pointer',

        // Wrapper > Checkbox > input
        [`${checkboxCls}-input`]: {
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          opacity: 0,
        },

        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          position: 'relative',
          top: 0,
          insetInlineStart: 0,
          display: 'block',
          width: token.fontSizeLG,
          height: token.fontSizeLG,
          direction: 'ltr',
          backgroundColor: token.colorBgComponent,
          border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
          borderRadius: token.controlRadius,
          borderCollapse: 'separate',
          transition: `all ${token.motionDurationSlow}`,

          '&:after': {
            position: 'absolute',
            top: '50%',
            insetInlineStart: '21.5%',
            display: 'table',
            width: (token.fontSizeLG / 14) * 5,
            height: (token.fontSizeLG / 14) * 8,
            border: `2px solid ${token.colorBgComponent}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
            opacity: 0,
            transition: `all ${token.motionDurationFast} cubic-bezier(.71,-.46,.88,.6), opacity ${token.motionDurationFast}`,
            content: '""',
          },
        },

        // Wrapper > Checkbox + Text
        '& + span': {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: token.paddingXS,
        },
      },
    },

    // ================= Indeterminate =================
    {
      [checkboxCls]: {
        '&-indeterminate': {
          // Wrapper > Checkbox > inner
          [`${checkboxCls}-inner`]: {
            '&:after': {
              top: '50%',
              insetInlineStart: '50%',
              width: token.fontSizeLG / 2,
              height: token.fontSizeLG / 2,
              backgroundColor: token.colorPrimary,
              border: 0,
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 1,
              content: '""',
            },
          },
        },
      },
    },

    // ===================== Hover =====================
    {
      // Wrapper
      [`${wrapperCls}:hover ${checkboxCls}:after`]: {
        visibility: 'visible',
      },

      // Wrapper & Wrapper > Checkbox
      [`
      ${wrapperCls}:hover:not(${wrapperCls}-disabled),
      ${checkboxCls}:hover:not(${checkboxCls}-disabled),
      ${checkboxCls}-input:focus +
    `]: {
        [`${checkboxCls}-inner`]: {
          borderColor: token.colorPrimary,
        },
      },
    },

    // ==================== Checked ====================
    {
      // Wrapper > Checkbox
      [`${checkboxCls}-checked`]: {
        [`${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimary,
          borderColor: token.colorPrimary,

          '&:after': {
            opacity: 1,
            transform: 'rotate(45deg) scale(1) translate(-50%,-50%)',
            transition: `all ${token.motionDurationSlow} ${token.motionEaseOutBack} ${token.motionDurationFast}`,
          },
        },

        // Checked Effect
        '&:after': {
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          width: '100%',
          height: '100%',
          border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorPrimary}`,
          borderRadius: token.controlRadius,
          visibility: 'hidden',
          animationName: antCheckboxEffect,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: 'ease-in-out',
          animationFillMode: 'backwards',
          content: '""',
        },
      },
    },

    // ==================== Disable ====================
    {
      // Wrapper
      [`${wrapperCls}-disabled`]: {
        cursor: 'not-allowed',
      },

      // Wrapper > Checkbox
      [`${checkboxCls}-disabled`]: {
        // Wrapper > Checkbox > input
        [`&, ${checkboxCls}-input`]: {
          cursor: 'not-allowed',
        },

        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          background: token.colorBgContainer,
          borderColor: token.colorBorder,

          '&:after': {
            borderColor: token.colorBorder,
          },
        },

        '&:after': {
          display: 'none',
        },

        '& + span': {
          color: token.colorTextDisabled,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export function getStyle(prefixCls: string, token: FullToken<'Checkbox'>) {
  const checkboxToken: CheckboxToken = mergeToken<CheckboxToken>(token, {
    checkboxCls: `.${prefixCls}`,
  });

  return [genCheckboxStyle(checkboxToken), antCheckboxEffect];
}

export default genComponentStyleHook('Checkbox', (token, { prefixCls }) => [
  getStyle(prefixCls, token),
]);
