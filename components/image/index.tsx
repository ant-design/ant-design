import * as React from 'react';
import RcImage, { ImageProps } from 'rc-image';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';

const Image: React.FC<ImageProps> = ({ prefixCls: customizePrefixCls, getPopupContainer, ...otherProps }) => {
  const { getPrefixCls, getPopupContainer: getContextPopupContainer }: ConfigConsumerProps = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  return <RcImage 
           prefixCls={prefixCls} 
           getPopupContainer={getPopupContainer ?? getContextPopupContainer}
           {...otherProps} 
         />;
};

export default Image;
