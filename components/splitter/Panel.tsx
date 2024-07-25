import React from 'react';
import classNames from 'classnames';

import type { SplitterItem } from './Splitter';

export interface PanelProps extends SplitterItem {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  size?: number;
  gutter?: number;
}

const Panel: React.FC<PanelProps> = (props) => {
  const { prefixCls, className, children, gutter, size } = props;

  const panelClassName = classNames(`${prefixCls}-item`, className);

  return (
    <div
      className={panelClassName}
      style={{
        flexBasis: `calc(${size}% - ${gutter}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
