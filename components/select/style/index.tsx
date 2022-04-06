// import '../../style/index.less';
// import './index.less';

// style dependencies
import '../../empty/style';

// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  resetComponent,
  resetIcon,
  GenerateStyle,
  genComponentStyleHook,
  FullToken,
} from '../../_util/theme';
import genSingleStyle from './single';
import genMultipleStyle from './multiple';
import genDropdownStyle from './dropdown';

export interface ComponentToken {
  zIndexDropdown: number;
}

export interface SelectToken extends FullToken<'Select'> {
  rootPrefixCls: string;
  inputPaddingHorizontalBase: number;
}

// ============================= Selector =============================
const genSelectorStyle: GenerateStyle<SelectToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    position: 'relative',
    backgroundColor: token.colorBgComponent,
    border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
    borderRadius: token.controlRadius,
    transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,

    input: {
      cursor: 'pointer',
    },

    [`${componentCls}-show-search&`]: {
      cursor: 'text',

      input: {
        cursor: 'auto',
      },
    },

    [`${componentCls}-disabled&`]: {
      color: token.colorTextDisabled,
      background: token.colorBgComponentDisabled,
      cursor: 'not-allowed',

      [`${componentCls}-multiple&`]: {
        background: token.colorBgComponentDisabled,
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
    borderHoverColor: string;
    outlineColor: string;
    controlOutlineWidth: number;
    controlLineWidth: number;
  },
  overwriteDefaultBorder: boolean = false,
): CSSObject => {
  const { componentCls, borderHoverColor, outlineColor } = token;

  const overwriteStyle: CSSObject = overwriteDefaultBorder
    ? {
        [`${componentCls}-selector`]: {
          borderColor: borderHoverColor,
        },
      }
    : {};

  return {
    [rootSelectCls]: {
      [`&:not(${componentCls}-disabled):not(${componentCls}-customize-input)`]: {
        ...overwriteStyle,

        [`${componentCls}-focused& ${componentCls}-selector`]: {
          borderColor: borderHoverColor,
          boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${outlineColor}`,
          borderInlineEndWidth: `${token.controlLineWidth}px !important`,
          outline: 0,
        },

        [`&:hover ${componentCls}-selector`]: {
          borderColor: borderHoverColor,
          borderInlineEndWidth: `${token.controlLineWidth}px !important`,
        },
      },
    },
  };
};

// ============================== Styles ==============================
// /* Reset search input style */
const getSearchInputWithoutBorderStyle: GenerateStyle<SelectToken, CSSObject> = token => {
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
const genBaseStyle: GenerateStyle<SelectToken> = token => {
  const { componentCls, inputPaddingHorizontalBase, iconCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',

      [`&:not(&-customize-input) ${componentCls}-selector`]: {
        ...genSelectorStyle(token),
        ...getSearchInputWithoutBorderStyle(token),
      },

      // [`&:not(&-disabled):hover ${selectCls}-selector`]: {
      //   ...genHoverStyle(token),
      // },

      // ======================== Selection ========================
      [`${componentCls}-selection-item`]: {
        flex: 1,
        overflow: 'hidden',
        fontWeight: 'normal',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

      // ======================= Placeholder =======================
      [`${componentCls}-selection-placeholder`]: {
        flex: 1,
        overflow: 'hidden',
        color: token.colorPlaceholder,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
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
        color: token.colorTextDisabled,
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
        color: token.colorTextDisabled,
        fontSize: token.fontSizeIcon,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        background: token.colorBgComponent,
        cursor: 'pointer',
        opacity: 0,
        transition: `color ${token.motionDurationSlow} ease, opacity ${token.motionDurationSlow} ease`,
        textRendering: 'auto',

        '&:before': {
          display: 'block',
        },

        '&:hover': {
          color: token.colorTextSecondary,
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
const genSelectStyle: GenerateStyle<SelectToken> = (token, hashId) => {
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
        '&&-in-form-item': {
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
    genDropdownStyle(token, hashId),

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
    genStatusStyle(componentCls, {
      ...token,
      borderHoverColor: token.colorPrimaryHover,
      outlineColor: token.colorPrimaryOutline,
    }),
    genStatusStyle(
      `${componentCls}-status-error`,
      {
        ...token,
        borderHoverColor: token.colorErrorHover,
        outlineColor: token.colorErrorOutline,
      },
      true,
    ),
    genStatusStyle(
      `${componentCls}-status-warning`,
      {
        ...token,
        borderHoverColor: token.colorWarningHover,
        outlineColor: token.colorWarningOutline,
      },
      true,
    ),
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Select',
  (token, { rootPrefixCls, hashId }) => {
    const selectToken: SelectToken = {
      ...token,
      rootPrefixCls,
      inputPaddingHorizontalBase: token.controlPaddingHorizontal - 1,
    };

    return [genSelectStyle(selectToken, hashId)];
  },
  token => ({
    zIndexDropdown: token.zIndexPopup + 50,
  }),
);
