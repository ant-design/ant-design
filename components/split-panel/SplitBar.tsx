import React from 'react';

import { SplitPanelContext } from './context';

export interface SplitBarProps {
  prefixCls: string;
  index: number;
  size?: number;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, size } = props;

  const { resizeStart } = React.useContext(SplitPanelContext);

  return (
    <div style={{ flexBasis: size }} className={`${prefixCls}-bar`} onMouseDown={resizeStart}>
      <div className={`${prefixCls}-bar-icon`} />
    </div>
  );
};

export default SplitBar;
