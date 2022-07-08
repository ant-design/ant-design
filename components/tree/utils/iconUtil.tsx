import CaretDownFilled from '@ant-design/icons/CaretDownFilled';
import FileOutlined from '@ant-design/icons/FileOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import classNames from 'classnames';
import * as React from 'react';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import type { AntTreeNodeProps, SwitcherIcon } from '../Tree';

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: SwitcherIcon,
  showLine: boolean | { showLeafIcon: boolean } | undefined,
  treeNodeProps: AntTreeNodeProps,
): React.ReactNode {
  const { isLeaf, expanded, loading } = treeNodeProps;

  if (loading) {
    return <LoadingOutlined className={`${prefixCls}-switcher-loading-icon`} />;
  }
  let showLeafIcon;
  if (showLine && typeof showLine === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }
  if (isLeaf) {
    if (showLine) {
      if (typeof showLine === 'object' && !showLeafIcon) {
        return <span className={`${prefixCls}-switcher-leaf-line`} />;
      }
      return <FileOutlined className={`${prefixCls}-switcher-line-icon`} />;
    }
    return null;
  }

  const switcherCls = `${prefixCls}-switcher-icon`;

  const switcher =
    typeof switcherIcon === 'function' ? switcherIcon({ expanded: !!expanded }) : switcherIcon;

  if (isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames(switcher.props.className || '', switcherCls),
    });
  }

  if (switcher) {
    return switcher;
  }

  if (showLine) {
    return expanded ? (
      <MinusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />
    ) : (
      <PlusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />
    );
  }
  return <CaretDownFilled className={switcherCls} />;
}
