import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RotateLeftOutlined from '@ant-design/icons/RotateLeftOutlined';
import RotateRightOutlined from '@ant-design/icons/RotateRightOutlined';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import RcImage from '@rc-component/image';
import { clsx } from 'clsx';

import type { DeprecatedPreviewConfig, ImageProps, ImageSemanticAllType } from '.';
import { useMergeSemantic } from '../_util/hooks';
import type { MaskType } from '../_util/hooks';
import type { GetProps } from '../_util/type';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useMergedPreviewConfig from './hooks/useMergedPreviewConfig';
import usePreviewConfig from './hooks/usePreviewConfig';
import useStyle from './style';

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
  flipX: <SwapOutlined />,
  flipY: <SwapOutlined rotate={90} />,
};

type RcPreviewGroupProps = GetProps<typeof RcImage.PreviewGroup>;

type OriginPreviewConfig = NonNullable<Exclude<RcPreviewGroupProps['preview'], boolean>>;

export type GroupPreviewConfig = OriginPreviewConfig &
  DeprecatedPreviewConfig & {
    /** @deprecated Use `onOpenChange` instead */
    onVisibleChange?: (visible: boolean, prevVisible: boolean, current: number) => void;
    mask?: MaskType;
  };

export interface PreviewGroupProps
  extends Omit<RcPreviewGroupProps, 'preview' | 'styles' | 'classNames'> {
  preview?: boolean | GroupPreviewConfig;
  classNames?: ImageSemanticAllType['classNames'] | ImageSemanticAllType['classNamesFn'];
  styles?: ImageSemanticAllType['styles'] | ImageSemanticAllType['stylesFn'];
}

const InternalPreviewGroup: React.FC<PreviewGroupProps> = ({
  previewPrefixCls: customizePrefixCls,
  preview,
  classNames,
  styles,
  ...otherProps
}) => {
  // =============================== MISC ===============================
  // Context
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    direction,
    preview: contextPreview,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('image');

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const previewPrefixCls = `${prefixCls}-preview`;

  // ============================== Style ===============================
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedRootClassName = clsx(hashId, cssVarCls, rootCls);

  // ============================= Preview ==============================
  const [previewConfig, previewRootClassName, previewMaskClassName] = usePreviewConfig(preview);
  const [contextPreviewConfig, contextPreviewRootClassName, contextPreviewMaskClassName] =
    usePreviewConfig(contextPreview);

  // ============================ Semantics =============================

  const memoizedIcons = React.useMemo(
    () => ({
      ...icons,
      left: direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />,
      right: direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />,
    }),
    [direction],
  );

  const mergedPreview = useMergedPreviewConfig(
    // Preview config
    previewConfig,
    contextPreviewConfig,

    // MISC
    prefixCls,
    mergedRootClassName,
    getContextPopupContainer,
    icons,
  );

  const { mask: mergedMask, blurClassName } = mergedPreview ?? {};

  // =========== Merged Props for Semantic ===========
  const mergedProps: PreviewGroupProps = {
    ...otherProps,
    classNames,
    styles,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [
      contextClassNames,
      classNames,
      {
        cover: clsx(contextPreviewMaskClassName, previewMaskClassName),
        popup: {
          root: clsx(contextPreviewRootClassName, previewRootClassName),
          mask: clsx(
            {
              [`${prefixCls}-preview-mask-hidden`]: !mergedMask,
            },
            blurClassName,
          ),
        },
      },
    ],
    [contextStyles, styles],
    {
      props: mergedProps as unknown as ImageProps,
    },
    {
      popup: {
        _default: 'root',
      },
    },
  );

  return (
    <RcImage.PreviewGroup
      preview={mergedPreview}
      previewPrefixCls={previewPrefixCls}
      icons={memoizedIcons}
      {...otherProps}
      classNames={mergedClassNames}
      styles={mergedStyles}
    />
  );
};

export default InternalPreviewGroup;
