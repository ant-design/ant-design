'use strict';

import React from 'react';
import jQuery from 'jquery';
import Table from 'rc-table';
import Menu from 'rc-menu';
import Dropdown from '../dropdown';
import Pagination from '../pagination';
import objectAssign from 'object-assign';

let AntTable = React.createClass({
  getInitialState() {
    // 支持两种模式
    if (Array.isArray(this.props.dataSource)) {
      this.mode = 'local';
      // 保留原来的数据
      this.originDataSource = this.props.dataSource.slice(0);
    } else {
      this.mode = 'remote';
      this.props.dataSource = objectAssign({
        resolve: function(data) {
          return data || [];
        },
        getParams: function() {},
        getPagination: function() {}
      }, this.props.dataSource);
    }
    var pagination;
    if (this.props.pagination === false) {
      pagination = false;
    } else {
      pagination = objectAssign({
        pageSize: 10,
        total: this.props.dataSource.length
      }, this.props.pagination);
    }
    return {
      selectedRowKeys: [],
      loading: false,
      pagination: pagination,
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
  renderMenus(items) {
    let menuItems = items.map((item) => {
      return <Menu.Item key={item.value}>{item.text}</Menu.Item>;
    });
    return menuItems;
  },
  toggleSortOrder(order, column) {
    if (column.sortOrder === order) {
      column.sortOrder = '';
    } else {
      column.sortOrder = order;
    }
    if (this.mode === 'local') {
      let sorter = function() {
        let result = column.sorter.apply(this, arguments);
        if (column.sortOrder === 'ascend') {
          return result;
        } else if (column.sortOrder === 'descend') {
          return -result;
        }
      };
      if (column.sortOrder) {
        this.props.dataSource = this.props.dataSource.sort(sorter);
      } else {
        this.props.dataSource = this.originDataSource.slice();
      }
    }
    this.fetch();
  },
  handleFilter(column) {
    if (this.mode === 'local') {
      this.props.dataSource = this.originDataSource.slice().filter(function(record) {
        if (column.selectedFilters.length === 0) {
          return true;
        }
        return column.selectedFilters.some(function(value) {
          return column.onFilter.call(this, value, record);
        });
      });
    }
    this.fetch();
  },
  handleSelectFilter(column, selected) {
    column.selectedFilters = column.selectedFilters || [];
    column.selectedFilters.push(selected);
  },
  handleDeselectFilter(column, key) {
    column.selectedFilters = column.selectedFilters || [];
    var index = column.selectedFilters.indexOf(key);
    if (index !== -1) {
      column.selectedFilters.splice(index, 1);
    }
  },
  handleSelect(e) {
    let checked = e.currentTarget.checked;
    let currentRowIndex = e.currentTarget.parentElement.parentElement.rowIndex;
    let selectedRow = this.state.data[currentRowIndex - 1];
    if (checked) {
      this.state.selectedRowKeys.push(currentRowIndex);
    } else {
      this.state.selectedRowKeys = this.state.selectedRowKeys.filter(function(i){
        return currentRowIndex !== i;
      });
    }
    this.setState({
      selectedRowKeys: this.state.selectedRowKeys
    });
    if (this.props.rowSelection.onSelect) {
      this.props.rowSelection.onSelect(selectedRow, checked);
    }
  },
  handleSelectAllRow(e) {
    let checked = e.currentTarget.checked;
    this.setState({
      selectedRowKeys: checked ? this.state.data.map(function(item, i) {
        return i + 1;
      }) : []
    });
    if (this.props.rowSelection.onSelectAll) {
      this.props.rowSelection.onSelectAll(checked);
    }
  },
  handlePageChange: function(current) {
    this.state.pagination.current = current || 1;
    this.fetch();
  },
  renderSelectionCheckBox(value, record, index) {
    let checked = this.state.selectedRowKeys.indexOf(index + 1) >= 0;
    let checkbox = <input type="checkbox" checked={checked} onChange={this.handleSelect} />;
    return checkbox;
  },
  renderRowSelection() {
    var columns = this.props.columns;
    if (this.props.rowSelection) {
      let checked = this.state.data.every(function(item, i) {
        return this.state.selectedRowKeys.indexOf(i + 1) >= 0;
      }, this);
      let checkboxAll = <input type="checkbox" checked={checked} onChange={this.handleSelectAllRow} />;
      let selectionColumn = {
        key: 'selection-column',
        title: checkboxAll,
        width: 60,
        render: this.renderSelectionCheckBox
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
        menus = <Menu multiple={true}
          className="ant-table-filter-dropdown"
          onSelect={this.handleSelectFilter.bind(this, column)}
          onDeselect={this.handleDeselectFilter.bind(this, column)}>
          {this.renderMenus(column.filters)}
          <Menu.Item disabled>
            <button style={{
                cursor: 'pointer',
                pointerEvents: 'visible'
              }}
              className="ant-btn ant-btn-primary ant-btn-sm"
              onClick={this.handleFilter.bind(this, column)}>
              确 定
            </button>
          </Menu.Item>
        </Menu>;
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
        sortButton = <div className="ant-table-column-sorter">
          <span className={'ant-table-column-sorter-up ' +
                           (column.sortOrder === 'ascend' ? 'on' : 'off')}
            title="升序排序"
            onClick={this.toggleSortOrder.bind(this, 'ascend', column)}>
            <i className="anticon anticon-caret-up"></i>
          </span>
          <span className={'ant-table-column-sorter-down ' +
                           (column.sortOrder === 'descend' ? 'on' : 'off')}
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
    if (this.state.pagination === false) {
      return '';
    }
    return <Pagination className="ant-table-pagination"
      onChange={this.handlePageChange}
      size="simple"
      {...this.state.pagination} />;
  },
  prepareParamsArguments() {
    // 准备筛选、排序、分页的参数
    let pagination;
    let filters = {};
    let sorters = {};
    pagination = this.state.pagination;
    this.props.columns.forEach(function(column) {
      if (column.dataIndex && column.selectedFilters &&
          column.selectedFilters.length > 0) {
        filters[column.dataIndex] = column.selectedFilters;
      }
      if (column.dataIndex && column.sorter &&
          column.sortOrder) {
        sorters[column.dataIndex] = column.sortOrder;
      }
    });
    return [pagination, filters, sorters];
  },
  fetch: function() {
    let dataSource = this.props.dataSource;
    if (this.mode === 'remote') {
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
      let pageSize = this.state.pagination.pageSize;
      let current = this.state.pagination.current;
      this.setState({
        data: this.props.dataSource.filter(function(item, i) {
          if (i >= (current - 1) * pageSize &&
              i < current * pageSize) {
            return item;
          }
        }),
        pagination: this.state.pagination
      });
    }
  },
  componentDidMount() {
    this.handlePageChange();
  },
  render() {
    this.props.columns = this.renderRowSelection();

    var classString = '';
    if (this.props.loading) {
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

export default AntTable;
