import React from 'react';
import Menu from 'rc-menu';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Checkbox from '../checkbox';

let FilterMenu = React.createClass({
  getInitialState() {
    return {
      selectedKeys: this.props.selectedKeys,
      visible: false
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
    this.setState({ selectedKeys });
  },
  handleClearFilters() {
    this.setState({
      selectedKeys: []
    }, this.handleConfirm);
  },
  handleConfirm() {
    this.setState({
      visible: false
    });
    this.props.confirmFilter(this.props.column, this.state.selectedKeys);
  },
  onVisibleChange(visible) {
    this.setState({
      visible: visible
    });
    if (!visible) {
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    }
  },
  renderMenus(items) {
    let menuItems = items.map((item) => {
      return <Menu.Item key={item.value}>
        <Checkbox checked={this.state.selectedKeys.indexOf(item.value) >= 0} />
        {item.text}
      </Menu.Item>;
    });
    return menuItems;
  },
  render() {
    let {column, locale} = this.props;
    // default multiple selection in filter dropdown
    let multiple = true;
    if ('filterMultiple' in column) {
      multiple = column.filterMultiple;
    }
    let menus = <div className="ant-table-filter-dropdown">
      <Menu multiple={multiple}
                 prefixCls="ant-dropdown-menu"
                 onSelect={this.setSelectedKeys}
                 onDeselect={this.setSelectedKeys}
                 selectedKeys={this.state.selectedKeys}>
      {this.renderMenus(column.filters)}
      </Menu>
      <div className="ant-table-filter-dropdown-btns">
        <a className="ant-table-filter-dropdown-link confirm"
           onClick={this.handleConfirm}>
          {locale.filterConfirm}
        </a>
        <a className="ant-table-filter-dropdown-link clear"
           onClick={this.handleClearFilters}>
          {locale.filterReset}
        </a>
      </div>
    </div>;

    let dropdownSelectedClass = '';
    if (this.props.selectedKeys.length > 0) {
      dropdownSelectedClass = 'ant-table-filter-selected';
    }

    return <Dropdown trigger={['click']}
                     overlay={menus}
                     visible={this.state.visible}
                     onVisibleChange={this.onVisibleChange}
                     closeOnSelect={false}>
      <Icon title={locale.filterTitle} type="filter" className={dropdownSelectedClass} />
    </Dropdown>;
  }
});

export default FilterMenu;
