import * as React from 'react';
import RcImage, { ImageProps } from 'rc-image';
import { ConfigContext } from '../config-provider';

const Image: React.FC<ImageProps> = ({ prefixCls: customizePrefixCls, ...otherProps }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  return <RcImage prefixCls={prefixCls} {...otherProps} />;
};

export default Image;
