import type { CSSObject } from '@ant-design/cssinjs';
import { DerivativeToken } from '..';

// eslint-disable-next-line import/prefer-default-export
export const operationUnit = (token: DerivativeToken): CSSObject => ({
  color: token.linkColor,
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
