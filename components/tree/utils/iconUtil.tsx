import * as React from 'react';
import CaretDownFilled from '@ant-design/icons/CaretDownFilled';
import FileOutlined from '@ant-design/icons/FileOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import classNames from 'classnames';

import { cloneElement } from '../../_util/reactNode';
import type { AntTreeNodeProps, SwitcherIcon, TreeLeafIcon } from '../Tree';

interface SwitcherIconProps {
  prefixCls: string;
  treeNodeProps: AntTreeNodeProps;
  switcherIcon?: SwitcherIcon;
  switcherLoadingIcon?: React.ReactNode;
  showLine?: boolean | { showLeafIcon: boolean | TreeLeafIcon };
}

const SwitcherIconCom: React.FC<SwitcherIconProps> = (props) => {
  const { prefixCls, switcherIcon, treeNodeProps, showLine, switcherLoadingIcon } = props;

  const { isLeaf, expanded, loading } = treeNodeProps;

  if (loading) {
    if (React.isValidElement(switcherLoadingIcon)) {
      return switcherLoadingIcon;
    }
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

      if (React.isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames(
            (leafIcon as React.ReactElement<{ className?: string }>).props.className || '',
            leafCls,
          ),
        });
      }

      return leafIcon as unknown as React.ReactElement;
    }

    return showLeafIcon ? (
      <FileOutlined className={`${prefixCls}-switcher-line-icon`} />
    ) : (
      <span className={`${prefixCls}-switcher-leaf-line`} />
    );
  }

  const switcherCls = `${prefixCls}-switcher-icon`;

  const switcher = typeof switcherIcon === 'function' ? switcherIcon(treeNodeProps) : switcherIcon;

  if (React.isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames(
        (switcher as React.ReactElement<{ className?: string }>).props.className || '',
        switcherCls,
      ),
    });
  }

  if (switcher !== undefined) {
    return switcher as unknown as React.ReactElement;
  }

  if (showLine) {
    return expanded ? (
      <MinusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />
    ) : (
      <PlusSquareOutlined className={`${prefixCls}-switcher-line-icon`} />
    );
  }
  return <CaretDownFilled className={switcherCls} />;
};

export default SwitcherIconCom;
