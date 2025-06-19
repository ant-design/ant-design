import React from 'react';
import classnames from 'classnames';

import type { PreviewConfig } from '..';
import { useZIndex } from '../../_util/hooks/useZIndex';
import { getTransitionName } from '../../_util/motion';
import type { GroupPreviewConfig } from '../PreviewGroup';

export default function useMergedPreviewConfig<T extends PreviewConfig | GroupPreviewConfig>(
  previewConfig: T,
  contextPreviewConfig: T,
  prefixCls: string,
  mergedRootClassName: string,
  getContextPopupContainer: PreviewConfig['getContainer'],
  icons: PreviewConfig['icons'],
  defaultCover?: React.ReactNode,
): T {
  const [zIndex] = useZIndex('ImagePreview', previewConfig?.zIndex);

  return React.useMemo(() => {
    if (!previewConfig) {
      return previewConfig;
    }
    const {
      cover,
      getContainer,
      closeIcon,
      rootClassName: previewRootClassName,
    } = previewConfig as PreviewConfig;
    const { closeIcon: contextCloseIcon } = contextPreviewConfig ?? {};
    return {
      motionName: getTransitionName(`${prefixCls}-preview`, 'fade'),
      ...previewConfig,
      ...(defaultCover ? { cover: cover ?? defaultCover } : {}),
      icons,
      getContainer: getContainer ?? getContextPopupContainer,
      zIndex,
      closeIcon: closeIcon ?? contextCloseIcon,
      rootClassName: classnames(mergedRootClassName, previewRootClassName),
    };
  }, [
    previewConfig,
    contextPreviewConfig,
    prefixCls,
    mergedRootClassName,
    getContextPopupContainer,
    defaultCover,
    icons,
    zIndex,
  ]);
}
