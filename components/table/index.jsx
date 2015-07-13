'use strict';

import React from 'react';
import jQuery from 'jquery';
import Table from 'rc-table';
import Menu from 'rc-menu';
import Dropdown from '../dropdown';

let AntTable = React.createClass({
  getInitialState() {
    return {
      selectedRowKeys: [],
      loading: false,
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
      return <Menu.Item key={item.value}>
        {item.text}
      </Menu.Item>;
    });
    return menuItems;
  },
  toggleSortOrder(order, column) {
    if (column.sortOrder === order) {
      column.sortOrder = '';
    } else {
      column.sortOrder = order;
    }
    if (column.sorter) {
      column.sorter.call(this, column.sortOrder);
    }
  },
  onSelectFilter() {
  },
  onDeselectFilter() {
  },
  renderColumnsDropdown() {
    this.props.columns = this.props.columns.map((column) => {
      if (!column.originTitle) {
        column.originTitle = column.title;
      }
      let filterDropdown, menus, sortButton;
      if (column.filter) {
        menus = <Menu multiple={true} onSelect={this.onSelectFilter} onDeselect={this.onDeselectFilter}>
          {this.renderMenus(column.filter())}
          <button className="ant-btn ant-btn-primary ant-btn-sm" onClick={column.onFilter.bind(this)}>
            确 定
          </button>
        </Menu>;
        filterDropdown = <Dropdown trigger="click" closeOnSelect={false} overlay={menus}>
          <i className="anticon anticon-bars"></i>
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
  handleSelect(e) {
    let checked = e.currentTarget.checked;
    let currentRowIndex = e.currentTarget.parentElement.parentElement.rowIndex;
    let selectedRow = this.props.data[currentRowIndex - 1];
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
      selectedRowKeys: checked ? this.props.data.map(function(item, i) {
        return i + 1;
      }) : []
    });
    if (this.props.rowSelection.onSelectAll) {
      this.props.rowSelection.onSelectAll(checked);
    }
  },
  renderSelectionCheckBox(value, record, index) {
    let checked = this.state.selectedRowKeys.indexOf(index + 1) >= 0;
    let checkbox = <input type="checkbox" checked={checked} onChange={this.handleSelect} />;
    return checkbox;
  },
  fetch: function(url) {
    this.props.resolve = this.props.resolve || function(data) {
      return data || [];
    };
    let dataSource = url || this.props.dataSource;
    if (dataSource) {
      this.setState({
        loading: true
      });
      jQuery.ajax({
        url: dataSource,
        success: (result) => {
          result = this.props.resolve.call(this, result);
          if (this.isMounted()) {
            this.setState({
              data: result
            });
          }
        },
        complete: () => {
          this.setState({
            loading: false
          });
        }
      });
    }
  },
  componentDidMount() {
    this.fetch();
  },
  render() {
    if (this.props.rowSelection) {
      let checked = this.props.data.every(function(item, i) {
        return this.state.selectedRowKeys.indexOf(i + 1) >= 0;
      }, this);
      let checkboxAll = <input type="checkbox" checked={checked} onChange={this.handleSelectAllRow} />;
      let selectionColumn = {
        key: 'selection-column',
        title: checkboxAll,
        width: 60,
        render: this.renderSelectionCheckBox
      };
      if (this.props.columns[0] &&
          this.props.columns[0].key === 'selection-column') {
        this.props.columns[0] = selectionColumn;
      } else {
        this.props.columns.unshift(selectionColumn);
      }
    }
    var classString = '';
    if (this.props.loading) {
      classString += ' ant-table-loading';
    }
    if (this.props.size === 'small') {
      classString += ' ant-table-small';
    }
    this.renderColumnsDropdown();
    return <Table data={this.state.data}
      className={classString}
      {...this.props} />;
  }
});

export default AntTable;
