import * as React from 'react';

import { ConfigContext, type RenderEmptyHandler } from '../../config-provider';

export default function useBase(
  customizePrefixCls?: string,
  direction?: 'ltr' | 'rtl',
): [
  prefixCls: string,
  cascaderPrefixCls: string,
  direction?: 'ltr' | 'rtl',
  renderEmpty?: RenderEmptyHandler,
] {
  const { getPrefixCls, direction: rootDirection, renderEmpty } = React.useContext(ConfigContext);

  const mergedDirection = direction || rootDirection;

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  return [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty];
}
