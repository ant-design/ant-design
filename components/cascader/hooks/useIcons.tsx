import * as React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';

const defaultLoadingIcon = <LoadingOutlined spin />;
const defaultExpandIcon = <RightOutlined />;
const defaultRtlExpandIcon = <LeftOutlined />;

export interface UseIconsOptions {
  isRtl: boolean;
  expandIcon: React.ReactNode;
  loadingIcon: React.ReactNode;
  contextExpandIcon: React.ReactNode;
  contextLoadingIcon: React.ReactNode;
}

export default function useIcons({
  contextExpandIcon,
  contextLoadingIcon,
  expandIcon,
  loadingIcon,
  isRtl,
}: UseIconsOptions) {
  return React.useMemo(
    () => ({
      expandIcon:
        expandIcon ?? contextExpandIcon ?? (isRtl ? defaultRtlExpandIcon : defaultExpandIcon),
      loadingIcon: loadingIcon ?? contextLoadingIcon ?? defaultLoadingIcon,
    }),
    [contextExpandIcon, contextLoadingIcon, expandIcon, isRtl, loadingIcon],
  );
}
