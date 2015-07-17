'use strict';

import React from 'react';
import Menu from 'rc-menu';

export default React.createClass({
  getInitialState() {
    return {
      selectedFilters: []
    };
  },
  getDefaultProps() {
    return {
      handleFilter: function() {},
      column: null
    };
  },
  handleSelectFilter: function(selected) {
    this.state.selectedFilters.push(selected);
    this.setState({
      selectedFilters: this.state.selectedFilters
    });
  },
  handleDeselectFilter: function(key) {
    var index = this.state.selectedFilters.indexOf(key);
    if (index !== -1) {
      this.state.selectedFilters.splice(index, 1);
    }
    this.setState({
      selectedFilters: this.state.selectedFilters
    });
  },
  handleClearFilters() {
    this.setState({
      selectedFilters: []
    });
  },
  renderMenus(items) {
    let menuItems = items.map((item) => {
      return <Menu.Item key={item.value}>{item.text}</Menu.Item>;
    });
    return menuItems;
  },
  render() {
    let column = this.props.column;
    column.selectedFilters = this.state.selectedFilters;
    return <Menu multiple={true}
      prefixCls="ant-dropdown-menu"
      className="ant-table-filter-dropdown"
      onSelect={this.handleSelectFilter}
      onDeselect={this.handleDeselectFilter}
      selectedKeys={column.selectedFilters}>
      {this.renderMenus(column.filters)}
      <Menu.Divider />
      <Menu.Item disabled>
        <a className="ant-table-filter-dropdown-link confirm"
          style={{
            cursor: 'pointer',
            pointerEvents: 'visible'
          }}
          onClick={this.props.confirmFilter}>
          确定
        </a>
        <a className="ant-table-filter-dropdown-link clear"
          style={{
            cursor: 'pointer',
            pointerEvents: 'visible'
          }}
          onClick={this.handleClearFilters}>
          清空
        </a>
      </Menu.Item>
    </Menu>;
  }
});
