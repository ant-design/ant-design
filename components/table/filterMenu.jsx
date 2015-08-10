import React from 'react';
import Menu from 'rc-menu';

var FilterMenu = React.createClass({
  getInitialState() {
    return {
      selectedKeys: this.props.selectedKeys
    };
  },
  componentWillReceiveProps(nextProps){
    this.setState({
      selectedKeys: nextProps.selectedKeys
    });
  },
  getDefaultProps() {
    return {
      handleFilter: function () {
      },
      column: null
    };
  },
  setSelectedKeys: function ({selectedKeys}) {
    this.setState({
      selectedKeys: selectedKeys
    });
  },
  handleClearFilters() {
    this.setState({
      selectedKeys: []
    });
  },
  handleConfirm(){
    this.props.confirmFilter(this.props.column, this.state.selectedKeys);
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
                 onSelect={this.setSelectedKeys}
                 onDeselect={this.setSelectedKeys}
                 selectedKeys={this.state.selectedKeys}>
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
