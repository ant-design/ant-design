import { Keyframes, unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { AliasToken, GenerateStyle } from '../theme/internal';

export const textEllipsis: CSSObject = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const resetComponent = (token: AliasToken, needInheritFontFamily = false): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token.lineHeight,
  listStyle: 'none',
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: needInheritFontFamily ? 'inherit' : token.fontFamily,
});

export const resetIcon = (): CSSObject => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: '-0.125em',
  textRendering: 'optimizeLegibility',
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',

  '> *': {
    lineHeight: 1,
  },

  svg: {
    display: 'inline-block',
  },
});

const loadingCircle = new Keyframes('loadingCircle', {
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const clearFix = (): CSSObject => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  '&::before': {
    display: 'table',
    content: '""',
  },

  '&::after': {
    // https://github.com/ant-design/ant-design/issues/21864
    display: 'table',
    clear: 'both',
    content: '""',
  },
});

export const genFocusOutline = (token: AliasToken, offset?: number): CSSObject => ({
  outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
  outlineOffset: offset ?? 1,
  transition: [`outline-offset`, `outline`].map((prop) => `${prop} 0s`).join(', '),
});

export const genFocusStyle = (token: AliasToken, offset?: number): CSSObject => ({
  '&:focus-visible': genFocusOutline(token, offset),
});

// Scroll-driven fades: reveal each edge fade only while there is more content to
// scroll toward, so it disappears once the matching edge is reached.
const scrollFadeTopIn = new Keyframes('antScrollFadeTop', {
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});
const scrollFadeBottomOut = new Keyframes('antScrollFadeBottom', {
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

interface ScrollFadeStyleOptions {
  backgroundColor?: string;
}

export const genScrollFadeStyle = (
  token: AliasToken,
  options?: ScrollFadeStyleOptions,
): CSSObject => {
  const { colorBgElevated, controlHeightLG } = token;
  const backgroundColor = options?.backgroundColor ?? colorBgElevated;
  const fadeSize = unit(controlHeightLG);

  return {
    position: 'relative',
    scrollbarGutter: 'stable',

    '&::before, &::after': {
      content: '""',
      position: 'sticky',
      display: 'block',
      height: fadeSize,
      pointerEvents: 'none',
      zIndex: 1,
      // Hidden by default, which is also the fallback when the list is not
      // scrollable or scroll-driven animations are unsupported.
      opacity: 0,
    },

    '&::before': {
      insetBlockStart: 0,
      marginBlockEnd: `calc(-1 * ${fadeSize})`,
      // Interpolate in OKLab so the fade to `transparent` stays clean.
      backgroundImage: `linear-gradient(to bottom in oklab, ${backgroundColor}, transparent)`,
    },

    '&::after': {
      insetBlockEnd: 0,
      marginBlockStart: `calc(-1 * ${fadeSize})`,
      backgroundImage: `linear-gradient(to top in oklab, ${backgroundColor}, transparent)`,
    },

    '@supports (animation-timeline: scroll())': {
      '&::before': {
        animationName: scrollFadeTopIn,
        animationTimeline: 'scroll(nearest block)',
        animationRange: `0 ${fadeSize}`,
        animationFillMode: 'both',
        animationTimingFunction: 'linear',
      },

      '&::after': {
        animationName: scrollFadeBottomOut,
        animationTimeline: 'scroll(nearest block)',
        animationRange: `calc(100% - ${fadeSize}) 100%`,
        animationFillMode: 'both',
        animationTimingFunction: 'linear',
      },
    },
  };
};

export const genLinkStyle: GenerateStyle<AliasToken, CSSObject> = (token) => ({
  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: 'transparent', // remove the gray background on active links in IE 10.
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${token.motionDurationSlow}`,
    '-webkit-text-decoration-skip': 'objects', // remove gaps in links underline in iOS 8+ and Safari 8+.

    '&:hover': {
      color: token.colorLinkHover,
    },

    '&:active': {
      color: token.colorLinkActive,
    },

    '&:active, &:hover': {
      textDecoration: token.linkHoverDecoration,
      outline: 0,
    },

    // https://github.com/ant-design/ant-design/issues/22503
    '&:focus': {
      textDecoration: token.linkFocusDecoration,
      outline: 0,
    },

    ...genFocusStyle(token),

    '&[disabled]': {
      color: token.colorTextDisabled,
      cursor: 'not-allowed',
    },
  },
});

export const genCommonStyle = (
  token: AliasToken,
  componentPrefixCls: string,
  rootCls?: string,
  resetFont?: boolean,
): CSSObject => {
  const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;

  const resetStyle: CSSObject = {
    boxSizing: 'border-box',

    '&::before, &::after': {
      boxSizing: 'border-box',
    },
  };

  let resetFontStyle: CSSObject = {};

  if (resetFont !== false) {
    resetFontStyle = {
      fontFamily: token.fontFamily,
      fontSize: token.fontSize,
    };
  }

  return {
    [rootPrefixSelector]: {
      ...resetFontStyle,
      ...resetStyle,

      [prefixSelector]: resetStyle,
    },
  };
};

export const genIconStyle = (iconPrefixCls: string): CSSObject => ({
  [`.${iconPrefixCls}`]: {
    ...resetIcon(),
    [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
      display: 'block',
    },
  },

  [`.${iconPrefixCls}-spin`]: {
    animationName: loadingCircle,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});

export const operationUnit: GenerateStyle<AliasToken, CSSObject> = (token) => ({
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
  color: token.colorLink,
  textDecoration: token.linkDecoration,
  outline: 'none',
  cursor: 'pointer',
  transition: `all ${token.motionDurationSlow}`,
  border: 0,
  padding: 0,
  background: 'none',
  userSelect: 'none',

  ...genFocusStyle(token),

  '&:hover': {
    color: token.colorLinkHover,
    textDecoration: token.linkHoverDecoration,
  },

  '&:focus': {
    color: token.colorLinkHover,
    textDecoration: token.linkFocusDecoration,
  },

  '&:active': {
    color: token.colorLinkActive,
    textDecoration: token.linkHoverDecoration,
  },
});
