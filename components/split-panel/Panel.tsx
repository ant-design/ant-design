import React from 'react';
import classNames from 'classnames';

import { SplitPanelContext } from './context';

export interface PanelProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  size?: number;
  gutter?: number;
}

const Panel: React.FC<PanelProps> = (props) => {
  const { prefixCls, className, children, gutter, size } = props;
  const splitClassName = classNames(`${prefixCls}-item`, className);

  const { defaultSize } = React.useContext(SplitPanelContext);
  const mergerSize = size || defaultSize;

  return (
    <div
      className={splitClassName}
      style={{
        flexBasis: `calc(${mergerSize}% - ${gutter}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
