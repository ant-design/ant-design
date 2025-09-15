import * as React from 'react';
import RcImage from '@rc-component/image';
import type { ImageProps as RcImageProps } from '@rc-component/image';
import classnames from 'classnames';

import type { MaskType } from '../_util/hooks/useMergedMask';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useMergedPreviewConfig from './hooks/useMergedPreviewConfig';
import usePreviewConfig from './hooks/usePreviewConfig';
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

type OriginPreviewConfig = NonNullable<Exclude<RcImageProps['preview'], boolean>>;

export type DeprecatedPreviewConfig = {
  /** @deprecated Use `open` instead */
  visible?: boolean;
  /** @deprecated Use `classNames.root` instead */
  rootClassName?: string;
  /**
   * @deprecated This has been removed.
   * Preview will always be rendered after show.
   */
  forceRender?: boolean;
  /**
   * @deprecated This has been removed.
   * Preview will always be rendered after show.
   */
  destroyOnClose?: boolean;
  /** @deprecated Use `actionsRender` instead */
  toolbarRender?: OriginPreviewConfig['actionsRender'];
};

export type PreviewConfig = OriginPreviewConfig &
  DeprecatedPreviewConfig & {
    /** @deprecated Use `onOpenChange` instead */
    onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
    /** @deprecated Use `classNames.cover` instead */
    maskClassName?: string;
    mask?: MaskType | React.ReactNode;
  };

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

export interface ImageProps extends Omit<RcImageProps, 'preview'> {
  preview?: boolean | PreviewConfig;
  /** @deprecated Use `styles.root` instead */
  wrapperStyle?: React.CSSProperties;
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
    wrapperStyle,
    fallback,
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
    fallback: contextFallback,
  } = useComponentConfig('image');

  const prefixCls = getPrefixCls('image', customizePrefixCls);

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Image');
    warning.deprecated(!wrapperStyle, 'wrapperStyle', 'styles.root');
  }

  // ============================== Styles ==============================
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedRootClassName = classnames(rootClassName, hashId, cssVarCls, rootCls);

  const mergedClassName = classnames(className, hashId, contextClassName);

  // ============================= Preview ==============================
  const [previewConfig, previewRootClassName, previewMaskClassName] = usePreviewConfig(preview);
  const [contextPreviewConfig, contextPreviewRootClassName, contextPreviewMaskClassName] =
    usePreviewConfig(contextPreview);

  const mergedPreviewConfig = useMergedPreviewConfig(
    // Preview config
    previewConfig,
    contextPreviewConfig,

    // MISC
    prefixCls,
    mergedRootClassName,
    getContextPopupContainer,
    icons,

    true,
  );

  // ============================= Semantic =============================
  const mergedLegacyClassNames = React.useMemo(
    () => ({
      cover: classnames(contextPreviewMaskClassName, previewMaskClassName),
      popup: {
        root: classnames(contextPreviewRootClassName, previewRootClassName),
      },
    }),
    [
      previewRootClassName,
      previewMaskClassName,
      contextPreviewRootClassName,
      contextPreviewMaskClassName,
    ],
  );

  const { mask: mergedMask, blurClassName } = mergedPreviewConfig ?? {};
  const mergedPopupClassNames = React.useMemo(
    () => ({
      mask: classnames(!mergedMask && `${prefixCls}-preview-mask-hidden`, blurClassName),
    }),
    [mergedMask, prefixCls, blurClassName],
  );
  const internalClassNames = React.useMemo(
    () => [
      contextClassNames,
      imageClassNames,
      mergedLegacyClassNames,
      { popup: mergedPopupClassNames },
    ],
    [contextClassNames, imageClassNames, mergedLegacyClassNames, mergedPopupClassNames],
  );

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    internalClassNames,
    [contextStyles, { root: wrapperStyle }, styles],
    {
      popup: { _default: 'root' },
    },
  );

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };
  const mergedFallback: RcImageProps['fallback'] = fallback ?? contextFallback;
  // ============================== Render ==============================
  return (
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreviewConfig || false}
      rootClassName={mergedRootClassName}
      className={mergedClassName}
      style={mergedStyle}
      fallback={mergedFallback}
      {...otherProps}
      classNames={mergedClassNames}
      styles={mergedStyles}
    />
  );
};

export type { PreviewConfig as ImagePreviewType };

Image.PreviewGroup = PreviewGroup;

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

export default Image;
