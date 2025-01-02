import * as React from 'react';
import FilterFilled from '@ant-design/icons/FilterFilled';
import type { AnyObject } from 'antd/es/_util/type';
import classNames from 'classnames';
import type { FieldDataNode } from 'rc-tree';
import isEqual from 'rc-util/lib/isEqual';

import type { FilterState } from '.';
import extendsObject from '../../../_util/extendsObject';
import useSyncState from '../../../_util/hooks/useSyncState';
import { devUseWarning } from '../../../_util/warning';
import Button from '../../../button';
import type { CheckboxChangeEvent } from '../../../checkbox';
import Checkbox from '../../../checkbox';
import { ConfigContext } from '../../../config-provider/context';
import Dropdown from '../../../dropdown';
import type { DropdownProps } from '../../../dropdown';
import Empty from '../../../empty';
import type { MenuProps } from '../../../menu';
import Menu from '../../../menu';
import { OverrideProvider } from '../../../menu/OverrideContext';
import Radio from '../../../radio';
import type { EventDataNode } from '../../../tree';
import Tree from '../../../tree';
import type {
  ColumnFilterItem,
  ColumnType,
  FilterKey,
  FilterSearchType,
  FilterValue,
  GetPopupContainer,
  Key,
  TableLocale,
} from '../../interface';
import FilterSearch from './FilterSearch';
import FilterDropdownMenuWrapper from './FilterWrapper';

type FilterTreeDataNode = FieldDataNode<{ title: React.ReactNode; key: string }>;

interface FilterRestProps {
  confirm?: boolean;
  closeDropdown?: boolean;
}

export function flattenKeys(filters?: ColumnFilterItem[]) {
  let keys: FilterValue = [];
  (filters || []).forEach(({ value, children }) => {
    keys.push(value);
    if (children) {
      keys = [...keys, ...flattenKeys(children)];
    }
  });
  return keys;
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
  filterSearch: FilterSearchType<ColumnFilterItem>;
}): Required<MenuProps>['items'] {
  return filters.map((filter, index) => {
    const key = String(filter.value);

    if (filter.children) {
      return {
        key: key || index,
        label: filter.text,
        popupClassName: `${prefixCls}-dropdown-submenu`,
        children: renderFilterItems({
          filters: filter.children,
          prefixCls,
          filteredKeys,
          filterMultiple,
          searchValue,
          filterSearch,
        }),
      };
    }

    const Component = filterMultiple ? Checkbox : Radio;

    const item = {
      key: filter.value !== undefined ? key : index,
      label: (
        <>
          <Component checked={filteredKeys.includes(key)} />
          <span>{filter.text}</span>
        </>
      ),
    };
    if (searchValue.trim()) {
      if (typeof filterSearch === 'function') {
        return filterSearch(searchValue, filter) ? item : null;
      }
      return searchValueMatched(searchValue, filter.text) ? item : null;
    }
    return item;
  });
}

export type TreeColumnFilterItem = ColumnFilterItem & FilterTreeDataNode;

export interface FilterDropdownProps<RecordType = AnyObject> {
  tablePrefixCls: string;
  prefixCls: string;
  dropdownPrefixCls: string;
  column: ColumnType<RecordType>;
  filterState?: FilterState<RecordType>;
  filterOnClose: boolean;
  filterMultiple: boolean;
  filterMode?: 'menu' | 'tree';
  filterSearch?: FilterSearchType<ColumnFilterItem | TreeColumnFilterItem>;
  columnKey: Key;
  children: React.ReactNode;
  triggerFilter: (filterState: FilterState<RecordType>) => void;
  locale: TableLocale;
  getPopupContainer?: GetPopupContainer;
  filterResetToDefaultFilteredValue?: boolean;
  rootClassName?: string;
}

function wrapStringListType(keys?: FilterKey) {
  return (keys as string[]) || [];
}

