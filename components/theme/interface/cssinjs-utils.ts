import type {
  GlobalToken as GlobalTokenTypeUtil,
  OverrideTokenMap as OverrideTokenTypeUtil,
  FullToken as FullTokenTypeUtil,
  GetDefaultToken as GetDefaultTokenTypeUtil,
  GenStyleFn as GenStyleFnTypeUtil,
  TokenMapKey,
} from '@ant-design/cssinjs-utils';

import type { AliasToken } from './alias';
import type { ComponentTokenMap } from './components';

/** Final token which contains the components level override */
export type GlobalToken = GlobalTokenTypeUtil<ComponentTokenMap, AliasToken>;

export type OverrideToken = OverrideTokenTypeUtil<ComponentTokenMap, AliasToken>;

export type OverrideComponent = TokenMapKey<ComponentTokenMap>;

export type FullToken<C extends TokenMapKey<ComponentTokenMap>> = FullTokenTypeUtil<
  ComponentTokenMap,
  AliasToken,
  C
>;

export type GetDefaultToken<C extends TokenMapKey<ComponentTokenMap>> = GetDefaultTokenTypeUtil<
  ComponentTokenMap,
  AliasToken,
  C
>;

export type GenStyleFn<C extends TokenMapKey<ComponentTokenMap>> = GenStyleFnTypeUtil<
  ComponentTokenMap,
  AliasToken,
  C
>;
