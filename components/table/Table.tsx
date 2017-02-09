import React from 'react';
import RcTable from 'rc-table';
import FilterDropdown from './filterDropdown';
import Pagination, { PaginationProps } from '../pagination';
import Icon from '../icon';
import Spin from '../spin';
import classNames from 'classnames';
import { flatArray, treeMap, normalizeColumns } from './util';
import assign from 'object-assign';
import warning from '../_util/warning';
import createStore, { Store } from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Column, { ColumnProps } from './Column';
import ColumnGroup from './ColumnGroup';

function noop() {
}

function stopPropagation(e) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

const defaultLocale = {
  filterTitle: '筛选',
  filterConfirm: '确定',
  filterReset: '重置',
  emptyText: <span><Icon type="frown-o" />暂无数据</span>,
};

const defaultPagination = {
  onChange: noop,
  onShowSizeChange: noop,
};

export type TableColumnConfig<T> = ColumnProps<T>;

export interface TableRowSelection<T> {
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: string[];
  onChange?: (selectedRowKeys: string[], selectedRows: Object[]) => any;
  getCheckboxProps?: (record: T) => Object;
  onSelect?: (record: T, selected: boolean, selectedRows: Object[]) => any;
  onSelectAll?: (selected: boolean, selectedRows: Object[], changeRows: Object[]) => any;
}

export interface TableProps<T> {
  prefixCls?: string;
  dropdownPrefixCls?: string;
  rowSelection?: TableRowSelection<T>;
  pagination?: PaginationProps | boolean;
  size?: 'default' | 'middle' | 'small';
  dataSource?: T[];
  columns?: ColumnProps<T>[];
  rowKey?: string | ((record: T, index: number) => string);
  rowClassName?: (record: T, index: number) => string;
  expandedRowRender?: any;
  defaultExpandedRowKeys?: string[];
  expandedRowKeys?: string[];
  expandIconAsCell?: boolean;
  expandIconColumnIndex?: number;
  onChange?: (pagination: PaginationProps | boolean, filters: string[], sorter: Object) => any;
  loading?: boolean;
  locale?: Object;
  indentSize?: number;
  onRowClick?: (record: T, index: number) => any;
  useFixedHeader?: boolean;
  bordered?: boolean;
  showHeader?: boolean;
  footer?: (currentPageData: Object[]) => React.ReactNode;
  title?: (currentPageData: Object[]) => React.ReactNode;
  scroll?: { x?: boolean | number, y?: boolean | number};
  childrenColumnName?: string;
  bodyStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}

export interface TableContext {
  antLocale?: {
    Table?: any,
  };
}

export default class Table<T> extends React.Component<TableProps<T>, any> {
  static Column = Column;
  static ColumnGroup = ColumnGroup;

