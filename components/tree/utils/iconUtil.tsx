import CaretDownFilled from '@ant-design/icons/CaretDownFilled';
import FileOutlined from '@ant-design/icons/FileOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import classNames from 'classnames';
import * as React from 'react';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import type { AntTreeNodeProps, TreeLeafIcon, SwitcherIcon } from '../Tree';

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: SwitcherIcon,
  treeNodeProps: AntTreeNodeProps,
  showLine?: boolean | { showLeafIcon: boolean | TreeLeafIcon },
): React.ReactNode {
  const { isLeaf, expanded, loading } = treeNodeProps;

  if (loading) {
    return <LoadingOutlined className={`${prefixCls}-switcher-loading-icon`} />;
  }
  let showLeafIcon: boolean | TreeLeafIcon;
  if (showLine && typeof showLine === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }

  if (isLeaf) {
    if (!showLine) {
      return null;
    }

    if (typeof showLeafIcon !== 'boolean' && !!showLeafIcon) {
      const leafIcon =
        typeof showLeafIcon === 'function' ? showLeafIcon(treeNodeProps) : showLeafIcon;
      const leafCls = `${prefixCls}-switcher-line-custom-icon`;

      if (isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames(leafIcon.props.className || '', leafCls),
        });
      }

      return leafIcon;
    }

    return showLeafIcon ? (
      <FileOutlined className={`${prefixCls}-switcher-line-icon`} />
    ) : (
      <span className={`${prefixCls}-switcher-leaf-line`} />
    );
  }

  const switcherCls = `${prefixCls}-switcher-icon`;

  const switcher = typeof switcherIcon === 'function' ? switcherIcon(treeNodeProps) : switcherIcon;

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
