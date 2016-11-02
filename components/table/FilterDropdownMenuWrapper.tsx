import React from 'react';

export interface FilterDropdownMenuWrapperProps {
  onClick?: React.MouseEventHandler<any>;
  children?: any;
  className?: string;
}
export default class FilterDropdownMenuWrapper extends React.Component<FilterDropdownMenuWrapperProps, any> {
  render() {
    const { onClick, children, className } = this.props;
    return <div className={className} onClick={onClick}>{children}</div>;
  }
}
