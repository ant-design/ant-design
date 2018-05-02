import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RcTable from 'rc-table';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from '../pagination';
import Icon from '../icon';
import Spin from '../spin';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import warning from '../_util/warning';
import FilterDropdown from './filterDropdown';
import createStore, { Store } from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import createBodyRow from './createBodyRow';
import { flatArray, treeMap, flatFilter, normalizeColumns } from './util';
import { SpinProps } from '../spin';
import {
  TableProps,
  TableState,
  TableComponents,
  RowSelectionType,
  TableLocale,
  ColumnProps,
  CompareFn,
  TableStateFilters,
  SelectionItemSelectFn,
  TablePaginationConfig,
} from './interface';
import { RadioChangeEvent } from '../radio';
import { CheckboxChangeEvent } from '../checkbox';

function noop() {
}

function stopPropagation(e: React.SyntheticEvent<any>) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
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
    size: PropTypes.string,
    loading: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    bordered: PropTypes.bool,
    onChange: PropTypes.func,
    locale: PropTypes.object,
    dropdownPrefixCls: PropTypes.string,
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'ant-table',
    useFixedHeader: false,
    rowSelection: null,
    className: '',
    size: 'large',
    loading: false,
    bordered: false,
    indentSize: 20,
    locale: {},
    rowKey: 'key',
    showHeader: true,
  };

  CheckboxPropsCache: {
    [key: string]: any;
  };
  store: Store;
  columns: ColumnProps<T>[];
  components: TableComponents;

  constructor(props: TableProps<T>) {
    super(props);

    warning(
      !('columnsPageRange' in props || 'columnsPageSize' in props),
      '`columnsPageRange` and `columnsPageSize` are removed, please use ' +
      'fixed columns instead, see: https://u.ant.design/fixed-columns.',
    );

    this.columns = props.columns || normalizeColumns(props.children as React.ReactChildren);

    this.createComponents(props.components);

    this.state = {
      ...this.getDefaultSortOrder(this.columns),
      // 减少状态
      filters: this.getFiltersFromColumns(),
      pagination: this.getDefaultPagination(props),
    };

    this.CheckboxPropsCache = {};

    this.store = createStore({
      selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
      selectionDirty: false,
    });
  }

  getCheckboxPropsByItem = (item: T, index: number) => {
    const { rowSelection = {} } = this.props;
    if (!rowSelection.getCheckboxProps) {
      return {};
    }
    const key = this.getRecordKey(item, index);
    // Cache checkboxProps
    if (!this.CheckboxPropsCache[key]) {
      this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
    }
    return this.CheckboxPropsCache[key];
  }

  getDefaultSelection() {
    const { rowSelection = {} } = this.props;
    if (!rowSelection.getCheckboxProps) {
      return [];
    }
    return this.getFlatData()
      .filter((item: T, rowIndex) => this.getCheckboxPropsByItem(item, rowIndex).defaultChecked)
      .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
  }

  getDefaultPagination(props: TableProps<T>) {
    const pagination: TablePaginationConfig = props.pagination || {};
    return this.hasPagination(props) ?
      {
        ...defaultPagination,
        ...pagination,
        current: pagination.defaultCurrent || pagination.current || 1,
        pageSize: pagination.defaultPageSize || pagination.pageSize || 10,
      } : {};
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
    if (nextProps.rowSelection &&
        'selectedRowKeys' in nextProps.rowSelection) {
      this.store.setState({
        selectedRowKeys: nextProps.rowSelection.selectedRowKeys || [],
      });
    }
    if ('dataSource' in nextProps &&
        nextProps.dataSource !== this.props.dataSource) {
      this.store.setState({
        selectionDirty: false,
      });
    }

    // https://github.com/ant-design/ant-design/issues/10133
    this.CheckboxPropsCache = {};

    if (this.getSortOrderColumns(this.columns).length > 0) {
      const sortState = this.getSortStateFromColumns(this.columns);
      if (sortState.sortColumn !== this.state.sortColumn ||
          sortState.sortOrder !== this.state.sortOrder) {
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

  onRow = (record: T, index: number) => {
    const { onRow, prefixCls } = this.props;
    const custom = onRow ? onRow(record, index) : {};
    return {
      ...custom,
      prefixCls,
      store: this.store,
      rowKey: this.getRecordKey(record, index),
    };
  }

  setSelectedRowKeys(selectedRowKeys: string[], { selectWay, record, checked, changeRowKeys, nativeEvent }: any) {
    const { rowSelection = {} as any } = this.props;
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
      rowSelection.onSelect(record, checked, selectedRows, nativeEvent);
    } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
      const changeRows = data.filter(
        (row, i) => changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0,
      );
      rowSelection.onSelectAll(checked, selectedRows, changeRows);
    } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
      rowSelection.onSelectInvert(selectedRowKeys);
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
    let filters: any = {};
    this.getFilteredValueColumns(columns).forEach((col: ColumnProps<T>) => {
      const colKey = this.getColumnKey(col) as string;
      filters[colKey] = col.filteredValue;
    });
    return filters;
  }

  getDefaultSortOrder(columns?: ColumnProps<T>[]) {
    const definedSortState = this.getSortStateFromColumns(columns);

    let defaultSortedColumn = flatFilter(columns || [], (column: ColumnProps<T>) => column.defaultSortOrder != null)[0];

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
    const sortedColumn =
      this.getSortOrderColumns(columns).filter((col: ColumnProps<T>) => col.sortOrder)[0];

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

  getSorterFn() {
    const { sortOrder, sortColumn } = this.state;
    if (!sortOrder || !sortColumn ||
        typeof sortColumn.sorter !== 'function') {
      return;
    }

    return (a: T, b: T) => {
      const result = (sortColumn!.sorter as CompareFn<T>)(a, b);
      if (result !== 0) {
        return (sortOrder === 'descend') ? -result : result;
      }
      return 0;
    };
  }

  toggleSortOrder(order: string, column: ColumnProps<T>) {
    let { sortColumn, sortOrder } = this.state;
    // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
    let isSortColumn = this.isSortColumn(column);
    if (!isSortColumn) {  // 当前列未排序
      sortOrder = order;
      sortColumn = column;
    } else {                      // 当前列已排序
      if (sortOrder === order) {  // 切换为未排序状态
        sortOrder = '';
        sortColumn = null;
      } else {                    // 切换为排序状态
        sortOrder = order;
      }
    }
    const newState = {
      sortOrder,
      sortColumn,
    };

    // Controlled
    if (this.getSortOrderColumns().length === 0) {
      this.setState(newState);
    }

    const onChange = this.props.onChange;
    if (onChange) {
      onChange.apply(null, this.prepareParamsArguments({
        ...this.state,
        ...newState,
      }));
    }
  }

  handleFilter = (column: ColumnProps<T>, nextFilters: string[]) => {
    const props = this.props;
    let pagination = { ...this.state.pagination };
    const filters = {
      ...this.state.filters,
      [this.getColumnKey(column) as string]: nextFilters,
    };
    // Remove filters not in current columns
    const currentColumnKeys: string[] = [];
    treeMap(this.columns, c => {
      if (!c.children) {
        currentColumnKeys.push(this.getColumnKey(c) as string);
      }
    });
    Object.keys(filters).forEach((columnKey) => {
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
      const columnKey = this.getColumnKey(col);
      if (columnKey) {
        delete filtersToSetState[columnKey];
      }
    });
    if (Object.keys(filtersToSetState).length > 0) {
      newState.filters = filtersToSetState;
    }

    // Controlled current prop will not respond user interaction
    if (typeof props.pagination === 'object' && 'current' in (props.pagination as Object)) {
      newState.pagination = {
        ...pagination,
        current: this.state.pagination.current,
      };
    }

    this.setState(newState, () => {
      this.store.setState({
        selectionDirty: false,
      });
      const onChange = this.props.onChange;
      if (onChange) {
        onChange.apply(null, this.prepareParamsArguments({
          ...this.state,
          selectionDirty: false,
          filters,
          pagination,
        }));
      }
    });
  }

  handleSelect = (record: T, rowIndex: number, e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const nativeEvent = e.nativeEvent;
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i: string) => key !== i);
    }
    this.store.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys, {
      selectWay: 'onSelect',
      record,
      checked,
      changeRowKeys: void(0),
      nativeEvent,
    });
  }

  handleRadioSelect = (record: T, rowIndex: number, e: RadioChangeEvent) => {
    const checked = e.target.checked;
    const nativeEvent = e.nativeEvent;
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    selectedRowKeys = [key];
    this.store.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys, {
      selectWay: 'onSelect',
      record,
      checked,
      changeRowKeys: void(0),
      nativeEvent,
    });
  }

  handleSelectRow = (selectionKey: string, index: number, onSelectFunc: SelectionItemSelectFn) => {
    const data = this.getFlatCurrentPageData();
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    const selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    const changeableRowKeys = data
      .filter((item, i) => !this.getCheckboxPropsByItem(item, i).disabled)
      .map((item, i) => this.getRecordKey(item, i));

    let changeRowKeys: string[] = [];
    let selectWay = '';
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
      selectWay: selectWay,
      checked,
      changeRowKeys,
    });
  }

  handlePageChange = (current: number, ...otherArguments: any[]) => {
    const props = this.props;
    let pagination = { ...this.state.pagination };
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
    if (props.pagination &&
        typeof props.pagination === 'object' &&
        'current' in (props.pagination as Object)) {
      newState.pagination = {
        ...pagination,
        current: this.state.pagination.current,
      };
    }
    this.setState(newState);

    this.store.setState({
      selectionDirty: false,
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange.apply(null, this.prepareParamsArguments({
        ...this.state,
        selectionDirty: false,
        pagination,
      }));
    }
  }

  renderSelectionBox = (type: RowSelectionType | undefined) => {
    return (_: any, record: T, index: number) => {
      let rowIndex = this.getRecordKey(record, index); // 从 1 开始
      const props = this.getCheckboxPropsByItem(record, index);
      const handleChange = (e: RadioChangeEvent | CheckboxChangeEvent) => {
        type === 'radio' ? this.handleRadioSelect(record, rowIndex, e) :
                           this.handleSelect(record, rowIndex, e);
      };

      return (
        <span onClick={stopPropagation}>
          <SelectionBox
            type={type}
            store={this.store}
            rowIndex={rowIndex}
            onChange={handleChange}
            defaultSelection={this.getDefaultSelection()}
            {...props}
          />
        </span>
      );
    };
  }

  getRecordKey = (record: T, index: number) => {
    const rowKey = this.props.rowKey;
    const recordKey = (typeof rowKey === 'function') ?
      rowKey(record, index) :  (record as any)[rowKey as string];
    warning(recordKey !== undefined,
      'Each record in dataSource of table should have a unique `key` prop, or set `rowKey` to an unique primary key,' +
      'see https://u.ant.design/table-row-key',
    );
    return recordKey === undefined ? index : recordKey;
  }

  getPopupContainer = () => {
    return ReactDOM.findDOMNode(this) as HTMLElement;
  }

  renderRowSelection(locale: TableLocale) {
    const { prefixCls, rowSelection } = this.props;
    const columns = this.columns.concat();
    if (rowSelection) {
      const data = this.getFlatCurrentPageData().filter((item, index) => {
        if (rowSelection.getCheckboxProps) {
          return !this.getCheckboxPropsByItem(item, index).disabled;
        }
        return true;
      });
      let selectionColumnClass = classNames(`${prefixCls}-selection-column`, {
        [`${prefixCls}-selection-column-custom`]: rowSelection.selections,
      });
      const selectionColumn: ColumnProps<any> = {
        key: 'selection-column',
        render: this.renderSelectionBox(rowSelection.type),
        className: selectionColumnClass,
        fixed: rowSelection.fixed,
        width: rowSelection.columnWidth,
      };
      if (rowSelection.type !== 'radio') {
        const checkboxAllDisabled = data.every((item, index) => this.getCheckboxPropsByItem(item, index).disabled);
        selectionColumn.title  = (
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
            getPopupContainer={this.getPopupContainer}
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

  getColumnKey(column: ColumnProps<T>, index?: number) {
    return column.key || column.dataIndex || index;
  }

  getMaxCurrent(total: number) {
    const { current, pageSize } = this.state.pagination;
    if ((current! - 1) * pageSize! >= total) {
      return Math.floor((total - 1) / pageSize!) + 1;
    }
    return current;
  }

  isSortColumn(column: ColumnProps<T>) {
    const { sortColumn } = this.state;
    if (!column || !sortColumn) {
      return false;
    }
    return this.getColumnKey(sortColumn) === this.getColumnKey(column);
  }

  renderColumnsDropdown(columns: ColumnProps<T>[], locale: TableLocale) {
    const { prefixCls, dropdownPrefixCls } = this.props;
    const { sortOrder } = this.state;
    return treeMap(columns, (originColumn, i) => {
      let column = { ...originColumn };
      let key = this.getColumnKey(column, i) as string;
      let filterDropdown;
      let sortButton;
      if ((column.filters && column.filters.length > 0) || column.filterDropdown) {
        let colFilters = this.state.filters[key] || [];
        filterDropdown = (
          <FilterDropdown
            locale={locale}
            column={column}
            selectedKeys={colFilters}
            confirmFilter={this.handleFilter}
            prefixCls={`${prefixCls}-filter`}
            dropdownPrefixCls={dropdownPrefixCls || 'ant-dropdown'}
            getPopupContainer={this.getPopupContainer}
          />
        );
      }
      if (column.sorter) {
        let isSortColumn = this.isSortColumn(column);
        if (isSortColumn) {
          column.className = classNames(column.className, {
            [`${prefixCls}-column-sort`]: sortOrder,
          });
        }
        const isAscend = isSortColumn && sortOrder === 'ascend';
        const isDescend = isSortColumn && sortOrder === 'descend';
        sortButton = (
          <div className={`${prefixCls}-column-sorter`}>
            <span
              className={`${prefixCls}-column-sorter-up ${isAscend ? 'on' : 'off'}`}
              title="↑"
              onClick={() => this.toggleSortOrder('ascend', column)}
            >
              <Icon type="caret-up" />
            </span>
            <span
              className={`${prefixCls}-column-sorter-down ${isDescend ? 'on' : 'off'}`}
              title="↓"
              onClick={() => this.toggleSortOrder('descend', column)}
            >
              <Icon type="caret-down" />
            </span>
          </div>
        );
      }
      column.title = (
        <span key={key}>
          {column.title}
          {sortButton}
          {filterDropdown}
        </span>
      );

      if (sortButton || filterDropdown) {
        column.className = classNames(`${prefixCls}-column-has-filters`, column.className);
      }

      return column;
    });
  }

  handleShowSizeChange = (current: number, pageSize: number) => {
    const pagination = this.state.pagination;
    pagination.onShowSizeChange!(current, pageSize);
    const nextPagination = {
      ...pagination,
      pageSize,
      current,
    };
    this.setState({ pagination: nextPagination });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange.apply(null, this.prepareParamsArguments({
        ...this.state,
        pagination: nextPagination,
      }));
    }
  }

  renderPagination(paginationPosition: string) {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let size = 'default';
    const { pagination } = this.state;
    if (pagination.size) {
      size = pagination.size;
    } else if (this.props.size as string === 'middle' || this.props.size === 'small') {
      size = 'small';
    }
    let position = pagination.position || 'bottom';
    let total = pagination.total || this.getLocalData().length;
    return (total > 0 && (position === paginationPosition || position === 'both')) ? (
      <Pagination
        key={`pagination-${paginationPosition}`}
        {...pagination}
        className={classNames(pagination.className, `${this.props.prefixCls}-pagination`)}
        onChange={this.handlePageChange}
        total={total}
        size={size}
        current={this.getMaxCurrent(total)}
        onShowSizeChange={this.handleShowSizeChange}
      />
    ) : null;
  }

  // Get pagination, filters, sorter
  prepareParamsArguments(state: any): [any, string[], Object] {
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
      sorter.columnKey = this.getColumnKey(state.sortColumn);
    }
    return [pagination, filters, sorter];
  }

  findColumn(myKey: string | number) {
    let column;
    treeMap(this.columns, c => {
      if (this.getColumnKey(c) === myKey) {
        column = c;
      }
    });
    return column;
  }

  getCurrentPageData() {
    let data = this.getLocalData();
    let current: number;
    let pageSize: number;
    let state = this.state;
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
    return flatArray(this.getLocalData());
  }

  getFlatCurrentPageData() {
    return flatArray(this.getCurrentPageData());
  }

  recursiveSort(data: T[], sorterFn: (a: any, b: any) => number): T[] {
    const { childrenColumnName = 'children' } = this.props;
    return data.sort(sorterFn).map((item: any) => (item[childrenColumnName] ? {
      ...item,
      [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn),
    } : item));
  }

  getLocalData() {
    const state = this.state;
    const { dataSource } = this.props;
    let data = dataSource || [];
    // 优化本地排序
    data = data.slice(0);
    const sorterFn = this.getSorterFn();
    if (sorterFn) {
      data = this.recursiveSort(data, sorterFn);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach((columnKey) => {
        let col = this.findColumn(columnKey) as any;
        if (!col) {
          return;
        }
        let values = state.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        const onFilter = col.onFilter;
        data = onFilter ? data.filter(record => {
          return values.some(v => onFilter(v, record));
        }) : data;
      });
    }
    return data;
  }

  createComponents(components: TableComponents = {}, prevComponents?: TableComponents) {
    const bodyRow = components && components.body && components.body.row;
    const preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;
    if (!this.components || bodyRow !== preBodyRow) {
      this.components = { ...components };
      this.components.body = {
        ...components.body,
        row: createBodyRow(bodyRow),
      };
    }
  }

  renderTable = (contextLocale: TableLocale, loading: SpinProps) => {
    const locale = { ...contextLocale, ...this.props.locale };
    const { style, className, prefixCls, showHeader, ...restProps } = this.props;
    const data = this.getCurrentPageData();
    const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;

    const classString = classNames({
      [`${prefixCls}-${this.props.size}`]: true,
      [`${prefixCls}-bordered`]: this.props.bordered,
      [`${prefixCls}-empty`]: !data.length,
      [`${prefixCls}-without-column-header`]: !showHeader,
    });

    let columns = this.renderRowSelection(locale);
    columns = this.renderColumnsDropdown(columns, locale);
    columns = columns.map((column, i) => {
      const newColumn = { ...column };
      newColumn.key = this.getColumnKey(newColumn, i);
      return newColumn;
    });
    let expandIconColumnIndex = (columns[0] && columns[0].key === 'selection-column') ? 1 : 0;
    if ('expandIconColumnIndex' in restProps) {
      expandIconColumnIndex = restProps.expandIconColumnIndex as number;
    }

    return (
      <RcTable
        key="table"
        {...restProps}
        onRow={this.onRow}
        components={this.components}
        prefixCls={prefixCls}
        data={data}
        columns={columns}
        showHeader={showHeader}
        className={classString}
        expandIconColumnIndex={expandIconColumnIndex}
        expandIconAsCell={expandIconAsCell}
        emptyText={!loading.spinning && locale.emptyText}
      />
    );
  }

  render() {
    const { style, className, prefixCls } = this.props;
    const data = this.getCurrentPageData();

    let loading = this.props.loading as SpinProps;
    if (typeof loading === 'boolean') {
      loading = {
        spinning: loading,
      };
    }

    const table = (
      <LocaleReceiver
        componentName="Table"
        defaultLocale={defaultLocale.Table}
      >
        {(locale) => this.renderTable(locale, loading)}
      </LocaleReceiver>
    );

    // if there is no pagination or no data,
    // the height of spin should decrease by half of pagination
    const paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
      ? `${prefixCls}-with-pagination` : `${prefixCls}-without-pagination`;

    return (
      <div
        className={classNames(`${prefixCls}-wrapper`, className)}
        style={style}
      >
        <Spin
          {...loading}
          className={loading.spinning ? `${paginationPatchClass} ${prefixCls}-spin-holder` : ''}
        >
          {this.renderPagination('top')}
          {table}
          {this.renderPagination('bottom')}
        </Spin>
      </div>
    );
  }
}
