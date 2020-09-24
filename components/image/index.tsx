import * as React from 'react';
import RcImage, { ImageProps as RcImageProps } from 'rc-image';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';

export interface ImageProps extends RcImageProps {}

const Image: React.FC<ImageProps> = ({ prefixCls: customizePrefixCls, ...otherProps }) => {
  const { getPrefixCls }: ConfigConsumerProps = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  return <RcImage prefixCls={prefixCls} {...otherProps} />;
};

export default Image;
