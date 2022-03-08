/* eslint-disable import/prefer-default-export */
import { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '..';

export const resetComponent = (token: DerivativeToken): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.textColor,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token.lineHeight,
  listStyle: 'none',
  // font-feature-settings: @font-feature-settings-base;
});

export const resetIcon = (): CSSObject => ({
  display: 'inline-block',
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

  '& &-icon': {
    display: 'block',
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
