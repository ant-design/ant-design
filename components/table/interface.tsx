import { ColumnsType, FixedType } from 'rc-table/lib/interface';

export { ColumnsType, FixedType };

export type Key = React.Key;

export type RowSelectionType = 'checkbox' | 'radio';

export type TableSelectWay = 'onSelect' | 'onSelectMultiple' | 'onSelectAll' | 'onSelectInvert';

export type SelectionItemSelectFn = (key: string[]) => void;

export interface SelectionItem {
  key: string;
  text: React.ReactNode;
  onSelect?: SelectionItemSelectFn;
}

export type SelectionSelectFn<T> = (
  record: T,
  selected: boolean,
  selectedRows: Object[],
  nativeEvent: Event,
) => void;

export interface TableRowSelection<T> {
  type?: RowSelectionType;
  selectedRowKeys?: Key[];
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => Object;
  onSelect?: SelectionSelectFn<T>;
  onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onSelectInvert?: (selectedRowKeys: string[] | number[]) => void;
  selections?: SelectionItem[] | boolean;
  hideDefaultSelections?: boolean;
  fixed?: boolean;
  columnWidth?: string | number;
  selectWay?: TableSelectWay;
  columnTitle?: string | React.ReactNode;
}
