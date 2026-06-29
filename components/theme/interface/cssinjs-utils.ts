import type {
  FullToken as FullTokenTypeUtil,
  GenStyleFn as GenStyleFnTypeUtil,
  GetDefaultToken as GetDefaultTokenTypeUtil,
  GlobalToken as GlobalTokenTypeUtil,
  OverrideTokenMap as OverrideTokenTypeUtil,
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
