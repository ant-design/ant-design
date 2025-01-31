import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { SelectToken } from './token';

// =====================================================
// ==                  Outlined                       ==
// =====================================================
const genBaseOutlinedStyle = (
  token: SelectToken,
  options: {
    borderColor: string;
    hoverBorderHover: string;
    activeBorderColor: string;
    activeOutlineColor: string;
    color: string;
  },
): CSSObject => {
  const { componentCls, antCls, controlOutlineWidth } = token;

  return {
    [`&:not(${componentCls}-customize-input) ${componentCls}-selector`]: {
      border: `${unit(token.lineWidth)} ${token.lineType} ${options.borderColor}`,
      background: token.selectorBg,
    },
    [`&:not(${componentCls}-disabled):not(${componentCls}-customize-input):not(${antCls}-pagination-size-changer)`]:
      {
        [`&:hover ${componentCls}-selector`]: {
          borderColor: options.hoverBorderHover,
        },

        [`${componentCls}-focused& ${componentCls}-selector`]: {
          borderColor: options.activeBorderColor,
          boxShadow: `0 0 0 ${unit(controlOutlineWidth)} ${options.activeOutlineColor}`,
          outline: 0,
        },
        [`${componentCls}-prefix`]: {
          color: options.color,
        },
      },
  };
};

const genOutlinedStatusStyle = (
  token: SelectToken,
  options: {
    status: string;
    borderColor: string;
    hoverBorderHover: string;
    activeBorderColor: string;
    activeOutlineColor: string;
    color: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-status-${options.status}`]: {
    ...genBaseOutlinedStyle(token, options),
  },
});

const genOutlinedStyle = (token: SelectToken): CSSObject => ({
  '&-outlined': {
    ...genBaseOutlinedStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderHover: token.hoverBorderColor,
      activeBorderColor: token.activeBorderColor,
      activeOutlineColor: token.activeOutlineColor,
      color: token.colorText,
    }),

    ...genOutlinedStatusStyle(token, {
      status: 'error',
      borderColor: token.colorError,
      hoverBorderHover: token.colorErrorHover,
      activeBorderColor: token.colorError,
      activeOutlineColor: token.colorErrorOutline,
      color: token.colorError,
    }),

    ...genOutlinedStatusStyle(token, {
      status: 'warning',
      borderColor: token.colorWarning,
      hoverBorderHover: token.colorWarningHover,
      activeBorderColor: token.colorWarning,
      activeOutlineColor: token.colorWarningOutline,
      color: token.colorWarning,
    }),

    [`&${token.componentCls}-disabled`]: {
      [`&:not(${token.componentCls}-customize-input) ${token.componentCls}-selector`]: {
        background: token.colorBgContainerDisabled,
        color: token.colorTextDisabled,
      },
    },

    [`&${token.componentCls}-multiple ${token.componentCls}-selection-item`]: {
      background: token.multipleItemBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
    },
  },
});

// =====================================================
// ==                   Filled                        ==
// =====================================================
const genBaseFilledStyle = (
  token: SelectToken,
  options: {
    bg: string;
    hoverBg: string;
    activeBorderColor: string;
    color: string;
  },
): CSSObject => {
  const { componentCls, antCls } = token;

  return {
    [`&:not(${componentCls}-customize-input) ${componentCls}-selector`]: {
      background: options.bg,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      color: options.color,
    },
    [`&:not(${componentCls}-disabled):not(${componentCls}-customize-input):not(${antCls}-pagination-size-changer)`]:
      {
        [`&:hover ${componentCls}-selector`]: {
          background: options.hoverBg,
        },

        [`${componentCls}-focused& ${componentCls}-selector`]: {
          background: token.selectorBg,
          borderColor: options.activeBorderColor,
          outline: 0,
        },
      },
  };
};

const genFilledStatusStyle = (
  token: SelectToken,
  options: {
    status: string;
    bg: string;
    hoverBg: string;
    activeBorderColor: string;
    color: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-status-${options.status}`]: {
    ...genBaseFilledStyle(token, options),
  },
});

const genFilledStyle = (token: SelectToken): CSSObject => ({
  '&-filled': {
    ...genBaseFilledStyle(token, {
      bg: token.colorFillTertiary,
      hoverBg: token.colorFillSecondary,
      activeBorderColor: token.activeBorderColor,
      color: token.colorText,
    }),

    ...genFilledStatusStyle(token, {
      status: 'error',
      bg: token.colorErrorBg,
      hoverBg: token.colorErrorBgHover,
      activeBorderColor: token.colorError,
      color: token.colorError,
    }),

    ...genFilledStatusStyle(token, {
      status: 'warning',
      bg: token.colorWarningBg,
      hoverBg: token.colorWarningBgHover,
      activeBorderColor: token.colorWarning,
      color: token.colorWarning,
    }),

    [`&${token.componentCls}-disabled`]: {
      [`&:not(${token.componentCls}-customize-input) ${token.componentCls}-selector`]: {
        borderColor: token.colorBorder,
        background: token.colorBgContainerDisabled,
        color: token.colorTextDisabled,
      },
    },

    [`&${token.componentCls}-multiple ${token.componentCls}-selection-item`]: {
      background: token.colorBgContainer,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
    },
  },
});

