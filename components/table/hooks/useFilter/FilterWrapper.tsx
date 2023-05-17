import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';

export interface FilterDropdownMenuWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
  const { keyCode } = event;
  if (keyCode === KeyCode.ENTER) {
    event.stopPropagation();
  }
};

const FilterDropdownMenuWrapper: React.FC<FilterDropdownMenuWrapperProps> = (props) => (
  <div className={props.className} onClick={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
    {props.children}
  </div>
);

export default FilterDropdownMenuWrapper;
