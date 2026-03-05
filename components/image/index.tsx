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

export type ImageProgressConfig = {
  percent?: number;
  percentRender?: (percent: number) => React.ReactNode;
  showProgressBar?: boolean;
};

export type ImageSemanticClassNames = {
  root?: string;
  image?: string;
  cover?: string;
  progress?: string;
  progressPercent?: string;
};

export type ImageSemanticStyles = {
  root?: React.CSSProperties;
  image?: React.CSSProperties;
  cover?: React.CSSProperties;
  progress?: React.CSSProperties;
  progressPercent?: React.CSSProperties;
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

export interface ImageProps extends Omit<RcImageProps, 'preview' | 'classNames' | 'styles'> {
  preview?: boolean | PreviewConfig;
  /** @deprecated Use `styles.root` instead */
  wrapperStyle?: React.CSSProperties;
  classNames?: ImageClassNamesType;
  styles?: ImageStylesType;
  progress?: boolean | ImageProgressConfig;
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
    progress,
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

  // ============================= Progress ==============================
  const showProgressOverlay = progress !== undefined && progress !== false;
  const progressConfig = typeof progress === 'object' && progress ? progress : {};
  const { percent, percentRender, showProgressBar = true } = progressConfig;

  // 判断是否有 percent（必须是有限数值）
  const hasPercent = typeof percent === 'number' && Number.isFinite(percent);

  // 计算 percent 数值（用于进度条宽度和 function 参数），约束在 0-100 之间
  const percentValue = hasPercent ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

  // 渲染 percent 文案
  const renderPercent = () => {
    if (!hasPercent) {
      return null;
    }

    if (percentRender) {
      return percentRender(percentValue);
    }
    return `${percentValue}%`;
  };

  // ============================== Render ==============================
  const { width, height, ...restOtherProps } = otherProps;

  // When progress is active, render only progress layer with dimensions
  if (showProgressOverlay) {
    return (
      <div
        className={clsx(
          prefixCls,
          `${prefixCls}-progress-wrapper`,
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
        {/* Main progress container with frosted glass */}
        <div
          className={clsx(`${prefixCls}-progress`, mergedClassNames?.progress)}
          style={mergedStyles?.progress}
          role={hasPercent ? 'progressbar' : undefined}
          aria-valuemin={hasPercent ? 0 : undefined}
          aria-valuemax={hasPercent ? 100 : undefined}
          aria-valuenow={hasPercent ? percentValue : undefined}
          aria-label={hasPercent ? renderPercent()?.toString() : undefined}
          aria-busy={!hasPercent ? true : undefined}
        >
          {/* Visually hidden live region for non-percent loading state */}
          {!hasPercent && (
            <span
              role="status"
              aria-live="polite"
              style={{
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              Loading
            </span>
          )}
          {/* Watercolor ink layers */}
          <div className={`${prefixCls}-progress-ink-1`} />
          <div className={`${prefixCls}-progress-ink-2`} />
          <div className={`${prefixCls}-progress-ink-3`} />
          <div className={`${prefixCls}-progress-ink-4`} />
          <div className={`${prefixCls}-progress-ink-5`} />
          {/* Frosted matte overlay */}
          <div className={`${prefixCls}-progress-frosted`} />
          {/* Progress content - vertically centered with visual weight adjusted */}
          {hasPercent && (
            <div
              className={clsx(
                `${prefixCls}-progress-content`,
                showProgressBar && `${prefixCls}-progress-content-bar`,
              )}
            >
              {showProgressBar && (
                <div className={`${prefixCls}-progress-bar`} style={{ width: '100%' }}>
                  <div
                    className={`${prefixCls}-progress-bar-inner`}
                    style={{ width: `${percentValue}%` }}
                  />
                </div>
              )}
              <span
                className={clsx(`${prefixCls}-progress-percent`, mergedClassNames?.progressPercent)}
                style={mergedStyles?.progressPercent}
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
