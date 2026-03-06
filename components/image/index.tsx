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
import Progress from './Progress';
import type { ProgressClassNames, ProgressStyles } from './Progress';
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
  if (!placeholder || !isPlaceholderConfig(placeholder)) {
    return {};
  }

  if (typeof placeholder.progress === 'boolean') {
    return {
      progressConfig: placeholder.progress ? {} : undefined,
    };
  }

  return {
    progressConfig: placeholder.progress,
  };
}

export type { ProgressClassNames, ProgressStyles };

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

  const internalClassNames = React.useMemo<ImageSemanticAllType['classNamesAndFn'][]>(
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

  // Get progress classNames and styles
  const progressClassNames = mergedClassNames?.placeholder?.progress as
    | ProgressClassNames
    | undefined;
  const progressStyles = mergedStyles?.placeholder?.progress as ProgressStyles | undefined;

  // ============================== Render ==============================
  const { width, height, ...restOtherProps } = otherProps;

  // When progress is active, render only progress layer with dimensions
  if (showProgressOverlay) {
    return (
      <Progress
        prefixCls={prefixCls}
        percent={percent}
        render={progressRender}
        classNames={progressClassNames}
        styles={progressStyles}
        rootClassName={clsx(mergedRootClassName, mergedClassName)}
        rootStyle={{
          ...mergedStyle,
          ...mergedStyles?.root,
        }}
        width={width}
        height={height}
      />
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
