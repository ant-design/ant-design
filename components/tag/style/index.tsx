// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import capitalize from '../../_util/capitalize';
import {
  PresetColorType,
  resetComponent,
  PresetColors,
  FullToken,
  genComponentStyleHook,
  mergeToken,
} from '../../_util/theme';

interface TagToken extends FullToken<'Tag'> {
  tagFontSize: number;
  tagLineHeight: React.CSSProperties['lineHeight'];
  tagDefaultBg: string;
  tagDefaultColor: string;
}

// ============================== Styles ==============================

type CssVariableType = 'Success' | 'Info' | 'Error' | 'Warning';

const genTagStatusStyle = (
  token: TagToken,
  status: 'success' | 'processing' | 'error' | 'warning',
  cssVariableType: CssVariableType,
): CSSInterpolation => {
  const capitalizedCssVariableType = capitalize<CssVariableType>(cssVariableType);
  return {
    [`${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`colorBg${capitalizedCssVariableType}`],
      borderColor: token[`color${capitalizedCssVariableType}Secondary`],
    },
  };
};

// FIXME: special preset colors
const genTagColorStyle = (token: TagToken): CSSInterpolation =>
  PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
    const lightColor = token[`${colorKey}-1`];
    const lightBorderColor = token[`${colorKey}-3`];
    const darkColor = token[`${colorKey}-6`];
    const textColor = token[`${colorKey}-7`];
    return {
      ...prev,
      [`${token.componentCls}-${colorKey}`]: {
        color: textColor,
        background: lightColor,
        borderColor: lightBorderColor,
      },
      [`${token.componentCls}-${colorKey}-inverse`]: {
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor,
      },
    };
  }, {} as CSSObject);

const genBaseStyle = (token: TagToken): CSSInterpolation => ({
  // Result
  [token.componentCls]: {
    ...resetComponent(token),
    display: 'inline-block',
    height: 'auto',
    marginInlineEnd: token.marginXS,
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

    [`${token.componentCls}-close-icon`]: {
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

      [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
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
    [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
      // FIXME: hard code
      marginInlineStart: 7,
    },
  },
});

// ============================== Export ==============================
export default genComponentStyleHook('Tag', token => {
  const tagFontSize = token.fontSizeSM;
  // FIXME: hard code
  const tagLineHeight = '18px';
  const tagDefaultBg = token.colorBgComponentSecondary;
  const tagDefaultColor = token.colorText;

  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
  });

  return [
    genBaseStyle(tagToken),
    genTagColorStyle(tagToken),
    genTagStatusStyle(tagToken, 'success', 'Success'),
    genTagStatusStyle(tagToken, 'processing', 'Info'),
    genTagStatusStyle(tagToken, 'error', 'Error'),
    genTagStatusStyle(tagToken, 'warning', 'Warning'),
  ];
});
