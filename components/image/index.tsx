import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage from '@rc-component/image';
import type { ImagePreviewType, ImageProps } from '@rc-component/image';
import classNames from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import { devUseWarning } from '../_util/warning';
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
    styles,
    classNames: imageClassNames,
    ...otherProps
  } = props;
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    preview: contextPreview,
    styles: contextStyles,
    classNames: contextClassNames,
  } = useComponentConfig('image');

  const mergedStyles = {
    root: { ...contextStyles.root, ...styles?.root },
    actions: { ...contextStyles.actions, ...styles?.actions },
    mask: { ...contextStyles.mask, ...styles?.mask },
  };

  const mergedClassNames = {
    root: classNames(contextClassNames.root, imageClassNames?.root),
    actions: classNames(contextClassNames.actions, imageClassNames?.actions),
    mask: classNames(contextClassNames.mask, imageClassNames?.mask),
  };

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('image');

    [
      ['rootClassName', 'Image.classNames'],
      ['maskClassName', 'classNames: { mask: "" }'],
    ].forEach(([deprecatedName, newName]) => {
      if (typeof preview === 'object') {
        warning.deprecated(!(deprecatedName in preview), deprecatedName, newName);
      }
    });
  }

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
        <div
          className={classNames(`${prefixCls}-mask-info`, mergedClassNames?.actions)}
          style={mergedStyles?.actions}
        >
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
      rootClassName: classNames(mergedRootClassName, rootClassName),
      classNames: {
        mask: classNames(_preview?.classNames?.mask, _contextPreview?.classNames?.mask),
        actions: classNames(_preview?.classNames?.actions, _contextPreview?.classNames?.actions),
      },
      styles: {
        mask: { ..._contextPreview?.styles?.mask, ..._preview?.styles?.mask },
        actions: { ..._contextPreview?.styles?.actions, ..._preview?.styles?.actions },
        // @ts-ignore emporarily used in PurePanel, not used externally by antd
        wrapper: { ..._contextPreview?.styles?.wrapper, ..._preview?.styles?.wrapper },
      },
    };
  }, [preview, imageLocale, contextPreview]);

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  return (
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreview}
      rootClassName={classNames(mergedRootClassName, mergedClassNames?.root)}
      className={mergedClassName}
      style={mergedStyle}
      classNames={{ mask: mergedClassNames?.mask }}
      styles={{ root: mergedStyles?.root, mask: mergedStyles?.mask }}
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
