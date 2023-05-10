import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import RcImage, { type ImageProps } from 'rc-image';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import defaultLocale from '../locale/en_US';
import { getTransitionName } from '../_util/motion';
// CSSINJS
import PreviewGroup, { icons } from './PreviewGroup';
import useStyle from './style';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<ImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  rootClassName,
  ...otherProps
}) => {
  const {
    getPrefixCls,
    locale: contextLocale = defaultLocale,
    getPopupContainer: getContextPopupContainer,
  } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const imageLocale = contextLocale.Image || defaultLocale.Image;
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedRootClassName = classNames(rootClassName, hashId);
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

  return wrapSSR(
    <RcImage
      prefixCls={`${prefixCls}`}
      preview={mergedPreview}
      rootClassName={mergedRootClassName}
      {...otherProps}
    />,
  );
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

if (process.env.NODE_ENV !== 'production') {
  Image.displayName = 'Image';
}

export default Image;
