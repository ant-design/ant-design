// deps-lint-skip-all
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import capitalize from '../../_util/capitalize';
import type { FullToken, PresetColorType } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, PresetColors, resetComponent } from '../../_util/theme';

interface TagToken extends FullToken<'Tag'> {
  tagFontSize: number;
  tagLineHeight: React.CSSProperties['lineHeight'];
  tagDefaultBg: string;
  tagDefaultColor: string;
  tagIconSize: number;
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
      background: token[`color${capitalizedCssVariableType}Bg`],
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

const genBaseStyle = (token: TagToken): CSSInterpolation => {
  const { paddingXS, paddingXXS, controlLineWidth } = token;
  const paddingInline = paddingXS - controlLineWidth;
  const iconMarginInline = paddingXXS - controlLineWidth;

  return {
    // Result
    [token.componentCls]: {
      ...resetComponent(token),
      display: 'inline-block',
      height: 'auto',
      marginInlineEnd: token.marginXS,
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: `${token.tagLineHeight}px`,
      whiteSpace: 'nowrap',
      background: token.tagDefaultBg,
      border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
      borderRadius: token.controlRadius,
      opacity: 1,
      transition: `all ${token.motionDurationSlow}`,
      textAlign: 'start',

      // RTL
      '&&-rtl': {
        direction: 'rtl',
      },

      '&, a, a:hover': {
        color: token.tagDefaultColor,
      },

      [`${token.componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        color: token.colorTextSecondary,
        fontSize: token.tagIconSize,
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
        marginInlineStart: paddingInline,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Tag', token => {
  const { fontSize, lineHeight, controlLineWidth, fontSizeIcon } = token;
  const tagHeight = Math.round(fontSize * lineHeight);

  const tagFontSize = token.fontSizeSM;
  const tagLineHeight = tagHeight - controlLineWidth * 2;
  const tagDefaultBg = token.colorBgComponentSecondary;
  const tagDefaultColor = token.colorText;

  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
    tagIconSize: fontSizeIcon - 2 * controlLineWidth, // Tag icon is much more smaller
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
