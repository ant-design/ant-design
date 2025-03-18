import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage from '@rc-component/image';
import type { PreviewConfig as ImagePreviewType, ImageProps } from '@rc-component/image';
import classnames from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useLocale } from '../locale';
import useMergedPreviewConfig from './hooks/useMergedPreviewConfig';
import usePreviewConfig from './hooks/usePreviewConfig';
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

// TODO: 兼容 API，合并前完成：
// - onVisibleChange
// - visible
// - preview.rootClassName
// - mask -> cover
// - forceRender
// - toolbarRender
// - wrapperStyle
// - destroyOnClose

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

  // =============================== MISC ===============================
  // Context
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    preview: contextPreview,
    styles: contextStyles,
    classNames: contextClassNames,
  } = useComponentConfig('image');

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('image');

    [['maskClassName', 'classNames: { mask: "" }']].forEach(([deprecatedName, newName]) => {
      if (typeof preview === 'object') {
        warning.deprecated(!(deprecatedName in preview), deprecatedName, newName);
      }
    });
  }

  // ============================== Locale ==============================
  const [imageLocale] = useLocale('Image');

  const prefixCls = getPrefixCls('image', customizePrefixCls);

  // ============================== Styles ==============================
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, imageClassNames || {}],
    [contextStyles, styles || {}],
  );

  const mergedRootClassName = classnames(rootClassName, hashId, cssVarCls, rootCls);

  const mergedClassName = classnames(className, hashId, contextClassName);

  // ============================= Preview ==============================
  const previewConfig = usePreviewConfig(preview);
  const contextPreviewConfig = usePreviewConfig(contextPreview);

  // Preview semantic
  const [mergedPreviewClassNames, mergedPreviewStyles] = useMergeSemantic(
    [contextPreviewConfig?.classNames, previewConfig?.classNames],
    [contextPreviewConfig?.styles, previewConfig?.styles],
  );

  const mergedPreviewConfig = useMergedPreviewConfig(
    // Preview config
    previewConfig,
    contextPreviewConfig,

    // MISC
    prefixCls,
    mergedRootClassName,
    mergedPreviewClassNames,
    mergedPreviewStyles,
    getContextPopupContainer,
    icons,

    // Image only: fallback cover
    <div className={`${prefixCls}-cover-info`}>
      <EyeOutlined />
      {imageLocale?.preview}
    </div>,
  );

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  return (
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreviewConfig || false}
      rootClassName={mergedRootClassName}
      className={mergedClassName}
      style={mergedStyle}
      classNames={mergedClassNames}
      styles={mergedStyles}
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
