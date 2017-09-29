import React from 'react';

export interface ColumnProps<T> {
  title?: React.ReactNode;
  key?: string;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  filters?: { text: string; value: string, children?: any[] }[];
  onFilter?: (value: any, record: T) => boolean;
  filterMultiple?: boolean;
  filterDropdown?: React.ReactNode;
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  sorter?: boolean | ((a: any, b: any) => number);
  colSpan?: number;
  width?: string | number;
  className?: string;
  fixed?: boolean | ('left' | 'right');
  filterIcon?: React.ReactNode;
  filteredValue?: any[];
  sortOrder?: boolean | ('ascend' | 'descend');
  children?: ColumnProps<T>[];
  onCellClick?: (record: T, event: any) => void;
}

export default class Column<T> extends React.Component<ColumnProps<T>, React.ComponentState> {}
