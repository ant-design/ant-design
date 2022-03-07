// import '../../style/index.less';
// import './index.less';

// style dependencies
import '../../empty/style';

// deps-lint-skip-all
import { CSSObject, CSSInterpolation } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  resetIcon,
  UseComponentStyleResult,
} from '../../_util/theme';
import genSingleStyle from './single';
import genMultipleStyle from './multiple';
import genDropdownStyle from './dropdown';

export type SelectToken = DerivativeToken & {
  rootPrefixCls: string;
  antCls: string;
  selectCls: string;
  iconPrefixCls: string;
  inputPaddingHorizontalBase: number;
};

// ============================== mixins ==============================
// FIXME: from Input. Should merge when Input finish cssinjs.
const genActiveStyle = (
  token: SelectToken,
  activeBorderColor: string = token.primaryHoverColor,
  outlineColor: string = token.primaryOutlineColor,
): CSSObject => ({
  borderColor: activeBorderColor,
  // FIXME: missing variable of `@input-outline-offset`
  boxShadow: `0 0 ${token.outlineBlurSize} ${token.outlineWidth} ${outlineColor}`,
  borderRightWidth: `${token.borderWidth}px !important`,
  outline: 0,
});

const genHoverStyle = (token: SelectToken): CSSObject => ({
  borderColor: token.primaryColor,
  borderRightWidth: `${token.borderWidth}px !important`,
});

// ============================= Selector =============================
const genSelectorStyle = (token: SelectToken): CSSObject => {
  const { selectCls } = token;

  return {
    position: 'relative',
    backgroundColor: token.componentBackground,
    border: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
    borderRadius: token.borderRadius,
    transition: `all ${token.duration} ${token.easeInOut}`,

    input: {
      cursor: 'pointer',
    },

    [`${selectCls}-show-search&`]: {
      cursor: 'text',

      input: {
        cursor: 'auto',
      },
    },

    [`${selectCls}-focused:not(${selectCls}-disabled)&`]: {
      ...genActiveStyle(token),
    },

    [`${selectCls}-disabled&`]: {
      color: token.textColorDisabled,
      background: token.componentBackgroundDisabled,
      cursor: 'not-allowed',

      [`${selectCls}-multiple&`]: {
        background: token.componentBackgroundDisabled,
      },

      input: {
        cursor: 'not-allowed',
      },
    },
  };
};

// ============================== Styles ==============================
// /* Reset search input style */
const getSearchInputWithoutBorderStyle = (token: SelectToken): CSSObject => {
  const { selectCls } = token;

  return {
    [`${selectCls}-selection-search-input`]: {
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
const genBaseStyle = (token: SelectToken): CSSObject => {
  const { selectCls, iconPrefixCls, inputPaddingHorizontalBase } = token;

  return {
    [selectCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',

      [`&:not(&-customize-input) ${selectCls}-selector`]: {
        ...genSelectorStyle(token),
        ...getSearchInputWithoutBorderStyle(token),
      },

      [`&:not(&-disabled):hover ${selectCls}-selector`]: {
        ...genHoverStyle(token),
      },

      // ======================== Selection ========================
      [`${selectCls}-selection-item`]: {
        flex: 1,
        overflow: 'hidden',
        fontWeight: 'normal',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },

      // ======================= Placeholder =======================
      [`${selectCls}-selection-placeholder`]: {
        flex: 1,
        overflow: 'hidden',
        color: token.placeholderColor,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
      },

      // ========================== Arrow ==========================
      [`${selectCls}-arrow`]: {
        ...resetIcon(),
        position: 'absolute',
        top: '50%',
        left: 'auto',
        right: inputPaddingHorizontalBase,
        width: token.fontSizeSM,
        height: token.fontSizeSM,
        marginTop: -token.fontSizeSM / 2,
        color: token.textColorDisabled,
        fontSize: token.fontSizeSM,
        lineHeight: 1,
        textAlign: 'center',
        pointerEvents: 'none',

        [`.${iconPrefixCls}`]: {
          verticalAlign: 'top',
          transition: `transform ${token.duration}`,

          '> svg': {
            verticalAlign: 'top',
          },

          [`&:not(${selectCls}-suffix)`]: {
            pointerEvents: 'auto',
          },
        },

        [`${selectCls}-disabled &`]: {
          cursor: 'not-allowed',
        },
      },

      // ========================== Clear ==========================
      [`${selectCls}-clear`]: {
        position: 'absolute',
        top: '50%',
        left: 'auto',
        right: inputPaddingHorizontalBase,
        zIndex: 1,
        display: 'inline-block',
        width: token.fontSizeSM,
        height: token.fontSizeSM,
        marginTop: -token.fontSizeSM / 2,
        color: token.textColorDisabled,
        fontSize: token.fontSizeSM,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        background: token.componentBackground,
        cursor: 'pointer',
        opacity: 0,
        transition: `color ${token.duration} ease, opacity ${token.duration} ease`,
        textRendering: 'auto',

        '&:before': {
          display: 'block',
        },

        '&:hover': {
          color: token.textColorSecondary,
        },

        [`${selectCls}:hover &`]: {
          opacity: 1,
        },
      },
    },
  };
};

// ============================== Styles ==============================
export const genSelectStyle = (
  rootPrefixCls: string,
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
  hashId: string,
): CSSInterpolation => {
  const antCls = `.${rootPrefixCls}`;
  const selectCls = `.${prefixCls}`;

  const inputPaddingHorizontalBase = token.controlPaddingHorizontal - 1;

  const selectToken = {
    ...token,
    rootPrefixCls,
    antCls,
    selectCls,
    iconPrefixCls,
    inputPaddingHorizontalBase,
  };

  return [
    genBaseStyle(selectToken),

    // ====================== Single ======================
    genSingleStyle(selectToken),

    // ===================== Multiple =====================
    genMultipleStyle(selectToken),

    // ==================== BorderLess ====================
    {
      [selectCls]: {
        [`&-borderless ${selectCls}-selector`]: {
          backgroundColor: `transparent !important`,
          borderColor: `transparent !important`,
          boxShadow: `none !important`,
        },
      },
    },

    // ===================== Dropdown =====================
    genDropdownStyle(selectToken, hashId),

    // ======================= RTL ========================
    {
      [`${selectCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  ];
};

// ============================== Export ==============================
export default function useStyle(
  rootPrefixCls: string,
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genSelectStyle(rootPrefixCls, prefixCls, iconPrefixCls, token, hashId),
    ]),
    hashId,
  ];
}
