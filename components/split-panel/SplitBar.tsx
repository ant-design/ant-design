import React from 'react';

import { SplitPanelContext } from './context';

export interface SplitBarProps {
  prefixCls: string;
  index: number;
  size?: number;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, size, index } = props;

  const { resizeStart } = React.useContext(SplitPanelContext);

  return (
    <div
      style={{ flexBasis: size }}
      className={`${prefixCls}-bar`}
      onMouseDown={(e) => {
        resizeStart?.(e, index);
      }}
    >
      <div className={`${prefixCls}-bar-icon`} />
    </div>
  );
};

export default SplitBar;
