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

export interface PlaceholderProgressConfig {
  percent?: number;
  /** Custom render function, receives default progress UI and percent */
  render?: (progress: React.ReactNode, percent: number) => React.ReactNode;
}

export type PlaceholderType =
  | React.ReactNode
  | {
      progress?: boolean | PlaceholderProgressConfig;
    };

type ProgressClassNames = {
  root?: string;
  body?: string;
  rail?: string;
  indicator?: string;
};

type ProgressStyles = {
  root?: React.CSSProperties;
  body?: React.CSSProperties;
  rail?: React.CSSProperties;
  indicator?: React.CSSProperties;
};

// Visually hidden styles for screen readers
const VISUALLY_HIDDEN_STYLE: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export type ImageSemanticType = {
  classNames?: {
    root?: string;
    image?: string;
    cover?: string;
    placeholder?: {
      progress?: ProgressClassNames;
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
      progress?: ProgressStyles;
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
function isPlaceholderConfig(
  placeholder: any,
): placeholder is { progress?: boolean | PlaceholderProgressConfig } {
  return placeholder && typeof placeholder === 'object' && !React.isValidElement(placeholder);
}

function normalizePlaceholder(placeholder?: PlaceholderType): {
  progressConfig?: PlaceholderProgressConfig;
} {
  if (!placeholder) return {};
  if (isPlaceholderConfig(placeholder)) {
    return {
      progressConfig:
        typeof placeholder.progress === 'boolean'
          ? placeholder.progress
            ? {}
            : undefined
          : placeholder.progress,
    };
  }
  // placeholder is React.ReactNode, no progress config
  return {};
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

  const internalClassNames = React.useMemo<ImageSemanticType['classNames'][]>(
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
  const { progressConfig } = normalizePlaceholder(placeholder);
  const showProgressOverlay = progressConfig !== undefined;

  const { percent, render: progressRender } = progressConfig || {};

  // Check if percent is a valid finite number
  const hasPercent = typeof percent === 'number' && Number.isFinite(percent);

  // Calculate percent value (clamped to 0-100 for progress bar width)
  const percentValue = hasPercent ? Math.max(0, Math.min(100, Math.round(percent))) : 0;

  // Get progress classNames and styles
  const progressClassNames = mergedClassNames?.placeholder?.progress as
    | ProgressClassNames
    | undefined;
  const progressStyles = mergedStyles?.placeholder?.progress as ProgressStyles | undefined;

  // Render progress bar (rail with ::before pseudo for track)
  const renderProgressBar = () => {
    if (!hasPercent) {
      return null;
    }

    return (
      <div
        className={clsx(`${prefixCls}-progress-rail`, progressClassNames?.rail)}
        style={
          {
            ...progressStyles?.rail,
            '--progress-percent': `${percentValue}%`,
          } as React.CSSProperties
        }
      />
    );
  };

  // Render default progress UI (bar + indicator)
  const renderDefaultProgressUI = () => {
    if (!hasPercent) {
      return null;
    }

    return (
      <>
        {renderProgressBar()}
        <div
          className={clsx(`${prefixCls}-progress-indicator`, progressClassNames?.indicator)}
          style={progressStyles?.indicator}
        >
          {`${percentValue}%`}
        </div>
      </>
    );
  };

  // ============================== Render ==============================
  const { width, height, ...restOtherProps } = otherProps;

  // When progress is active, render only progress layer with dimensions
  if (showProgressOverlay) {
    // Render progress content
    const progressBar = renderProgressBar();
    const progressContent = progressRender ? (
      <>{progressRender(progressBar, percentValue)}</>
    ) : (
      renderDefaultProgressUI()
    );

    return (
      <div
        className={clsx(
          prefixCls,
          `${prefixCls}-progress-wrapper`,
          progressClassNames?.root,
          mergedRootClassName,
          mergedClassName,
        )}
        style={{
          width,
          height,
          ...mergedStyle,
          ...mergedStyles?.root,
          ...progressStyles?.root,
        }}
        role={hasPercent ? 'progressbar' : undefined}
        aria-valuemin={hasPercent ? 0 : undefined}
        aria-valuemax={hasPercent ? 100 : undefined}
        aria-valuenow={hasPercent ? percentValue : undefined}
        aria-label={hasPercent ? `${percentValue}%` : undefined}
        aria-busy={!hasPercent ? true : undefined}
      >
        {/* Visually hidden live region for non-percent loading state */}
        {!hasPercent && (
          <span role="status" aria-live="polite" style={VISUALLY_HIDDEN_STYLE}>
            Loading
          </span>
        )}
        {/* Watercolor ink layers */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={`${prefixCls}-progress-ink`} />
        ))}
        {/* Progress body */}
        <div
          className={clsx(`${prefixCls}-progress-body`, progressClassNames?.body)}
          style={progressStyles?.body}
        >
          {progressContent}
        </div>
      </div>
    );
  }

  // When placeholder is ReactNode (not progress config), pass to RcImage
  const placeholderNode = isPlaceholderConfig(placeholder) ? undefined : placeholder;

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
