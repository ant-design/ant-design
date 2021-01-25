import * as React from 'react';
import { useContext } from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage, { ImageProps } from 'rc-image';
import defaultLocale from '../locale/en_US';
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
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);

  const { locale: contextLocale = defaultLocale } = useContext(ConfigContext);
  const imageLocale = contextLocale.Image || defaultLocale.Image;

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }

    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      ...(typeof preview === 'object' ? preview : null),
    };
  }, [preview, imageLocale]);

  return <RcImage prefixCls={prefixCls} preview={mergedPreview} {...otherProps} />;
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
