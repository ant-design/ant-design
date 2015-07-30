import React from 'react';
import jQuery from 'jquery';
import Table from 'rc-table';
import Dropdown from '../dropdown';
import Checkbox from '../checkbox';
import FilterMenu from './filterMenu';
import Pagination from '../pagination';
import objectAssign from 'object-assign';

export default React.createClass({
  getInitialState() {
    this.initDataSource(this.props.dataSource);

    let noPagination = (this.props.pagination === false);
    let pagination = this.initPagination(this.props.pagination);

    return {
      selectedRowKeys: [],
      loading: false,
      pagination: pagination,
      noPagination: noPagination,
      data: []
    };
  },
  getDefaultProps() {
    return {
      prefixCls: 'ant-table',
      useFixedHeader: false,
      rowSelection: null,
      size: 'normal'
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('pagination' in nextProps) {
      let noPagination = (nextProps.pagination === false);
      this.setState({
        pagination: this.initPagination(nextProps.pagination),
        noPagination: noPagination
      });
    }
    if ('dataSource' in nextProps) {
      this.initDataSource(nextProps.dataSource);
      this.setState({
        data: nextProps.dataSource
      });
    }
  },
  initDataSource(dataSource) {
    // 支持两种模式
    if (Array.isArray(dataSource)) {
      this.mode = 'local';
      // 保留原来的数据
      this.originDataSource = dataSource.slice(0);
    } else {
      this.mode = 'remote';
      this.dataSource = objectAssign({
        resolve: function(data) {
          return data || [];
        },
        getParams: function() {},
        getPagination: function() {}
      }, dataSource);
    }
  },
  initPagination(pagination) {
    return objectAssign({
      pageSize: 10,
      total: this.props.dataSource.length
    }, pagination);
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
    if (this.mode === 'local') {
      sorter = function() {
        let result = column.sorter.apply(this, arguments);
        if (sortOrder === 'ascend') {
          return result;
        } else if (sortOrder === 'descend') {
          return -result;
        }
      };
    }
    this.setState({
      sortOrder: sortOrder,
      sortColumn: sortColumn,
      sorter: sorter
    }, this.fetch);
  },
  handleFilter(column) {
    let columnIndex = this.props.columns.indexOf(column);
    let filterFns = [];
    if (this.mode === 'local') {
      filterFns[columnIndex] = function(record) {
        if (column.selectedFilters.length === 0) {
          return true;
        }
        return column.selectedFilters.some(function(value) {
          return column.onFilter.call(this, value, record);
        });
      };
    }
    this.setState({
      filterFns: filterFns
    }, this.fetch);
  },
  handleSelect(rowIndex, e) {
    let checked = e.target.checked;
    if (checked) {
      this.state.selectedRowKeys.push(rowIndex);
    } else {
      this.state.selectedRowKeys = this.state.selectedRowKeys.filter(function(i) {
        return rowIndex !== i;
      });
    }
    this.setState({
      selectedRowKeys: this.state.selectedRowKeys
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
    let selectedRowKeys = checked ? this.state.data.map(function(item, i) {
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
    let pagination = this.state.pagination || {};
    if (current) {
      pagination.current = current;
    } else {
      pagination.current = pagination.current || 1;
    }
    this.setState({
      pagination: pagination
    }, this.fetch);
  },
  renderSelectionCheckBox(value, record, index) {
    let rowIndex = index + 1; // 从 1 开始
    let checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
    return <Checkbox checked={checked} onChange={this.handleSelect.bind(this, rowIndex)} />;
  },
  renderRowSelection() {
    var columns = this.props.columns;
    if (this.props.rowSelection) {
      let checked = this.state.data.every(function(item, i) {
        return this.state.selectedRowKeys.indexOf(i + 1) >= 0;
      }, this);
      let checkboxAll = <Checkbox checked={checked} onChange={this.handleSelectAllRow} />;
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
  renderColumnsDropdown() {
    return this.props.columns.map((column) => {
      if (!column.originTitle) {
        column.originTitle = column.title;
      }
      let filterDropdown, menus, sortButton;
      if (column.filters && column.filters.length > 0) {
        column.selectedFilters = column.selectedFilters || [];
        menus = <FilterMenu column={column} confirmFilter={this.handleFilter.bind(this, column)} />;
        let dropdownSelectedClass = '';
        if (column.selectedFilters && column.selectedFilters.length > 0) {
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
      column.title = [
        column.originTitle,
        sortButton,
        filterDropdown
      ];
      return column;
    });
  },
  renderPagination() {
    // 强制不需要分页
    if (this.state.noPagination) {
      return '';
    }
    let classString = 'ant-table-pagination';
    if (this.props.size === 'small') {
      classString += ' mini';
    }
    return <Pagination className={classString}
      onChange={this.handlePageChange}
      {...this.state.pagination} />;
  },
  prepareParamsArguments() {
    // 准备筛选、排序、分页的参数
    let pagination;
    let filters = {};
    let sorter = {};
    pagination = this.state.pagination;
    this.props.columns.forEach(function(column) {
      if (column.dataIndex && column.selectedFilters &&
          column.selectedFilters.length > 0) {
        filters[column.dataIndex] = column.selectedFilters;
      }
    });
    if (this.state.sortColumn && this.state.sortOrder &&
        this.state.sortColumn.dataIndex) {
      sorter.field = this.state.sortColumn.dataIndex;
      sorter.order = this.state.sortOrder;
    }
    return [pagination, filters, sorter];
  },
  fetch() {
    if (this.mode === 'remote') {
      // remote 模式使用 this.dataSource
      let dataSource = this.dataSource;
      this.setState({
        loading: true
      });
      jQuery.ajax({
        url: dataSource.url,
        data: dataSource.getParams.apply(this, this.prepareParamsArguments()) || {},
        headers: dataSource.headers,
        dataType: 'json',
        success: (result) => {
          if (this.isMounted()) {
            let pagination = objectAssign(
              this.state.pagination,
              dataSource.getPagination.call(this, result)
            );
            this.setState({
              data: dataSource.resolve.call(this, result),
              pagination: pagination,
              loading: false
            });
          }
        },
        error: () => {
          this.setState({
            loading: false
          });
        }
      });
    } else {
      let data = this.props.dataSource;
      let current, pageSize;
      // 如果没有分页的话，默认全部展示
      if (this.state.noPagination) {
        pageSize = Number.MAX_VALUE;
        current = 1;
      } else {
        pageSize = this.state.pagination.pageSize;
        current = this.state.pagination.current;
      }
      // 排序
      if (this.state.sortOrder && this.state.sorter) {
        data = data.sort(this.state.sorter);
      } else {
        data = this.originDataSource.slice();
      }
      // 筛选
      if (this.state.filterFns) {
        this.state.filterFns.forEach(function(filterFn) {
          if (typeof filterFn === 'function') {
            data = data.filter(filterFn);
          }
        });
      }
      // 分页
      // ---
      // 当数据量少于每页数量时，直接设置数据
      // 否则进行读取分页数据
      if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
        data = data.filter(function(item, i) {
          if (i >= (current - 1) * pageSize &&
              i < current * pageSize) {
            return item;
          }
        });
      }
      // 完成数据
      this.setState({
        data: data
      });
    }
  },
  componentDidMount() {
    this.handlePageChange();
  },
  render() {
    this.props.columns = this.renderRowSelection();

    var classString = '';
    if (this.state.loading) {
      classString += ' ant-table-loading';
    }
    if (this.props.size === 'small') {
      classString += ' ant-table-small';
    }

    return <div className="clearfix">
      <Table data={this.state.data}
      columns={this.renderColumnsDropdown()}
      className={classString}
      {...this.props} />
      {this.renderPagination()}
    </div>;
  }
});
