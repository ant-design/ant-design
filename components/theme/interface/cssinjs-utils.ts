import type {
  GlobalToken as GlobalTokenTypeUtil,
  OverrideTokenMap as OverrideTokenTypeUtil,
} from '@ant-design/cssinjs-utils';

import type { AliasToken } from './alias';
import type { ComponentTokenMap } from './components';


/** Final token which contains the components level override */
export type GlobalToken = GlobalTokenTypeUtil<ComponentTokenMap, AliasToken>;

export type OverrideToken = OverrideTokenTypeUtil<ComponentTokenMap, AliasToken>;
