import * as React from 'react';

import { ConfigContext } from '../config-provider';
import SkeletonNode from './Node';
import type { SkeletonNodeProps } from './Node';

export interface SkeletonImageProps
  extends Omit<SkeletonNodeProps, 'children' | 'internalClassName'> {}

const SkeletonImage: React.FC<SkeletonImageProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', props.prefixCls);

  return (
    <SkeletonNode {...props} internalClassName={`${prefixCls}-image`}>
      <svg
        viewBox="0 0 1098 1024"
        xmlns="http://www.w3.org/2000/svg"
        className={`${prefixCls}-image-svg`}
      >
        <title>Image placeholder</title>
        <path
          d="M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6"
          className={`${prefixCls}-image-path`}
        />
      </svg>
    </SkeletonNode>
  );
};

export default SkeletonImage;
