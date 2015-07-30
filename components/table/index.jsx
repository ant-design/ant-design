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

export default React.createClass({
  getInitialState() {
    var state = {
      // 减少状态
      selectedRowKeys: [],
      filters: {},
      loading: !this.isLocalDataSource(),
      sortColumn: '',
      sortOrder: '',
      sorter: null,
      pagination: this.hasPagination() ? this.getLocalPagination() : {}
    };
    state.data = this.isLocalDataSource() ? this.getLocalData(state) : [];
    return state;
  },

  getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      size: 'normal'
    };
  },

  componentWillReceiveProps(nextProps){
    if (!this.isLocalDataSource()) {
      if (!equals(nextProps, this.props)) {
        this.setState({
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
  hasPagination(){
    return this.props.pagination !== false;
  },
  isLocalDataSource(){
    return Array.isArray(this.props.dataSource);
  },
  getRemoteDataSource(){
    return objectAssign({
      resolve: defaultResolve,
      getParams: noop,
      getPagination: noop
    }, this.props.dataSource);
  },
  getLocalPagination(){
    return objectAssign({
      pageSize: 10,
      total: this.props.dataSource.length
    }, this.props.pagination);
  },
  toggleSortOrder(order, column) {
    let sortColumn = this.state.sortColumn;
    let sortOrder = this.state.sortOrder;
    let sorter;
    // 同时允许一列进行排序，否则会导致排序顺序的逻辑问题
    if (sortColumn) {
      sortColumn.className = '';
    }
    if (sortColumn !== column) {  // 当前列未排序
      sortOrder = order;
      sortColumn = column;
      sortColumn.className = 'ant-table-column-sort';
    } else {                      // 当前列已排序
      if (sortOrder === order) {  // 切换为未排序状态
        sortOrder = '';
        sortColumn = null;
      } else {                    // 切换为排序状态
        sortOrder = order;
        sortColumn.className = 'ant-table-column-sort';
      }
    }
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
      filters: filters
    });
  },
  handleSelect(rowIndex, e) {
    let checked = e.target.checked;
    var selectedRowKeys = this.state.selectedRowKeys.concat();
    if (checked) {
      selectedRowKeys.push(rowIndex);
    } else {
      selectedRowKeys = selectedRowKeys.filter((i) => {
        return rowIndex !== i;
      });
    }
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
    if (this.props.rowSelection.onSelect) {
      let currentRow = this.state.data[rowIndex - 1];
      let selectedRows = this.state.data.filter((row, i) => {
        return this.state.selectedRowKeys.indexOf(i + 1) >= 0;
      });
      this.props.rowSelection.onSelect(currentRow, checked, selectedRows);
    }
  },
  handleSelectAllRow(e) {
    let checked = e.target.checked;
    let selectedRowKeys = checked ? this.state.data.map((item, i) => {
      return i + 1;
    }) : [];
    this.setState({
      selectedRowKeys: selectedRowKeys
    });
    if (this.props.rowSelection.onSelectAll) {
      let selectedRows = this.state.data.filter((row, i) => {
        return selectedRowKeys.indexOf(i + 1) >= 0;
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
      selectedKeys: [],
      pagination: pagination
    });
  },
  renderSelectionCheckBox(value, record, index) {
    let rowIndex = index + 1; // 从 1 开始
    let checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    return <Checkbox checked={checked} onChange={this.handleSelect.bind(this, rowIndex)}/>;
  },
  renderRowSelection() {
    var columns = this.props.columns.concat();
    if (this.props.rowSelection) {
      let checked = this.state.data.every((item, i) => {
        return this.state.selectedRowKeys.indexOf(i + 1) >= 0;
      }, this);
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

  getColumnKey(column){
    return column.key || column.dataIndex;
  },

  renderColumnsDropdown(columns) {
    return columns.map((column) => {
      column = objectAssign({}, column);
      var key = this.getColumnKey(column);
      let filterDropdown, menus, sortButton;
      if (column.filters && column.filters.length > 0) {
        var colFilters = this.state.filters[key] || [];
        menus = <FilterMenu column={column}
                            selectedFilters={colFilters}
                            confirmFilter={this.handleFilter}/>;
        let dropdownSelectedClass = '';
        if (colFilters.length > 0) {
          dropdownSelectedClass = 'ant-table-filter-selected';
        }
        filterDropdown = <Dropdown trigger="click"
                                   closeOnSelect={false}
                                   overlay={menus}>
          <i title="筛选" className={'anticon anticon-bars ' + dropdownSelectedClass}></i>
        </Dropdown>;
      }
      if (column.sorter) {
        let isSortColumn = (this.state.sortColumn === column);
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
      var originalTitle = column.title;
      column.title = [
        originalTitle,
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
    return <Pagination className={classString}
                       onChange={this.handlePageChange}
      {...this.state.pagination} />;
  },
  prepareParamsArguments(state) {
    // 准备筛选、排序、分页的参数
    let pagination;
    let filters = {};
    let sorter = {};
    pagination = state.pagination;
    this.props.columns.forEach((column) => {
      var colFilters = state.filters[this.getColumnKey(column)] || [];
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
    var state = objectAssign({}, this.state, newState);
    if (this.isLocalDataSource()) {
      this.setState(objectAssign({
        data: this.getLocalData(state)
      }, newState));
    } else {
      if (newState || !this.state.loading) {
        this.setState(objectAssign({
          loading: true
        }, newState));
      }
      // remote 模式使用 this.dataSource
      let dataSource = this.getRemoteDataSource();
      jQuery.ajax({
        url: dataSource.url,
        data: dataSource.getParams.apply(this, this.prepareParamsArguments(state)) || {},
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

  findColumn(myKey){
    return this.props.columns.filter((c) => {
      return this.getColumnKey(c) === myKey;
    })[0];
  },

  getLocalData(state){
    let data = this.props.dataSource;
    let current, pageSize;
    // 如果没有分页的话，默认全部展示
    if (!this.hasPagination()) {
      pageSize = Number.MAX_VALUE;
      current = 1;
    } else {
      pageSize = state.pagination.pageSize;
      current = state.pagination.current;
    }
    // 排序
    if (state.sortOrder && state.sorter) {
      data = data.sort(state.sorter);
    }
    // 筛选
    if (state.filters) {
      Object.keys(state.filters).forEach((columnKey) => {
        var col = this.findColumn(columnKey);
        var values = state.filters[columnKey] || [];
        data = data.filter((record) => {
          return values.some((v)=> {
            return col.onFilter(v, record);
          });
        });
      });
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

  componentDidMount() {
    if (!this.isLocalDataSource()) {
      this.fetch();
    }
  },

  render() {
    var data = this.state.data;
    var columns = this.renderRowSelection();
    var classString = '';
    if (this.state.loading) {
      classString += ' ant-table-loading';
    }
    if (this.props.size === 'small') {
      classString += ' ant-table-small';
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
