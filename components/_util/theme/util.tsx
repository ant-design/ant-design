/* eslint-disable import/prefer-default-export */
import { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '.';

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
