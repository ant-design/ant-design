import type { CSSObject } from '@ant-design/cssinjs';

import type { AliasToken } from '../theme/internal';

export const operationUnit = (token: AliasToken): CSSObject => ({
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
  color: token.colorLink,
  textDecoration: token.linkDecoration,
  outline: 'none',
  cursor: 'pointer',
  transition: `all ${token.motionDurationSlow}`,
  border: 0,
  background: 'none',
  userSelect: 'none',

  '&:focus, &:hover': {
    color: token.colorLinkHover,
  },

  '&:active': {
    color: token.colorLinkActive,
  },
});
