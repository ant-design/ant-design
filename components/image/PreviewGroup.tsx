import * as React from 'react';
import PreviewGroup, { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';
import { ConfigContext } from '../config-provider';

const InternalPreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image-preview', customizePrefixCls);
  return <PreviewGroup previewPrefixCls={prefixCls} {...props} />;
};

export default InternalPreviewGroup;
