import React from 'react';
import Table from 'rc-table';
import Checkbox from '../checkbox';
import Radio from '../radio';
import FilterDropdown from './filterDropdown';
import Pagination from '../pagination';
import Icon from '../icon';
import objectAssign from 'object-assign';
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
  emptyText: '暂无数据',
};

const defaultPagination = {
  pageSize: 10,
  current: 1,
  onChange: noop,
  onShowSizeChange: noop,
};

let AntTable = React.createClass({
  getInitialState() {
    return {
      // 减少状态
      selectedRowKeys: (this.props.rowSelection || {}).selectedRowKeys || [],
      filters: {},
      selectionDirty: false,
      sortColumn: '',
      sortOrder: '',
      sorter: null,
      pagination: this.hasPagination() ?
        objectAssign({
          size: this.props.size,
        }, defaultPagination, this.props.pagination) :
        {},
    };
  },

  getDefaultProps() {
    return {
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
      locale: {}
    };
  },

  propTypes: {
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
  },

  getDefaultSelection() {
    if (!this.props.rowSelection || !this.props.rowSelection.getCheckboxProps) {
      return [];
    }
    return this.getFlatCurrentPageData()
      .filter(item => this.props.rowSelection.getCheckboxProps(item).defaultChecked)
      .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
  },

  componentWillReceiveProps(nextProps) {
    if (('pagination' in nextProps) && nextProps.pagination !== false) {
      this.setState(previousState => ({
        pagination: objectAssign({}, defaultPagination, previousState.pagination, nextProps.pagination),
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
  },

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
  },

  hasPagination() {
    return this.props.pagination !== false;
  },

  toggleSortOrder(order, column) {
    let sortColumn = this.state.sortColumn;
    let sortOrder = this.state.sortOrder;
    let sorter;
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
    if (typeof column.sorter === 'function') {
      sorter = (a, b) => {
        let result = column.sorter(a, b);
        if (result !== 0) {
          return (sortOrder === 'descend') ? -result : result;
        }
        return a.index - b.index;
      };
    }
    const newState = {
      sortOrder,
      sortColumn,
      sorter,
    };
    this.setState(newState);
    this.props.onChange(...this.prepareParamsArguments({ ...this.state, ...newState }));
  },

  handleFilter(column, nextFilters) {
    const filters = objectAssign({}, this.state.filters, {
      [this.getColumnKey(column)]: nextFilters
    });
    // Remove filters not in current columns
    const currentColumnKeys = this.props.columns.map(c => this.getColumnKey(c));
    Object.keys(filters).forEach((columnKey) => {
      if (currentColumnKeys.indexOf(columnKey) < 0) {
        delete filters[columnKey];
      }
    });
    const newState = {
      selectionDirty: false,
      filters
    };
    this.setState(newState);
    this.setSelectedRowKeys([]);
    this.props.onChange(...this.prepareParamsArguments({ ...this.state, ...newState }));
  },

  handleSelect(record, rowIndex, e) {
    const checked = e.target.checked;
    const defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
    let selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => {
        return key !== i;
      });
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
  },

  handleRadioSelect(record, rowIndex, e) {
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
  },

  handleSelectAllRow(e) {
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
  },

  handlePageChange(current) {
    const props = this.props;
    let pagination = objectAssign({}, this.state.pagination);
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
  },

  renderSelectionRadio(value, record, index) {
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
        onChange={this.handleRadioSelect.bind(this, record, rowIndex)}
        value={rowIndex} checked={checked} />
    );
  },

  renderSelectionCheckBox(value, record, index) {
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
        onChange={this.handleSelect.bind(this, record, rowIndex)} />
    );
  },

  getRecordKey(record, index) {
    if (this.props.rowKey) {
      return this.props.rowKey(record, index);
    }
    return record.key || index;
  },

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
          className: 'ant-table-selection-column'
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
          className: 'ant-table-selection-column'
        };
      }
      if (columns[0] && columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }
    return columns;
  },

  getColumnKey(column, index) {
    return column.key || column.dataIndex || index;
  },

  isSortColumn(column) {
    if (!column || !this.state.sortColumn) {
      return false;
    }
    let colKey = this.getColumnKey(column);
    let isSortColumn = (this.getColumnKey(this.state.sortColumn) === colKey);
    return isSortColumn;
  },

  renderColumnsDropdown(columns) {
    let locale = objectAssign({}, defaultLocale, this.props.locale);
    return columns.map((originColumn, i) => {
      let column = objectAssign({}, originColumn);
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
          if (this.state.sortOrder) {
            column.className += ' ant-table-column-sort';
          }
        }

        const isAscend = isSortColumn && this.state.sortOrder === 'ascend';
        const isDescend = isSortColumn && this.state.sortOrder === 'descend';
        sortButton = (
          <div className="ant-table-column-sorter">
            <span className={`ant-table-column-sorter-up ${isAscend ? 'on' : 'off'}`}
              title="↑"
              onClick={this.toggleSortOrder.bind(this, 'ascend', column)}>
              <Icon type="caret-up" />
            </span>
            <span className={`ant-table-column-sorter-down ${isDescend ? 'on' : 'off'}`}
              title="↓"
              onClick={this.toggleSortOrder.bind(this, 'descend', column)}>
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
  },

  handleShowSizeChange(current, pageSize) {
    const pagination = this.state.pagination;
    pagination.onShowSizeChange(current, pageSize);
    const nextPagination = { ...pagination, pageSize, current };
    this.setState({ pagination: nextPagination });
    this.props.onChange(...this.prepareParamsArguments({
      ...this.state,
      pagination: nextPagination,
    }));
  },

  renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let classString = classNames({
      'ant-table-pagination': true,
      mini: this.props.size === 'middle' || this.props.size === 'small',
    });
    let total = this.state.pagination.total || this.getLocalData().length;
    const pageSize = this.state.pagination.pageSize;
    return (total > 0) ?
      <Pagination {...this.state.pagination}
        className={classString}
        onChange={this.handlePageChange}
        total={total}
        pageSize={pageSize}
        onShowSizeChange={this.handleShowSizeChange} /> : null;
  },

  prepareParamsArguments(state) {
    // 准备筛选、排序、分页的参数
    const pagination = state.pagination;
    const filters = state.filters;
    const sorter = {};
    if (state.sortColumn &&
      state.sortOrder &&
      state.sortColumn.dataIndex) {
      sorter.field = state.sortColumn.dataIndex;
      sorter.order = state.sortOrder;
    }
    return [pagination, filters, sorter];
  },

  findColumn(myKey) {
    return this.props.columns.filter(c => this.getColumnKey(c) === myKey)[0];
  },

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
  },

  getFlatCurrentPageData() {
    return flatArray(this.getCurrentPageData());
  },

  getLocalData() {
    let state = this.state;
    let data = this.props.dataSource || [];
    // 排序
    if (state.sortOrder && state.sorter) {
      data = data.slice(0);
      for (let i = 0; i < data.length; i++) {
        data[i].index = i;
      }
      data = data.sort(state.sorter);
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
  },

  render() {
    const data = this.getCurrentPageData();
    let columns = this.renderRowSelection();
    const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
    const locale = objectAssign({}, defaultLocale, this.props.locale);

    const classString = classNames({
      [`ant-table-${this.props.size}`]: true,
      'ant-table-bordered': this.props.bordered,
      [this.props.className]: !!this.props.className,
    });

    columns = this.renderColumnsDropdown(columns);
    columns = columns.map((column, i) => {
      const newColumn = objectAssign({}, column);
      newColumn.key = newColumn.key || newColumn.dataIndex || i;
      return newColumn;
    });
    let emptyText;
    let emptyClass = '';
    if (!data || data.length === 0) {
      emptyText = (
        <div className="ant-table-placeholder">
          <Icon type="frown" />{locale.emptyText}
        </div>
      );
      emptyClass = ' ant-table-empty';
    }

    let table = (
      <div>
        <Table {...this.props}
          data={data}
          columns={columns}
          className={classString}
          expandIconColumnIndex={(columns[0] && columns[0].key === 'selection-column') ? 1 : 0}
          expandIconAsCell={expandIconAsCell} />
          {emptyText}
      </div>
    );
    if (this.props.loading) {
      // if there is no pagination or no data,
      // the height of spin should decrease by half of pagination
      const paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
              ? 'ant-table-with-pagination'
              : 'ant-table-without-pagination';
      const spinClassName = `${paginationPatchClass} ant-table-spin-holder`;
      table = <Spin className={spinClassName}>{table}</Spin>;
    }
    return (
      <div className={`clearfix${emptyClass}`}>
        {table}
        {this.renderPagination()}
      </div>
    );
  }
});

export default AntTable;
