import * as React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';

export interface GetIconsOptions {
  isRtl: boolean;
  expandIcon: React.ReactNode;
  loadingIcon: React.ReactNode;
  contextExpandIcon: React.ReactNode;
  contextLoadingIcon: React.ReactNode;
}

export function getIcons({
  contextExpandIcon,
  contextLoadingIcon,
  expandIcon,
  loadingIcon,
  isRtl,
}: GetIconsOptions) {
  return {
    expandIcon: expandIcon ?? contextExpandIcon ?? (isRtl ? <LeftOutlined /> : <RightOutlined />),
    loadingIcon: loadingIcon ?? contextLoadingIcon ?? <LoadingOutlined spin />,
  };
}
