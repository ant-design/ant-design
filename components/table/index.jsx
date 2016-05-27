import React from 'react';
import RcTable from 'rc-table';
import Checkbox from '../checkbox';
import Radio from '../radio';
import FilterDropdown from './filterDropdown';
import Pagination from '../pagination';
import Icon from '../icon';
import Spin from '../spin';
import classNames from 'classnames';
import { flatArray } from './util';

function noop() {
}

function stopPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}

const defaultLocale = {
  filterTitle: '筛选',
  filterConfirm: '确定',
  filterReset: '重置',
  emptyText: <span><Icon type="frown" />暂无数据</span>,
};

const defaultPagination = {
  pageSize: 10,
  onChange: noop,
  onShowSizeChange: noop,
};

export default class Table extends React.Component {
  static propTypes = {
    dataSource: React.PropTypes.array,
    prefixCls: React.PropTypes.string,
    useFixedHeader: React.PropTypes.bool,
    rowSelection: React.PropTypes.object,
    className: React.PropTypes.string,
    size: React.PropTypes.string,
    loading: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    locale: React.PropTypes.object,
  }

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
    onChange: noop,
    locale: {},
  }

  static contextTypes = {
    antLocale: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    const pagination = props.pagination || {};

    this.state = {
      // 减少状态
      selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
      filters: this.getFiltersFromColumns(),
      selectionDirty: false,
      ...this.getSortStateFromColumns(),
      pagination: this.hasPagination() ?
        {
          ...defaultPagination,
          ...pagination,
          current: pagination.defaultCurrent || pagination.current || 1,
        } : {},
    };
  }

  getDefaultSelection() {
    if (!this.props.rowSelection || !this.props.rowSelection.getCheckboxProps) {
      return [];
    }
    return this.getFlatCurrentPageData()
      .filter(item => this.props.rowSelection.getCheckboxProps(item).defaultChecked)
      .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
  }

  getLocale() {
    let locale = {};
    if (this.context.antLocale && this.context.antLocale.Table) {
      locale = this.context.antLocale.Table;
    }
    return { ...defaultLocale, ...locale, ...this.props.locale };
  }

  componentWillReceiveProps(nextProps) {
    if (('pagination' in nextProps) && nextProps.pagination !== false) {
      this.setState(previousState => ({
        pagination: { ...defaultPagination, ...previousState.pagination, ...nextProps.pagination },
      }));
    }
    // dataSource 的变化会清空选中项
    if ('dataSource' in nextProps &&
        nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        selectionDirty: false,
      });
    }
    if (nextProps.rowSelection &&
        'selectedRowKeys' in nextProps.rowSelection) {
      this.setState({
        selectedRowKeys: nextProps.rowSelection.selectedRowKeys || [],
      });
    }

    if (this.getSortOrderColumns(nextProps.columns).length > 0) {
      const sortState = this.getSortStateFromColumns(nextProps.columns);
      if (sortState.sortColumn !== this.state.sortColumn ||
          sortState.sortOrder !== this.state.sortOrder) {
        this.setState(sortState);
      }
    }

    const filteredValueColumns = this.getFilteredValueColumns(nextProps.columns);
    if (filteredValueColumns.length > 0) {
      const filtersFromColumns = this.getFiltersFromColumns(nextProps.columns);
      const newFilters = { ...this.state.filters };
      Object.keys(filtersFromColumns).forEach(key => {
        newFilters[key] = filtersFromColumns[key];
      });
      if (this.isFiltersChanged(newFilters)) {
        this.setState({ filters: newFilters });
      }
    }
  }

  setSelectedRowKeys(selectedRowKeys) {
    if (this.props.rowSelection &&
        !('selectedRowKeys' in this.props.rowSelection)) {
      this.setState({ selectedRowKeys });
    }
    if (this.props.rowSelection && this.props.rowSelection.onChange) {
      const data = this.getFlatCurrentPageData();
      const selectedRows = data.filter(
        (row, i) => selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0
      );
      this.props.rowSelection.onChange(selectedRowKeys, selectedRows);
    }
  }

  hasPagination() {
    return this.props.pagination !== false;
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

  getSortOrderColumns(columns) {
    return (columns || this.props.columns || []).filter(column => 'sortOrder' in column);
  }

  getFilteredValueColumns(columns) {
    return (columns || this.props.columns || []).filter(column => 'filteredValue' in column);
  }

  getFiltersFromColumns(columns) {
    let filters = {};
    this.getFilteredValueColumns(columns).forEach(col => {
      filters[this.getColumnKey(col)] = col.filteredValue;
    });
    return filters;
  }

  getSortStateFromColumns(columns) {
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
      let result = sortColumn.sorter(a, b);
      if (result !== 0) {
        return (sortOrder === 'descend') ? -result : result;
      }
      return a.indexForSort - b.indexForSort;
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

    this.props.onChange(...this.prepareParamsArguments({ ...this.state, ...newState }));
  }

  handleFilter = (column, nextFilters) => {
    const props = this.props;
    let pagination = { ...this.state.pagination };
    const filters = {
      ...this.state.filters,
      [this.getColumnKey(column)]: nextFilters,
    };
    // Remove filters not in current columns
    const currentColumnKeys = props.columns.map(c => this.getColumnKey(c));
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
      selectionDirty: false,
      pagination,
    };
    const filtersToSetState = { ...filters };
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
    if (props.pagination && 'current' in props.pagination) {
      newState.pagination = {
        ...pagination,
        current: this.state.pagination.current,
      };
    }

    this.setState(newState, () => {
      props.onChange(...this.prepareParamsArguments({
        ...this.state,
        selectionDirty: false,
        filters,
        pagination,
      }));
    });
  }

  handleSelect = (record, rowIndex, e) => {
    const checked = e.target.checked;
    const defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => key !== i);
    }
    this.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys);
    if (this.props.rowSelection.onSelect) {
      let data = this.getFlatCurrentPageData();
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  }

  handleRadioSelect = (record, rowIndex, e) => {
    const checked = e.target.checked;
    const defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    selectedRowKeys = [key];
    this.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys);
    if (this.props.rowSelection.onSelect) {
      let data = this.getFlatCurrentPageData();
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  }

  handleSelectAllRow = (e) => {
    const checked = e.target.checked;
    const data = this.getFlatCurrentPageData();
    const defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
    const selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    const changableRowKeys = data.filter(item =>
      !this.props.rowSelection.getCheckboxProps ||
      !this.props.rowSelection.getCheckboxProps(item).disabled
    ).map((item, i) => this.getRecordKey(item, i));

    // 记录变化的列
    const changeRowKeys = [];
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
    this.setState({
      selectionDirty: true,
    });
    this.setSelectedRowKeys(selectedRowKeys);
    if (this.props.rowSelection.onSelectAll) {
      const selectedRows = data.filter((row, i) =>
        selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
      const changeRows = data.filter((row, i) =>
        changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
      this.props.rowSelection.onSelectAll(checked, selectedRows, changeRows);
    }
  }

  handlePageChange = (current) => {
    const props = this.props;
    let pagination = { ...this.state.pagination };
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    pagination.onChange(pagination.current);

    const newState = {
      selectionDirty: false,
      pagination,
    };
    // Controlled current prop will not respond user interaction
    if (props.pagination && 'current' in props.pagination) {
      newState.pagination = {
        ...pagination,
        current: this.state.pagination.current,
      };
    }
    this.setState(newState);

    this.props.onChange(...this.prepareParamsArguments({
      ...this.state,
      selectionDirty: false,
      pagination,
    }));
  }

  renderSelectionRadio = (value, record, index) => {
    let rowIndex = this.getRecordKey(record, index); // 从 1 开始
    let props = {};
    if (this.props.rowSelection.getCheckboxProps) {
      props = this.props.rowSelection.getCheckboxProps.call(this, record);
    }
    let checked;
    if (this.state.selectionDirty) {
      checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    } else {
      checked = (this.state.selectedRowKeys.indexOf(rowIndex) >= 0 ||
                 this.getDefaultSelection().indexOf(rowIndex) >= 0);
    }
    return (
      <Radio disabled={props.disabled} onClick={stopPropagation}
        onChange={(e) => this.handleRadioSelect(record, rowIndex, e)}
        value={rowIndex} checked={checked} />
    );
  }

  renderSelectionCheckBox = (value, record, index) => {
    let rowIndex = this.getRecordKey(record, index); // 从 1 开始
    let checked;
    if (this.state.selectionDirty) {
      checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    } else {
      checked = (this.state.selectedRowKeys.indexOf(rowIndex) >= 0 ||
                 this.getDefaultSelection().indexOf(rowIndex) >= 0);
    }
    let props = {};
    if (this.props.rowSelection.getCheckboxProps) {
      props = this.props.rowSelection.getCheckboxProps.call(this, record);
    }
    return (
      <Checkbox checked={checked} disabled={props.disabled} onClick={stopPropagation}
        onChange={(e) => this.handleSelect(record, rowIndex, e)} />
    );
  }

  getRecordKey(record, index) {
    if (this.props.rowKey) {
      return this.props.rowKey(record, index);
    }
    return record.key || index;
  }

  renderRowSelection() {
    let columns = this.props.columns.concat();
    if (this.props.rowSelection) {
      let data = this.getFlatCurrentPageData().filter((item) => {
        if (this.props.rowSelection.getCheckboxProps) {
          return !this.props.rowSelection.getCheckboxProps(item).disabled;
        }
        return true;
      });
      let checked;
      if (!data.length) {
        checked = false;
      } else {
        checked = this.state.selectionDirty
          ? data.every((item, i) =>
              this.state.selectedRowKeys.indexOf(this.getRecordKey(item, i)) >= 0)
          : (
            data.every((item, i) =>
              this.state.selectedRowKeys.indexOf(this.getRecordKey(item, i)) >= 0) ||
            data.every((item) =>
              this.props.rowSelection.getCheckboxProps &&
              this.props.rowSelection.getCheckboxProps(item).defaultChecked)
          );
      }
      let selectionColumn;
      if (this.props.rowSelection.type === 'radio') {
        selectionColumn = {
          key: 'selection-column',
          render: this.renderSelectionRadio,
          className: 'ant-table-selection-column',
        };
      } else {
        const checkboxAllDisabled = data.every(item =>
          this.props.rowSelection.getCheckboxProps &&
          this.props.rowSelection.getCheckboxProps(item).disabled);
        const checkboxAll = (
          <Checkbox checked={checked}
            disabled={checkboxAllDisabled}
            onChange={this.handleSelectAllRow} />
        );
        selectionColumn = {
          key: 'selection-column',
          title: checkboxAll,
          render: this.renderSelectionCheckBox,
          className: 'ant-table-selection-column',
        };
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

  getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
  }

  isSortColumn(column) {
    const { sortColumn } = this.state;
    if (!column || !sortColumn) {
      return false;
    }
    return this.getColumnKey(sortColumn) === this.getColumnKey(column);
  }

  renderColumnsDropdown(columns) {
    const { sortOrder } = this.state;
    const locale = this.getLocale();
    return columns.map((originColumn, i) => {
      let column = { ...originColumn };
      let key = this.getColumnKey(column, i);
      let filterDropdown;
      let sortButton;
      if (column.filters && column.filters.length > 0) {
        let colFilters = this.state.filters[key] || [];
        filterDropdown = (
          <FilterDropdown locale={locale} column={column}
            selectedKeys={colFilters}
            confirmFilter={this.handleFilter} />
        );
      }
      if (column.sorter) {
        let isSortColumn = this.isSortColumn(column);
        if (isSortColumn) {
          column.className = column.className || '';
          if (sortOrder) {
            column.className += ' ant-table-column-sort';
          }
        }
        const isAscend = isSortColumn && sortOrder === 'ascend';
        const isDescend = isSortColumn && sortOrder === 'descend';
        sortButton = (
          <div className="ant-table-column-sorter">
            <span className={`ant-table-column-sorter-up ${isAscend ? 'on' : 'off'}`}
              title="↑"
              onClick={() => this.toggleSortOrder('ascend', column)}>
              <Icon type="caret-up" />
            </span>
            <span className={`ant-table-column-sorter-down ${isDescend ? 'on' : 'off'}`}
              title="↓"
              onClick={() => this.toggleSortOrder('descend', column)}>
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
    const nextPagination = { ...pagination, pageSize, current };
    this.setState({ pagination: nextPagination });
    this.props.onChange(...this.prepareParamsArguments({
      ...this.state,
      pagination: nextPagination,
    }));
  }

  renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let size = 'default';
    if (this.state.pagination.size) {
      size = this.state.pagination.size;
    } else if (this.props.size === 'middle' || this.props.size === 'small') {
      size = 'small';
    }
    let total = this.state.pagination.total || this.getLocalData().length;
    return (total > 0) ?
      <Pagination {...this.state.pagination}
        className={`${this.props.prefixCls}-pagination`}
        onChange={this.handlePageChange}
        total={total}
        size={size}
        onShowSizeChange={this.handleShowSizeChange} /> : null;
  }

  prepareParamsArguments(state) {
    // 准备筛选、排序、分页的参数
    const pagination = state.pagination;
    const filters = state.filters;
    const sorter = {};
    if (state.sortColumn && state.sortOrder) {
      sorter.column = state.sortColumn;
      sorter.order = state.sortOrder;
      sorter.field = state.sortColumn.dataIndex;
      sorter.columnKey = this.getColumnKey(state.sortColumn);
    }
    return [pagination, filters, sorter];
  }

  findColumn(myKey) {
    return this.props.columns.filter(c => this.getColumnKey(c) === myKey)[0];
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
      current = state.pagination.current;
    }
    // 分页
    // ---
    // 当数据量少于等于每页数量时，直接设置数据
    // 否则进行读取分页数据
    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter((item, i) => {
        return i >= (current - 1) * pageSize && i < current * pageSize;
      });
    }
    return data;
  }

  getFlatCurrentPageData() {
    return flatArray(this.getCurrentPageData());
  }

  getLocalData() {
    const state = this.state;
    let data = this.props.dataSource || [];
    // 优化本地排序
    data = data.slice(0);
    for (let i = 0; i < data.length; i++) {
      data[i].indexForSort = i;
    }
    const sorterFn = this.getSorterFn();
    if (sorterFn) {
      data = data.sort(sorterFn);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach((columnKey) => {
        let col = this.findColumn(columnKey);
        if (!col) {
          return;
        }
        let values = state.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        data = col.onFilter ? data.filter(record => {
          return values.some(v => col.onFilter(v, record));
        }) : data;
      });
    }
    return data;
  }

  render() {
    const { style, className, ...restProps } = this.props;
    const data = this.getCurrentPageData();
    let columns = this.renderRowSelection();
    const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
    const locale = this.getLocale();

    const classString = classNames({
      [`ant-table-${this.props.size}`]: true,
      'ant-table-bordered': this.props.bordered,
    });

    columns = this.renderColumnsDropdown(columns);
    columns = columns.map((column, i) => {
      const newColumn = { ...column };
      newColumn.key = this.getColumnKey(newColumn, i);
      return newColumn;
    });
    let emptyText;
    let emptyClass = '';
    if (!data || data.length === 0) {
      emptyText = (
        <div className="ant-table-placeholder">
          {locale.emptyText}
        </div>
      );
      emptyClass = 'ant-table-empty';
    }

    let table = (
      <div>
        <RcTable {...restProps}
          data={data}
          columns={columns}
          className={classString}
          expandIconColumnIndex={(columns[0] && columns[0].key === 'selection-column') ? 1 : 0}
          expandIconAsCell={expandIconAsCell} />
          {emptyText}
      </div>
    );
    // if there is no pagination or no data,
    // the height of spin should decrease by half of pagination
    const paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
            ? 'ant-table-with-pagination'
            : 'ant-table-without-pagination';
    const spinClassName = this.props.loading ? `${paginationPatchClass} ant-table-spin-holder` : '';
    table = <Spin className={spinClassName} spinning={this.props.loading}>{table}</Spin>;
    return (
      <div className={`${emptyClass} ${className} clearfix`} style={style}>
        {table}
        {this.renderPagination()}
      </div>
    );
  }
}
