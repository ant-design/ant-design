import * as React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import FilterFilled from '@ant-design/icons/FilterFilled';
import Button from '../../../button';
import Menu from '../../../menu';
import Tree from '../../../tree';
import type { DataNode, EventDataNode } from '../../../tree';
import Checkbox from '../../../checkbox';
import type { CheckboxChangeEvent } from '../../../checkbox';
import Radio from '../../../radio';
import Dropdown from '../../../dropdown';
import Empty from '../../../empty';
import {
  ColumnType,
  ColumnFilterItem,
  Key,
  TableLocale,
  GetPopupContainer,
  FilterSearchType,
} from '../../interface';
import FilterDropdownMenuWrapper from './FilterWrapper';
import FilterSearch from './FilterSearch';
import { FilterState, flattenKeys } from '.';
import useSyncState from '../../../_util/hooks/useSyncState';
import { ConfigContext } from '../../../config-provider/context';

interface FilterRestProps {
  confirm?: Boolean;
  closeDropdown?: Boolean;
}

function hasSubMenu(filters: ColumnFilterItem[]) {
  return filters.some(({ children }) => children);
}

function searchValueMatched(searchValue: string, text: React.ReactNode) {
  if (typeof text === 'string' || typeof text === 'number') {
    return text?.toString().toLowerCase().includes(searchValue.trim().toLowerCase());
  }
  return false;
}

function renderFilterItems({
  filters,
  prefixCls,
  filteredKeys,
  filterMultiple,
  searchValue,
  filterSearch,
}: {
  filters: ColumnFilterItem[];
  prefixCls: string;
  filteredKeys: Key[];
  filterMultiple: boolean;
  searchValue: string;
  filterSearch: FilterSearchType;
}) {
  return filters.map((filter, index) => {
    const key = String(filter.value);

    if (filter.children) {
      return (
        <Menu.SubMenu
          key={key || index}
          title={filter.text}
          popupClassName={`${prefixCls}-dropdown-submenu`}
        >
          {renderFilterItems({
            filters: filter.children,
            prefixCls,
            filteredKeys,
            filterMultiple,
            searchValue,
            filterSearch,
          })}
        </Menu.SubMenu>
      );
    }

    const Component = filterMultiple ? Checkbox : Radio;

    const item = (
      <Menu.Item key={filter.value !== undefined ? key : index}>
        <Component checked={filteredKeys.includes(key)} />
        <span>{filter.text}</span>
      </Menu.Item>
    );
    if (searchValue.trim()) {
      if (typeof filterSearch === 'function') {
        return filterSearch(searchValue, filter) ? item : undefined;
      }
      return searchValueMatched(searchValue, filter.text) ? item : undefined;
    }
    return item;
  });
}

export interface FilterDropdownProps<RecordType> {
  tablePrefixCls: string;
  prefixCls: string;
  dropdownPrefixCls: string;
  column: ColumnType<RecordType>;
  filterState?: FilterState<RecordType>;
  filterMultiple: boolean;
  filterMode?: 'menu' | 'tree';
  filterSearch?: FilterSearchType;
  columnKey: Key;
  children: React.ReactNode;
  triggerFilter: (filterState: FilterState<RecordType>) => void;
  locale: TableLocale;
  getPopupContainer?: GetPopupContainer;
}

