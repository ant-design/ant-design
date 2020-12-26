import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import closest from 'dom-closest';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Checkbox from '../checkbox';
import Radio from '../radio';
import FilterDropdownMenuWrapper from './FilterDropdownMenuWrapper';
import { FilterMenuProps, FilterMenuState, ColumnProps, ColumnFilterItem } from './interface';
import { generateValueMaps } from './util';

function stopPropagation(e: React.SyntheticEvent<any>) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

class FilterMenu<T> extends React.Component<FilterMenuProps<T>, FilterMenuState<T>> {
  static defaultProps = {
    column: {},
  };

  static getDerivedStateFromProps<T>(nextProps: FilterMenuProps<T>, prevState: FilterMenuState<T>) {
    const { column } = nextProps;
    const { prevProps } = prevState;

    const newState: Partial<FilterMenuState<T>> = {
      prevProps: nextProps,
    };

    /**
     * if the state is visible the component should ignore updates on selectedKeys prop to avoid
     * that the user selection is lost
     * this happens frequently when a table is connected on some sort of realtime data
     * Fixes https://github.com/ant-design/ant-design/issues/10289 and
     * https://github.com/ant-design/ant-design/issues/10209
     */
    if (
      'selectedKeys' in nextProps &&
      !shallowequal(prevProps.selectedKeys, nextProps.selectedKeys)
    ) {
      newState.selectedKeys = nextProps.selectedKeys;
    }
    if (!shallowequal((prevProps.column || {}).filters, (nextProps.column || {}).filters)) {
      newState.valueKeys = generateValueMaps(nextProps.column.filters);
    }
    if ('filterDropdownVisible' in column) {
      newState.visible = column.filterDropdownVisible as boolean;
    }
    return newState;
  }

  neverShown: boolean;

  constructor(props: FilterMenuProps<T>) {
    super(props);

    const visible =
      'filterDropdownVisible' in props.column ? props.column.filterDropdownVisible : false;

    this.state = {
      selectedKeys: props.selectedKeys,
      valueKeys: generateValueMaps(props.column.filters),
      keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
      visible,
      prevProps: props,
    };
  }

  componentDidMount() {
    const { column } = this.props;
    this.setNeverShown(column);
  }

  componentDidUpdate() {
    const { column } = this.props;
    this.setNeverShown(column);
  }

  getDropdownVisible() {
    return this.neverShown ? false : this.state.visible;
  }

  setNeverShown = (column: ColumnProps<T>) => {
    const rootNode = ReactDOM.findDOMNode(this);
    const filterBelongToScrollBody = !!closest(rootNode, `.ant-table-scroll`);
    if (filterBelongToScrollBody) {
      // When fixed column have filters, there will be two dropdown menus
      // Filter dropdown menu inside scroll body should never be shown
      // To fix https://github.com/ant-design/ant-design/issues/5010 and
      // https://github.com/ant-design/ant-design/issues/7909
      this.neverShown = !!column.fixed;
    }
  };

  setSelectedKeys = ({ selectedKeys }: { selectedKeys?: React.Key[] }) => {
    this.setState({ selectedKeys: selectedKeys! });
  };

  setVisible(visible: boolean) {
    const { column } = this.props;
    if (!('filterDropdownVisible' in column)) {
      this.setState({ visible });
    }
    if (column.onFilterDropdownVisibleChange) {
      column.onFilterDropdownVisibleChange(visible);
    }
  }

  handleClearFilters = () => {
    this.setState(
      {
        selectedKeys: [],
      },
      this.handleConfirm,
    );
  };

  handleConfirm = () => {
    this.setVisible(false);

    // Call `setSelectedKeys` & `confirm` in the same time will make filter data not up to date
    // https://github.com/ant-design/ant-design/issues/12284
    this.setState({}, this.confirmFilter);
  };

  onVisibleChange = (visible: boolean) => {
    this.setVisible(visible);
    const { column } = this.props;
    // https://github.com/ant-design/ant-design/issues/17833
    if (!visible && !(column.filterDropdown instanceof Function)) {
      this.confirmFilter();
    }
  };

  handleMenuItemClick = (info: { keyPath: React.Key[]; key: React.Key }) => {
    const { selectedKeys } = this.state;
    if (!info.keyPath || info.keyPath.length <= 1) {
      return;
    }
    const { keyPathOfSelectedItem } = this.state;
    if (selectedKeys && selectedKeys.indexOf(info.key) >= 0) {
      // deselect SubMenu child
      delete keyPathOfSelectedItem[info.key];
    } else {
      // select SubMenu child
      keyPathOfSelectedItem[info.key] = info.keyPath;
    }
    this.setState({ keyPathOfSelectedItem });
  };

  hasSubMenu() {
    const {
      column: { filters = [] },
    } = this.props;
    return filters.some(item => !!(item.children && item.children.length > 0));
  }

  confirmFilter() {
    const { column, selectedKeys: propSelectedKeys, confirmFilter } = this.props;
    const { selectedKeys, valueKeys } = this.state;
    const { filterDropdown } = column;

    if (!shallowequal(selectedKeys, propSelectedKeys)) {
      confirmFilter(
        column,
        filterDropdown
          ? selectedKeys
          : selectedKeys.map(key => valueKeys[key]).filter(key => key !== undefined),
      );
    }
  }

