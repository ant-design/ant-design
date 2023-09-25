import * as React from 'react';
import classNames from 'classnames';
import { Panel } from 'rc-cascader';
import type { PanelProps } from 'rc-cascader/lib/Panel';

import { ConfigContext } from '../config-provider';
import useStyle from './style';

export default function CascaderPanel(props: PanelProps) {
  const { prefixCls: customizePrefixCls, className } = props;

  const {
    getPrefixCls,
    renderEmpty,
    direction: rootDirection,
    cascader,
  } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);

  const [, hashId] = useStyle(cascaderPrefixCls);

  return (
    <Panel {...props} prefixCls={cascaderPrefixCls} className={classNames(className, hashId)} />
  );
}
