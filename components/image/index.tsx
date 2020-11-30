import * as React from 'react';
import RcImage, { ImageProps } from 'rc-image';
import PreviewGroup from './PreviewGroup';
import { ConfigContext } from '../config-provider';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<ImageProps> = ({ prefixCls: customizePrefixCls, ...otherProps }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  return <RcImage prefixCls={prefixCls} {...otherProps} />;
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
