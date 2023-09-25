import * as React from 'react';
import classNames from 'classnames';
import { Panel } from 'rc-cascader';
import type { PickType } from 'rc-cascader/lib/Panel';

import type { CascaderProps } from '.';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import usePanelStyle from './style/panel';

export type PanelPickType = Exclude<PickType, 'checkable'> | 'multiple';

export type CascaderPanelProps = Pick<CascaderProps, PanelPickType>;

export default function CascaderPanel(props: CascaderPanelProps) {
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
  usePanelStyle(cascaderPrefixCls);

  return (
    <Panel {...props} prefixCls={cascaderPrefixCls} className={classNames(className, hashId)} />
  );
}
