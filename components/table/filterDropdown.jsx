import React from 'react';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Checkbox from '../checkbox';
import Radio from '../radio';

export default class FilterMenu extends React.Component {
  static defaultProps = {
    handleFilter() {},
    column: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: this.props.selectedKeys,
      keyPathOfSelectedItem: {},    // 记录所有有选中子菜单的祖先菜单
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.selectedKeys,
    });
  }

  setSelectedKeys = ({ selectedKeys }) => {
    this.setState({ selectedKeys });
  }

  handleClearFilters = () => {
    this.setState({
      selectedKeys: [],
    }, this.handleConfirm);
  }

  handleConfirm = () => {
    this.setState({
      visible: false,
    });
    this.props.confirmFilter(this.props.column, this.state.selectedKeys);
  }

  onVisibleChange = (visible) => {
    this.setState({
      visible,
    });
    if (!visible) {
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    }
  }

  renderMenuItem(item) {
    const { column } = this.props;
    const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
    return (
      <MenuItem key={item.value}>
        {
          multiple
            ? <Checkbox checked={this.state.selectedKeys.indexOf(item.value.toString()) >= 0} />
            : <Radio checked={this.state.selectedKeys.indexOf(item.value.toString()) >= 0} />
        }
        <span>{item.text}</span>
      </MenuItem>
    );
  }

  renderMenus(items) {
    return items.map(item => {
      if (item.children && item.children.length > 0) {
        const { keyPathOfSelectedItem } = this.state;
        const containSelected = Object.keys(keyPathOfSelectedItem).some(
          key => keyPathOfSelectedItem[key].indexOf(item.value) >= 0
        );
        const subMenuCls = containSelected ? 'ant-dropdown-submenu-contain-selected' : '';
        return (
          <SubMenu title={item.text} className={subMenuCls} key={item.value.toString()}>
            {item.children.map(child => this.renderMenuItem(child))}
          </SubMenu>
        );
      }
      return this.renderMenuItem(item);
    });
  }

  handleMenuItemClick = (info) => {
    if (info.keyPath.length <= 1) {
      return;
    }
    const keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
    if (this.state.selectedKeys.indexOf(info.key) >= 0) {
      // deselect SubMenu child
      delete keyPathOfSelectedItem[info.key];
    } else {
      // select SubMenu child
      keyPathOfSelectedItem[info.key] = info.keyPath;
    }
    this.setState({ keyPathOfSelectedItem });
  }

  render() {
    const { column, locale } = this.props;
    // default multiple selection in filter dropdown
    const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;

    const menus = (
      <div className="ant-table-filter-dropdown">
        <Menu multiple={multiple}
          onClick={this.handleMenuItemClick}
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
      </div>
    );

    const dropdownSelectedClass = (this.props.selectedKeys.length > 0)
      ? 'ant-table-filter-selected' : '';

    return (
      <Dropdown trigger={['click']}
        overlay={menus}
        visible={this.state.visible}
        onVisibleChange={this.onVisibleChange}
        closeOnSelect={false}>
        <Icon title={locale.filterTitle} type="filter" className={dropdownSelectedClass} />
      </Dropdown>
    );
  }
}
