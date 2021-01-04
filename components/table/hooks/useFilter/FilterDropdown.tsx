import * as React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import FilterFilled from '@ant-design/icons/FilterFilled';
import Button from '../../../button';
import Menu from '../../../menu';
import Checkbox from '../../../checkbox';
import Radio from '../../../radio';
import Dropdown from '../../../dropdown';
import Empty from '../../../empty';
import { ColumnType, ColumnFilterItem, Key, TableLocale, GetPopupContainer } from '../../interface';
import FilterDropdownMenuWrapper from './FilterWrapper';
import { FilterState } from '.';
import useSyncState from '../../../_util/hooks/useSyncState';
import { ConfigContext } from '../../../config-provider/context';

const { SubMenu, Item: MenuItem } = Menu;

function hasSubMenu(filters: ColumnFilterItem[]) {
  return filters.some(({ children }) => children);
}

function renderFilterItems({
  filters,
  prefixCls,
  filteredKeys,
  filterMultiple,
  locale,
}: {
  filters: ColumnFilterItem[];
  prefixCls: string;
  filteredKeys: Key[];
  filterMultiple: boolean;
  locale: TableLocale;
}) {
  if (filters.length === 0) {
    // wrapped with <div /> to avoid react warning
    // https://github.com/ant-design/ant-design/issues/25979
    return (
      <div
        style={{
          margin: '16px 0',
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={locale.filterEmptyText}
          imageStyle={{
            height: 24,
          }}
        />
      </div>
    );
  }
  return filters.map((filter, index) => {
    const key = String(filter.value);

    if (filter.children) {
      return (
        <SubMenu
          key={key || index}
          title={filter.text}
          popupClassName={`${prefixCls}-dropdown-submenu`}
        >
          {renderFilterItems({
            filters: filter.children,
            prefixCls,
            filteredKeys,
            filterMultiple,
            locale,
          })}
        </SubMenu>
      );
    }

    const Component = filterMultiple ? Checkbox : Radio;

    return (
      <MenuItem key={filter.value !== undefined ? key : index}>
        <Component checked={filteredKeys.includes(key)} />
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

  const filtered: boolean = !!(
    filterState &&
    (filterState.filteredKeys?.length || filterState.forceFiltered)
  );
  const triggerVisible = (newVisible: boolean) => {
    setVisible(newVisible);
    if (onFilterDropdownVisibleChange) {
      onFilterDropdownVisibleChange(newVisible);
    }
  };

  const mergedVisible =
    typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible;

  // ===================== Select Keys =====================
  const propFilteredKeys = filterState && filterState.filteredKeys;
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(propFilteredKeys || []);

  const onSelectKeys = ({ selectedKeys }: { selectedKeys?: Key[] }) => {
    setFilteredKeysSync(selectedKeys!);
  };

  React.useEffect(() => {
    onSelectKeys({ selectedKeys: propFilteredKeys || [] });
  }, [propFilteredKeys]);

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
  React.useEffect(
    () => () => {
      window.clearTimeout(openRef.current);
    },
    [],
  );

  // ======================= Submit ========================
  const internalTriggerFilter = (keys: Key[] | undefined | null) => {
    const mergedKeys = keys && keys.length ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }

    if (isEqual(mergedKeys, filterState?.filteredKeys)) {
      return null;
    }

    triggerFilter({
      column,
      key: columnKey,
      filteredKeys: mergedKeys,
    });
  };

  const onConfirm = () => {
    triggerVisible(false);
    internalTriggerFilter(getFilteredKeysSync());
  };

  const onReset = () => {
    triggerVisible(false);
    setFilteredKeysSync([]);
    internalTriggerFilter([]);
  };

  const doFilter = (closeMenu: boolean = false) => {
    triggerVisible(!closeMenu);
    internalTriggerFilter(getFilteredKeysSync());
  };

  const onVisibleChange = (newVisible: boolean) => {
    if (newVisible && propFilteredKeys !== undefined) {
      // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefiend)
      setFilteredKeysSync(propFilteredKeys || []);
    }

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
      triggerFilter: doFilter,
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const selectedKeys = (getFilteredKeysSync() || []) as any;
    dropdownContent = (
      <>
        <Menu
          multiple={filterMultiple}
          prefixCls={`${dropdownPrefixCls}-menu`}
          className={dropdownMenuClass}
          onClick={onMenuClick}
          onSelect={onSelectKeys}
          onDeselect={onSelectKeys}
          selectedKeys={selectedKeys}
          getPopupContainer={getPopupContainer}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {renderFilterItems({
            filters: column.filters || [],
            prefixCls,
            filteredKeys: getFilteredKeysSync(),
            filterMultiple,
            locale,
          })}
        </Menu>
        <div className={`${prefixCls}-dropdown-btns`}>
          <Button type="link" size="small" disabled={selectedKeys.length === 0} onClick={onReset}>
            {locale.filterReset}
          </Button>
          <Button type="primary" size="small" onClick={onConfirm}>
            {locale.filterConfirm}
          </Button>
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

  const { direction } = React.useContext(ConfigContext);

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
          placement={direction === 'rtl' ? 'bottomLeft' : 'bottomRight'}
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
