import React from 'react';

export interface FilterDropdownMenuWrapperProps {
  onClick?: React.MouseEventHandler<any>;
  children?: any;
  className?: string;
}

export default (props: FilterDropdownMenuWrapperProps) => (
  <div className={props.className} onClick={props.onClick}>
    {props.children}
  </div>
);