  static propTypes = {
    dataSource: React.PropTypes.array,
    columns: React.PropTypes.array,
    prefixCls: React.PropTypes.string,
    useFixedHeader: React.PropTypes.bool,
    rowSelection: React.PropTypes.object,
    className: React.PropTypes.string,
    size: React.PropTypes.string,
    loading: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    locale: React.PropTypes.object,
    dropdownPrefixCls: React.PropTypes.string,
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

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: TableContext;
  CheckboxPropsCache: Object;
  store: Store;
  columns: ColumnProps<T>[];

  constructor(props) {
    super(props);

    warning(
      !('columnsPageRange' in props || 'columnsPageSize' in props),
      '`columnsPageRange` and `columnsPageSize` are removed, please use ' +
      'fixed columns instead, see: http://u.ant.design/fixed-columns.'
    );

    this.columns = props.columns || normalizeColumns(props.children);

    this.state = assign({}, this.getSortStateFromColumns(), {
      // 减少状态
      filters: this.getFiltersFromColumns(),
      pagination: this.getDefaultPagination(props),
    });

    this.CheckboxPropsCache = {};

    this.store = createStore({
      selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
      selectionDirty: false,
    });
  }

  getCheckboxPropsByItem = (item, index) => {
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
      .filter((item, rowIndex) => this.getCheckboxPropsByItem(item, rowIndex).defaultChecked)
      .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
  }

  getDefaultPagination(props) {
    const pagination = props.pagination || {};
    return this.hasPagination(props) ?
      assign({},  defaultPagination, pagination, {
        current: pagination.defaultCurrent || pagination.current || 1,
        pageSize: pagination.defaultPageSize || pagination.pageSize || 10,
      }) : {};
  }

  getLocale() {
    let locale = {};
    if (this.context.antLocale && this.context.antLocale.Table) {
      locale = this.context.antLocale.Table;
    }
    return assign({}, defaultLocale, locale, this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    this.columns = nextProps.columns || normalizeColumns(nextProps.children);
    if ('pagination' in nextProps || 'pagination' in this.props) {
      this.setState(previousState => {
        const newPagination = assign({}, defaultPagination, previousState.pagination, nextProps.pagination);
        newPagination.current = newPagination.current || 1;
        newPagination.pageSize = newPagination.pageSize || 10;
        return { pagination: nextProps.pagination !== false ? newPagination : {} };
      });
    }
    if (nextProps.rowSelection &&
        'selectedRowKeys' in nextProps.rowSelection) {
      this.store.setState({
        selectedRowKeys: nextProps.rowSelection.selectedRowKeys || [],
      });
      const { rowSelection } = this.props;
      if (rowSelection && (
        nextProps.rowSelection.getCheckboxProps !== rowSelection.getCheckboxProps
      )) {
        this.CheckboxPropsCache = {};
      }
    }
    if ('dataSource' in nextProps &&
        nextProps.dataSource !== this.props.dataSource) {
      this.store.setState({
        selectionDirty: false,
      });
      this.CheckboxPropsCache = {};
    }

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
      const newFilters = assign({}, this.state.filters);
      Object.keys(filtersFromColumns).forEach(key => {
        newFilters[key] = filtersFromColumns[key];
      });
      if (this.isFiltersChanged(newFilters)) {
        this.setState({ filters: newFilters });
      }
    }
  }

  setSelectedRowKeys(selectedRowKeys, { selectWay, record, checked, changeRowKeys }: any) {
    const { rowSelection = {} } = this.props;
    if (rowSelection && !('selectedRowKeys' in rowSelection)) {
      this.store.setState({ selectedRowKeys });
    }
    const data = this.getFlatData();
    if (!rowSelection.onChange && !rowSelection[selectWay]) {
      return;
    }
    const selectedRows = data.filter(
      (row, i) => selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0
    );
    if (rowSelection.onChange) {
      rowSelection.onChange(selectedRowKeys, selectedRows);
    }
    if (selectWay === 'onSelect' && rowSelection.onSelect) {
      rowSelection.onSelect(record, checked, selectedRows);
    } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
      const changeRows = data.filter(
        (row, i) => changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0
      );
      rowSelection.onSelectAll(checked, selectedRows, changeRows);
    }
  }

  hasPagination(props?: any) {
    return (props || this.props).pagination !== false;
  }

  isFiltersChanged(filters) {
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

  getSortOrderColumns(columns?) {
    return (columns || this.columns || []).filter(column => 'sortOrder' in column);
  }

  getFilteredValueColumns(columns?) {
    return (columns || this.columns || []).filter(column => typeof column.filteredValue !== 'undefined');
  }

  getFiltersFromColumns(columns?) {
    let filters = {};
    this.getFilteredValueColumns(columns).forEach(col => {
      filters[this.getColumnKey(col)] = col.filteredValue;
    });
    return filters;
  }

  getSortStateFromColumns(columns?) {
    // return fisrt column which sortOrder is not falsy
    const sortedColumn =
      this.getSortOrderColumns(columns).filter(col => col.sortOrder)[0];
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
    return (a, b) => {
      const result = sortColumn.sorter(a, b);
      if (result !== 0) {
        return (sortOrder === 'descend') ? -result : result;
      }
      return 0;
    };
  }

  toggleSortOrder(order, column) {
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
      onChange.apply(null, this.prepareParamsArguments(assign({}, this.state, newState)));
    }
  }

  handleFilter = (column, nextFilters) => {
    const props = this.props;
    let pagination = assign({}, this.state.pagination);
    const filters = assign({}, this.state.filters, {
      [this.getColumnKey(column)]: nextFilters,
    });
    // Remove filters not in current columns
    const currentColumnKeys: string[] = [];
    treeMap(this.columns, c => {
      if (!c.children) {
        currentColumnKeys.push(this.getColumnKey(c));
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
      pagination.onChange(pagination.current);
    }

    const newState = {
      pagination,
      filters: {},
    };
    const filtersToSetState = assign({}, filters);
    // Remove filters which is controlled
    this.getFilteredValueColumns().forEach(col => {
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
      newState.pagination = assign({}, pagination, {
        current: this.state.pagination.current,
      });
    }

    this.setState(newState, () => {
      this.store.setState({
        selectionDirty: false,
      });
      const onChange = this.props.onChange;
      if (onChange) {
        onChange.apply(null, this.prepareParamsArguments(assign({}, this.state, {
          selectionDirty: false,
          filters,
          pagination,
        })));
      }
    });
  }

  handleSelect = (record, rowIndex, e) => {
    const checked = e.target.checked;
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => key !== i);
    }
    this.store.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys, {
      selectWay: 'onSelect',
      record,
      checked,
    });
  }

