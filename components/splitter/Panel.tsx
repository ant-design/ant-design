import React, { forwardRef } from 'react';
import classNames from 'classnames';

import type { InternalPanelProps, PanelProps } from './interface';

export const InternalPanel = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InternalPanelProps>
>((props, ref) => {
  const { prefixCls, className, children, size, style = {} } = props;
  const panelClassName = classNames(
    `${prefixCls}-panel`,
    {
      [`${prefixCls}-panel-hidden`]: !size,
    },
    className,
  );

  return (
    <div ref={ref} className={panelClassName} style={{ ...style, flexBasis: size }}>
      {children}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  InternalPanel.displayName = 'Panel';
}

const Panel: React.FC<React.PropsWithChildren<PanelProps>> = () => null;

export default Panel;
