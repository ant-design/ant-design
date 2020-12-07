import * as React from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage, { ImageProps } from 'rc-image';
import PreviewGroup from './PreviewGroup';
import { ConfigContext } from '../config-provider';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<ImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  ...otherProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }

    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          Preview
        </div>
      ),
      ...(typeof preview === 'object' ? preview : null),
    };
  }, [preview]);

  return <RcImage prefixCls={prefixCls} preview={mergedPreview} {...otherProps} />;
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
