import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';

export interface FilterDropdownMenuWrapperProps {
  className?: string;
}

const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
  const { keyCode } = event;
  if (keyCode === KeyCode.ENTER) {
    event.stopPropagation();
  }
};

const FilterDropdownMenuWrapper = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<FilterDropdownMenuWrapperProps>
>((props, ref) => (
  <div
    className={props.className}
    onClick={(e) => e.stopPropagation()}
    onKeyDown={onKeyDown}
    ref={ref}
  >
    {props.children}
  </div>
));

if (process.env.NODE_ENV !== 'production') {
  FilterDropdownMenuWrapper.displayName = 'FilterDropdownMenuWrapper';
}

export default FilterDropdownMenuWrapper;
