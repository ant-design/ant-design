import * as React from 'react';
import RcImage from '@rc-component/image';
import type { ImageProps as RcImageProps } from '@rc-component/image';
import { clsx } from 'clsx';

import type { MaskType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks/useMergeSemanticNew';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemanticNew/semanticType';
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

export interface ImageProgressConfig {
  percent?: number;
  /** 自定义渲染，接收默认的进度 UI 和百分比 */
  render?: (progress: React.ReactNode, percent: number) => React.ReactNode;
}

export interface PlaceholderConfig {
  /** 自定义 placeholder 内容 */
  node?: React.ReactNode;
  /** 进度配置 */
  progress?: boolean | ImageProgressConfig;
}

export type PlaceholderType = React.ReactNode | PlaceholderConfig;

export type ImageSemanticType = {
  classNames?: {
    root?: string;
    image?: string;
    cover?: string;
    placeholder?: {
      progress?: string;
      progressPercent?: string;
    };
    popup?: {
      root?: string;
      mask?: string;
      body?: string;
      footer?: string;
      actions?: string;
    };
  };
  styles?: {
    root?: React.CSSProperties;
    image?: React.CSSProperties;
    cover?: React.CSSProperties;
    placeholder?: {
      progress?: React.CSSProperties;
      progressPercent?: React.CSSProperties;
    };
    popup?: {
      root?: React.CSSProperties;
      mask?: React.CSSProperties;
      body?: React.CSSProperties;
      footer?: React.CSSProperties;
      actions?: React.CSSProperties;
    };
  };
};

export type ImageSemanticAllType = GenerateSemantic<ImageSemanticType, ImageProps>;

export interface ImageProps
  extends Omit<RcImageProps, 'preview' | 'classNames' | 'styles' | 'placeholder'> {
  preview?: boolean | PreviewConfig;
  /** @deprecated Use `styles.root` instead */
  wrapperStyle?: React.CSSProperties;
  classNames?: ImageSemanticAllType['classNamesAndFn'];
  styles?: ImageSemanticAllType['stylesAndFn'];
  placeholder?: PlaceholderType;
}

// ======================= Helper Functions =======================
function isPlaceholderConfig(placeholder: any): placeholder is PlaceholderConfig {
  return placeholder && typeof placeholder === 'object' && !React.isValidElement(placeholder);
}

function normalizePlaceholder(placeholder?: PlaceholderType): {
  node: React.ReactNode;
  progressConfig?: ImageProgressConfig;
} {
  if (!placeholder) return { node: undefined };
  if (isPlaceholderConfig(placeholder)) {
    return {
      node: placeholder.node,
      progressConfig:
        typeof placeholder.progress === 'boolean'
          ? placeholder.progress
            ? {}
            : undefined
          : placeholder.progress,
    };
  }
  return { node: placeholder };
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
    placeholder,
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

  const internalClassNames: any[] = React.useMemo(
    () => [contextClassNames, classNames, mergedLegacyClassNames, { popup: mergedPopupClassNames }],
    [contextClassNames, classNames, mergedLegacyClassNames, mergedPopupClassNames],
  );

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    internalClassNames,
    [contextStyles, { root: wrapperStyle }, styles],
    {
      props: mergedProps,
    },
    {
      popup: { _default: 'root' },
      placeholder: {},
    },
  );

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };
  const mergedFallback: RcImageProps['fallback'] = fallback ?? contextFallback;

  // ============================= Progress ==============================
  const { node: placeholderNode, progressConfig } = normalizePlaceholder(placeholder);
  const showProgressOverlay = progressConfig !== undefined;

  const { percent, render: progressRender } = progressConfig || {};
  const showProgressBar = true; // Always show progress bar by default when progress is active

  // 判断是否有 percent（必须是有限数值）
  const hasPercent = typeof percent === 'number' && Number.isFinite(percent);

  // 计算 percent 数值（用于进度条宽度和 function 参数），约束在 0-100 之间
  const percentValue = hasPercent ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

  // 渲染默认进度 UI
  const renderDefaultProgressUI = () => {
    if (!hasPercent) {
      return null;
    }

    const placeholderClassNames = mergedClassNames?.placeholder as
      | { progress?: string; progressPercent?: string }
      | undefined;
    const placeholderStyles = mergedStyles?.placeholder as
      | { progress?: React.CSSProperties; progressPercent?: React.CSSProperties }
      | undefined;

    return (
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
          className={clsx(`${prefixCls}-progress-percent`, placeholderClassNames?.progressPercent)}
          style={placeholderStyles?.progressPercent}
        >
          {`${percentValue}%`}
        </span>
      </div>
    );
  };

  // ============================== Render ==============================
  const { width, height, ...restOtherProps } = otherProps;

  // When progress is active, render only progress layer with dimensions
  if (showProgressOverlay) {
    // 渲染进度内容
    const defaultProgressUI = renderDefaultProgressUI();
    const progressContent = progressRender
      ? progressRender(defaultProgressUI, percentValue)
      : defaultProgressUI;

    const placeholderClassNames = mergedClassNames?.placeholder as
      | { progress?: string; progressPercent?: string }
      | undefined;
    const placeholderStyles = mergedStyles?.placeholder as
      | { progress?: React.CSSProperties; progressPercent?: React.CSSProperties }
      | undefined;

    return (
      <div
        className={clsx(
          prefixCls,
          `${prefixCls}-progress-wrapper`,
          mergedRootClassName,
          mergedClassName,
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
          className={clsx(`${prefixCls}-progress`, placeholderClassNames?.progress)}
          style={placeholderStyles?.progress}
          role={hasPercent ? 'progressbar' : undefined}
          aria-valuemin={hasPercent ? 0 : undefined}
          aria-valuemax={hasPercent ? 100 : undefined}
          aria-valuenow={hasPercent ? percentValue : undefined}
          aria-label={hasPercent ? `${percentValue}%` : undefined}
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
          {/* Progress content */}
          {progressContent}
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
      placeholder={placeholderNode}
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
