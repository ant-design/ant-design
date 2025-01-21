import * as React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

const useColumnIcons = (prefixCls: string, rtl: boolean, expandIcon?: React.ReactNode) => {
  let mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = rtl ? <LeftOutlined /> : <RightOutlined />;
  }

  const loadingIcon = (
    <span className={`${prefixCls}-menu-item-loading-icon`}>
      <LoadingOutlined spin />
    </span>
  );

  return React.useMemo<Readonly<[React.ReactNode, React.ReactNode]>>(
    () => [mergedExpandIcon, loadingIcon] as const,
    [mergedExpandIcon],
  );
};

export default useColumnIcons;
