import React, { useEffect, useRef } from 'react';
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

  const nodeRef = useRef<HTMLDivElement>(null);
  const panelClassName = classNames(`${prefixCls}-item`, className);

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.style.flexBasis = `calc(${size}% - ${gutter}px)`;
    }
  }, [size]);

  return (
    <div
      ref={nodeRef}
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
