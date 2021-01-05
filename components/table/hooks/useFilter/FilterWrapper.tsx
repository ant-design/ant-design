import * as React from 'react';

export interface FilterDropdownMenuWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const FilterDropdownMenuWrapper = (props: FilterDropdownMenuWrapperProps) => (
  <div className={props.className} onClick={e => e.stopPropagation()}>
    {props.children}
  </div>
);

export default FilterDropdownMenuWrapper;
