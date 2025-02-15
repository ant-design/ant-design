import React from 'react';

import type { OTPProps } from '.';

interface SeparatorProps {
  index: number;
  prefixCls: string;
  separator: OTPProps['separator'];
}

const Separator: React.FC<Readonly<SeparatorProps>> = (props) => {
  const { index, prefixCls, separator } = props;
  const separatorNode = typeof separator === 'function' ? separator(index) : separator;
  if (!separatorNode) {
    return null;
  }
  return <span className={`${prefixCls}-separator`}>{separatorNode}</span>;
};

if (process.env.NODE_ENV !== 'production') {
  Separator.displayName = 'Separator';
}

export default Separator;
