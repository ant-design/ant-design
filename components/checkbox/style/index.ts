import { unit } from '@ant-design/cssinjs';

import { genFocusOutline, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

/**
 * @desc Checkbox 组件的 Token
 * @descEN Token for Checkbox component
 */
interface CheckboxToken extends FullToken<'Checkbox'> {
  /**
   * @desc Checkbox 类名
   * @descEN Checkbox class name
   */
  checkboxCls: string;
  /**
   * @desc Checkbox 尺寸
   * @descEN Size of Checkbox
   */
  checkboxSize: number;
}

// ============================== Styles ==============================
export const genCheckboxStyle: GenerateStyle<CheckboxToken> = (token) => {
  const { checkboxCls } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;

  return [
    // ===================== Basic =====================
    {
      // Group
      [`${checkboxCls}-group`]: {
        ...resetComponent(token),

        display: 'inline-flex',
        flexWrap: 'wrap',
        columnGap: token.marginXS,

        // Group > Grid
        [`> ${token.antCls}-row`]: {
          flex: 1,
        },
      },

      // Wrapper
      [wrapperCls]: {
        ...resetComponent(token),

        display: 'inline-flex',
        alignItems: 'baseline',
        cursor: 'pointer',

        // Fix checkbox & radio in flex align #30260
        '&:after': {
          display: 'inline-block',
          width: 0,
          overflow: 'hidden',
          content: "'\\a0'",
        },

        // Checkbox near checkbox
        [`& + ${wrapperCls}`]: {
          marginInlineStart: 0,
        },

        [`&${wrapperCls}-in-form-item`]: {
          'input[type="checkbox"]': {
            width: 14, // FIXME: magic
            height: 14, // FIXME: magic
          },
        },
      },

      // Wrapper > Checkbox
      [checkboxCls]: {
        ...resetComponent(token),

        position: 'relative',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        cursor: 'pointer',
        borderRadius: token.borderRadiusSM,

        // To make alignment right when `controlHeight` is changed
        // Ref: https://github.com/ant-design/ant-design/issues/41564
        alignSelf: 'center',

        // Wrapper > Checkbox > input
        [`${checkboxCls}-input`]: {
          position: 'absolute',
          // Since baseline align will get additional space offset,
          // we need to move input to top to make it align with text.
          // Ref: https://github.com/ant-design/ant-design/issues/38926#issuecomment-1486137799
          inset: 0,
          zIndex: 1,
          cursor: 'pointer',
          opacity: 0,
          margin: 0,

          [`&:focus-visible + ${checkboxCls}-inner`]: {
            ...genFocusOutline(token),
          },
        },

        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          boxSizing: 'border-box',
          display: 'block',
          width: token.checkboxSize,
          height: token.checkboxSize,
          direction: 'ltr',
          backgroundColor: token.colorBgContainer,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusSM,
          borderCollapse: 'separate',
          transition: `all ${token.motionDurationSlow}`,

          '&:after': {
            boxSizing: 'border-box',
            position: 'absolute',
            top: '50%',
            insetInlineStart: '25%',
            display: 'table',
            width: token.calc(token.checkboxSize).div(14).mul(5).equal(),
            height: token.calc(token.checkboxSize).div(14).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: 'rotate(45deg) scale(0) translate(-50%,-50%)',
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`,
          },
        },

        // Wrapper > Checkbox + Text
        '& + span': {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: token.paddingXS,
        },
      },
    },

    // ===================== Hover =====================
    {
      // Wrapper & Wrapper > Checkbox
      [`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          borderColor: token.colorPrimary,
        },
      },

      [`${wrapperCls}:not(${wrapperCls}-disabled)`]: {
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled) ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: 'transparent',
        },
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled):after`]: {
          borderColor: token.colorPrimaryHover,
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
            transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`,
          },
        },
      },

      [`
        ${wrapperCls}-checked:not(${wrapperCls}-disabled),
        ${checkboxCls}-checked:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: 'transparent',
        },
      },
    },

    // ================= Indeterminate =================
    {
      [checkboxCls]: {
        '&-indeterminate': {
          // Wrapper > Checkbox > inner
          [`${checkboxCls}-inner`]: {
            backgroundColor: `${token.colorBgContainer} !important`,
            borderColor: `${token.colorBorder} !important`,

            '&:after': {
              top: '50%',
              insetInlineStart: '50%',
              width: token.calc(token.fontSizeLG).div(2).equal(),
              height: token.calc(token.fontSizeLG).div(2).equal(),
              backgroundColor: token.colorPrimary,
              border: 0,
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 1,
              content: '""',
            },
          },

          // https://github.com/ant-design/ant-design/issues/50074
          [`&:hover ${checkboxCls}-inner`]: {
            backgroundColor: `${token.colorBgContainer} !important`,
            borderColor: `${token.colorPrimary} !important`,
          },
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
          // Disabled for native input to enable Tooltip event handler
          // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-1365075901
          pointerEvents: 'none',
        },

        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          background: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,

          '&:after': {
            borderColor: token.colorTextDisabled,
          },
        },

        '&:after': {
          display: 'none',
        },

        '& + span': {
          color: token.colorTextDisabled,
        },

        [`&${checkboxCls}-indeterminate ${checkboxCls}-inner::after`]: {
          background: token.colorTextDisabled,
        },
      },
    },
  ];
};

// ============================== Export ==============================
export function getStyle(prefixCls: string, token: FullToken<'Checkbox'>) {
  const checkboxToken: CheckboxToken = mergeToken<CheckboxToken>(token, {
    checkboxCls: `.${prefixCls}`,
    checkboxSize: token.controlInteractiveSize,
  });

  return [genCheckboxStyle(checkboxToken)];
}

export default genStyleHooks('Checkbox', (token, { prefixCls }) => [getStyle(prefixCls, token)]);
