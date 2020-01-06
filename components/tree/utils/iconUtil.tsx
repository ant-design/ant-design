import React from 'react';
import classNames from 'classnames';
import {
  LoadingOutlined,
  FileOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  CaretDownFilled,
} from '@ant-design/icons';
import { AntTreeNodeProps } from '../Tree';

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode | null | undefined,
  showLine: boolean | undefined,
  { isLeaf, expanded, loading }: AntTreeNodeProps,
) {
  if (loading) {
    return <LoadingOutlined className={`${prefixCls}-switcher-loading-icon`} />;
  }
  if (isLeaf) {
    if (showLine) {
      return <FileOutlined className={`${prefixCls}-switcher-line-icon`} />;
    }
    return null;
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  if (React.isValidElement(switcherIcon)) {
    const switcherOriginCls = switcherIcon.props.className || '';
    return React.cloneElement(switcherIcon, {
      className: classNames(switcherOriginCls, switcherCls),
    });
  }

  if (switcherIcon) {
    return switcherIcon;
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
