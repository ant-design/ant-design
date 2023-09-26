import * as React from 'react';
import classNames from 'classnames';
import { Panel } from 'rc-cascader';
import type { PickType } from 'rc-cascader/lib/Panel';

import type { CascaderProps } from '.';
import { ConfigContext } from '../config-provider';
import useCheckable from './hooks/useCheckable';
import useStyle from './style';
import usePanelStyle from './style/panel';

export type PanelPickType = Exclude<PickType, 'checkable'> | 'multiple';

export type CascaderPanelProps = Pick<CascaderProps, PanelPickType>;

export default function CascaderPanel(props: CascaderPanelProps) {
  const { prefixCls: customizePrefixCls, className, multiple } = props;

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

  // =================== Multiple ====================
  const checkable = useCheckable(cascaderPrefixCls, multiple);

  // ==================== Render =====================

  return (
    <Panel
      {...props}
      checkable={checkable}
      prefixCls={cascaderPrefixCls}
      className={classNames(className, hashId)}
    />
  );
}
