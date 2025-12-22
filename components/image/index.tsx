import * as React from 'react';
import RcImage from '@rc-component/image';
import type { ImageProps as RcImageProps } from '@rc-component/image';
import { clsx } from 'clsx';

import type { MaskType, SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
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

export type ImageSemanticName = 'root' | 'image' | 'cover';

export type ImageSemanticClassNames = {
  root?: string;
  image?: string;
  cover?: string;
};

export type ImageSemanticStyles = {
  root?: React.CSSProperties;
  image?: React.CSSProperties;
  cover?: React.CSSProperties;
};

type PopupSemanticClassNames = {
  root?: string;
  mask?: string;
  body?: string;
  footer?: string;
  actions?: string;
};

type PopupSemanticStyles = {
  root?: React.CSSProperties;
  mask?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  actions?: React.CSSProperties;
};

export type ImageClassNamesType = SemanticClassNamesType<
  ImageProps,
  ImageSemanticClassNames,
  { popup?: PopupSemanticClassNames }
>;

export type ImageStylesType = SemanticStylesType<
  ImageProps,
  ImageSemanticStyles,
  { popup?: PopupSemanticStyles }
>;

export interface ImageProps extends Omit<RcImageProps, 'preview' | 'classNames' | 'styles'> {
  preview?: boolean | PreviewConfig;
  /** @deprecated Use `styles.root` instead */
  wrapperStyle?: React.CSSProperties;
  classNames?: ImageClassNamesType;
  styles?: ImageStylesType;
}

const Image: CompositionImage<ImageProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    preview,
    className,
    rootClassName,
    style,
    styles,
    classNames,
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

  const mergedRootClassName = clsx(rootClassName, hashId, cssVarCls, rootCls);

  const mergedClassName = clsx(className, hashId, contextClassName);

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

  // =========== Merged Props for Semantic ===========
  const mergedProps: ImageProps = {
    ...props,
    preview: mergedPreviewConfig,
  };

  // ============================= Semantic =============================
  const mergedLegacyClassNames = React.useMemo(
    () => ({
      cover: clsx(contextPreviewMaskClassName, previewMaskClassName),
      popup: { root: clsx(contextPreviewRootClassName, previewRootClassName) },
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
      mask: clsx(
        {
          [`${prefixCls}-preview-mask-hidden`]: !mergedMask,
        },
        blurClassName,
      ),
    }),
    [mergedMask, prefixCls, blurClassName],
  );

  const internalClassNames = React.useMemo(
    () => [contextClassNames, classNames, mergedLegacyClassNames, { popup: mergedPopupClassNames }],
    [contextClassNames, classNames, mergedLegacyClassNames, mergedPopupClassNames],
  );

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ImageClassNamesType,
    ImageStylesType,
    ImageProps
  >(
    internalClassNames,
    [contextStyles, { root: wrapperStyle }, styles],
    {
      props: mergedProps,
    },
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
