import { GetRowKey, ColumnGroupType, ColumnType as RcColumnType } from 'rc-table/lib/interface';
import { CheckboxProps } from '../checkbox';

// eslint-disable-next-line import/prefer-default-export
export { GetRowKey };

export type Key = React.Key;

export type RowSelectionType = 'checkbox' | 'radio';

export type TableSelectWay = 'onSelect' | 'onSelectMultiple' | 'onSelectAll' | 'onSelectInvert';

export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;

export interface TableLocale {
  filterTitle?: string;
  filterConfirm?: React.ReactNode;
  filterReset?: React.ReactNode;
  emptyText?: React.ReactNode | (() => React.ReactNode);
  selectAll?: React.ReactNode;
  selectInvert?: React.ReactNode;
  selectionAll?: React.ReactNode;
  sortTitle?: string;
  expand?: string;
  collapse?: string;
}

export type SortOrder = 'descend' | 'ascend';

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export interface ColumnType<RecordType> extends RcColumnType<RecordType> {
  // TODO: Doc this update
  sorter?:
    | boolean
    | CompareFn<RecordType>
    | {
        compare: CompareFn<RecordType>;
        /** Config multiple sorter order priority */
        multiple: number;
      };
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  sortDirections?: SortOrder[];
}

export type ColumnsType<RecordType> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];

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
  onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => Partial<CheckboxProps>;
  onSelect?: SelectionSelectFn<T>;
  onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onSelectInvert?: (selectedRowKeys: Key[]) => void;
  selections?: SelectionItem[] | boolean;
  hideDefaultSelections?: boolean;
  fixed?: boolean;
  columnWidth?: string | number;
  selectWay?: TableSelectWay;
  columnTitle?: string | React.ReactNode;
}

export type TransformColumns<RecordType> = (
  columns: ColumnsType<RecordType>,
) => ColumnsType<RecordType>;
