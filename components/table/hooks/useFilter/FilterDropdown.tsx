import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { FilterFilled } from '@ant-design/icons';
import Menu from '../../../menu';
import Checkbox from '../../../checkbox';
import Radio from '../../../radio';
import Dropdown from '../../../dropdown';
import { ColumnType, ColumnFilterItem, Key, TableLocale, GetPopupContainer } from '../../interface';
import FilterDropdownMenuWrapper from './FilterWrapper';
import { FilterState } from '.';
import useSyncState from '../useSyncState';

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
          popupClassName={`${prefixCls}-dropdown-submenu`}
        >
          {renderFilterItems(filter.children, prefixCls, filteredKeys, multiple)}
        </SubMenu>
      );
    }

    const Component = multiple ? Checkbox : Radio;

    return (
      <MenuItem key={filter.value !== undefined ? filter.value : index}>
        <Component checked={filteredKeys.includes(String(filter.value))} />
        <span>{filter.text}</span>
      </MenuItem>
    );
  });
}

export interface FilterDropdownProps<RecordType> {
  prefixCls: string;
  dropdownPrefixCls: string;
  column: ColumnType<RecordType>;
  filterState?: FilterState<RecordType>;
  filterMultiple: boolean;
  columnKey: Key;
  children: React.ReactNode;
  triggerFilter: (filterState: FilterState<RecordType>) => void;
  locale: TableLocale;
  getPopupContainer?: GetPopupContainer;
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
    locale,
    children,
    getPopupContainer,
  } = props;

  const { filterDropdownVisible, onFilterDropdownVisibleChange } = column;
  const [visible, setVisible] = React.useState(false);

  const filtered: boolean = !!(filterState && filterState.filteredKeys);
  const triggerVisible = (newVisible: boolean) => {
    setVisible(newVisible);
    if (onFilterDropdownVisibleChange) {
      onFilterDropdownVisibleChange(newVisible);
    }
  };

  const mergedVisible =
    typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible;

  // ===================== Select Keys =====================
  const [propFilteredKeys, setPropFilteredKeys] = React.useState(
    filterState && filterState.filteredKeys,
  );
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(propFilteredKeys || []);

  const onSelectKeys = ({ selectedKeys }: { selectedKeys: Key[] }) => {
    setFilteredKeysSync(selectedKeys);
  };

  React.useEffect(() => {
    // Sync internal filtered keys when props key changed
    const newFilteredKeys = filterState && filterState.filteredKeys;
    if (!shallowEqual(propFilteredKeys, newFilteredKeys)) {
      setPropFilteredKeys(newFilteredKeys);
      onSelectKeys({ selectedKeys: newFilteredKeys || [] });
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

  // ======================= Submit ========================
  const internalTriggerFilter = (keys: Key[] | undefined | null) => {
    triggerVisible(false);

    const mergedKeys = keys && keys.length ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }

    triggerFilter({
      column,
      key: columnKey,
      filteredKeys: mergedKeys,
    });
  };

  const onConfirm = () => {
    internalTriggerFilter(getFilteredKeysSync());
  };

  const onReset = () => {
    internalTriggerFilter([]);
  };

  const onVisibleChange = (newVisible: boolean) => {
    triggerVisible(newVisible);

    // Default will filter when closed
    if (!newVisible && !column.filterDropdown) {
      onConfirm();
    }
  };

  // ======================== Style ========================
  const dropdownMenuClass = classNames({
    [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu(column.filters || []),
  });

  let dropdownContent: React.ReactNode;

  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys: Key[]) => onSelectKeys({ selectedKeys }),
      selectedKeys: getFilteredKeysSync(),
      confirm: onConfirm,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    dropdownContent = (
      <>
        <Menu
          multiple={filterMultiple}
          prefixCls={`${dropdownPrefixCls}-menu`}
          className={dropdownMenuClass}
          onClick={onMenuClick}
          onSelect={onSelectKeys}
          onDeselect={onSelectKeys}
          selectedKeys={(getFilteredKeysSync() || []) as any}
          getPopupContainer={getPopupContainer}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {renderFilterItems(column.filters!, prefixCls, getFilteredKeysSync(), filterMultiple)}
        </Menu>
        <div className={`${prefixCls}-dropdown-btns`}>
          <a className={`${prefixCls}-dropdown-link confirm`} onClick={onConfirm}>
            {locale.filterConfirm}
          </a>
          <a className={`${prefixCls}-dropdown-link clear`} onClick={onReset}>
            {locale.filterReset}
          </a>
        </div>
      </>
    );
  }

  const menu = (
    <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
      {dropdownContent}
    </FilterDropdownMenuWrapper>
  );

  let filterIcon: React.ReactNode;
  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = <FilterFilled />;
  }

  return (
    <div className={classNames(`${prefixCls}-column`)}>
      <span className={`${prefixCls}-column-title`}>{children}</span>

      <span
        className={classNames(`${prefixCls}-trigger-container`, {
          [`${prefixCls}-trigger-container-open`]: mergedVisible,
        })}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Dropdown
          overlay={menu}
          trigger={['click']}
          visible={mergedVisible}
          onVisibleChange={onVisibleChange}
          getPopupContainer={getPopupContainer}
          placement="bottomRight"
        >
          <span
            role="button"
            tabIndex={-1}
            className={classNames(`${prefixCls}-trigger`, {
              active: filtered,
            })}
          >
            {filterIcon}
          </span>
        </Dropdown>
      </span>
    </div>
  );
}

export default FilterDropdown;
