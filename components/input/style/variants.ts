import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { mergeToken } from '../../theme/internal';
import type { InputToken } from './token';

export const genHoverStyle = (token: InputToken): CSSObject => ({
  borderColor: token.hoverBorderColor,
  backgroundColor: token.hoverBg,
});

export const genDisabledStyle = (token: InputToken): CSSObject => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  'input[disabled], textarea[disabled]': {
    cursor: 'not-allowed',
  },

  '&:hover:not([disabled])': {
    ...genHoverStyle(
      mergeToken<InputToken>(token, {
        hoverBorderColor: token.colorBorder,
        hoverBg: token.colorBgContainerDisabled,
      }),
    ),
  },
});

/* ============== Outlined ============== */
export const genBaseOutlinedStyle = (
  token: InputToken,
  options: {
    borderColor: string;
    hoverBorderColor: string;
    activeBorderColor: string;
    activeShadow: string;
  },
): CSSObject => ({
  background: token.colorBgContainer,
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: options.borderColor,

  '&:hover': {
    borderColor: options.hoverBorderColor,
    backgroundColor: token.hoverBg,
  },

  '&:focus, &:focus-within': {
    borderColor: options.activeBorderColor,
    boxShadow: options.activeShadow,
    outline: 0,
    backgroundColor: token.activeBg,
  },
});

const genOutlinedStatusStyle = (
  token: InputToken,
  options: {
    status: string;
    borderColor: string;
    hoverBorderColor: string;
    activeBorderColor: string;
    activeShadow: string;
    affixColor: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
    ...genBaseOutlinedStyle(token, options),

    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor,
    },
  },
  [`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: {
    borderColor: options.borderColor,
  },
});

export const genOutlinedStyle = (token: InputToken, extraStyles?: CSSObject): CSSObject => ({
  '&-outlined': {
    ...genBaseOutlinedStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderColor: token.hoverBorderColor,
      activeBorderColor: token.activeBorderColor,
      activeShadow: token.activeShadow,
    }),

    [`&${token.componentCls}-disabled, &[disabled]`]: {
      ...genDisabledStyle(token),
    },

    ...genOutlinedStatusStyle(token, {
      status: 'error',
      borderColor: token.colorError,
      hoverBorderColor: token.colorErrorBorderHover,
      activeBorderColor: token.colorError,
      activeShadow: token.errorActiveShadow,
      affixColor: token.colorError,
    }),

    ...genOutlinedStatusStyle(token, {
      status: 'warning',
      borderColor: token.colorWarning,
      hoverBorderColor: token.colorWarningBorderHover,
      activeBorderColor: token.colorWarning,
      activeShadow: token.warningActiveShadow,
      affixColor: token.colorWarning,
    }),

    ...extraStyles,
  },
});

const genOutlinedGroupStatusStyle = (
  token: InputToken,
  options: {
    status: string;
    addonBorderColor: string;
    addonColor: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-group-wrapper-status-${options.status}`]: {
    [`${token.componentCls}-group-addon`]: {
      borderColor: options.addonBorderColor,
      color: options.addonColor,
    },
  },
});

export const genOutlinedGroupStyle = (token: InputToken): CSSObject => ({
  '&-outlined': {
    [`${token.componentCls}-group`]: {
      '&-addon': {
        background: token.addonBg,
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      },

      '&-addon:first-child': {
        borderInlineEnd: 0,
      },

      '&-addon:last-child': {
        borderInlineStart: 0,
      },
    },

    ...genOutlinedGroupStatusStyle(token, {
      status: 'error',
      addonBorderColor: token.colorError,
      addonColor: token.colorErrorText,
    }),

    ...genOutlinedGroupStatusStyle(token, {
      status: 'warning',
      addonBorderColor: token.colorWarning,
      addonColor: token.colorWarningText,
    }),

    [`&${token.componentCls}-group-wrapper-disabled`]: {
      [`${token.componentCls}-group-addon`]: {
        ...genDisabledStyle(token),
      },
    },
  },
});

/* ============ Borderless ============ */
export const genBorderlessStyle = (token: InputToken, extraStyles?: CSSObject): CSSObject => {
  const { componentCls } = token;

  return {
    '&-borderless': {
      background: 'transparent',
      border: 'none',

      '&:focus, &:focus-within': {
        outline: 'none',
      },

      // >>>>> Disabled
      [`&${componentCls}-disabled, &[disabled]`]: {
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
      },

      // >>>>> Status
      [`&${componentCls}-status-error`]: {
        '&, & input, & textarea': {
          color: token.colorError,
        },
      },

      [`&${componentCls}-status-warning`]: {
        '&, & input, & textarea': {
          color: token.colorWarning,
        },
      },

      ...extraStyles,
    },
  };
};

/* ============== Filled ============== */
const genBaseFilledStyle = (
  token: InputToken,
  options: {
    bg: string;
    hoverBg: string;
    activeBorderColor: string;
    inputColor?: string;
  },
) => ({
  background: options.bg,
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: 'transparent',

  'input&, & input, textarea&, & textarea': {
    color: options?.inputColor,
  },

  '&:hover': {
    background: options.hoverBg,
  },

  '&:focus, &:focus-within': {
    outline: 0,
    borderColor: options.activeBorderColor,
    backgroundColor: token.activeBg,
  },
});

