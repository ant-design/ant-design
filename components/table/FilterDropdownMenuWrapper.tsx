import * as React from 'react';

export interface FilterDropdownMenuWrapperProps {
  children?: any;
  className?: string;
}

export default (props: FilterDropdownMenuWrapperProps) => (
  <div className={props.className} onClick={e => e.stopPropagation()}>
    {props.children}
  </div>
);
