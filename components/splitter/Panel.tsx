import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import type { InternalPanelProps, PanelProps } from './interface';

export const InternalPanel = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InternalPanelProps>
>((props, ref) => {
  const { prefixCls, className, children, gutter, size } = props;
  const panelClassName = classNames(`${prefixCls}-panel`, className);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Splitter.Panel');

    warning(
      !((props.collapsible || props.resizable) && props.last),
      'usage',
      `The last Splitter.Panel should not be configured with  \`collapsible\` or \`resizable\` properties.`,
    );
  }

  return (
    <div
      ref={ref}
      className={panelClassName}
      style={{
        flexBasis: `calc(${size}% - ${gutter}px)`,
      }}
    >
      {children}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  InternalPanel.displayName = 'Panel';
}

const Panel: React.FC<React.PropsWithChildren<PanelProps>> = (props) => props.children;

export default Panel;
