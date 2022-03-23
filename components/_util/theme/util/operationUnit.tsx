import type { CSSObject } from '@ant-design/cssinjs';
import { DerivativeToken } from '..';

// eslint-disable-next-line import/prefer-default-export
export const operationUnit = (token: DerivativeToken): CSSObject => ({
  // Use primaryColor instead link color in v5
  color: token.colorPrimary,
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: `color ${token.motionDurationSlow}`,

  '&:focus, &:hover': {
    color: token.linkHoverColor,
  },

  '&:active': {
    color: token.linkActiveColor,
  },
});
