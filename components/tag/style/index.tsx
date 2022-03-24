// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import capitalize from '../../_util/capitalize';
import {
  PresetColorType,
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  UseComponentStyleResult,
  PresetColors,
} from '../../_util/theme';

interface TagToken extends DerivativeToken {
  tagFontSize: number;
  tagLineHeight: React.CSSProperties['lineHeight'];
  tagDefaultBg: string;
  tagDefaultColor: string;
}

// ============================== Styles ==============================

type CssVariableType = 'Success' | 'Info' | 'Error' | 'Warning';

const genTagStatusStyle = (
  prefixCls: string,
  token: TagToken,
  status: 'success' | 'processing' | 'error' | 'warning',
  cssVariableType: CssVariableType,
): CSSInterpolation => {
  const capitalizedCssVariableType = capitalize<CssVariableType>(cssVariableType);
  return {
    [`.${prefixCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`colorBg${capitalizedCssVariableType}`],
      borderColor: token[`color${capitalizedCssVariableType}Secondary`],
    },
  };
};

// FIXME: special preset colors
const genTagColorStyle = (prefixCls: string, token: TagToken): CSSInterpolation =>
  PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
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
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor,
      },
    };
  }, {} as CSSObject);

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
    marginInlineStart: token.marginXS,
    // FIXME: hard code
    padding: '0 7px',
    fontSize: token.tagFontSize,
    lineHeight: token.tagLineHeight,
    whiteSpace: 'nowrap',
    background: token.tagDefaultBg,
    border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
    borderRadius: token.controlRadius,
    // FIXME: hard code
    opacity: 1,
    transition: `all ${token.motionDurationSlow}`,

    // RTL
    '&&-rtl': {
      direction: 'rtl',
      textAlign: 'right',
    },

    '&, a, a:hover': {
      color: token.tagDefaultColor,
    },

    [`.${prefixCls}-close-icon`]: {
      // FIXME: hard code
      marginInlineStart: 3,
      color: token.colorTextSecondary,
      // FIXME: hard code
      fontSize: 10,
      cursor: 'pointer',
      transition: `all ${token.motionDurationSlow}`,

      '&:hover': {
        color: token.colorTextHeading,
      },
    },

    [`&&-has-color`]: {
      borderColor: 'transparent',

      [`&, a, a:hover, .${iconPrefixCls}-close, .${iconPrefixCls}-close:hover`]: {
        color: token.colorTextLightSolid,
      },
    },

    [`&-checkable`]: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      cursor: 'pointer',

      '&:not(&-checked):hover': {
        color: token.colorPrimary,
      },

      '&:active, &-checked': {
        color: token.colorTextLightSolid,
      },

      '&-checked': {
        backgroundColor: token.colorPrimary,
      },

      '&:active': {
        backgroundColor: token.colorPrimaryActive,
      },
    },

    [`&-hidden`]: {
      display: 'none',
    },

    // To ensure that a space will be placed between character and `Icon`.
    [`> .${iconPrefixCls} + span, > span + .${iconPrefixCls}`]: {
      // FIXME: hard code
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
  // FIXME: hard code
  const tagLineHeight = '18px';
  const tagDefaultBg = token.colorBgComponentSecondary;
  const tagDefaultColor = token.colorText;

  const tagToken = {
    ...token,
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
  };

  return [
    genBaseStyle(prefixCls, iconPrefixCls, tagToken),
    genTagColorStyle(prefixCls, tagToken),
    genTagStatusStyle(prefixCls, tagToken, 'success', 'Success'),
    genTagStatusStyle(prefixCls, tagToken, 'processing', 'Info'),
    genTagStatusStyle(prefixCls, tagToken, 'error', 'Error'),
    genTagStatusStyle(prefixCls, tagToken, 'warning', 'Warning'),
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
