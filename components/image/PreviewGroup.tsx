import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import RcImage from 'rc-image';
import type { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { getTransitionName } from '../_util/motion';

// CSSINJS
import useStyle from './style';

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
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const previewPrefixCls = `${prefixCls}-preview`;
  const rootPrefixCls = getPrefixCls();

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const mergedRootClassName = classNames(hashId, _preview.rootClassName ?? '');

    return {
      ..._preview,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
      rootClassName: mergedRootClassName,
    };
  }, [preview]);

  return wrapSSR(
    <RcImage.PreviewGroup
      preview={mergedPreview}
      previewPrefixCls={previewPrefixCls}
      icons={icons}
      {...props}
    />,
  );
};

export default InternalPreviewGroup;
