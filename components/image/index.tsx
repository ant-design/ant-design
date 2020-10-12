import * as React from 'react';
import RcImage, { ImageProps } from 'rc-image';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';

const Image: React.FC<ImageProps> = ({ prefixCls: customizePrefixCls, getPopupContainer, ...otherProps }) => {
  const { getPrefixCls }: ConfigConsumerProps = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  return (
    <RcImage 
           prefixCls={prefixCls} 
           getPopupContainer={getPopupContainer}
           {...otherProps} 
         />
  );
};

export default Image;