const FilterDropdown = <RecordType extends AnyObject = AnyObject>(
  props: FilterDropdownProps<RecordType>,
) => {
  const {
    tablePrefixCls,
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterOnClose,
    filterMultiple,
    filterMode = 'menu',
    filterSearch = false,
    filterState,
    triggerFilter,
    locale,
    children,
    getPopupContainer,
    rootClassName,
  } = props;

  const {
    filterResetToDefaultFilteredValue,
    defaultFilteredValue,
    filterDropdownProps = {},
    // Deprecated
    filterDropdownOpen,
    filterDropdownVisible,
    onFilterDropdownVisibleChange,
    onFilterDropdownOpenChange,
  } = column;
  const [visible, setVisible] = React.useState(false);

  const filtered: boolean = !!(
    filterState &&
    (filterState.filteredKeys?.length || filterState.forceFiltered)
  );
  const triggerVisible = (newVisible: boolean) => {
    setVisible(newVisible);
    filterDropdownProps.onOpenChange?.(newVisible);
    // deprecated
    onFilterDropdownOpenChange?.(newVisible);
    onFilterDropdownVisibleChange?.(newVisible);
  };

  // =================Warning===================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Table');

    const deprecatedList: [keyof typeof column, string][] = [
      ['filterDropdownOpen', 'filterDropdownProps.open'],
      ['filterDropdownVisible', 'filterDropdownProps.open'],
      ['onFilterDropdownOpenChange', 'filterDropdownProps.onOpenChange'],
      ['onFilterDropdownVisibleChange', 'filterDropdownProps.onOpenChange'],
    ];

    deprecatedList.forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in column), deprecatedName, newName);
    });
  }

  const mergedVisible =
    filterDropdownProps.open ??
    filterDropdownOpen ?? // deprecated
    filterDropdownVisible ?? // deprecated
    visible; // inner state

  // ===================== Select Keys =====================
  const propFilteredKeys = filterState?.filteredKeys;
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(
    wrapStringListType(propFilteredKeys),
  );

  const onSelectKeys = ({ selectedKeys }: { selectedKeys: string[] }) => {
    setFilteredKeysSync(selectedKeys);
  };

  const onCheck = (
    keys: string[],
    { node, checked }: { node: EventDataNode<FilterTreeDataNode>; checked: boolean },
  ) => {
    if (!filterMultiple) {
      onSelectKeys({ selectedKeys: checked && node.key ? [node.key] : [] });
    } else {
      onSelectKeys({ selectedKeys: keys });
    }
  };

  React.useEffect(() => {
    if (!visible) {
      return;
    }
    onSelectKeys({ selectedKeys: wrapStringListType(propFilteredKeys) });
  }, [propFilteredKeys]);

  // ====================== Open Keys ======================
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

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
  const internalTriggerFilter = (keys?: string[]) => {
    const mergedKeys = keys?.length ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }

    if (isEqual(mergedKeys, filterState?.filteredKeys, true)) {
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

    if (filterResetToDefaultFilteredValue) {
      setFilteredKeysSync((defaultFilteredValue || []).map((key) => String(key)));
    } else {
      setFilteredKeysSync([]);
    }
  };

  const doFilter = ({ closeDropdown } = { closeDropdown: true }) => {
    if (closeDropdown) {
      triggerVisible(false);
    }
    internalTriggerFilter(getFilteredKeysSync());
  };

  const onVisibleChange: DropdownProps['onOpenChange'] = (newVisible, info) => {
    if (info.source === 'trigger') {
      if (newVisible && propFilteredKeys !== undefined) {
        // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefined)
        setFilteredKeysSync(wrapStringListType(propFilteredKeys));
      }

      triggerVisible(newVisible);

      if (!newVisible && !column.filterDropdown && filterOnClose) {
        onConfirm();
      }
    }
  };

  // ======================== Style ========================
  const dropdownMenuClass = classNames({
    [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu(column.filters || []),
  });

  const onCheckAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allFilterKeys = flattenKeys(column?.filters).map((key) => String(key));
      setFilteredKeysSync(allFilterKeys);
    } else {
      setFilteredKeysSync([]);
    }
  };

  const getTreeData = ({ filters }: { filters?: ColumnFilterItem[] }) =>
    (filters || []).map((filter, index) => {
      const key = String(filter.value);
      const item: FilterTreeDataNode = {
        title: filter.text,
        key: filter.value !== undefined ? key : String(index),
      };
      if (filter.children) {
        item.children = getTreeData({ filters: filter.children });
      }
      return item;
    });
  const getFilterData = (node: FilterTreeDataNode): TreeColumnFilterItem => ({
    ...node,
    text: node.title,
    value: node.key,
    children: node.children?.map((item) => getFilterData(item)) || [],
  });

  let dropdownContent: React.ReactNode;

  const { direction, renderEmpty } = React.useContext(ConfigContext);

  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys) => onSelectKeys({ selectedKeys: selectedKeys as string[] }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
      close: () => {
        triggerVisible(false);
      },
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const selectedKeys = getFilteredKeysSync() || [];
    const getFilterComponent = () => {
      const empty = renderEmpty?.('Table.filter') ?? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={locale.filterEmptyText}
          styles={{
            icon: {
              height: 24,
            },
          }}
          style={{
            margin: 0,
            padding: '16px 0',
          }}
        />
      );
      if ((column.filters || []).length === 0) {
        return empty;
      }
      if (filterMode === 'tree') {
        return (
          <>
            <FilterSearch<TreeColumnFilterItem>
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
              <Tree<FilterTreeDataNode>
                checkable
                selectable={false}
                blockNode
                multiple={filterMultiple}
                checkStrictly={!filterMultiple}
                className={`${dropdownPrefixCls}-menu`}
                onCheck={onCheck as any}
                checkedKeys={selectedKeys}
                selectedKeys={selectedKeys}
                showIcon={false}
                treeData={getTreeData({ filters: column.filters })}
                autoExpandParent
                defaultExpandAll
                filterTreeNode={
                  searchValue.trim()
                    ? (node) => {
                        if (typeof filterSearch === 'function') {
                          return filterSearch(searchValue, getFilterData(node));
                        }
                        return searchValueMatched(searchValue, node.title);
                      }
                    : undefined
                }
              />
            </div>
          </>
        );
      }
      const items = renderFilterItems({
        filters: column.filters || [],
        filterSearch,
        prefixCls,
        filteredKeys: getFilteredKeysSync(),
        filterMultiple,
        searchValue,
      });
      const isEmpty = items.every((item) => item === null);

      return (
        <>
          <FilterSearch
            filterSearch={filterSearch}
            value={searchValue}
            onChange={onSearch}
            tablePrefixCls={tablePrefixCls}
            locale={locale}
          />
          {isEmpty ? (
            empty
          ) : (
            <Menu
              selectable
              multiple={filterMultiple}
              prefixCls={`${dropdownPrefixCls}-menu`}
              className={dropdownMenuClass}
              onSelect={onSelectKeys}
              onDeselect={onSelectKeys}
              selectedKeys={selectedKeys}
              getPopupContainer={getPopupContainer}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              items={items}
            />
          )}
        </>
      );
    };

    const getResetDisabled = () => {
      if (filterResetToDefaultFilteredValue) {
        return isEqual(
          (defaultFilteredValue || []).map((key) => String(key)),
          selectedKeys,
          true,
        );
      }

      return selectedKeys.length === 0;
    };

    dropdownContent = (
      <>
        {getFilterComponent()}
        <div className={`${prefixCls}-dropdown-btns`}>
          <Button type="link" size="small" disabled={getResetDisabled()} onClick={() => onReset()}>
            {locale.filterReset}
          </Button>
          <Button type="primary" size="small" onClick={onConfirm}>
            {locale.filterConfirm}
          </Button>
        </div>
      </>
    );
  }

  // We should not block customize Menu with additional props
  if (column.filterDropdown) {
    dropdownContent = <OverrideProvider selectable={undefined}>{dropdownContent}</OverrideProvider>;
  }

  dropdownContent = (
    <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
      {dropdownContent}
    </FilterDropdownMenuWrapper>
  );

  const getDropdownTrigger = () => {
    let filterIcon: React.ReactNode;
    if (typeof column.filterIcon === 'function') {
      filterIcon = column.filterIcon(filtered);
    } else if (column.filterIcon) {
      filterIcon = column.filterIcon;
    } else {
      filterIcon = <FilterFilled />;
    }

    return (
      <span
        role="button"
        tabIndex={-1}
        className={classNames(`${prefixCls}-trigger`, {
          active: filtered,
        })}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {filterIcon}
      </span>
    );
  };

  const mergedDropdownProps = extendsObject<DropdownProps>(
    {
      trigger: ['click'],
      placement: direction === 'rtl' ? 'bottomLeft' : 'bottomRight',
      children: getDropdownTrigger(),
      getPopupContainer,
    },
    {
      ...filterDropdownProps,
      rootClassName: classNames(rootClassName, filterDropdownProps.rootClassName),
      open: mergedVisible,
      onOpenChange: onVisibleChange,
      dropdownRender: () => {
        if (typeof filterDropdownProps?.dropdownRender === 'function') {
          return filterDropdownProps.dropdownRender(dropdownContent);
        }
        return dropdownContent;
      },
    },
  );

  return (
    <div className={`${prefixCls}-column`}>
      <span className={`${tablePrefixCls}-column-title`}>{children}</span>
      <Dropdown {...mergedDropdownProps} />
    </div>
  );
};

export default FilterDropdown;
