import React from 'react';
import jQuery from 'jquery';
import Table from 'rc-table';
import Dropdown from '../dropdown';
import Checkbox from '../checkbox';
import FilterMenu from './filterMenu';
import Pagination from '../pagination';
import objectAssign from 'object-assign';
import equals from 'is-equal-shallow';

function noop() {
}

function defaultResolve(data) {
  return data || [];
}

function getColumnKey(col, index) {
  return col.key || col.dataIndex || index;
}

class DataSource {
  init(config) {
    this.config = config;
    this.url = config.url || '';
    this.resolve = config.resolve || defaultResolve;
    this.getParams = config.getParams || noop;
    this.getPagination = config.getPagination || noop;
    this.headers = config.headers || {};
    this.data = config.data || {};
  }

  constructor(config) {
    if (config) {
      this.init(config);
    }
  }

  clone(config) {
    if (config) {
      return new DataSource(objectAssign(config, this.config));
    } else {
      return this;
    }
  }
}

var AntTable = React.createClass({
  getInitialState() {
    return {
      // 减少状态
      selectedRowKeys: [],
      // only for remote
      data: [],
      filters: {},
      loading: !this.isLocalDataSource(),
      sortColumn: '',
      sortOrder: '',
      sorter: null,
      pagination: this.hasPagination() ? objectAssign({
        pageSize: 10
      }, this.props.pagination) : {}
    };
  },

  getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      size: 'normal',
      bordered: false
    };
  },

  propTypes: {
    dataSource: React.PropTypes.instanceOf(DataSource)
  },

  componentWillReceiveProps(nextProps) {
    if (('pagination' in nextProps) && nextProps.pagination !== false) {
      this.setState({
        pagination: objectAssign({}, this.state.pagination, nextProps.pagination)
      });
    }
    if (!this.isLocalDataSource()) {
      if (!equals(nextProps, this.props)) {
        this.setState({
          selectedRowKeys: [],
          loading: true
        }, this.fetch);
      }
    }
    if (nextProps.columns !== this.props.columns) {
      this.setState({
        filters: {}
      });
    }
  },

  hasPagination(pagination) {
    if (pagination === undefined) {
      pagination = this.props.pagination;
    }
    return pagination !== false;
  },

  isLocalDataSource() {
    return Array.isArray(this.props.dataSource);
  },

  getRemoteDataSource() {
    return this.props.dataSource;
  },

  toggleSortOrder(order, column) {
    let sortColumn = this.state.sortColumn;
    let sortOrder = this.state.sortOrder;
    let sorter;
    if (this.isLocalDataSource()) {
      sorter = function () {
        let result = column.sorter.apply(this, arguments);
        if (sortOrder === 'ascend') {
          return result;
        } else if (sortOrder === 'descend') {
          return -result;
        }
      };
    }
    this.fetch({
      sortOrder: sortOrder,
      sortColumn: sortColumn,
      sorter: sorter
    });
  },

  handleFilter(column, filters) {
    filters = objectAssign({}, this.state.filters, {
      [this.getColumnKey(column)]: filters
    });
    this.fetch({
      selectedRowKeys: [],
      filters: filters
    });
  },

  handleSelect(record, rowIndex, e) {
    let checked = e.target.checked;
    let selectedRowKeys = this.state.selectedRowKeys.concat();
    let key = this.getRecordKey(record, rowIndex);
    if (checked) {
      selectedRowKeys.push(this.getRecordKey(record, rowIndex));
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => {
        return key !== i;
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
    if (this.props.rowSelection.onSelect) {
      let data = this.getCurrentPageData();
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelect(record, checked, selectedRows);
    }
  },

  handleSelectAllRow(e) {
    let checked = e.target.checked;
    let data = this.getCurrentPageData();
    let selectedRowKeys = checked ? data.map((item, i) => {
      return this.getRecordKey(item, i);
    }) : [];
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
    if (this.props.rowSelection.onSelectAll) {
      let selectedRows = data.filter((row, i) => {
        return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
      });
      this.props.rowSelection.onSelectAll(checked, selectedRows);
    }
  },

  handlePageChange(current) {
    let pagination = objectAssign({}, this.state.pagination);
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    this.fetch({
      // 防止内存泄漏，只维持当页
      selectedRowKeys: [],
      pagination: pagination
    });
  },

  renderSelectionCheckBox(value, record, index) {
    let rowIndex = this.getRecordKey(record, index); // 从 1 开始
    let checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    return <Checkbox checked={checked} onChange={this.handleSelect.bind(this, record, rowIndex)}/>;
  },

  getRecordKey(record, index) {
    return record.key || index;
  },

  renderRowSelection() {
    let columns = this.props.columns.concat();
    if (this.props.rowSelection) {
      let data = this.getCurrentPageData();
      let checked;
      if (!data.length) {
        checked = false;
      } else {
        checked = data.every((item, i) => {
          let key = this.getRecordKey(item, i);
          return this.state.selectedRowKeys.indexOf(key) >= 0;
        });
      }
      let checkboxAll = <Checkbox checked={checked} onChange={this.handleSelectAllRow}/>;
      let selectionColumn = {
        key: 'selection-column',
        title: checkboxAll,
        width: 60,
        render: this.renderSelectionCheckBox,
        className: 'ant-table-selection-column'
      };
      if (columns[0] &&
        columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }
    return columns;
  },

  getCurrentPageData() {
    return this.isLocalDataSource() ? this.getLocalDataPaging() : this.state.data;
  },

  getColumnKey(column) {
    return column.key || column.dataIndex;
  },

  renderColumnsDropdown(columns) {
    return columns.map((column, i) => {
      column = objectAssign({}, column);
      let key = this.getColumnKey(column);
      let filterDropdown, menus, sortButton;
      if (column.filters && column.filters.length > 0) {
        let colFilters = this.state.filters[key] || [];
        menus = <FilterMenu column={column}
                            selectedKeys={colFilters}
                            confirmFilter={this.handleFilter}/>;
        let dropdownSelectedClass = '';
        if (colFilters.length > 0) {
          dropdownSelectedClass = 'ant-table-filter-selected';
        }
        filterDropdown = <Dropdown trigger="click"
                                   overlay={menus}>
          <i title="筛选" className={'anticon anticon-bars ' + dropdownSelectedClass}></i>
        </Dropdown>;
      }
      if (column.sorter) {
        var colKey = getColumnKey(column, i);
        let isSortColumn = (getColumnKey(this.state.sortColumn, i) === colKey);
        if (isSortColumn) {
          column.className = column.className || '';
          column.className += ' ant-table-column-sort';
        }
        sortButton = <div className="ant-table-column-sorter">
          <span className={'ant-table-column-sorter-up ' +
                           ((isSortColumn && this.state.sortOrder === 'ascend') ? 'on' : 'off')}
                title="升序排序"
                onClick={this.toggleSortOrder.bind(this, 'ascend', column)}>
            <i className="anticon anticon-caret-up"></i>
          </span>
          <span className={'ant-table-column-sorter-down ' +
                           ((isSortColumn && this.state.sortOrder === 'descend') ? 'on' : 'off')}
                title="降序排序"
                onClick={this.toggleSortOrder.bind(this, 'descend', column)}>
            <i className="anticon anticon-caret-down"></i>
          </span>
        </div>;
      }
      column.title = [
        column.title,
        sortButton,
        filterDropdown
      ];
      return column;
    });
  },

  renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    let classString = 'ant-table-pagination';
    if (this.props.size === 'small') {
      classString += ' mini';
    }
    let total;
    if (this.isLocalDataSource()) {
      total = this.getLocalData().length;
    }
    return <Pagination className={classString}
                       onChange={this.handlePageChange}
                       total={total}
                       pageSize={10}
      {...this.state.pagination} />;
  },

  prepareParamsArguments(state) {
    // 准备筛选、排序、分页的参数
    let pagination;
    let filters = {};
    let sorter = {};
    pagination = state.pagination;
    this.props.columns.forEach((column) => {
      let colFilters = state.filters[this.getColumnKey(column)] || [];
      if (colFilters.length > 0) {
        filters[this.getColumnKey(column)] = colFilters;
      }
    });
    if (state.sortColumn &&
      state.sortOrder &&
      state.sortColumn.dataIndex) {
      sorter.field = state.sortColumn.dataIndex;
      sorter.order = state.sortOrder;
    }
    return [pagination, filters, sorter];
  },

  fetch(newState) {
    if (this.isLocalDataSource()) {
      if (newState) {
        this.setState(newState);
      }
    } else {
      let state = objectAssign({}, this.state, newState);
      if (newState || !this.state.loading) {
        this.setState(objectAssign({
          loading: true
        }, newState));
      }
      // remote 模式使用 this.dataSource
      let dataSource = this.getRemoteDataSource();
      let buildInParams = dataSource.getParams.apply(this, this.prepareParamsArguments(state)) || {};
      return jQuery.ajax({
        url: dataSource.url,
        data: objectAssign(buildInParams, dataSource.data),
        headers: dataSource.headers,
        dataType: 'json',
        success: (result) => {
          if (this.isMounted()) {
            let pagination = objectAssign(
              state.pagination,
              dataSource.getPagination.call(this, result)
            );
            this.setState({
              loading: false,
              data: dataSource.resolve.call(this, result),
              pagination: pagination
            });
          }
        },
        error: () => {
          this.setState({
            loading: false,
            data: []
          });
        }
      });
    }
  },

  findColumn(myKey) {
    return this.props.columns.filter((c) => {
      return this.getColumnKey(c) === myKey;
    })[0];
  },

  getLocalDataPaging() {
    let data = this.getLocalData();
    let current, pageSize;
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
    // 当数据量少于每页数量时，直接设置数据
    // 否则进行读取分页数据
    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter((item, i) => {
        if (i >= (current - 1) * pageSize &&
          i < current * pageSize) {
          return item;
        }
      });
    }
    return data;
  },

  getLocalData() {
    let state = this.state;
    let data = this.props.dataSource;
    // 排序
    if (state.sortOrder && state.sorter) {
      data = data.sort(state.sorter);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach((columnKey) => {
        let col = this.findColumn(columnKey);
        let values = state.filters[columnKey] || [];
        if (values.length === 0) {
          return;
        }
        data = data.filter((record) => {
          return values.some((v)=> {
            return col.onFilter(v, record);
          });
        });
      });
    }
    return data;
  },

  componentDidMount() {
    if (!this.isLocalDataSource()) {
      this.fetch();
    }
  },

  render() {
    let data = this.getCurrentPageData();
    let columns = this.renderRowSelection();
    let classString = '';
    if (this.state.loading && this.isLocalDataSource()) {
      classString += ' ant-table-loading';
    }
    if (this.props.size === 'small') {
      classString += ' ant-table-small';
    }
    if (this.props.bordered) {
      classString += ' ant-table-bordered';
    }
    columns = this.renderColumnsDropdown(columns);
    return <div className="clearfix">
      <Table
        {...this.props}
        data={data || []}
        columns={columns}
        className={classString}
        />
      {this.renderPagination()}
    </div>;
  }
});

AntTable.DataSource = DataSource;

export default AntTable;
