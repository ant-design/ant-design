import React from 'react';
import classNames from 'classnames';

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

  return (
    <div
      className={splitClassName}
      style={{
        flexBasis: `calc(${size}% - ${gutter}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
