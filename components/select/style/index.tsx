import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent, resetIcon, textEllipsis } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genDropdownStyle from './dropdown';
import genMultipleStyle from './multiple';
import genSingleStyle from './single';

export interface ComponentToken {
  zIndexPopup: number;
}

export interface SelectToken extends FullToken<'Select'> {
  rootPrefixCls: string;
  inputPaddingHorizontalBase: number;
}

// ============================= Selector =============================
const genSelectorStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    position: 'relative',
    backgroundColor: token.colorBgContainer,
    border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
    transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,

    input: {
      cursor: 'pointer',
    },

    [`${componentCls}-show-search&`]: {
      cursor: 'text',

      input: {
        cursor: 'auto',
        color: 'inherit',
      },
    },

    [`${componentCls}-disabled&`]: {
      color: token.colorTextDisabled,
      background: token.colorBgContainerDisabled,
      cursor: 'not-allowed',

      [`${componentCls}-multiple&`]: {
        background: token.colorBgContainerDisabled,
      },

      input: {
        cursor: 'not-allowed',
      },
    },
  };
};

// ============================== Status ==============================
const genStatusStyle = (
  rootSelectCls: string,
  token: {
    componentCls: string;
    antCls: string;
    borderHoverColor: string;
    outlineColor: string;
    controlOutlineWidth: number;
  },
  overwriteDefaultBorder: boolean = false,
): CSSObject => {
  const { componentCls, borderHoverColor, outlineColor, antCls } = token;

  const overwriteStyle: CSSObject = overwriteDefaultBorder
    ? {
        [`${componentCls}-selector`]: {
          borderColor: borderHoverColor,
        },
      }
    : {};

  return {
    [rootSelectCls]: {
      [`&:not(${componentCls}-disabled):not(${componentCls}-customize-input):not(${antCls}-pagination-size-changer)`]:
        {
          ...overwriteStyle,

          [`${componentCls}-focused& ${componentCls}-selector`]: {
            borderColor: borderHoverColor,
            boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${outlineColor}`,
            outline: 0,
          },

          [`&:hover ${componentCls}-selector`]: {
            borderColor: borderHoverColor,
          },
        },
    },
  };
};

// ============================== Styles ==============================
// /* Reset search input style */
const getSearchInputWithoutBorderStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-selection-search-input`]: {
      margin: 0,
      padding: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      appearance: 'none',

      '&::-webkit-search-cancel-button': {
        display: 'none',
        '-webkit-appearance': 'none',
      },
    },
  };
};

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SelectToken> = (token) => {
  const { componentCls, inputPaddingHorizontalBase, iconCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',

      [`&:not(${componentCls}-customize-input) ${componentCls}-selector`]: {
        ...genSelectorStyle(token),
        ...getSearchInputWithoutBorderStyle(token),
      },

      // [`&:not(&-disabled):hover ${selectCls}-selector`]: {
      //   ...genHoverStyle(token),
      // },

      // ======================== Selection ========================
      [`${componentCls}-selection-item`]: {
        flex: 1,
        fontWeight: 'normal',
        ...textEllipsis,
      },

      // ======================= Placeholder =======================
      [`${componentCls}-selection-placeholder`]: {
        ...textEllipsis,
        flex: 1,
        color: token.colorTextPlaceholder,
        pointerEvents: 'none',
      },

      // ========================== Arrow ==========================
      [`${componentCls}-arrow`]: {
        ...resetIcon(),
        position: 'absolute',
        top: '50%',
        insetInlineStart: 'auto',
        insetInlineEnd: inputPaddingHorizontalBase,
        height: token.fontSizeIcon,
        marginTop: -token.fontSizeIcon / 2,
        color: token.colorTextQuaternary,
        fontSize: token.fontSizeIcon,
        lineHeight: 1,
        textAlign: 'center',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',

        [iconCls]: {
          verticalAlign: 'top',
          transition: `transform ${token.motionDurationSlow}`,

          '> svg': {
            verticalAlign: 'top',
          },

          [`&:not(${componentCls}-suffix)`]: {
            pointerEvents: 'auto',
          },
        },

        [`${componentCls}-disabled &`]: {
          cursor: 'not-allowed',
        },

        '> *:not(:last-child)': {
          marginInlineEnd: 8, // FIXME: magic
        },
      },

      // ========================== Clear ==========================
      [`${componentCls}-clear`]: {
        position: 'absolute',
        top: '50%',
        insetInlineStart: 'auto',
        insetInlineEnd: inputPaddingHorizontalBase,
        zIndex: 1,
        display: 'inline-block',
        width: token.fontSizeIcon,
        height: token.fontSizeIcon,
        marginTop: -token.fontSizeIcon / 2,
        color: token.colorTextQuaternary,
        fontSize: token.fontSizeIcon,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        background: token.colorBgContainer,
        cursor: 'pointer',
        opacity: 0,
        transition: `color ${token.motionDurationMid} ease, opacity ${token.motionDurationSlow} ease`,
        textRendering: 'auto',

        '&:before': {
          display: 'block',
        },

        '&:hover': {
          color: token.colorTextTertiary,
        },
      },

      '&:hover': {
        [`${componentCls}-clear`]: {
          opacity: 1,
        },
      },
    },

    // ========================= Feedback ==========================
    [`${componentCls}-has-feedback`]: {
      [`${componentCls}-clear`]: {
        insetInlineEnd: inputPaddingHorizontalBase + token.fontSize + token.paddingXXS,
      },
    },
  };
};

// ============================== Styles ==============================
const genSelectStyle: GenerateStyle<SelectToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        // ==================== BorderLess ====================
        [`&-borderless ${componentCls}-selector`]: {
          backgroundColor: `transparent !important`,
          borderColor: `transparent !important`,
          boxShadow: `none !important`,
        },

        // ==================== In Form ====================
        [`&${componentCls}-in-form-item`]: {
          width: '100%',
        },
      },
    },

    // =====================================================
    // ==                       LTR                       ==
    // =====================================================
    // Base
    genBaseStyle(token),

    // Single
    genSingleStyle(token),

    // Multiple
    genMultipleStyle(token),

    // Dropdown
    genDropdownStyle(token),

    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },

    // =====================================================
    // ==                     Status                      ==
    // =====================================================
    genStatusStyle(
      componentCls,
      mergeToken<any>(token, {
        borderHoverColor: token.colorPrimaryHover,
        outlineColor: token.controlOutline,
      }),
    ),
    genStatusStyle(
      `${componentCls}-status-error`,
      mergeToken<any>(token, {
        borderHoverColor: token.colorErrorHover,
        outlineColor: token.colorErrorOutline,
      }),
      true,
    ),
    genStatusStyle(
      `${componentCls}-status-warning`,
      mergeToken<any>(token, {
        borderHoverColor: token.colorWarningHover,
        outlineColor: token.colorWarningOutline,
      }),
      true,
    ),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      borderElCls: `${componentCls}-selector`,
      focusElCls: `${componentCls}-focused`,
    }),
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Select',
  (token, { rootPrefixCls }) => {
    const selectToken: SelectToken = mergeToken<SelectToken>(token, {
      rootPrefixCls,
      inputPaddingHorizontalBase: token.paddingSM - 1,
    });

    return [genSelectStyle(selectToken)];
  },
  (token) => ({
    zIndexPopup: token.zIndexPopupBase + 50,
  }),
);
