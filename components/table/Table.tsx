/* eslint-disable prefer-spread */
import * as React from 'react';
import omit from 'omit.js';
import RcTable, { INTERNAL_COL_DEFINE } from 'rc-table';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { polyfill } from 'react-lifecycles-compat';
import FilterDropdown from './filterDropdown';
import createStore, { Store } from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import createBodyRow from './createBodyRow';
import { flatArray, treeMap, flatFilter, normalizeColumns } from './util';
import scrollTo from '../_util/scrollTo';
import {
  TableProps,
  InternalTableProps,
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
  CheckboxPropsCache,
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
      // https://github.com/ant-design/ant-design/issues/12737
      if (typeof value === 'function' && typeof other === 'function') {
        return value === other || value.toString() === other.toString();
      }
      // https://github.com/ant-design/ant-design/issues/19398
      if (Array.isArray(value) && Array.isArray(other)) {
        return value === other || shallowEqual(value, other);
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

const createComponents = (components: TableComponents = {}) => {
  const bodyRow = components && components.body && components.body.row;
  return {
    ...components,
    body: {
      ...components.body,
      row: createBodyRow(bodyRow),
    },
  };
};

function isTheSameComponents(components1: TableComponents = {}, components2: TableComponents = {}) {
  return (
    components1 === components2 ||
    ['table', 'header', 'body'].every((key: keyof TableComponents) =>
      shallowEqual(components1[key], components2[key]),
    )
  );
}

function getFilteredValueColumns<T>(state: TableState<T>, columns?: ColumnProps<T>[]) {
  return flatFilter(
    columns || (state || {}).columns || [],
    (column: ColumnProps<T>) => typeof column.filteredValue !== 'undefined',
  );
}

function getFiltersFromColumns<T>(
  state: TableState<T> = {} as TableState<T>,
  columns?: ColumnProps<T>[],
) {
  const filters: any = {};
  getFilteredValueColumns<T>(state, columns).forEach((col: ColumnProps<T>) => {
    const colKey = getColumnKey(col) as string;
    filters[colKey] = col.filteredValue;
  });
  return filters;
}

function isFiltersChanged<T>(state: TableState<T>, filters: TableStateFilters): boolean {
  if (Object.keys(filters).length !== Object.keys(state.filters).length) {
    return true;
  }
  return Object.keys(filters).some(columnKey => filters[columnKey] !== state.filters[columnKey]);
}

class Table<T> extends React.Component<InternalTableProps<T>, TableState<T>> {
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

  static getDerivedStateFromProps(nextProps: InternalTableProps<any>, prevState: TableState<any>) {
    const { prevProps } = prevState;
    const columns =
      nextProps.columns || normalizeColumns(nextProps.children as React.ReactChildren);

    let nextState: TableState<any> = {
      ...prevState,
      prevProps: nextProps,
      columns,
    };

    if ('pagination' in nextProps || 'pagination' in prevProps) {
      const newPagination = {
        ...defaultPagination,
        ...prevState.pagination,
        ...nextProps.pagination,
      };
      newPagination.current = newPagination.current || 1;
      newPagination.pageSize = newPagination.pageSize || 10;

      nextState = {
        ...nextState,
        pagination: nextProps.pagination !== false ? newPagination : emptyObject,
      };
    }

    if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
      nextProps.store.setState({
        selectedRowKeys: nextProps.rowSelection.selectedRowKeys || [],
      });
    } else if (prevProps.rowSelection && !nextProps.rowSelection) {
      nextProps.store.setState({
        selectedRowKeys: [],
      });
    }
    if ('dataSource' in nextProps && nextProps.dataSource !== prevProps.dataSource) {
      nextProps.store.setState({
        selectionDirty: false,
      });
    }
    // https://github.com/ant-design/ant-design/issues/10133
    nextProps.setCheckboxPropsCache({});

    // Update filters
    const filteredValueColumns = getFilteredValueColumns(nextState, nextState.columns);
    if (filteredValueColumns.length > 0) {
      const filtersFromColumns = getFiltersFromColumns(nextState, nextState.columns);
      const newFilters = { ...nextState.filters };
      Object.keys(filtersFromColumns).forEach(key => {
        newFilters[key] = filtersFromColumns[key];
      });
      if (isFiltersChanged(nextState, newFilters)) {
        nextState = {
          ...nextState,
          filters: newFilters,
        };
      }
    }

    if (!isTheSameComponents(nextProps.components, prevProps.components)) {
      const components = createComponents(nextProps.components);

      nextState = {
        ...nextState,
        components,
      };
    }

    return nextState;
  }

  row: React.ComponentType<any>;

  rcTable: any;

  constructor(props: InternalTableProps<T>) {
    super(props);

    const { expandedRowRender, columns: columnsProp = [] } = props;

    warning(
      !('columnsPageRange' in props || 'columnsPageSize' in props),
      'Table',
      '`columnsPageRange` and `columnsPageSize` are removed, please use ' +
        'fixed columns instead, see: https://u.ant.design/fixed-columns.',
    );

    if (expandedRowRender && columnsProp.some(({ fixed }) => !!fixed)) {
      warning(
        false,
        'Table',
        '`expandedRowRender` and `Column.fixed` are not compatible. Please use one of them at one time.',
      );
    }

    const columns = columnsProp || normalizeColumns(props.children as React.ReactChildren);

    this.state = {
      ...this.getDefaultSortOrder(columns),
      // 减少状态
      filters: getFiltersFromColumns<T>(),
      pagination: this.getDefaultPagination(props),
      pivot: undefined,
      prevProps: props,
      components: createComponents(props.components),
      columns,
    };
  }

  componentDidUpdate() {
    const { columns, sortColumn, sortOrder } = this.state;
    if (this.getSortOrderColumns(columns).length > 0) {
      const sortState = this.getSortStateFromColumns(columns);
      if (sortState.sortColumn !== sortColumn || sortState.sortOrder !== sortOrder) {
        this.setState(sortState);
      }
    }
  }

  setTableRef = (table: any) => {
    this.rcTable = table;
  };

  getCheckboxPropsByItem = (item: T, index: number) => {
    const rowSelection = getRowSelection(this.props);
    if (!rowSelection.getCheckboxProps) {
      return {};
    }
    const key = this.getRecordKey(item, index);
    // Cache checkboxProps
    if (!this.props.checkboxPropsCache[key]) {
      this.props.checkboxPropsCache[key] = rowSelection.getCheckboxProps(item) || {};
      const checkboxProps = this.props.checkboxPropsCache[key];
      warning(
        !('checked' in checkboxProps) && !('defaultChecked' in checkboxProps),
        'Table',
        'Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.',
      );
    }
    return this.props.checkboxPropsCache[key];
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
      columns || (this.state || {}).columns || [],
      (column: ColumnProps<T>) => 'sortOrder' in column,
    );
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
      data = data.slice((current - 1) * pageSize, current * pageSize);
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
      store: this.props.store,
      rowKey: this.getRecordKey(record, index),
    };
  };

  setSelectedRowKeys(selectedRowKeys: string[], selectionInfo: SelectionInfo<T>) {
    const { selectWay, record, checked, changeRowKeys, nativeEvent } = selectionInfo;
    const rowSelection = getRowSelection(this.props);
    if (rowSelection && !('selectedRowKeys' in rowSelection)) {
      this.props.store.setState({ selectedRowKeys });
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
    const table = this.rcTable;
    if (getPopupContainer) {
      return getPopupContainer;
    }
    // Use undefined to let rc component use default logic.
    return scroll && table ? () => table.tableNode : undefined;
  };

  scrollToFirstRow = () => {
    const { scroll } = this.props;
    if (scroll && scroll.scrollToFirstRowOnChange !== false) {
      scrollTo(0, {
        getContainer: () => this.rcTable.bodyTable,
      });
    }
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
    treeMap(this.state.columns, c => {
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
    getFilteredValueColumns<T>(this.state).forEach((col: ColumnProps<T>) => {
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
      this.scrollToFirstRow();
      this.props.store.setState({
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
    const defaultSelection = this.props.store.getState().selectionDirty
      ? []
      : this.getDefaultSelection();
    let selectedRowKeys = this.props.store.getState().selectedRowKeys.concat(defaultSelection);
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
      this.props.store.setState({
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
      this.props.store.setState({
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
    this.props.store.setState({
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
    const defaultSelection = this.props.store.getState().selectionDirty
      ? []
      : this.getDefaultSelection();
    const selectedRowKeys = this.props.store.getState().selectedRowKeys.concat(defaultSelection);
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

    this.props.store.setState({
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
    this.setState(newState, () => this.scrollToFirstRow());

    this.props.store.setState({
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
      this.setState(newState, () => this.scrollToFirstRow());
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange.apply(
        null,
        this.prepareParamsArguments(
          {
            ...this.state,
            ...newState,
          },
          column,
        ),
      );
    }
  }

  hasPagination(props?: any) {
    return (props || this.props).pagination !== false;
  }

  isSortColumn(column: ColumnProps<T>) {
    const { sortColumn } = this.state;
    if (!column || !sortColumn) {
      return false;
    }
    return getColumnKey(sortColumn) === getColumnKey(column);
  }

  // Get pagination, filters, sorter
  prepareParamsArguments(state: any, column?: ColumnProps<T>): PrepareParamsArgumentsReturn<T> {
    const pagination = { ...state.pagination };
    // remove useless handle function in Table.onChange
    delete pagination.onChange;
    delete pagination.onShowSizeChange;
    const filters = state.filters;
    const sorter: any = {};
    let currentColumn = column;
    if (state.sortColumn && state.sortOrder) {
      currentColumn = state.sortColumn;
      sorter.column = state.sortColumn;
      sorter.order = state.sortOrder;
    }

    if (currentColumn) {
      sorter.field = currentColumn.dataIndex;
      sorter.columnKey = getColumnKey(currentColumn);
    }

    const extra = {
      currentDataSource: this.getLocalData(state),
    };

    return [pagination, filters, sorter, extra];
  }

  findColumn(myKey: string | number) {
    let column;
    treeMap(this.state.columns, c => {
      if (getColumnKey(c) === myKey) {
        column = c;
      }
    });
    return column;
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
            store={this.props.store}
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
    const columns = this.state.columns.concat();
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
            store={this.props.store}
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
    const { filters, sortOrder, sortColumn } = this.state;
    // https://github.com/ant-design/ant-design/issues/11246#issuecomment-405009167
    if (title instanceof Function) {
      return title({
        filters,
        sortOrder,
        sortColumn,
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

    const classString = classNames(`${prefixCls}-${this.props.size}`, {
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
        ref={this.setTableRef}
        key="table"
        expandIcon={this.renderExpandIcon(prefixCls)}
        {...restProps}
        onRow={(record: T, index: number) => this.onRow(prefixCls, record, index)}
        components={this.state.components}
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

polyfill(Table);

class StoreTable<T> extends React.Component<TableProps<T>> {
  static displayName = 'withStore(Table)';

  static Column = Column;

  static ColumnGroup = ColumnGroup;

  store: Store;

  CheckboxPropsCache: CheckboxPropsCache;

  constructor(props: TableProps<T>) {
    super(props);

    this.CheckboxPropsCache = {};

    this.store = createStore({
      selectedRowKeys: getRowSelection(props).selectedRowKeys || [],
      selectionDirty: false,
    });
  }

  setCheckboxPropsCache = (cache: CheckboxPropsCache) => (this.CheckboxPropsCache = cache);

  render() {
    return (
      <Table<T>
        {...this.props}
        store={this.store}
        checkboxPropsCache={this.CheckboxPropsCache}
        setCheckboxPropsCache={this.setCheckboxPropsCache}
      />
    );
  }
}

export default StoreTable;
