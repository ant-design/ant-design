import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import type { InputToken } from './token';
import { mergeToken } from '../../theme/internal';

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
const genBaseOutlineStyle = (
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

const genOutlineStatusStyle = (
  token: InputToken,
  options: {
    status: string;
    parentCls: string;
    borderColor: string;
    hoverBorderColor: string;
    activeBorderColor: string;
    activeShadow: string;
    affixColor: string;
  },
): CSSObject => ({
  [`&${options.parentCls}-status-${options.status}:not(${options.parentCls}-disabled)`]: {
    ...genBaseOutlineStyle(token, options),

    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor,
    },
  },
});

export const genOutlinedStyle = (
  token: InputToken,
  parentCls: string,
  extraStyles?: CSSObject,
): CSSObject => ({
  '&-outlined': {
    ...genBaseOutlineStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderColor: token.colorPrimaryHover,
      activeBorderColor: token.colorPrimary,
      activeShadow: token.activeShadow,
    }),

    [`&${parentCls}-disabled, &[disabled]`]: {
      ...genDisabledStyle(token),
    },

    ...genOutlineStatusStyle(token, {
      status: 'error',
      parentCls,
      borderColor: token.colorError,
      hoverBorderColor: token.colorErrorBorderHover,
      activeBorderColor: token.colorError,
      activeShadow: token.errorActiveShadow,
      affixColor: token.colorError,
    }),

    ...genOutlineStatusStyle(token, {
      status: 'warning',
      parentCls,
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
  },
});

/* ============ Borderless ============ */
export const genBorderlessStyle = (extraStyles?: CSSObject): CSSObject => ({
  '&-borderless': {
    background: 'transparent',
    border: 'none',

    '&:focus, &:focus-within': {
      outline: 'none',
    },

    ...extraStyles,
  },
});

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

  [`input&, & > input`]: {
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
    parentCls: string;
    bg: string;
    hoverBg: string;
    activeBorderColor: string;
    affixColor: string;
    inputColor?: string;
  },
): CSSObject => ({
  [`&${options.parentCls}-status-${options.status}:not(${options.parentCls}-disabled)`]: {
    ...genBaseFilledStyle(token, options),

    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor,
    },
  },
});

export const genFilledStyle = (
  token: InputToken,
  parentCls: string,
  extraStyles?: CSSObject,
): CSSObject => ({
  '&-filled': {
    ...genBaseFilledStyle(token, {
      bg: token.colorFillTertiary,
      hoverBg: token.colorFillSecondary,
      activeBorderColor: token.colorPrimary,
    }),

    [`&${parentCls}-disabled, &[disabled]`]: {
      ...genDisabledStyle(token),
    },

    ...genFilledStatusStyle(token, {
      status: 'error',
      parentCls,
      bg: token.colorErrorBg,
      hoverBg: token.colorErrorBgHover,
      activeBorderColor: token.colorError,
      inputColor: token.colorErrorText,
      affixColor: token.colorError,
    }),

    ...genFilledStatusStyle(token, {
      status: 'warning',
      parentCls,
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

      [`&-addon + ${token.componentCls}-filled:not(:focus):not(:focus-within)`]: {
        borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      },

      [`${token.componentCls}-filled:has(+ ${token.componentCls}-group-addon):not(:focus):not(:focus-within)`]:
        {
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
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
