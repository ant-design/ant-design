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

export type ImageSemanticName = keyof ImageSemanticClassNames & keyof ImageSemanticStyles;

export type ImageLoadingConfig = {
  percent?: number;
  percentRender?: (percent: number) => React.ReactNode;
  progress?: boolean;
};

export type ImageSemanticClassNames = {
  root?: string;
  image?: string;
  cover?: string;
  loading?: string;
  loadingPercent?: string;
};

export type ImageSemanticStyles = {
  root?: React.CSSProperties;
  image?: React.CSSProperties;
  cover?: React.CSSProperties;
  loading?: React.CSSProperties;
  loadingPercent?: React.CSSProperties;
};

export type ImagePopupSemanticName = keyof ImagePopupSemanticClassNames &
  keyof ImagePopupSemanticStyles;

export type ImagePopupSemanticClassNames = {
  root?: string;
  mask?: string;
  body?: string;
  footer?: string;
  actions?: string;
};

export type ImagePopupSemanticStyles = {
  root?: React.CSSProperties;
  mask?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  actions?: React.CSSProperties;
};

export type ImageClassNamesType = SemanticClassNamesType<
  ImageProps,
  ImageSemanticClassNames,
  { popup?: ImagePopupSemanticClassNames }
>;

export type ImageStylesType = SemanticStylesType<
  ImageProps,
  ImageSemanticStyles,
  { popup?: ImagePopupSemanticStyles }
>;

export interface ImageProps
  extends Omit<RcImageProps, 'preview' | 'classNames' | 'styles' | 'loading'> {
  preview?: boolean | PreviewConfig;
  /** @deprecated Use `styles.root` instead */
  wrapperStyle?: React.CSSProperties;
  classNames?: ImageClassNamesType;
  styles?: ImageStylesType;
  loading?: boolean | ImageLoadingConfig;
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
    loading,
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

  // ============================= Loading ==============================
  const isLoading = loading !== undefined && loading !== false;
  const loadingConfig = typeof loading === 'object' && loading ? loading : {};
  const { percent, percentRender, progress: showProgress = true } = loadingConfig;

  // 判断是否有 percent（必须是有限数值）
  const hasPercent = typeof percent === 'number' && Number.isFinite(percent);

  // 计算 percent 数值（用于进度条宽度和 function 参数），约束在 0-100 之间
  const percentValue = hasPercent ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

  // 渲染 percent 文案
  const renderPercent = () => {
    if (!hasPercent) return null;

    if (percentRender) {
      return percentRender(percentValue);
    }
    return `${percentValue}%`;
  };

  // ============================== Render ==============================
  const { width, height, ...restOtherProps } = otherProps;

  // When loading is active, render only loading layer with dimensions
  if (isLoading) {
    return (
      <div
        className={clsx(
          prefixCls,
          `${prefixCls}-loading-wrapper`,
          mergedRootClassName,
          mergedClassName,
          mergedClassNames?.root,
        )}
        style={{
          width,
          height,
          ...mergedStyle,
          ...mergedStyles?.root,
        }}
      >
        {/* Main loading container with frosted glass */}
        <div
          className={clsx(`${prefixCls}-loading`, mergedClassNames?.loading)}
          style={mergedStyles?.loading}
        >
          {/* Watercolor ink layers */}
          <div className={`${prefixCls}-loading-ink-1`} />
          <div className={`${prefixCls}-loading-ink-2`} />
          <div className={`${prefixCls}-loading-ink-3`} />
          <div className={`${prefixCls}-loading-ink-4`} />
          <div className={`${prefixCls}-loading-ink-5`} />
          {/* Frosted matte overlay */}
          <div className={`${prefixCls}-loading-frosted`} />
          {/* Progress content - vertically centered with visual weight adjusted */}
          {hasPercent && (
            <div
              className={clsx(
                `${prefixCls}-loading-content`,
                showProgress && `${prefixCls}-loading-content-progress`,
              )}
            >
              {showProgress && (
                <div className={`${prefixCls}-loading-progress`} style={{ width: '100%' }}>
                  <div
                    className={`${prefixCls}-loading-progress-inner`}
                    style={{ width: `${percentValue}%` }}
                  />
                </div>
              )}
              <span
                className={clsx(`${prefixCls}-loading-percent`, mergedClassNames?.loadingPercent)}
                style={mergedStyles?.loadingPercent}
              >
                {renderPercent()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreviewConfig || false}
      rootClassName={mergedRootClassName}
      className={mergedClassName}
      style={mergedStyle}
      fallback={mergedFallback}
      width={width}
      height={height}
      {...restOtherProps}
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
