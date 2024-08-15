import * as React from 'react';

import { ConfigContext } from '../../config-provider';
import type { DirectionType, RenderEmptyHandler } from '../../config-provider';

function useBase(
  customizePrefixCls?: string,
  direction?: DirectionType,
): [
  prefixCls: string,
  cascaderPrefixCls: string,
  direction?: DirectionType,
  renderEmpty?: RenderEmptyHandler,
] {
  const { getPrefixCls, direction: rootDirection, renderEmpty } = React.useContext(ConfigContext);

  const mergedDirection = direction || rootDirection;

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  return [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty];
}

export default useBase;
