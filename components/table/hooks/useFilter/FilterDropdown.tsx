import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { FilterFilled } from '@ant-design/icons';
import Menu, { SelectParam } from '../../../menu';
import Checkbox from '../../../checkbox';
import Radio from '../../../radio';
import Dropdown from '../../../dropdown';
import { ColumnType, ColumnFilterItem, Key, TableLocale } from '../../interface';
import FilterDropdownMenuWrapper from './FilterWrapper';
import { FilterState } from '.';
import { ConfigContext } from '../../../config-provider';
import defaultLocale from '../../../locale/en_US';

const { SubMenu, Item: MenuItem } = Menu;

function hasSubMenu(filters: ColumnFilterItem[]) {
  return filters.some(({ children }) => children);
}

function renderFilterItems(
  filters: ColumnFilterItem[],
  prefixCls: string,
  filteredKeys: Key[],
  multiple: boolean,
) {
  return filters.map((filter, index) => {
    if (filter.children) {
      return (
        <SubMenu
          key={filter.value || index}
          title={filter.text}
          popupClassName={`${prefixCls}-dropdown-submenu 122222`}
        >
          {renderFilterItems(filter.children, prefixCls, filteredKeys, multiple)}
        </SubMenu>
      );
    }

    const Component = multiple ? Checkbox : Radio;

    return (
      <MenuItem key={filter.value || index}>
        <Component checked={filteredKeys.includes(String(filter.value))} />
        <span>{filter.text}</span>
      </MenuItem>
    );
  });
}

function formatKeys(keys?: Key[]) {
  return (keys || []).map(key => String(key));
}

export interface FilterDropdownProps<RecordType> {
  prefixCls: string;
  dropdownPrefixCls: string;
  column: ColumnType<RecordType>;
  filterState?: FilterState<RecordType>;
  filterMultiple: boolean;
  columnKey: string;
  children: React.ReactNode;
  triggerFilter: (filterState: FilterState<RecordType>) => void;
}

function FilterDropdown<RecordType>(props: FilterDropdownProps<RecordType>) {
  const {
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterMultiple,
    filterState,
    triggerFilter,
    children,
  } = props;

  const { locale = defaultLocale } = React.useContext(ConfigContext);
  const tableLocale = (locale.Table || {}) as TableLocale;

  // ===================== Select Keys =====================
  const [propFilteredKeys, setPropFilteredKeys] = React.useState(
    formatKeys(filterState && filterState.filteredKeys),
  );
  const [filteredKeys, setFilteredKeys] = React.useState(propFilteredKeys);

  React.useEffect(() => {
    // Sync internal filtered keys when props key changed
    const newFilteredKeys = formatKeys(filterState && filterState.filteredKeys);
    if (!shallowEqual(propFilteredKeys, newFilteredKeys)) {
      setPropFilteredKeys(newFilteredKeys);
      setFilteredKeys(newFilteredKeys);
    }
  }, [filterState]);

  // ====================== Open Keys ======================
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const openRef = React.useRef<number>();
  const onOpenChange = (keys: string[]) => {
    openRef.current = window.setTimeout(() => {
      setOpenKeys(keys);
    });
  };
  const onMenuClick = () => {
    window.clearTimeout(openRef.current);
  };
  React.useEffect(() => {
    return () => {
      window.clearTimeout(openRef.current);
    };
  }, []);

  // ======================== Style ========================
  const dropdownMenuClass = classNames({
    [`${dropdownPrefixCls}-menu-without-submenu`]: hasSubMenu(column.filters || []),
  });

  const onSelectKeys = ({ selectedKeys }: SelectParam) => {
    setFilteredKeys(formatKeys(selectedKeys));
    // triggerFilter({
    //   column,
    //   key: columnKey,
    //   filteredKeys: selectedKeys,
    // });
  };

  const menu = (
    <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
      <Menu
        multiple={filterMultiple}
        prefixCls={`${dropdownPrefixCls}-menu`}
        className={dropdownMenuClass}
        onClick={onMenuClick}
        onSelect={onSelectKeys}
        onDeselect={onSelectKeys}
        selectedKeys={filteredKeys}
        // getPopupContainer={getPopupContainer}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {renderFilterItems(column.filters!, prefixCls, filteredKeys, filterMultiple)}
      </Menu>
      <div className={`${prefixCls}-dropdown-btns`}>
        <a
          className={`${prefixCls}-dropdown-link confirm`}
          //  onClick={this.handleConfirm}
        >
          {tableLocale.filterConfirm}
        </a>
        <a
          className={`${prefixCls}-dropdown-link clear`}
          //  onClick={this.handleClearFilters}
        >
          {tableLocale.filterReset}
        </a>
      </div>
    </FilterDropdownMenuWrapper>
  );

  return (
    <div className={classNames(`${prefixCls}-column`)}>
      <span className={`${prefixCls}-column-title`}>{children}</span>
      <span
        role="button"
        tabIndex={-1}
        className={classNames(`${prefixCls}-trigger`)}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Dropdown overlay={menu} trigger={['click']}>
          <FilterFilled />
        </Dropdown>
      </span>
    </div>
  );
}

export default FilterDropdown;