  renderMenus(items: ColumnFilterItem[]): React.ReactElement<any>[] {
    const { dropdownPrefixCls, prefixCls } = this.props;
    return items.map(item => {
      if (item.children && item.children.length > 0) {
        const { keyPathOfSelectedItem } = this.state;
        const containSelected = Object.keys(keyPathOfSelectedItem).some(
          key => keyPathOfSelectedItem[key].indexOf(item.value) >= 0,
        );
        const subMenuCls = classNames(`${prefixCls}-dropdown-submenu`, {
          [`${dropdownPrefixCls}-submenu-contain-selected`]: containSelected,
        });
        return (
          <SubMenu title={item.text} popupClassName={subMenuCls} key={item.value.toString()}>
            {this.renderMenus(item.children)}
          </SubMenu>
        );
      }
      return this.renderMenuItem(item);
    });
  }

  renderFilterIcon = () => {
    const { column, locale, prefixCls, selectedKeys } = this.props;
    const filtered = column.filtered || (selectedKeys && selectedKeys.length > 0);
    let filterIcon = column.filterIcon;
    if (typeof filterIcon === 'function') {
      filterIcon = filterIcon(filtered);
    }

    const dropdownIconClass = classNames({
      [`${prefixCls}-selected`]: filtered,
      [`${prefixCls}-open`]: this.getDropdownVisible(),
    });

    if (!filterIcon) {
      return (
        <Icon
          title={locale.filterTitle}
          type="filter"
          theme="filled"
          className={dropdownIconClass}
          onClick={stopPropagation}
        />
      );
    }

    if (React.isValidElement(filterIcon)) {
      return React.cloneElement(filterIcon, {
        title: filterIcon.props.title || locale.filterTitle,
        className: classNames(`${prefixCls}-icon`, dropdownIconClass, filterIcon.props.className),
        onClick: stopPropagation,
      });
    }

    return <span className={classNames(`${prefixCls}-icon`, dropdownIconClass)}>{filterIcon}</span>;
  };

  renderMenuItem(item: ColumnFilterItem) {
    const { column } = this.props;
    const { selectedKeys } = this.state;
    const multiple = 'filterMultiple' in column ? column.filterMultiple : true;

    // We still need trade key as string since Menu render need string
    const internalSelectedKeys = (selectedKeys || []).map(key => key.toString());

    const input = multiple ? (
      <Checkbox checked={internalSelectedKeys.indexOf(item.value.toString()) >= 0} />
    ) : (
      <Radio checked={internalSelectedKeys.indexOf(item.value.toString()) >= 0} />
    );

    return (
      <MenuItem key={item.value}>
        {input}
        <span>{item.text}</span>
      </MenuItem>
    );
  }

  render() {
    const { selectedKeys: originSelectedKeys } = this.state;
    const { column, locale, prefixCls, dropdownPrefixCls, getPopupContainer } = this.props;
    // default multiple selection in filter dropdown
    const multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    const dropdownMenuClass = classNames({
      [`${dropdownPrefixCls}-menu-without-submenu`]: !this.hasSubMenu(),
    });
    let { filterDropdown } = column;
    if (filterDropdown instanceof Function) {
      filterDropdown = filterDropdown({
        prefixCls: `${dropdownPrefixCls}-custom`,
        setSelectedKeys: (selectedKeys: Array<any>) => this.setSelectedKeys({ selectedKeys }),
        selectedKeys: originSelectedKeys,
        confirm: this.handleConfirm,
        clearFilters: this.handleClearFilters,
        filters: column.filters,
        visible: this.getDropdownVisible(),
      });
    }

    const menus = filterDropdown ? (
      <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
        {filterDropdown}
      </FilterDropdownMenuWrapper>
    ) : (
      <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
        <Menu
          multiple={multiple}
          onClick={this.handleMenuItemClick}
          prefixCls={`${dropdownPrefixCls}-menu`}
          className={dropdownMenuClass}
          onSelect={this.setSelectedKeys}
          onDeselect={this.setSelectedKeys}
          selectedKeys={originSelectedKeys && originSelectedKeys.map(val => val.toString())}
          getPopupContainer={getPopupContainer}
        >
          {this.renderMenus(column.filters!)}
        </Menu>
        <div className={`${prefixCls}-dropdown-btns`}>
          <a className={`${prefixCls}-dropdown-link confirm`} onClick={this.handleConfirm}>
            {locale.filterConfirm}
          </a>
          <a className={`${prefixCls}-dropdown-link clear`} onClick={this.handleClearFilters}>
            {locale.filterReset}
          </a>
        </div>
      </FilterDropdownMenuWrapper>
    );

    return (
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        overlay={menus}
        visible={this.getDropdownVisible()}
        onVisibleChange={this.onVisibleChange}
        getPopupContainer={getPopupContainer}
        forceRender
      >
        {this.renderFilterIcon()}
      </Dropdown>
    );
  }
}

polyfill(FilterMenu);

export default FilterMenu;