  handleRadioSelect = (record, rowIndex, e) => {
    const checked = e.target.checked;
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
    });
  }

  handleSelectAllRow = (e) => {
    const checked = e.target.checked;
    const data = this.getFlatCurrentPageData();
    const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
    const selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
    const changableRowKeys = data
      .filter((item, i) => !this.getCheckboxPropsByItem(item, i).disabled)
      .map((item, i) => this.getRecordKey(item, i));

    // 记录变化的列
    const changeRowKeys: string[] = [];
    if (checked) {
      changableRowKeys.forEach(key => {
        if (selectedRowKeys.indexOf(key) < 0) {
          selectedRowKeys.push(key);
          changeRowKeys.push(key);
        }
      });
    } else {
      changableRowKeys.forEach(key => {
        if (selectedRowKeys.indexOf(key) >= 0) {
          selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
          changeRowKeys.push(key);
        }
      });
    }
    this.store.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys, {
      selectWay: 'onSelectAll',
      checked,
      changeRowKeys,
    });
  }

  handlePageChange = (current) => {
    const props = this.props;
    let pagination = assign({}, this.state.pagination);
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    pagination.onChange(pagination.current);

    const newState = {
      pagination,
    };
    // Controlled current prop will not respond user interaction
    if (typeof props.pagination === 'object' && 'current' in (props.pagination as Object)) {
      newState.pagination = assign({}, pagination, {
        current: this.state.pagination.current,
      });
    }
    this.setState(newState);

    this.store.setState({
      selectionDirty: false,
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange.apply(null, this.prepareParamsArguments(assign({}, this.state, {
        selectionDirty: false,
        pagination,
      })));
    }
  }

  renderSelectionBox = (type) => {
    return (_, record, index) => {
      let rowIndex = this.getRecordKey(record, index); // 从 1 开始
      const props = this.getCheckboxPropsByItem(record, index);
      const handleChange = (e) => {
        type === 'radio' ? this.handleRadioSelect(record, rowIndex, e) :
                           this.handleSelect(record, rowIndex, e);
      };

      return (
        <span onClick={stopPropagation}>
          <SelectionBox
            type={type}
            store={this.store}
            rowIndex={rowIndex}
            disabled={props.disabled}
            onChange={handleChange}
            defaultSelection={this.getDefaultSelection()}
          />
        </span>
      );
    };
  }

  getRecordKey = (record, index): string => {
    const rowKey = this.props.rowKey;
    const recordKey = (typeof rowKey === 'function') ?
      rowKey(record, index) :  record[rowKey as string];
    warning(recordKey !== undefined,
      'Each record in table should have a unique `key` prop, or set `rowKey` to an unique primary key,' +
      'see http://u.ant.design/table-row-key'
    );
    return recordKey === undefined ? index : recordKey;
  }

  renderRowSelection() {
    const { prefixCls, rowSelection } = this.props;
    const columns = this.columns.concat();
    if (rowSelection) {
      const data = this.getFlatCurrentPageData().filter((item, index) => {
        if (rowSelection.getCheckboxProps) {
          return !this.getCheckboxPropsByItem(item, index).disabled;
        }
        return true;
      });
      const selectionColumn: ColumnProps<any> = {
        key: 'selection-column',
        render: this.renderSelectionBox(rowSelection.type),
        className: `${prefixCls}-selection-column`,
      };
      if (rowSelection.type !== 'radio') {
        const checkboxAllDisabled = data.every((item, index) => this.getCheckboxPropsByItem(item, index).disabled);
        selectionColumn.title  = (
          <SelectionCheckboxAll
            store={this.store}
            data={data}
            getCheckboxPropsByItem={this.getCheckboxPropsByItem}
            getRecordKey={this.getRecordKey}
            disabled={checkboxAllDisabled}
            onChange={this.handleSelectAllRow}
          />
        );
      }
      if (columns.some(column => column.fixed === 'left' || column.fixed === true)) {
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

  getColumnKey(column, index?) {
    return column.key || column.dataIndex || index;
  }

  getMaxCurrent(total) {
    const { current, pageSize } = this.state.pagination;
    if ((current - 1) * pageSize >= total) {
      return current - 1;
    }
    return current;
  }

  isSortColumn(column) {
    const { sortColumn } = this.state;
    if (!column || !sortColumn) {
      return false;
    }
    return this.getColumnKey(sortColumn) === this.getColumnKey(column);
  }

  renderColumnsDropdown(columns) {
    const { prefixCls, dropdownPrefixCls } = this.props;
    const { sortOrder } = this.state;
    const locale = this.getLocale();
    return treeMap(columns, (originColumn, i) => {
      let column = assign({}, originColumn);
      let key = this.getColumnKey(column, i);
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
          />
        );
      }
      if (column.sorter) {
        let isSortColumn = this.isSortColumn(column);
        if (isSortColumn) {
          column.className = column.className || '';
          if (sortOrder) {
            column.className += ` ${prefixCls}-column-sort`;
          }
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
        <span>
          {column.title}
          {sortButton}
          {filterDropdown}
        </span>
      );
      return column;
    });
  }

  handleShowSizeChange = (current, pageSize) => {
    const pagination = this.state.pagination;
    pagination.onShowSizeChange(current, pageSize);
    const nextPagination = assign({}, pagination, { pageSize, current });
    this.setState({ pagination: nextPagination });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange.apply(null, this.prepareParamsArguments(assign({}, this.state, {
        pagination: nextPagination,
      })));
    }
  }

  renderPagination() {
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
    let total = pagination.total || this.getLocalData().length;
    return (total > 0) ?
      <Pagination
        {...pagination}
        className={`${this.props.prefixCls}-pagination`}
        onChange={this.handlePageChange}
        total={total}
        size={size}
        current={this.getMaxCurrent(total)}
        onShowSizeChange={this.handleShowSizeChange}
      /> : null;
  }

  prepareParamsArguments(state: any): [any, string[], Object] {
    // 准备筛选、排序、分页的参数
    const pagination = state.pagination;
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

  findColumn(myKey) {
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
    let current;
    let pageSize;
    let state = this.state;
    // 如果没有分页的话，默认全部展示
    if (!this.hasPagination()) {
      pageSize = Number.MAX_VALUE;
      current = 1;
    } else {
      pageSize = state.pagination.pageSize;
      current = this.getMaxCurrent(state.pagination.total || data.length);
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

  recursiveSort(data, sorterFn) {
    const { childrenColumnName = 'children' } = this.props;
    return data.sort(sorterFn).map(item => (item[childrenColumnName] ? assign(
      {},
      item, {
        [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn),
      }
    ) : item));
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

  render() {
    const { style, className, prefixCls, showHeader, ...restProps } = this.props;
    const data = this.getCurrentPageData();
    let columns = this.renderRowSelection();
    const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
    const locale = this.getLocale();

    const classString = classNames({
      [`${prefixCls}-${this.props.size}`]: true,
      [`${prefixCls}-bordered`]: this.props.bordered,
      [`${prefixCls}-empty`]: !data.length,
      [`${prefixCls}-without-column-header`]: !showHeader,
    });

    columns = this.renderColumnsDropdown(columns);
    columns = columns.map((column, i) => {
      const newColumn = assign({}, column);
      newColumn.key = this.getColumnKey(newColumn, i);
      return newColumn;
    });

    let expandIconColumnIndex = (columns[0] && columns[0].key === 'selection-column') ? 1 : 0;
    if ('expandIconColumnIndex' in restProps) {
      expandIconColumnIndex = restProps.expandIconColumnIndex as number;
    }

    let table = (
      <RcTable
        {...restProps}
        prefixCls={prefixCls}
        data={data}
        columns={columns}
        showHeader={showHeader}
        className={classString}
        expandIconColumnIndex={expandIconColumnIndex}
        expandIconAsCell={expandIconAsCell}
        emptyText={() => locale.emptyText}
      />
    );
    // if there is no pagination or no data,
    // the height of spin should decrease by half of pagination
    const paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
            ? `${prefixCls}-with-pagination`
            : `${prefixCls}-without-pagination`;
    const spinClassName = this.props.loading ? `${paginationPatchClass} ${prefixCls}-spin-holder` : '';
    return (
      <div className={`${className} clearfix`} style={style}>
        <Spin className={spinClassName} spinning={this.props.loading}>
        {table}
        {this.renderPagination()}
        </Spin>
      </div>
    );
  }
}
