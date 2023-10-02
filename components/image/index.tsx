import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import RcImage from 'rc-image';
import type { ImageProps } from 'rc-image';

import { getTransitionName } from '../_util/motion';
import { ConfigContext } from '../config-provider';
import defaultLocale from '../locale/en_US';
// CSSINJS
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

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
    ...otherProps
  } = props;
  const {
    getPrefixCls,
    locale: contextLocale = defaultLocale,
    getPopupContainer: getContextPopupContainer,
    image,
  } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const imageLocale = contextLocale.Image || defaultLocale.Image;
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedRootClassName = classNames(rootClassName, hashId);

  const mergedClassName = classNames(className, hashId, image?.className);

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};
    const { getContainer, ...restPreviewProps } = _preview;
    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      icons,
      ...restPreviewProps,
      getContainer: getContainer || getContextPopupContainer,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
    };
  }, [preview, imageLocale]);

  const mergedStyle: React.CSSProperties = { ...image?.style, ...style };

  return wrapSSR(
    <RcImage
      prefixCls={prefixCls}
      preview={mergedPreview}
      rootClassName={mergedRootClassName}
      className={mergedClassName}
      style={mergedStyle}
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
