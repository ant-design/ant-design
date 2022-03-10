// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import capitalize from '../../_util/capitlaize';
import {
  IPrimaryColor,
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  UseComponentStyleResult,
} from '../../_util/theme';

interface TagToken extends DerivativeToken {
  tagFontSize: number;
  tagLineHeight: React.CSSProperties['lineHeight'];
  tagDefaultBg: string;
  tagDefaultColor: string;
}

// ============================== Styles ==============================

type CssVariableType = 'success' | 'info' | 'error' | 'warning';

const genStatusColorStyle = (
  prefixCls: string,
  token: TagToken,
  status: 'success' | 'processing' | 'error' | 'warning',
  cssVariableType: CssVariableType,
): CSSInterpolation => {
  const capitalizedCssVariableType = capitalize<CssVariableType>(cssVariableType);
  return {
    [`.${prefixCls}-${status}`]: {
      color: token[`${cssVariableType}Color`],
      background: token[`tmp${capitalizedCssVariableType}ColorDeprecatedBg`],
      borderColor: token[`tmp${capitalizedCssVariableType}ColorDeprecatedBorder`],
    },
  };
};

const genTagColorStyle = (prefixCls: string, token: TagToken): CSSInterpolation => {
  return Object.keys(token.presetColors).reduce((prev: CSSObject, colorKey: IPrimaryColor) => {
    const lightColor = token[`${colorKey}-1`];
    const lightBorderColor = token[`${colorKey}-3`];
    const darkColor = token[`${colorKey}-6`];
    const textColor = token[`${colorKey}-7`];
    return {
      ...prev,
      [`.${prefixCls}-${colorKey}`]: {
        color: textColor,
        background: lightColor,
        borderColor: lightBorderColor,
      },
      [`.${prefixCls}-${colorKey}-inverse`]: {
        color: token.textColorInverse,
        background: darkColor,
        borderColor: darkColor,
      },
    };
  }, {} as CSSObject);
};

const genBaseStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: TagToken,
): CSSInterpolation => ({
  // Result
  [`.${prefixCls}`]: {
    ...resetComponent(token),
    display: 'inline-block',
    height: 'auto',
    marginRight: token.marginXS,
    // hard code
    padding: '0 7px',
    fontSize: token.tagFontSize,
    lineHeight: token.tagLineHeight,
    whiteSpace: 'nowrap',
    background: token.tagDefaultBg,
    border: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
    borderRadius: token.borderRadius,
    // hard code
    opacity: 1,
    transition: `all ${token.duration}`,

    '&, a, a:hover': {
      color: token.tagDefaultColor,
    },

    [`.${prefixCls}-close-icon`]: {
      marginLeft: 3,
      color: token.textColorSecondary,
      // hard code
      fontSize: 10,
      cursor: 'pointer',
      transition: `all ${token.duration}`,

      '&:hover': {
        color: token.headingColor,
      },
    },

    [`&&-has-color`]: {
      borderColor: 'transparent',

      [`&, a, a:hover, .${iconPrefixCls}-close, .${iconPrefixCls}-close:hover`]: {
        color: token.textColorInverse,
      },
    },

    [`.${prefixCls}-checkable`]: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      cursor: 'pointer',

      '&:not(&-checked):hover': {
        color: token.primaryColor,
      },

      '&:active, &-checked': {
        color: token.textColorInverse,
      },

      '&-checked': {
        backgroundColor: token.tmpPrimaryColor6,
      },

      '&:active': {
        backgroundColor: token.tmpPrimaryColor7,
      },
    },

    [`.${prefixCls}-hidden`]: {
      display: 'none',
    },

    // To ensure that a space will be placed between character and `Icon`.
    [`> .${iconPrefixCls} + span, > span + .${iconPrefixCls}`]: {
      // hard code
      marginInlineStart: 7,
    },
  },
});

export const genTagStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const tagFontSize = token.fontSizeSM;
  // hard code
  const tagLineHeight = '18px';
  const tagDefaultBg = token.backgroundLight;
  const tagDefaultColor = token.textColor;

  const tagToken = {
    ...token,
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
  };

  // TODO: RTL | DARK THEME
  return [
    genBaseStyle(prefixCls, iconPrefixCls, tagToken),
    genStatusColorStyle(prefixCls, tagToken, 'success', 'success'),
    genStatusColorStyle(prefixCls, tagToken, 'processing', 'info'),
    genStatusColorStyle(prefixCls, tagToken, 'error', 'error'),
    genStatusColorStyle(prefixCls, tagToken, 'warning', 'warning'),
    genTagColorStyle(prefixCls, tagToken),
  ];
};

// ============================== Export ==============================
export function getStyle(prefixCls: string, iconPrefixCls: string, token: DerivativeToken) {
  return [genTagStyle(prefixCls, iconPrefixCls, token)];
}

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
      getStyle(prefixCls, iconPrefixCls, token),
    ),
    hashId,
  ];
}