function FilterDropdown<RecordType>(props: FilterDropdownProps<RecordType>) {
  const {
    tablePrefixCls,
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterMultiple,
    filterMode = 'menu',
    filterSearch = false,
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
    onFilterDropdownVisibleChange?.(newVisible);
  };

  const mergedVisible =
    typeof filterDropdownVisible === 'boolean' ? filterDropdownVisible : visible;

  // ===================== Select Keys =====================
  const propFilteredKeys = filterState?.filteredKeys;
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(propFilteredKeys || []);

  const onSelectKeys = ({ selectedKeys }: { selectedKeys: Key[] }) => {
    setFilteredKeysSync(selectedKeys);
  };

  const onCheck = (keys: Key[], { node, checked }: { node: EventDataNode; checked: boolean }) => {
    if (!filterMultiple) {
      onSelectKeys({ selectedKeys: checked && node.key ? [node.key] : [] });
    } else {
      onSelectKeys({ selectedKeys: keys as Key[] });
    }
  };

  React.useEffect(() => {
    if (!visible) {
      return;
    }
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

  // search in tree mode column filter
  const [searchValue, setSearchValue] = React.useState('');
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  // clear search value after close filter dropdown
  React.useEffect(() => {
    if (!visible) {
      setSearchValue('');
    }
  }, [visible]);

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

  const onReset = (
    { confirm, closeDropdown }: FilterRestProps = { confirm: false, closeDropdown: false },
  ) => {
    if (confirm) {
      internalTriggerFilter([]);
    }
    if (closeDropdown) {
      triggerVisible(false);
    }
    setSearchValue('');
    setFilteredKeysSync([]);
  };

  const doFilter = ({ closeDropdown } = { closeDropdown: true }) => {
    if (closeDropdown) {
      triggerVisible(false);
    }
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

  const onCheckAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allFilterKeys = flattenKeys(column?.filters).map(key => String(key));
      setFilteredKeysSync(allFilterKeys);
    } else {
      setFilteredKeysSync([]);
    }
  };

  const getTreeData = ({ filters }: { filters?: ColumnFilterItem[] }) =>
    (filters || []).map((filter, index) => {
      const key = String(filter.value);
      const item: DataNode = {
        title: filter.text,
        key: filter.value !== undefined ? key : index,
      };
      if (filter.children) {
        item.children = getTreeData({ filters: filter.children });
      }
      return item;
    });

  let dropdownContent: React.ReactNode;
  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys: Key[]) => onSelectKeys({ selectedKeys }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const selectedKeys = (getFilteredKeysSync() || []) as any;
    const getFilterComponent = () => {
      if ((column.filters || []).length === 0) {
        return (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={locale.filterEmptyText}
            imageStyle={{
              height: 24,
            }}
            style={{
              margin: 0,
              padding: '16px 0',
            }}
          />
        );
      }
      if (filterMode === 'tree') {
        return (
          <>
            <FilterSearch
              filterSearch={filterSearch}
              value={searchValue}
              onChange={onSearch}
              tablePrefixCls={tablePrefixCls}
              locale={locale}
            />
            <div className={`${tablePrefixCls}-filter-dropdown-tree`}>
              {filterMultiple ? (
                <Checkbox
                  checked={selectedKeys.length === flattenKeys(column.filters).length}
                  indeterminate={
                    selectedKeys.length > 0 &&
                    selectedKeys.length < flattenKeys(column.filters).length
                  }
                  className={`${tablePrefixCls}-filter-dropdown-checkall`}
                  onChange={onCheckAll}
                >
                  {locale.filterCheckall}
                </Checkbox>
              ) : null}
              <Tree
                checkable
                selectable={false}
                blockNode
                multiple={filterMultiple}
                checkStrictly={!filterMultiple}
                className={`${dropdownPrefixCls}-menu`}
                onCheck={onCheck}
                checkedKeys={selectedKeys}
                selectedKeys={selectedKeys}
                showIcon={false}
                treeData={getTreeData({ filters: column.filters })}
                autoExpandParent
                defaultExpandAll
                filterTreeNode={
                  searchValue.trim()
                    ? node => searchValueMatched(searchValue, node.title)
                    : undefined
                }
              />
            </div>
          </>
        );
      }
      return (
        <>
          <FilterSearch
            filterSearch={filterSearch}
            value={searchValue}
            onChange={onSearch}
            tablePrefixCls={tablePrefixCls}
            locale={locale}
          />
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
              filterSearch,
              prefixCls,
              filteredKeys: getFilteredKeysSync(),
              filterMultiple,
              searchValue,
            })}
          </Menu>
        </>
      );
    };

    dropdownContent = (
      <>
        {getFilterComponent()}
        <div className={`${prefixCls}-dropdown-btns`}>
          <Button
            type="link"
            size="small"
            disabled={selectedKeys.length === 0}
            onClick={() => onReset()}
          >
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
    <div className={`${prefixCls}-column`}>
      <span className={`${tablePrefixCls}-column-title`}>{children}</span>
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
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {filterIcon}
        </span>
      </Dropdown>
    </div>
  );
}

export default FilterDropdown;
