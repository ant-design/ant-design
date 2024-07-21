import React from 'react';

import { SplitPanelContext } from './context';

export interface SplitBarProps {
  prefixCls: string;
  index: number;
  size?: number;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, size = 4 } = props;

  const barRef = React.useRef<HTMLDivElement>(null);

  const { setResizing, startInfo } = React.useContext(SplitPanelContext);

  return (
    <div
      ref={barRef}
      style={{ flexBasis: size }}
      className={`${prefixCls}-bar`}
      onMouseDown={(e) => {
        setResizing?.(true);
        startInfo.current = { x: e.clientX, y: e.clientY, splitPanelBar: barRef.current };
      }}
    >
      <div className={`${prefixCls}-bar-icon`} />
    </div>
  );
};

export default SplitBar;
