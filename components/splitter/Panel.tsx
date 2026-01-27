import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

import type { InternalPanelProps, PanelProps } from './interface';

export const InternalPanel = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InternalPanelProps>
>((props, ref) => {
  const { prefixCls, className, children, destroyOnHidden = false, size, style = {} } = props;

  const panelClassName = clsx(
    `${prefixCls}-panel`,
    { [`${prefixCls}-panel-hidden`]: size === 0 },
    className,
  );

  const hasSize = size !== undefined;
  const isCollapsed = size === 0;

  return (
    <div
      ref={ref}
      className={panelClassName}
      style={{
        ...style,
        // Use auto when start from ssr
        flexBasis: hasSize ? size : 'auto',
        flexGrow: hasSize ? 0 : 1,
      }}
    >
      {!(destroyOnHidden && isCollapsed) && children}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  InternalPanel.displayName = 'Panel';
}

const Panel: React.FC<React.PropsWithChildren<PanelProps>> = () => null;

export default Panel;
