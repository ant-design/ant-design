import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

import type { InternalPanelProps, PanelProps } from './interface';

export const InternalPanel = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InternalPanelProps>
>((props, ref) => {
  const {
    prefixCls,
    className,
    children,
    destroyOnHidden = false,
    size,
    style = {},
    supportMotion,
  } = props;

  const isCollapsed = size === 0;

  const panelClassName = clsx(
    `${prefixCls}-panel`,
    {
      [`${prefixCls}-panel-hidden`]: isCollapsed,
      [`${prefixCls}-panel-transition`]: supportMotion,
    },
    className,
  );

  const hasSize = size !== undefined;

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