// =====================================================
// ==                 Borderless                      ==
// =====================================================
const genBorderlessStyle = (token: SelectToken): CSSObject => ({
  '&-borderless': {
    [`${token.componentCls}-selector`]: {
      background: 'transparent',
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
    },

    [`&${token.componentCls}-disabled`]: {
      [`&:not(${token.componentCls}-customize-input) ${token.componentCls}-selector`]: {
        color: token.colorTextDisabled,
      },
    },

    [`&${token.componentCls}-multiple ${token.componentCls}-selection-item`]: {
      background: token.multipleItemBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
    },

    // Status
    [`&${token.componentCls}-status-error`]: {
      [`${token.componentCls}-prefix, ${token.componentCls}-selection-item`]: {
        color: token.colorError,
      },
    },

    [`&${token.componentCls}-status-warning`]: {
      [`${token.componentCls}-prefix, ${token.componentCls}-selection-item`]: {
        color: token.colorWarning,
      },
    },
  },
});

// =====================================================
// ==                 Underlined                      ==
// =====================================================
const genBaseUnderlinedStyle = (
  token: SelectToken,
  options: {
    borderColor: string;
    hoverBorderHover: string;
    activeBorderColor: string;
    activeOutlineColor: string;
    color: string;
  },
): CSSObject => {
  const { componentCls, antCls } = token;

  return {
    [`&:not(${componentCls}-customize-input) ${componentCls}-selector`]: {
      borderWidth: `0 0 ${unit(token.lineWidth)} 0`,
      borderStyle: `none none ${token.lineType} none`,
      borderColor: options.borderColor,
      background: token.selectorBg,
      borderRadius: 0,
    },
    [`&:not(${componentCls}-disabled):not(${componentCls}-customize-input):not(${antCls}-pagination-size-changer)`]:
      {
        [`&:hover ${componentCls}-selector`]: {
          borderColor: options.hoverBorderHover,
        },

        [`${componentCls}-focused& ${componentCls}-selector`]: {
          borderColor: options.activeBorderColor,
          outline: 0,
        },
        [`${componentCls}-prefix`]: {
          color: options.color,
        },
      },
  };
};

const genUnderlinedStatusStyle = (
  token: SelectToken,
  options: {
    status: string;
    borderColor: string;
    hoverBorderHover: string;
    activeBorderColor: string;
    activeOutlineColor: string;
    color: string;
  },
): CSSObject => ({
  [`&${token.componentCls}-status-${options.status}`]: {
    ...genBaseUnderlinedStyle(token, options),
  },
});

const genUnderlinedStyle = (token: SelectToken): CSSObject => ({
  '&-underlined': {
    ...genBaseUnderlinedStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderHover: token.hoverBorderColor,
      activeBorderColor: token.activeBorderColor,
      activeOutlineColor: token.activeOutlineColor,
      color: token.colorText,
    }),

    ...genUnderlinedStatusStyle(token, {
      status: 'error',
      borderColor: token.colorError,
      hoverBorderHover: token.colorErrorHover,
      activeBorderColor: token.colorError,
      activeOutlineColor: token.colorErrorOutline,
      color: token.colorError,
    }),

    ...genUnderlinedStatusStyle(token, {
      status: 'warning',
      borderColor: token.colorWarning,
      hoverBorderHover: token.colorWarningHover,
      activeBorderColor: token.colorWarning,
      activeOutlineColor: token.colorWarningOutline,
      color: token.colorWarning,
    }),

    [`&${token.componentCls}-disabled`]: {
      [`&:not(${token.componentCls}-customize-input) ${token.componentCls}-selector`]: {
        color: token.colorTextDisabled,
      },
    },

    [`&${token.componentCls}-multiple ${token.componentCls}-selection-item`]: {
      background: token.multipleItemBg,
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`,
    },
  },
});

const genVariantsStyle = (token: SelectToken): CSSObject => ({
  [token.componentCls]: {
    ...genOutlinedStyle(token),
    ...genFilledStyle(token),
    ...genBorderlessStyle(token),
    ...genUnderlinedStyle(token),
  },
});

export default genVariantsStyle;
