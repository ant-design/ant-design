import * as React from 'react';
import RcSegmented, { SegmentedProps as RCSegmentedProps } from 'rc-segmented';

import { ConfigContext } from '../config-provider';

const Segmented = React.forwardRef<HTMLDivElement, RCSegmentedProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, ...restProps } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);

  return <RcSegmented {...restProps} ref={ref} prefixCls={prefixCls} direction={direction} />;
});

Segmented.defaultProps = {};

export default Segmented;
