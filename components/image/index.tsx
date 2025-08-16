import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import RcImage from 'rc-image';
import type { ImagePreviewType, ImageProps as RcImageProps } from 'rc-image';

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

type Replace<T, K extends keyof T, V> = Partial<Omit<T, K> & { [P in K]: V }>;

interface PreviewType extends Omit<ImagePreviewType, 'destroyOnClose'> {
  /** @deprecated Please use destroyOnHidden instead */
  destroyOnClose?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
}

type ImageProps = Replace<RcImageProps, 'preview', boolean | PreviewType>;

const Image: CompositionImage<ImageProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    preview,
    className,
    rootClassName,
    style,
    fallback,
    ...otherProps
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Image');
    warning.deprecated(
      !(preview && typeof preview === 'object' && 'destroyOnClose' in preview),
      'destroyOnClose',
      'destroyOnHidden',
    );
  }

  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    preview: contextPreview,
    fallback: contextFallback,
  } = useComponentConfig('image');

  const [imageLocale] = useLocale('Image');

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedRootClassName = classNames(rootClassName, hashId, cssVarCls, rootCls);

  const mergedClassName = classNames(className, hashId, contextClassName);

  const [zIndex] = useZIndex(
    'ImagePreview',
    typeof preview === 'object' ? preview.zIndex : undefined,
  );

  const mergedPreview = React.useMemo<RcImageProps['preview']>(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const {
      getContainer,
      closeIcon,
      rootClassName,
      destroyOnClose,
      destroyOnHidden,
      ...restPreviewProps
    } = _preview;
    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      icons,
      ...restPreviewProps,
      // TODO: In the future, destroyOnClose in rc-image needs to be upgrade to destroyOnHidden
      destroyOnClose: destroyOnHidden ?? destroyOnClose,
      rootClassName: classNames(mergedRootClassName, rootClassName),
      getContainer: getContainer ?? getContextPopupContainer,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
      zIndex,
      closeIcon: closeIcon ?? contextPreview?.closeIcon,
    };
  }, [preview, imageLocale, contextPreview?.closeIcon]);

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  const mergedFallback: RcImageProps['fallback'] = fallback ?? contextFallback;

  return wrapCSSVar(
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreview}
      rootClassName={mergedRootClassName}
      className={mergedClassName}
      style={mergedStyle}
      fallback={mergedFallback}
      {...otherProps}
    />,
  );
};

export type { ImageProps };

Image.PreviewGroup = PreviewGroup;

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

export default Image;
