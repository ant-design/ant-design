import React, { forwardRef } from 'react';
import classNames from 'classnames';

export interface PanelProps {
  min?: number | string;
  max?: number | string;
  size?: number | string;
  defaultSize?: number | string;
  collapsible?:
    | boolean
    | {
        start?: boolean;
        end?: boolean;
      };
  resizable?: boolean;
}

export interface InternalPanelProps extends PanelProps {
  prefixCls?: string;
  className?: string;
  gutter?: number;
}

export const InternalPanel = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InternalPanelProps>
>((props, ref) => {
  const { prefixCls, className, children, gutter, size } = props;

  const panelClassName = classNames(`${prefixCls}-panel`, className);

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
