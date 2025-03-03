import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage from '@rc-component/image';
import type { ImagePreviewType, ImageProps } from '@rc-component/image';
import classNames from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useLocale } from '../locale';
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<ImageProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    preview,
    className,
    rootClassName,
    style,
    ...otherProps
  } = props;
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    preview: contextPreview,
  } = useComponentConfig('image');

  const [imageLocale] = useLocale('Image');

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedRootClassName = classNames(rootClassName, hashId, cssVarCls, rootCls);

  const mergedClassName = classNames(className, hashId, contextClassName);

  const [zIndex] = useZIndex(
    'ImagePreview',
    typeof preview === 'object' ? preview.zIndex : undefined,
  );

  const mergedPreview = React.useMemo<ImageProps['preview']>(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const _contextPreview = typeof contextPreview === 'object' ? contextPreview : {};
    const { getContainer, closeIcon, rootClassName, ...restPreviewProps } = _preview;
    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      icons,
      ...restPreviewProps,
      getContainer: getContainer ?? getContextPopupContainer,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
      zIndex,
      closeIcon: closeIcon ?? contextPreview?.closeIcon,
      rootClassName: classNames(
        mergedRootClassName,
        rootClassName,
        _preview?.classNames?.root,
        _contextPreview?.classNames?.root,
      ),
      classNames: {
        mask: classNames(_preview?.classNames?.mask, _contextPreview?.classNames?.mask),
        actions: classNames(_preview?.classNames?.actions, _contextPreview?.classNames?.actions),
        wrapper: classNames(_preview?.classNames?.wrapper, _contextPreview?.classNames?.wrapper),
      },
      styles: {
        root: { ..._contextPreview?.styles?.root, ..._preview?.styles?.root },
        mask: { ..._contextPreview?.styles?.mask, ..._preview?.styles?.mask },
        actions: { ..._contextPreview?.styles?.actions, ..._preview?.styles?.actions },
        wrapper: { ..._contextPreview?.styles?.wrapper, ..._preview?.styles?.wrapper },
      },
    };
  }, [preview, imageLocale, contextPreview]);

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  return (
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreview}
      rootClassName={mergedRootClassName}
      className={mergedClassName}
      style={mergedStyle}
      {...otherProps}
    />
  );
};

export type { ImageProps, ImagePreviewType };

Image.PreviewGroup = PreviewGroup;

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

export default Image;
