import * as React from 'react';
import classNames from 'classnames';
import { Panel } from 'rc-cascader';
import type { PickType } from 'rc-cascader/lib/Panel';

import type { CascaderProps } from '.';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import useBase from './hooks/useBase';
import useCheckable from './hooks/useCheckable';
import useColumnIcons from './hooks/useColumnIcons';
import useStyle from './style';
import usePanelStyle from './style/panel';

export type PanelPickType = Exclude<PickType, 'checkable'> | 'multiple' | 'rootClassName';

export type CascaderPanelProps = Pick<CascaderProps, PanelPickType>;

export default function CascaderPanel(props: CascaderPanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    multiple,
    rootClassName,
    notFoundContent,
    direction,
    expandIcon,
  } = props;

  const [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty] = useBase(
    customizePrefixCls,
    direction,
  );

  const [, hashId] = useStyle(cascaderPrefixCls);
  usePanelStyle(cascaderPrefixCls);

  const isRtl = mergedDirection === 'rtl';

  // ===================== Icon ======================
  const [mergedExpandIcon, loadingIcon] = useColumnIcons(prefixCls, isRtl, expandIcon);

  // ===================== Empty =====================
  const mergedNotFoundContent = notFoundContent || renderEmpty?.('Cascader') || (
    <DefaultRenderEmpty componentName="Cascader" />
  );

  // =================== Multiple ====================
  const checkable = useCheckable(cascaderPrefixCls, multiple);

  // ==================== Render =====================

  return (
    <Panel
      {...props}
      checkable={checkable}
      prefixCls={cascaderPrefixCls}
      className={classNames(className, hashId, rootClassName)}
      notFoundContent={mergedNotFoundContent}
      direction={mergedDirection}
      expandIcon={mergedExpandIcon}
      loadingIcon={loadingIcon}
    />
  );
}
