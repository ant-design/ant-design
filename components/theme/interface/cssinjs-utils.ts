import type {
  GlobalToken as GlobalTokenTypeUtil,
} from '@ant-design/cssinjs-utils';

import type { AliasToken } from './alias';
import type { ComponentTokenMap } from './components';


/** Final token which contains the components level override */
export type GlobalToken = GlobalTokenTypeUtil<ComponentTokenMap, AliasToken>;
