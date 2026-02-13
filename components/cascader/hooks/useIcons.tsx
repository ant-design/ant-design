import * as React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

const defaultExpandIcon = <RightOutlined />;
const defaultRtlExpandIcon = <LeftOutlined />;

export interface UseIconsOptions {
  isRtl: boolean;
  expandIcon: React.ReactNode;
  contextExpandIcon: React.ReactNode;
}

export default function useIcons({ contextExpandIcon, expandIcon, isRtl }: UseIconsOptions) {
  return React.useMemo(
    () => ({
      expandIcon:
        expandIcon ?? contextExpandIcon ?? (isRtl ? defaultRtlExpandIcon : defaultExpandIcon),
    }),
    [contextExpandIcon, expandIcon, isRtl],
  );
}
