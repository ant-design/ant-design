import React from 'react';
import classNames from 'classnames';
import { Loading, File, MinusSquare, PlusSquare, CaretDownFilled } from '@ant-design/icons';
import { AntTreeNodeProps } from '../Tree';

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode | null | undefined,
  showLine: boolean | undefined,
  { isLeaf, expanded, loading }: AntTreeNodeProps,
) {
  if (loading) {
    return <Loading className={`${prefixCls}-switcher-loading-icon`} />;
  }
  if (isLeaf) {
    if (showLine) {
      return <File className={`${prefixCls}-switcher-line-icon`} />;
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
      <MinusSquare className={`${prefixCls}-switcher-line-icon`} />
    ) : (
      <PlusSquare className={`${prefixCls}-switcher-line-icon`} />
    );
  }
  return <CaretDownFilled className={switcherCls} />;
}
