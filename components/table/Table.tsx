/* eslint-disable prefer-spread */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import omit from 'omit.js';
import RcTable, { INTERNAL_COL_DEFINE } from 'rc-table';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import FilterDropdown from './filterDropdown';
import createStore, { Store } from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import createBodyRow from './createBodyRow';
import { flatArray, treeMap, flatFilter, normalizeColumns } from './util';
import {
  TableProps,
  TableSize,
  TableState,
  TableComponents,
  RowSelectionType,
  TableLocale,
  AdditionalCellProps,
  ColumnProps,
  CompareFn,
  SortOrder,
  TableStateFilters,
  SelectionItemSelectFn,
  SelectionInfo,
  TableSelectWay,
  TableRowSelection,
  PaginationConfig,
  PrepareParamsArgumentsReturn,
  ExpandIconProps,
} from './interface';
import Pagination from '../pagination';
import Icon from '../icon';
import Spin, { SpinProps } from '../spin';
import { RadioChangeEvent } from '../radio';
import TransButton from '../_util/transButton';
import { CheckboxChangeEvent } from '../checkbox';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';
import warning from '../_util/warning';

function noop() {}

function stopPropagation(e: React.SyntheticEvent<any>) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

function getRowSelection<T>(props: TableProps<T>): TableRowSelection<T> {
  return props.rowSelection || {};
}

function getColumnKey<T>(column: ColumnProps<T>, index?: number) {
  return column.key || column.dataIndex || index;
}

function isSameColumn<T>(a: ColumnProps<T> | null, b: ColumnProps<T> | null) {
  if (a && b && a.key && a.key === b.key) {
    return true;
  }
  return (
    a === b ||
    shallowEqual(a, b, (value: any, other: any) => {
      if (typeof value === 'function' && typeof other === 'function') {
        return value === other || value.toString() === other.toString();
      }
    })
  );
}

const defaultPagination = {
  onChange: noop,
  onShowSizeChange: noop,
};

/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
const emptyObject = {};

export default class Table<T> extends React.Component<TableProps<T>, TableState<T>> {
  static Column = Column;

