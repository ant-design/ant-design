import React from 'react';
import Menu from 'rc-menu';

var FilterMenu = React.createClass({
  getInitialState() {
    return {
      selectedFilters: this.props.selectedFilters
    };
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      selectedFilters: nextProps.selectedFilters
    });
  },
  getDefaultProps() {
    return {
      handleFilter: function () {
      },
      column: null
    };
  },
  handleSelectFilter: function (selected) {
    this.setState({
      selectedFilters: this.state.selectedFilters.concat(selected)
    });
  },
  handleDeselectFilter: function (key) {
    var index = this.state.selectedFilters.indexOf(key);
    if (index !== -1) {
      var selectedFilters = this.state.selectedFilters.concat();
      selectedFilters.splice(index, 1);
      this.setState({
        selectedFilters: selectedFilters
      });
    }
  },
  handleClearFilters() {
    this.setState({
      selectedFilters: []
    });
  },
  handleConfirm(){
    this.props.confirmFilter(this.props.column, this.state.selectedFilters);
  },
  renderMenus(items) {
    let menuItems = items.map((item) => {
      return <Menu.Item key={item.value}>{item.text}</Menu.Item>;
    });
    return menuItems;
  },
  render() {
    let column = this.props.column;
    return <Menu multiple={true}
                 prefixCls="ant-dropdown-menu"
                 className="ant-table-filter-dropdown"
                 onSelect={this.handleSelectFilter}
                 onDeselect={this.handleDeselectFilter}
                 selectedKeys={this.state.selectedFilters}>
      {this.renderMenus(column.filters)}
      <Menu.Divider />
      <Menu.Item disabled>
        <a className="ant-table-filter-dropdown-link confirm"
           style={{
            cursor: 'pointer',
            pointerEvents: 'visible'
          }}
           onClick={this.handleConfirm}>
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

export default FilterMenu;
