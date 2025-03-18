import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RotateLeftOutlined from '@ant-design/icons/RotateLeftOutlined';
import RotateRightOutlined from '@ant-design/icons/RotateRightOutlined';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import RcImage from '@rc-component/image';
import type { GroupConsumerProps } from '@rc-component/image/lib/PreviewGroup';
import classnames from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';
import usePreviewConfig from './usePreviewConfig';

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
  flipX: <SwapOutlined />,
  flipY: <SwapOutlined rotate={90} />,
};

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  preview,
  ...otherProps
}) => {
  // =============================== MISC ===============================
  // Context
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    preview: contextPreview,
  } = useComponentConfig('image');

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const previewPrefixCls = `${prefixCls}-preview`;

  // ============================== Style ===============================
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedRootClassName = classnames(hashId, cssVarCls, rootCls);

  // ============================= Preview ==============================
  const previewConfig = usePreviewConfig(preview);
  const contextPreviewConfig = usePreviewConfig(contextPreview);

  const [zIndex] = useZIndex('ImagePreview', previewConfig?.zIndex);

  // Preview semantic
  const [mergedPreviewClassNames, mergedPreviewStyles] = useMergeSemantic(
    [contextPreviewConfig?.classNames, previewConfig?.classNames],
    [contextPreviewConfig?.styles, previewConfig?.styles],
  );

  const mergedPreview = React.useMemo<GroupConsumerProps['preview']>(() => {
    if (!previewConfig) {
      return previewConfig;
    }

    const { getContainer, closeIcon, rootClassName: previewRootClassName } = previewConfig;
    const { closeIcon: contextCloseIcon } = contextPreviewConfig ?? {};

    return {
      // Can be replaced
      motionName: getTransitionName(`${prefixCls}-preview`, 'fade'),

      ...previewConfig,
      icons,
      getContainer: getContainer ?? getContextPopupContainer,

      zIndex,
      closeIcon: closeIcon ?? contextCloseIcon,
      rootClassName: classnames(mergedRootClassName, previewRootClassName),
      classNames: mergedPreviewClassNames,
      styles: mergedPreviewStyles,
    };
  }, [preview]);

  return (
    <RcImage.PreviewGroup
      preview={mergedPreview}
      previewPrefixCls={previewPrefixCls}
      icons={icons}
      {...otherProps}
    />
  );
};

export default InternalPreviewGroup;
