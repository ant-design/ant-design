import { GetRowKey, ColumnType as RcColumnType, ExpandableConfig } from 'rc-table/lib/interface';
import { CheckboxProps } from '../checkbox';
import { PaginationConfig } from '../pagination';

export { GetRowKey, ExpandableConfig };

export type Key = React.Key;

export type RowSelectionType = 'checkbox' | 'radio';

export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;

export type ExpandType = null | 'row' | 'nest';

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

export type SortOrder = 'descend' | 'ascend' | null;

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export interface ColumnFilterItem {
  text: React.ReactNode;
  value: string;
  children?: ColumnFilterItem[];
}

export interface ColumnTitleProps<RecordType> {
  /** @deprecated Please use `sorterColumns` instead. */
  sortOrder?: SortOrder;
  /** @deprecated Please use `sorterColumns` instead. */
  sortColumn?: ColumnType<RecordType>;
  sortColumns?: { column: ColumnType<RecordType>; order: SortOrder }[];

  filters?: Record<string, string[]>;
}

export type ColumnTitle<RecordType> =
  | React.ReactNode
  | ((props: ColumnTitleProps<RecordType>) => React.ReactNode);

export interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: string[]) => void;
  selectedKeys: React.Key[];
  confirm: () => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
}

export interface ColumnType<RecordType> extends RcColumnType<RecordType> {
  title?: ColumnTitle<RecordType>;

  // Sorter
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

  // Filter
  filters?: ColumnFilterItem[];
  filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
  filterMultiple?: boolean;
  filteredValue?: Key[] | null;
  defaultFilteredValue?: Key[] | null;
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
  onFilter?: (value: any, record: RecordType) => boolean;
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
}

export interface ColumnGroupType<RecordType> extends ColumnType<RecordType> {
  children: ColumnsType<RecordType>;
}

export type ColumnsType<RecordType = unknown> = (
  | ColumnGroupType<RecordType>
  | ColumnType<RecordType>
)[];

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
  /** @deprecated This function is meaningless and should use `onChange` instead */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  /** @deprecated This function is meaningless and should use `onChange` instead */
  onSelectInvert?: (selectedRowKeys: Key[]) => void;
  selections?: SelectionItem[] | boolean;
  hideDefaultSelections?: boolean;
  fixed?: boolean;
  columnWidth?: string | number;
  columnTitle?: string | React.ReactNode;
}

export type TransformColumns<RecordType> = (
  columns: ColumnsType<RecordType>,
) => ColumnsType<RecordType>;

export interface TableCurrentDataSource<RecordType> {
  currentDataSource: RecordType[];
}

export interface SorterResult<RecordType> {
  column?: ColumnType<RecordType>;
  order?: SortOrder;
  field?: Key | Key[];
  columnKey?: Key;
}

export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement;

export interface TablePaginationConfig extends PaginationConfig {
  position?: 'top' | 'bottom' | 'both';
}