  static ColumnGroup = ColumnGroup;

  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    useFixedHeader: PropTypes.bool,
    rowSelection: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.string as PropTypes.Requireable<TableSize>,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    bordered: PropTypes.bool,
    onChange: PropTypes.func,
    locale: PropTypes.object,
    dropdownPrefixCls: PropTypes.string,
    sortDirections: PropTypes.array,
    getPopupContainer: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    useFixedHeader: false,
    className: '',
    size: 'default' as TableSize,
    loading: false,
    bordered: false,
    indentSize: 20,
    locale: {},
    rowKey: 'key',
    showHeader: true,
    sortDirections: ['ascend', 'descend'],
    childrenColumnName: 'children',
  };

  CheckboxPropsCache: {
    [key: string]: any;
  };

  store: Store;

  columns: ColumnProps<T>[];

  components: TableComponents;

  row: React.ComponentType<any>;

  constructor(props: TableProps<T>) {
    super(props);

    const { expandedRowRender, columns = [] } = props;

    warning(
      !('columnsPageRange' in props || 'columnsPageSize' in props),
      'Table',
      '`columnsPageRange` and `columnsPageSize` are removed, please use ' +
        'fixed columns instead, see: https://u.ant.design/fixed-columns.',
    );

    if (expandedRowRender && columns.some(({ fixed }) => !!fixed)) {
      warning(
        false,
        'Table',
        '`expandedRowRender` and `Column.fixed` are not compatible. Please use one of them at one time.',
      );
    }

    this.columns = props.columns || normalizeColumns(props.children as React.ReactChildren);

    this.createComponents(props.components);

    this.state = {
      ...this.getDefaultSortOrder(this.columns),
      // 减少状态
      filters: this.getFiltersFromColumns(),
      pagination: this.getDefaultPagination(props),
      pivot: undefined,
    };

    this.CheckboxPropsCache = {};

    this.store = createStore({
      selectedRowKeys: getRowSelection(props).selectedRowKeys || [],
      selectionDirty: false,
    });
  }

  componentWillReceiveProps(nextProps: TableProps<T>) {
    this.columns = nextProps.columns || normalizeColumns(nextProps.children as React.ReactChildren);
    if ('pagination' in nextProps || 'pagination' in this.props) {
      this.setState(previousState => {
        const newPagination = {
          ...defaultPagination,
          ...previousState.pagination,
          ...nextProps.pagination,
        };
        newPagination.current = newPagination.current || 1;
        newPagination.pageSize = newPagination.pageSize || 10;
        return { pagination: nextProps.pagination !== false ? newPagination : emptyObject };
      });
    }
    if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
      this.store.setState({
        selectedRowKeys: nextProps.rowSelection.selectedRowKeys || [],
      });
    } else if (this.props.rowSelection && !nextProps.rowSelection) {
      this.store.setState({
        selectedRowKeys: [],
      });
    }
    if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
      this.store.setState({
        selectionDirty: false,
      });
    }

    // https://github.com/ant-design/ant-design/issues/10133
    this.CheckboxPropsCache = {};

    if (this.getSortOrderColumns(this.columns).length > 0) {
      const sortState = this.getSortStateFromColumns(this.columns);
      if (
        sortState.sortColumn !== this.state.sortColumn ||
        sortState.sortOrder !== this.state.sortOrder
      ) {
        this.setState(sortState);
      }
    }

    const filteredValueColumns = this.getFilteredValueColumns(this.columns);
    if (filteredValueColumns.length > 0) {
      const filtersFromColumns = this.getFiltersFromColumns(this.columns);
      const newFilters = { ...this.state.filters };
      Object.keys(filtersFromColumns).forEach(key => {
        newFilters[key] = filtersFromColumns[key];
      });
      if (this.isFiltersChanged(newFilters)) {
        this.setState({ filters: newFilters });
      }
    }

    this.createComponents(nextProps.components, this.props.components);
  }

  getCheckboxPropsByItem = (item: T, index: number) => {
    const rowSelection = getRowSelection(this.props);
    if (!rowSelection.getCheckboxProps) {
      return {};
    }
    const key = this.getRecordKey(item, index);
    // Cache checkboxProps
    if (!this.CheckboxPropsCache[key]) {
      this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item) || {};
      const checkboxProps = this.CheckboxPropsCache[key];
      warning(
        !('checked' in checkboxProps) && !('defaultChecked' in checkboxProps),
        'Table',
        'Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.',
      );
    }
    return this.CheckboxPropsCache[key];
  };

  getDefaultSelection() {
    const rowSelection = getRowSelection(this.props);
    if (!rowSelection.getCheckboxProps) {
      return [];
    }
    return this.getFlatData()
      .filter((item: T, rowIndex) => this.getCheckboxPropsByItem(item, rowIndex).defaultChecked)
      .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
  }

  getDefaultPagination(props: TableProps<T>) {
    const pagination: PaginationConfig =
      typeof props.pagination === 'object' ? props.pagination : {};
    let current;
    if ('current' in pagination) {
      current = pagination.current;
    } else if ('defaultCurrent' in pagination) {
      current = pagination.defaultCurrent;
    }
    let pageSize;
    if ('pageSize' in pagination) {
      pageSize = pagination.pageSize;
    } else if ('defaultPageSize' in pagination) {
      pageSize = pagination.defaultPageSize;
    }
    return this.hasPagination(props)
      ? {
          ...defaultPagination,
          ...pagination,
          current: current || 1,
          pageSize: pageSize || 10,
        }
      : {};
  }

  getSortOrderColumns(columns?: ColumnProps<T>[]) {
    return flatFilter(
      columns || this.columns || [],
      (column: ColumnProps<T>) => 'sortOrder' in column,
    );
  }

  getFilteredValueColumns(columns?: ColumnProps<T>[]) {
    return flatFilter(
      columns || this.columns || [],
      (column: ColumnProps<T>) => typeof column.filteredValue !== 'undefined',
    );
  }

  getFiltersFromColumns(columns?: ColumnProps<T>[]) {
    const filters: any = {};
    this.getFilteredValueColumns(columns).forEach((col: ColumnProps<T>) => {
      const colKey = getColumnKey(col) as string;
      filters[colKey] = col.filteredValue;
    });
    return filters;
  }

  getDefaultSortOrder(columns?: ColumnProps<T>[]) {
    const definedSortState = this.getSortStateFromColumns(columns);

    const defaultSortedColumn = flatFilter(
      columns || [],
      (column: ColumnProps<T>) => column.defaultSortOrder != null,
    )[0];

    if (defaultSortedColumn && !definedSortState.sortColumn) {
      return {
        sortColumn: defaultSortedColumn,
        sortOrder: defaultSortedColumn.defaultSortOrder,
      };
    }

    return definedSortState;
  }

  getSortStateFromColumns(columns?: ColumnProps<T>[]) {
    // return first column which sortOrder is not falsy
    const sortedColumn = this.getSortOrderColumns(columns).filter(
      (col: ColumnProps<T>) => col.sortOrder,
    )[0];

    if (sortedColumn) {
      return {
        sortColumn: sortedColumn,
        sortOrder: sortedColumn.sortOrder,
      };
    }

    return {
      sortColumn: null,
      sortOrder: null,
    };
  }

  getMaxCurrent(total: number) {
    const {
      pagination: { current, pageSize },
    } = this.state;
    if ((current! - 1) * pageSize! >= total) {
      return Math.floor((total - 1) / pageSize!) + 1;
    }
    return current;
  }

  getRecordKey = (record: T, index: number) => {
    const { rowKey } = this.props;
    const recordKey =
      typeof rowKey === 'function' ? rowKey(record, index) : (record as any)[rowKey!];
    warning(
      recordKey !== undefined,
      'Table',
      'Each record in dataSource of table should have a unique `key` prop, ' +
        'or set `rowKey` of Table to an unique primary key, ' +
        'see https://u.ant.design/table-row-key',
    );
    return recordKey === undefined ? index : recordKey;
  };

  getSorterFn(state: TableState<T>) {
    const { sortOrder, sortColumn } = state || this.state;
    if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
      return;
    }

    return (a: T, b: T) => {
      const result = (sortColumn!.sorter as CompareFn<T>)(a, b, sortOrder);
      if (result !== 0) {
        return sortOrder === 'descend' ? -result : result;
      }
      return 0;
    };
  }

  getCurrentPageData() {
    let data = this.getLocalData();
    let current: number;
    let pageSize: number;
    const state = this.state;
    // 如果没有分页的话，默认全部展示
    if (!this.hasPagination()) {
      pageSize = Number.MAX_VALUE;
      current = 1;
    } else {
      pageSize = state.pagination.pageSize as number;
      current = this.getMaxCurrent(state.pagination.total || data.length) as number;
    }

    // 分页
    // ---
    // 当数据量少于等于每页数量时，直接设置数据
    // 否则进行读取分页数据
    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter((_, i) => {
        return i >= (current - 1) * pageSize && i < current * pageSize;
      });
    }
    return data;
  }

  getFlatData() {
    const { childrenColumnName } = this.props;
    return flatArray(this.getLocalData(null, false), childrenColumnName);
  }

  getFlatCurrentPageData() {
    const { childrenColumnName } = this.props;
    return flatArray(this.getCurrentPageData(), childrenColumnName);
  }

  getLocalData(state?: TableState<T> | null, filter: boolean = true): Array<T> {
    const currentState: TableState<T> = state || this.state;
    const { dataSource } = this.props;
    let data = dataSource || [];
    // 优化本地排序
    data = data.slice(0);
    const sorterFn = this.getSorterFn(currentState);
    if (sorterFn) {
      data = this.recursiveSort(data, sorterFn);
    }
    // 筛选
    if (filter && currentState.filters) {
      Object.keys(currentState.filters).forEach(columnKey => {
        const col = this.findColumn(columnKey) as any;
        if (!col) {
          return;
        }
        const values = currentState.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        const onFilter = col.onFilter;
        data = onFilter
          ? data.filter(record => {
              return values.some(v => onFilter(v, record));
            })
          : data;
      });
    }
    return data;
  }

  onRow = (prefixCls: string, record: T, index: number) => {
    const { onRow } = this.props;
    const custom = onRow ? onRow(record, index) : {};
    return {
      ...custom,
      prefixCls,
      store: this.store,
      rowKey: this.getRecordKey(record, index),
    };
  };

  setSelectedRowKeys(selectedRowKeys: string[], selectionInfo: SelectionInfo<T>) {
    const { selectWay, record, checked, changeRowKeys, nativeEvent } = selectionInfo;
    const rowSelection = getRowSelection(this.props);
    if (rowSelection && !('selectedRowKeys' in rowSelection)) {
      this.store.setState({ selectedRowKeys });
    }
    const data = this.getFlatData();
    if (!rowSelection.onChange && !rowSelection[selectWay]) {
      return;
    }
    const selectedRows = data.filter(
      (row, i) => selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0,
    );
    if (rowSelection.onChange) {
      rowSelection.onChange(selectedRowKeys, selectedRows);
    }
    if (selectWay === 'onSelect' && rowSelection.onSelect) {
      rowSelection.onSelect(record!, checked!, selectedRows, nativeEvent!);
    } else if (selectWay === 'onSelectMultiple' && rowSelection.onSelectMultiple) {
      const changeRows = data.filter(
        (row, i) => changeRowKeys!.indexOf(this.getRecordKey(row, i)) >= 0,
      );
      rowSelection.onSelectMultiple(checked!, selectedRows, changeRows);
    } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
      const changeRows = data.filter(
        (row, i) => changeRowKeys!.indexOf(this.getRecordKey(row, i)) >= 0,
      );
      rowSelection.onSelectAll(checked!, selectedRows, changeRows);
    } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
      rowSelection.onSelectInvert(selectedRowKeys);
    }
  }

  generatePopupContainerFunc = (getPopupContainer: TableProps<T>['getPopupContainer']) => {
    const { scroll } = this.props;
    if (getPopupContainer) {
      return getPopupContainer;
    }
    // Use undefined to let rc component use default logic.
    return scroll ? () => ReactDOM.findDOMNode(this) as HTMLElement : undefined;
  };

  handleFilter = (column: ColumnProps<T>, nextFilters: string[]) => {
    const props = this.props;
    const pagination = { ...this.state.pagination };
    const filters = {
      ...this.state.filters,
      [getColumnKey(column) as string]: nextFilters,
    };
    // Remove filters not in current columns
    const currentColumnKeys: string[] = [];
    treeMap(this.columns, c => {
      if (!c.children) {
        currentColumnKeys.push(getColumnKey(c) as string);
      }
    });
    Object.keys(filters).forEach(columnKey => {
      if (currentColumnKeys.indexOf(columnKey) < 0) {
        delete filters[columnKey];
      }
    });

    if (props.pagination) {
      // Reset current prop
      pagination.current = 1;
      pagination.onChange!(pagination.current);
    }

    const newState = {
      pagination,
      filters: {},
    };
    const filtersToSetState = { ...filters };
    // Remove filters which is controlled
    this.getFilteredValueColumns().forEach((col: ColumnProps<T>) => {
      const columnKey = getColumnKey(col);
      if (columnKey) {
        delete filtersToSetState[columnKey];
      }
    });
    if (Object.keys(filtersToSetState).length > 0) {
      newState.filters = filtersToSetState;
    }

    // Controlled current prop will not respond user interaction
    if (typeof props.pagination === 'object' && 'current' in props.pagination) {
      newState.pagination = {
        ...pagination,
        current: this.state.pagination.current,
      };
    }

    this.setState(newState, () => {
      this.store.setState({
        selectionDirty: false,
      });
      const { onChange } = this.props;
      if (onChange) {
        onChange.apply(
          null,
          this.prepareParamsArguments({
            ...this.state,
            selectionDirty: false,
            filters,
            pagination,
          }),
        );
      }
    });
  };

  handleSelect = (record: T, rowIndex: number, e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const nativeEvent = e.nativeEvent;
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    const key = this.getRecordKey(record, rowIndex);
    const { pivot } = this.state;
    const rows = this.getFlatCurrentPageData();
    let realIndex = rowIndex;
    if (this.props.expandedRowRender) {
      realIndex = rows.findIndex(row => this.getRecordKey(row, rowIndex) === key);
    }

    if (nativeEvent.shiftKey && pivot !== undefined && realIndex !== pivot) {
      const changeRowKeys = [];
      const direction = Math.sign(pivot - realIndex);
      const dist = Math.abs(pivot - realIndex);
      let step = 0;
      while (step <= dist) {
        const i = realIndex + step * direction;
        step += 1;
        const row = rows[i];
        const rowKey = this.getRecordKey(row, i);
        const checkboxProps = this.getCheckboxPropsByItem(row, i);
        if (!checkboxProps.disabled) {
          if (selectedRowKeys.includes(rowKey)) {
            if (!checked) {
              selectedRowKeys = selectedRowKeys.filter((j: string) => rowKey !== j);
              changeRowKeys.push(rowKey);
            }
          } else if (checked) {
            selectedRowKeys.push(rowKey);
            changeRowKeys.push(rowKey);
          }
        }
      }

      this.setState({ pivot: realIndex });
      this.store.setState({
        selectionDirty: true,
      });
      this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: 'onSelectMultiple',
        record,
        checked,
        changeRowKeys,
        nativeEvent,
      });
    } else {
      if (checked) {
        selectedRowKeys.push(this.getRecordKey(record, realIndex));
      } else {
        selectedRowKeys = selectedRowKeys.filter((i: string) => key !== i);
      }

      this.setState({ pivot: realIndex });
      this.store.setState({
        selectionDirty: true,
      });
      this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: 'onSelect',
        record,
        checked,
        changeRowKeys: undefined,
        nativeEvent,
      });
    }
  };

  handleRadioSelect = (record: T, rowIndex: number, e: RadioChangeEvent) => {
    const checked = e.target.checked;
    const nativeEvent = e.nativeEvent;
    const key = this.getRecordKey(record, rowIndex);
    const selectedRowKeys = [key];
    this.store.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys, {
      selectWay: 'onSelect',
      record,
      checked,
      changeRowKeys: undefined,
      nativeEvent,
    });
  };

  handleSelectRow = (selectionKey: string, index: number, onSelectFunc: SelectionItemSelectFn) => {
    const data = this.getFlatCurrentPageData();
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    const selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    const changeableRowKeys = data
      .filter((item, i) => !this.getCheckboxPropsByItem(item, i).disabled)
      .map((item, i) => this.getRecordKey(item, i));

    const changeRowKeys: string[] = [];
    let selectWay: TableSelectWay = 'onSelectAll';
    let checked;
    // handle default selection
    switch (selectionKey) {
      case 'all':
        changeableRowKeys.forEach(key => {
          if (selectedRowKeys.indexOf(key) < 0) {
            selectedRowKeys.push(key);
            changeRowKeys.push(key);
          }
        });
        selectWay = 'onSelectAll';
        checked = true;
        break;
      case 'removeAll':
        changeableRowKeys.forEach(key => {
          if (selectedRowKeys.indexOf(key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
            changeRowKeys.push(key);
          }
        });
        selectWay = 'onSelectAll';
        checked = false;
        break;
      case 'invert':
        changeableRowKeys.forEach(key => {
          if (selectedRowKeys.indexOf(key) < 0) {
            selectedRowKeys.push(key);
          } else {
            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
          }
          changeRowKeys.push(key);
          selectWay = 'onSelectInvert';
        });
        break;
      default:
        break;
    }

    this.store.setState({
      selectionDirty: true,
    });
    // when select custom selection, callback selections[n].onSelect
    const { rowSelection } = this.props;
    let customSelectionStartIndex = 2;
    if (rowSelection && rowSelection.hideDefaultSelections) {
      customSelectionStartIndex = 0;
    }
    if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
      return onSelectFunc(changeableRowKeys);
    }
    this.setSelectedRowKeys(selectedRowKeys, {
      selectWay,
      checked,
      changeRowKeys,
    });
  };

  handlePageChange = (current: number, ...otherArguments: any[]) => {
    const props = this.props;
    const pagination = { ...this.state.pagination };
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    pagination.onChange!(pagination.current, ...otherArguments);

    const newState = {
      pagination,
    };
    // Controlled current prop will not respond user interaction
    if (props.pagination && typeof props.pagination === 'object' && 'current' in props.pagination) {
      newState.pagination = {
        ...pagination,
        current: this.state.pagination.current,
      };
    }
    this.setState(newState);

    this.store.setState({
      selectionDirty: false,
    });

    const { onChange } = this.props;
    if (onChange) {
      onChange.apply(
        null,
        this.prepareParamsArguments({
          ...this.state,
          selectionDirty: false,
          pagination,
        }),
      );
    }
  };

  handleShowSizeChange = (current: number, pageSize: number) => {
    const { pagination } = this.state;
    pagination.onShowSizeChange!(current, pageSize);
    const nextPagination = {
      ...pagination,
      pageSize,
      current,
    };
    this.setState({ pagination: nextPagination });

    const { onChange } = this.props;
    if (onChange) {
      onChange.apply(
        null,
        this.prepareParamsArguments({
          ...this.state,
          pagination: nextPagination,
        }),
      );
    }
  };

  toggleSortOrder(column: ColumnProps<T>) {
    if (!column.sorter) {
      return;
    }

    const pagination = { ...this.state.pagination };

    const sortDirections = column.sortDirections || (this.props.sortDirections as SortOrder[]);
    const { sortOrder, sortColumn } = this.state;
    // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
    let newSortOrder: 'descend' | 'ascend' | undefined;
    // 切换另一列时，丢弃 sortOrder 的状态
    if (isSameColumn(sortColumn, column) && sortOrder !== undefined) {
      // 按照sortDirections的内容依次切换排序状态
      const methodIndex = sortDirections.indexOf(sortOrder) + 1;
      newSortOrder =
        methodIndex === sortDirections.length ? undefined : sortDirections[methodIndex];
    } else {
      newSortOrder = sortDirections[0];
    }

    if (this.props.pagination) {
      // Reset current prop
      pagination.current = 1;
      pagination.onChange!(pagination.current);
    }

    const newState = {
      pagination,
      sortOrder: newSortOrder,
      sortColumn: newSortOrder ? column : null,
    };

    // Controlled
    if (this.getSortOrderColumns().length === 0) {
      this.setState(newState);
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange.apply(
        null,
        this.prepareParamsArguments({
          ...this.state,
          ...newState,
        }),
      );
    }
  }

  hasPagination(props?: any) {
    return (props || this.props).pagination !== false;
  }

  isFiltersChanged(filters: TableStateFilters) {
    let filtersChanged = false;
    if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
      filtersChanged = true;
    } else {
      Object.keys(filters).forEach(columnKey => {
        if (filters[columnKey] !== this.state.filters[columnKey]) {
          filtersChanged = true;
        }
      });
    }
    return filtersChanged;
  }

  isSortColumn(column: ColumnProps<T>) {
    const { sortColumn } = this.state;
    if (!column || !sortColumn) {
      return false;
    }
    return getColumnKey(sortColumn) === getColumnKey(column);
  }

  // Get pagination, filters, sorter
  prepareParamsArguments(state: any): PrepareParamsArgumentsReturn<T> {
    const pagination = { ...state.pagination };
    // remove useless handle function in Table.onChange
    delete pagination.onChange;
    delete pagination.onShowSizeChange;
    const filters = state.filters;
    const sorter: any = {};
    if (state.sortColumn && state.sortOrder) {
      sorter.column = state.sortColumn;
      sorter.order = state.sortOrder;
      sorter.field = state.sortColumn.dataIndex;
      sorter.columnKey = getColumnKey(state.sortColumn);
    }

    const extra = {
      currentDataSource: this.getLocalData(state),
    };

    return [pagination, filters, sorter, extra];
  }

  findColumn(myKey: string | number) {
    let column;
    treeMap(this.columns, c => {
      if (getColumnKey(c) === myKey) {
        column = c;
      }
    });
    return column;
  }

  createComponents(components: TableComponents = {}, prevComponents?: TableComponents) {
    const bodyRow = components && components.body && components.body.row;
    const preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;
    if (!this.row || bodyRow !== preBodyRow) {
      this.row = createBodyRow(bodyRow);
    }
    this.components = {
      ...components,
      body: {
        ...components.body,
        row: this.row,
      },
    };
  }

  recursiveSort(data: T[], sorterFn: (a: any, b: any) => number): T[] {
    const { childrenColumnName = 'children' } = this.props;
    return data.sort(sorterFn).map((item: any) =>
      item[childrenColumnName]
        ? {
            ...item,
            [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn),
          }
        : item,
    );
  }

  renderExpandIcon = (prefixCls: string) => ({
    expandable,
    expanded,
    needIndentSpaced,
    record,
    onExpand,
  }: ExpandIconProps<T>) => {
    if (expandable) {
      return (
        <LocaleReceiver componentName="Table" defaultLocale={defaultLocale.Table}>
          {(locale: TableLocale) => (
            <TransButton
              className={classNames(`${prefixCls}-row-expand-icon`, {
                [`${prefixCls}-row-collapsed`]: !expanded,
                [`${prefixCls}-row-expanded`]: expanded,
              })}
              onClick={event => {
                onExpand(record, event);
              }}
              aria-label={expanded ? locale.collapse : locale.expand}
              noStyle
            />
          )}
        </LocaleReceiver>
      );
    }

    if (needIndentSpaced) {
      return <span className={`${prefixCls}-row-expand-icon ${prefixCls}-row-spaced`} />;
    }

    return null;
  };

  renderPagination(prefixCls: string, paginationPosition: string) {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let size = 'default';
    const { pagination } = this.state;
    if (pagination.size) {
      size = pagination.size;
    } else if (this.props.size === 'middle' || this.props.size === 'small') {
      size = 'small';
    }
    const position = pagination.position || 'bottom';
    const total = pagination.total || this.getLocalData().length;
    return total > 0 && (position === paginationPosition || position === 'both') ? (
      <Pagination
        key={`pagination-${paginationPosition}`}
        {...pagination}
        className={classNames(pagination.className, `${prefixCls}-pagination`)}
        onChange={this.handlePageChange}
        total={total}
        size={size}
        current={this.getMaxCurrent(total)}
        onShowSizeChange={this.handleShowSizeChange}
      />
    ) : null;
  }

  renderSelectionBox = (type: RowSelectionType | undefined) => {
    return (_: any, record: T, index: number) => {
      const rowKey = this.getRecordKey(record, index);
      const props = this.getCheckboxPropsByItem(record, index);
      const handleChange = (e: RadioChangeEvent | CheckboxChangeEvent) =>
        type === 'radio'
          ? this.handleRadioSelect(record, index, e)
          : this.handleSelect(record, index, e);

      return (
        <span onClick={stopPropagation}>
          <SelectionBox
            type={type}
            store={this.store}
            rowIndex={rowKey}
            onChange={handleChange}
            defaultSelection={this.getDefaultSelection()}
            {...props}
          />
        </span>
      );
    };
  };

  renderRowSelection({
    prefixCls,
    locale,
    getPopupContainer,
  }: {
    prefixCls: string;
    locale: TableLocale;
    getPopupContainer: TableProps<T>['getPopupContainer'];
  }) {
    const { rowSelection } = this.props;
    const columns = this.columns.concat();
    if (rowSelection) {
      const data = this.getFlatCurrentPageData().filter((item, index) => {
        if (rowSelection.getCheckboxProps) {
          return !this.getCheckboxPropsByItem(item, index).disabled;
        }
        return true;
      });
      const selectionColumnClass = classNames(`${prefixCls}-selection-column`, {
        [`${prefixCls}-selection-column-custom`]: rowSelection.selections,
      });
      const selectionColumn: ColumnProps<any> = {
        key: 'selection-column',
        render: this.renderSelectionBox(rowSelection.type),
        className: selectionColumnClass,
        fixed: rowSelection.fixed,
        width: rowSelection.columnWidth,
        title: rowSelection.columnTitle,
        [INTERNAL_COL_DEFINE]: {
          className: `${prefixCls}-selection-col`,
        },
      };
      if (rowSelection.type !== 'radio') {
        const checkboxAllDisabled = data.every(
          (item, index) => this.getCheckboxPropsByItem(item, index).disabled,
        );
        selectionColumn.title = selectionColumn.title || (
          <SelectionCheckboxAll
            store={this.store}
            locale={locale}
            data={data}
            getCheckboxPropsByItem={this.getCheckboxPropsByItem}
            getRecordKey={this.getRecordKey}
            disabled={checkboxAllDisabled}
            prefixCls={prefixCls}
            onSelect={this.handleSelectRow}
            selections={rowSelection.selections}
            hideDefaultSelections={rowSelection.hideDefaultSelections}
            getPopupContainer={this.generatePopupContainerFunc(getPopupContainer)}
          />
        );
      }
      if ('fixed' in rowSelection) {
        selectionColumn.fixed = rowSelection.fixed;
      } else if (columns.some(column => column.fixed === 'left' || column.fixed === true)) {
        selectionColumn.fixed = 'left';
      }
      if (columns[0] && columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }
    return columns;
  }

  renderColumnsDropdown({
    prefixCls,
    dropdownPrefixCls,
    columns,
    locale,
    getPopupContainer,
  }: {
    prefixCls: string;
    dropdownPrefixCls: string;
    columns: ColumnProps<T>[];
    locale: TableLocale;
    getPopupContainer: TableProps<T>['getPopupContainer'];
  }) {
    const { sortOrder, filters } = this.state;
    return treeMap(columns, (column, i) => {
      const key = getColumnKey(column, i) as string;
      let filterDropdown;
      let sortButton;
      let onHeaderCell = column.onHeaderCell;
      const isSortColumn = this.isSortColumn(column);
      if ((column.filters && column.filters.length > 0) || column.filterDropdown) {
        const colFilters = key in filters ? filters[key] : [];
        filterDropdown = (
          <FilterDropdown
            locale={locale}
            column={column}
            selectedKeys={colFilters}
            confirmFilter={this.handleFilter}
            prefixCls={`${prefixCls}-filter`}
            dropdownPrefixCls={dropdownPrefixCls || 'ant-dropdown'}
            getPopupContainer={this.generatePopupContainerFunc(getPopupContainer)}
            key="filter-dropdown"
          />
        );
      }
      if (column.sorter) {
        const sortDirections = column.sortDirections || (this.props.sortDirections as SortOrder[]);
        const isAscend = isSortColumn && sortOrder === 'ascend';
        const isDescend = isSortColumn && sortOrder === 'descend';

        const ascend = sortDirections.indexOf('ascend') !== -1 && (
          <Icon
            className={`${prefixCls}-column-sorter-up ${isAscend ? 'on' : 'off'}`}
            type="caret-up"
            theme="filled"
          />
        );

        const descend = sortDirections.indexOf('descend') !== -1 && (
          <Icon
            className={`${prefixCls}-column-sorter-down ${isDescend ? 'on' : 'off'}`}
            type="caret-down"
            theme="filled"
          />
        );

        sortButton = (
          <div
            title={locale.sortTitle}
            className={classNames(
              `${prefixCls}-column-sorter-inner`,
              ascend && descend && `${prefixCls}-column-sorter-inner-full`,
            )}
            key="sorter"
          >
            {ascend}
            {descend}
          </div>
        );

        onHeaderCell = (col: Column<T>) => {
          let colProps: AdditionalCellProps = {};
          // Get original first
          if (column.onHeaderCell) {
            colProps = {
              ...column.onHeaderCell(col),
            };
          }
          // Add sorter logic
          const onHeaderCellClick = colProps.onClick;
          colProps.onClick = (...args) => {
            this.toggleSortOrder(column);
            if (onHeaderCellClick) {
              onHeaderCellClick(...args);
            }
          };
          return colProps;
        };
      }
      return {
        ...column,
        className: classNames(column.className, {
          [`${prefixCls}-column-has-actions`]: sortButton || filterDropdown,
          [`${prefixCls}-column-has-filters`]: filterDropdown,
          [`${prefixCls}-column-has-sorters`]: sortButton,
          [`${prefixCls}-column-sort`]: isSortColumn && sortOrder,
        }),
        title: [
          <span key="title" className={`${prefixCls}-header-column`}>
            <div className={sortButton ? `${prefixCls}-column-sorters` : undefined}>
              <span className={`${prefixCls}-column-title`}>
                {this.renderColumnTitle(column.title)}
              </span>
              <span className={`${prefixCls}-column-sorter`}>{sortButton}</span>
            </div>
          </span>,
          filterDropdown,
        ],
        onHeaderCell,
      };
    });
  }

  renderColumnTitle(title: ColumnProps<T>['title']) {
    const { filters, sortOrder } = this.state;
    // https://github.com/ant-design/ant-design/issues/11246#issuecomment-405009167
    if (title instanceof Function) {
      return title({
        filters,
        sortOrder,
      });
    }
    return title;
  }

  renderTable = ({
    prefixCls,
    renderEmpty,
    dropdownPrefixCls,
    contextLocale,
    getPopupContainer: contextGetPopupContainer,
  }: {
    prefixCls: string;
    renderEmpty: RenderEmptyHandler;
    dropdownPrefixCls: string;
    contextLocale: TableLocale;
    getPopupContainer: TableProps<T>['getPopupContainer'];
  }) => {
    const { showHeader, locale, getPopupContainer, ...restTableProps } = this.props;
    // do not pass prop.style to rc-table, since already apply it to container div
    const restProps = omit(restTableProps, ['style']);
    const data = this.getCurrentPageData();
    const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;

    // use props.getPopupContainer first
    const realGetPopupContainer = getPopupContainer || contextGetPopupContainer;

    // Merge too locales
    const mergedLocale = { ...contextLocale, ...locale };
    if (!locale || !locale.emptyText) {
      mergedLocale.emptyText = renderEmpty('Table');
    }

    const classString = classNames({
      [`${prefixCls}-${this.props.size}`]: true,
      [`${prefixCls}-bordered`]: this.props.bordered,
      [`${prefixCls}-empty`]: !data.length,
      [`${prefixCls}-without-column-header`]: !showHeader,
    });

    const columnsWithRowSelection = this.renderRowSelection({
      prefixCls,
      locale: mergedLocale,
      getPopupContainer: realGetPopupContainer,
    });
    const columns = this.renderColumnsDropdown({
      columns: columnsWithRowSelection,
      prefixCls,
      dropdownPrefixCls,
      locale: mergedLocale,
      getPopupContainer: realGetPopupContainer,
    }).map((column, i) => {
      const newColumn = { ...column };
      newColumn.key = getColumnKey(newColumn, i);
      return newColumn;
    });

    let expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;
    if ('expandIconColumnIndex' in restProps) {
      expandIconColumnIndex = restProps.expandIconColumnIndex as number;
    }

    return (
      <RcTable
        key="table"
        expandIcon={this.renderExpandIcon(prefixCls)}
        {...restProps}
        onRow={(record: T, index: number) => this.onRow(prefixCls, record, index)}
        components={this.components}
        prefixCls={prefixCls}
        data={data}
        columns={columns}
        showHeader={showHeader}
        className={classString}
        expandIconColumnIndex={expandIconColumnIndex}
        expandIconAsCell={expandIconAsCell}
        emptyText={mergedLocale.emptyText}
      />
    );
  };

  renderComponent = ({ getPrefixCls, renderEmpty, getPopupContainer }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      dropdownPrefixCls: customizeDropdownPrefixCls,
      style,
      className,
    } = this.props;
    const data = this.getCurrentPageData();

    let loading = this.props.loading as SpinProps;
    if (typeof loading === 'boolean') {
      loading = {
        spinning: loading,
      };
    }

    const prefixCls = getPrefixCls('table', customizePrefixCls);
    const dropdownPrefixCls = getPrefixCls('dropdown', customizeDropdownPrefixCls);
    const table = (
      <LocaleReceiver componentName="Table" defaultLocale={defaultLocale.Table}>
        {locale =>
          this.renderTable({
            prefixCls,
            renderEmpty,
            dropdownPrefixCls,
            contextLocale: locale,
            getPopupContainer,
          })
        }
      </LocaleReceiver>
    );

    // if there is no pagination or no data,
    // the height of spin should decrease by half of pagination
    const paginationPatchClass =
      this.hasPagination() && data && data.length !== 0
        ? `${prefixCls}-with-pagination`
        : `${prefixCls}-without-pagination`;

    return (
      <div className={classNames(`${prefixCls}-wrapper`, className)} style={style}>
        <Spin
          {...loading}
          className={loading.spinning ? `${paginationPatchClass} ${prefixCls}-spin-holder` : ''}
        >
          {this.renderPagination(prefixCls, 'top')}
          {table}
          {this.renderPagination(prefixCls, 'bottom')}
        </Spin>
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}