const genFilledStatusStyle = (
  token: InputToken,
  options: {
    status: string;
    bg: string;
    hoverBg: string;
    activeBorderColor: string;
    affixColor: string;
    inputColor?: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
    ...genBaseFilledStyle(token, options),

    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor,
    },
  },
});

export const genFilledStyle = (token: InputToken, extraStyles?: CSSObject): CSSObject => ({
  '&-filled': {
    ...genBaseFilledStyle(token, {
      bg: token.colorFillTertiary,
      hoverBg: token.colorFillSecondary,
      activeBorderColor: token.activeBorderColor,
    }),

    [`&${token.componentCls}-disabled, &[disabled]`]: {
      ...genDisabledStyle(token),
    },

    ...genFilledStatusStyle(token, {
      status: 'error',
      bg: token.colorErrorBg,
      hoverBg: token.colorErrorBgHover,
      activeBorderColor: token.colorError,
      inputColor: token.colorErrorText,
      affixColor: token.colorError,
    }),

    ...genFilledStatusStyle(token, {
      status: 'warning',
      bg: token.colorWarningBg,
      hoverBg: token.colorWarningBgHover,
      activeBorderColor: token.colorWarning,
      inputColor: token.colorWarningText,
      affixColor: token.colorWarning,
    }),

    ...extraStyles,
  },
});

const genFilledGroupStatusStyle = (
  token: InputToken,
  options: {
    status: string;
    addonBg: string;
    addonColor: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-group-wrapper-status-${options.status}`]: {
    [`${token.componentCls}-group-addon`]: {
      background: options.addonBg,
      color: options.addonColor,
    },
  },
});

export const genFilledGroupStyle = (token: InputToken): CSSObject => ({
  '&-filled': {
    [`${token.componentCls}-group`]: {
      '&-addon': {
        background: token.colorFillTertiary,
      },

      [`${token.componentCls}-filled:not(:focus):not(:focus-within)`]: {
        '&:not(:first-child)': {
          borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        },
        '&:not(:last-child)': {
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        },
      },
    },

    ...genFilledGroupStatusStyle(token, {
      status: 'error',
      addonBg: token.colorErrorBg,
      addonColor: token.colorErrorText,
    }),

    ...genFilledGroupStatusStyle(token, {
      status: 'warning',
      addonBg: token.colorWarningBg,
      addonColor: token.colorWarningText,
    }),

    [`&${token.componentCls}-group-wrapper-disabled`]: {
      [`${token.componentCls}-group`]: {
        '&-addon': {
          background: token.colorFillTertiary,
          color: token.colorTextDisabled,
        },

        '&-addon:first-child': {
          borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
        },

        '&-addon:last-child': {
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
        },
      },
    },
  },
});

/* ============== Underlined ============== */
// https://github.com/ant-design/ant-design/issues/51379
export const genBaseUnderlinedStyle = (
  token: InputToken,
  options: {
    borderColor: string;
    hoverBorderColor: string;
    activeBorderColor: string;
    activeShadow: string;
  },
): CSSObject => ({
  background: token.colorBgContainer,
  borderWidth: `${unit(token.lineWidth)} 0`,
  borderStyle: `${token.lineType} none`,
  borderColor: `transparent transparent ${options.borderColor} transparent`,
  borderRadius: 0,
  '&:hover': {
    borderColor: `transparent transparent ${options.borderColor} transparent`,
    backgroundColor: token.hoverBg,
  },

  '&:focus, &:focus-within': {
    borderColor: `transparent transparent ${options.borderColor} transparent`,
    outline: 0,
    backgroundColor: token.activeBg,
  },
});

const genUnderlinedStatusStyle = (
  token: InputToken,
  options: {
    status: string;
    borderColor: string;
    hoverBorderColor: string;
    activeBorderColor: string;
    activeShadow: string;
    affixColor: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
    ...genBaseUnderlinedStyle(token, options),

    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor,
    },
  },
  [`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: {
    borderColor: options.borderColor,
  },
});

export const genUnderlinedStyle = (token: InputToken, extraStyles?: CSSObject): CSSObject => ({
  '&-underlined': {
    ...genBaseUnderlinedStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderColor: token.hoverBorderColor,
      activeBorderColor: token.activeBorderColor,
      activeShadow: token.activeShadow,
    }),

    // >>>>> Disabled
    [`&${token.componentCls}-disabled, &[disabled]`]: {
      color: token.colorTextDisabled,
      boxShadow: 'none',
      cursor: 'not-allowed',
      '&:hover': {
        borderColor: token.colorBorder,
      },
    },

    'input[disabled], textarea[disabled]': {
      cursor: 'not-allowed',
    },

    ...genUnderlinedStatusStyle(token, {
      status: 'error',
      borderColor: token.colorError,
      hoverBorderColor: token.colorErrorBorderHover,
      activeBorderColor: token.colorError,
      activeShadow: token.errorActiveShadow,
      affixColor: token.colorError,
    }),

    ...genUnderlinedStatusStyle(token, {
      status: 'warning',
      borderColor: token.colorWarning,
      hoverBorderColor: token.colorWarningBorderHover,
      activeBorderColor: token.colorWarning,
      activeShadow: token.warningActiveShadow,
      affixColor: token.colorWarning,
    }),

    ...extraStyles,
  },
});
