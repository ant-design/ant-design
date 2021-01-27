import * as React from 'react';
import {
  GetRowKey,
  ColumnType as RcColumnType,
  RenderedCell as RcRenderedCell,
  ExpandableConfig,
} from 'rc-table/lib/interface';
import { CheckboxProps } from '../checkbox';
import { PaginationProps } from '../pagination';
import { Breakpoint } from '../_util/responsiveObserve';
import { INTERNAL_SELECTION_ITEM } from './hooks/useSelection';
import { tuple } from '../_util/type';
// import { TableAction } from './Table';

export { GetRowKey, ExpandableConfig };

export type Key = React.Key;

export type RowSelectionType = 'checkbox' | 'radio';

export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;

export type ExpandType = null | 'row' | 'nest';

export interface TableLocale {
  filterTitle?: string;
  filterConfirm?: React.ReactNode;
  filterReset?: React.ReactNode;
  filterEmptyText?: React.ReactNode;
  emptyText?: React.ReactNode | (() => React.ReactNode);
  selectAll?: React.ReactNode;
  selectNone?: React.ReactNode;
  selectInvert?: React.ReactNode;
  selectionAll?: React.ReactNode;
  sortTitle?: string;
  expand?: string;
  collapse?: string;
  triggerDesc?: string;
  triggerAsc?: string;
  cancelSort?: string;
}

export type SortOrder = 'descend' | 'ascend' | null;

const TableActions = tuple('paginate', 'sort', 'filter');
export type TableAction = typeof TableActions[number];

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export interface ColumnFilterItem {
  text: React.ReactNode;
  value: string | number | boolean;
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

export interface FilterConfirmProps {
  closeDropdown: boolean;
}

export interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: readonly React.Key[]) => void;
  selectedKeys: readonly React.Key[];
  confirm: (param: FilterConfirmProps) => void;
  clearFilters?: () => void;
  filters?: readonly ColumnFilterItem[];
  visible: boolean;
}

export interface ColumnType<RecordType> extends RcColumnType<RecordType> {
  title?: ColumnTitle<RecordType>;
  // Sorter
  sorter?:
    | boolean
    | CompareFn<RecordType>
    | {
        compare?: CompareFn<RecordType>;
        /** Config multiple sorter order priority */
        multiple?: number;
      };
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  sortDirections?: readonly SortOrder[];
  showSorterTooltip?: boolean;

  // Filter
  filtered?: boolean;
  filters?: readonly ColumnFilterItem[];
  filterDropdown?: React.ReactNode | ((props: FilterDropdownProps) => React.ReactNode);
  filterMultiple?: boolean;
  filteredValue?: readonly Key[] | null;
  defaultFilteredValue?: readonly Key[] | null;
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;

  // Responsive
  responsive?: readonly Breakpoint[];
}

export interface ColumnGroupType<RecordType> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>;
}

export type ColumnsType<RecordType = unknown> = readonly (
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
  selectedRows: readonly T[],
  nativeEvent: Event,
) => void;

export interface TableRowSelection<T> {
  /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
  preserveSelectedRowKeys?: boolean;
  type?: RowSelectionType;
  selectedRowKeys?: readonly Key[];
  onChange?: (selectedRowKeys: readonly Key[], selectedRows: readonly T[]) => void;
  getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
  onSelect?: SelectionSelectFn<T>;
  onSelectMultiple?: (
    selected: boolean,
    selectedRows: readonly T[],
    changeRows: readonly T[],
  ) => void;
  /** @deprecated This function is meaningless and should use `onChange` instead */
  onSelectAll?: (selected: boolean, selectedRows: readonly T[], changeRows: readonly T[]) => void;
  /** @deprecated This function is meaningless and should use `onChange` instead */
  onSelectInvert?: (selectedRowKeys: readonly Key[]) => void;
  onSelectNone?: () => void;
  selections?: readonly INTERNAL_SELECTION_ITEM[] | boolean;
  hideSelectAll?: boolean;
  fixed?: boolean;
  columnWidth?: string | number;
  columnTitle?: string | React.ReactNode;
  checkStrictly?: boolean;
  renderCell?: (
    value: boolean,
    record: T,
    index: number,
    originNode: React.ReactNode,
  ) => React.ReactNode | RcRenderedCell<T>;
}

export type TransformColumns<RecordType> = (
  columns: ColumnsType<RecordType>,
) => ColumnsType<RecordType>;

export interface TableCurrentDataSource<RecordType> {
  currentDataSource: readonly RecordType[];
  action: TableAction;
}

export interface SorterResult<RecordType> {
  column?: ColumnType<RecordType>;
  order?: SortOrder;
  field?: Key | readonly Key[];
  columnKey?: Key;
}

export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement;

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

export interface TablePaginationConfig extends PaginationProps {
  position?: readonly TablePaginationPosition[];
}
