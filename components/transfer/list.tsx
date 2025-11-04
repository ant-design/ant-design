import React, { useMemo, useRef, useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import Checkbox from '../checkbox';
import Dropdown from '../dropdown';
import type { MenuProps } from '../menu';
import type {
  KeyWiseTransferItem,
  RenderResult,
  RenderResultObject,
  SelectAllLabel,
  TransferDirection,
  TransferLocale,
  TransferSearchOption,
} from './index';
import type { PaginationType, TransferKey } from './interface';
import type { ListBodyRef, TransferListBodyProps } from './ListBody';
import DefaultListBody, { OmitProps } from './ListBody';
import Search from './search';

const defaultRender = () => null;

function isRenderResultPlainObject(result: RenderResult): result is RenderResultObject {
  return !!(
    result &&
    !React.isValidElement<any>(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

function getEnabledItemKeys<RecordType extends KeyWiseTransferItem>(items: RecordType[]) {
  // Optimized: single-pass iteration instead of filter + map (avoids intermediate array)
  const keys: TransferKey[] = [];
  for (let i = 0; i < items.length; i++) {
    if (!items[i].disabled) {
      keys.push(items[i].key);
    }
  }
  return keys;
}

const isValidIcon = (icon: React.ReactNode) => icon !== undefined;

export interface RenderedItem<RecordType> {
  renderedText: string;
  renderedEl: React.ReactNode;
  item: RecordType;
}

type RenderListFunction<T> = (props: TransferListBodyProps<T>) => React.ReactNode;

export interface TransferListProps<RecordType> extends TransferLocale {
  prefixCls: string;
  titleText: React.ReactNode;
  dataSource: RecordType[];
  filterOption?: (filterText: string, item: RecordType, direction: TransferDirection) => boolean;
  style?: React.CSSProperties;
  checkedKeys: TransferKey[];
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemSelect: (
    key: TransferKey,
    check: boolean,
    e?: React.MouseEvent<Element, MouseEvent>,
  ) => void;
  onItemSelectAll: (dataSource: TransferKey[], checkAll: boolean | 'replace') => void;
  onItemRemove?: (keys: TransferKey[]) => void;
  handleClear: () => void;
  /** Render item */
  render?: (item: RecordType) => RenderResult;
  showSearch?: boolean | TransferSearchOption;
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
  renderList?: RenderListFunction<RecordType>;
  footer?: (
    props: TransferListProps<RecordType>,
    info?: { direction: TransferDirection },
  ) => React.ReactNode;
  onScroll: (e: React.UIEvent<HTMLUListElement, UIEvent>) => void;
  disabled?: boolean;
  direction: TransferDirection;
  showSelectAll?: boolean;
  selectAllLabel?: SelectAllLabel;
  showRemove?: boolean;
  pagination?: PaginationType;
  selectionsIcon?: React.ReactNode;
}

export interface TransferCustomListBodyProps<T> extends TransferListBodyProps<T> {}

const getShowSearchOption = (showSearch: boolean | TransferSearchOption) => {
  if (showSearch && typeof showSearch === 'object') {
    return {
      ...showSearch,
      defaultValue: showSearch.defaultValue || '',
    };
  }
  return {
    defaultValue: '',
    placeholder: '',
  };
};

const TransferList = <RecordType extends KeyWiseTransferItem>(
  props: TransferListProps<RecordType>,
) => {
  const {
    prefixCls,
    dataSource = [],
    titleText = '',
    checkedKeys,
    disabled,
    showSearch = false,
    style,
    searchPlaceholder,
    notFoundContent,
    selectAll,
    deselectAll,
    selectCurrent,
    selectInvert,
    removeAll,
    removeCurrent,
    showSelectAll = true,
    showRemove,
    pagination,
    direction,
    itemsUnit,
    itemUnit,
    selectAllLabel,
    selectionsIcon,
    footer,
    renderList,
    onItemSelectAll,
    onItemRemove,
    handleFilter,
    handleClear,
    filterOption,
    render = defaultRender,
  } = props;
  const searchOptions = getShowSearchOption(showSearch);
  const [filterValue, setFilterValue] = useState<string>(searchOptions.defaultValue);
  const listBodyRef = useRef<ListBodyRef<RecordType>>({});

  const internalHandleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    handleFilter(e);
  };

  const internalHandleClear = () => {
    setFilterValue('');
    handleClear();
  };

  const matchFilter = (text: string, item: RecordType) => {
    if (typeof filterOption === 'function') {
      return filterOption(filterValue, item, direction);
    }
    return text.includes(filterValue);
  };

  const customRenderListBody = (listProps: TransferListBodyProps<RecordType>) => {
    let bodyContent: React.ReactNode = renderList
      ? renderList({
          ...listProps,
          onItemSelect: (key, check) => listProps.onItemSelect(key, check),
        })
      : null;
    const customize: boolean = !!bodyContent;
    if (!customize) {
      // @ts-ignore
      bodyContent = <DefaultListBody ref={listBodyRef} {...listProps} />;
    }
    return { customize, bodyContent };
  };

  const renderItem = (item: RecordType): RenderedItem<RecordType> => {
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      item,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
      renderedText: isRenderResultPlain ? renderResult.value : (renderResult as string),
    };
  };

  const notFoundContentEle = useMemo<React.ReactNode>(
    () =>
      Array.isArray(notFoundContent)
        ? notFoundContent[direction === 'left' ? 0 : 1]
        : notFoundContent,
    [notFoundContent, direction],
  );

  const [filteredItems, filteredRenderItems] = useMemo(() => {
    const filterItems: RecordType[] = [];
    const filterRenderItems: RenderedItem<RecordType>[] = [];
    dataSource.forEach((item) => {
      const renderedItem = renderItem(item);
      if (filterValue && !matchFilter(renderedItem.renderedText, item)) {
        return;
      }
      filterItems.push(item);
      filterRenderItems.push(renderedItem);
    });
    return [filterItems, filterRenderItems] as const;
  }, [dataSource, filterValue]);

  // Memoize checkedKeys as a Set for O(1) lookup performance
  const checkedKeysSet = useMemo(() => new Set(checkedKeys), [checkedKeys]);

  const checkedActiveItems = useMemo<RecordType[]>(() => {
    // Optimized: Use Set.has() for O(1) lookup instead of array.includes() O(n)
    return filteredItems.filter((item) => checkedKeysSet.has(item.key) && !item.disabled);
  }, [checkedKeysSet, filteredItems]);

  const checkStatus = useMemo<string>(() => {
    if (checkedActiveItems.length === 0) {
      return 'none';
    }
    // Use checkedKeysSet for consistent O(1) lookups
    if (filteredItems.every((item) => checkedKeysSet.has(item.key) || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }, [checkedActiveItems.length, checkedKeysSet, filteredItems]);

  // Memoize check if all items in dataSource are disabled
  const allItemsDisabled = useMemo(() => {
    for (let i = 0; i < dataSource.length; i++) {
      if (!dataSource[i].disabled) {
        return false;
      }
    }
    return true;
  }, [dataSource]);

  // Memoize enabled filtered item keys for reuse
  const enabledFilteredKeys = useMemo(
    () => getEnabledItemKeys(filteredItems),
    [filteredItems],
  );

  const renderListBody = () => {
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={internalHandleFilter}
          handleClear={internalHandleClear}
          placeholder={searchOptions.placeholder || searchPlaceholder}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null;

    const { customize, bodyContent } = customRenderListBody({
      ...omit(props, OmitProps),
      filteredItems,
      filteredRenderItems,
      selectedKeys: checkedKeys,
    });

    let bodyNode: React.ReactNode;
    // We should wrap customize list body in a classNamed div to use flex layout.
    if (customize) {
      bodyNode = <div className={`${prefixCls}-body-customize-wrapper`}>{bodyContent}</div>;
    } else {
      bodyNode = filteredItems.length ? (
        bodyContent
      ) : (
        <div className={`${prefixCls}-body-not-found`}>{notFoundContentEle}</div>
      );
    }
    return (
      <div
        className={classNames(`${prefixCls}-body`, {
          [`${prefixCls}-body-with-search`]: showSearch,
        })}
      >
        {search}
        {bodyNode}
      </div>
    );
  };

  const checkBox = (
    <Checkbox
      disabled={allItemsDisabled || disabled}
      checked={checkStatus === 'all'}
      indeterminate={checkStatus === 'part'}
      className={`${prefixCls}-checkbox`}
      onChange={() => {
        // Only select enabled items (use memoized keys)
        onItemSelectAll?.(enabledFilteredKeys, checkStatus !== 'all');
      }}
    />
  );

  const getSelectAllLabel = (selectedCount: number, totalCount: number): React.ReactNode => {
    if (selectAllLabel) {
      return typeof selectAllLabel === 'function'
        ? selectAllLabel({ selectedCount, totalCount })
        : selectAllLabel;
    }
    const unit = totalCount > 1 ? itemsUnit : itemUnit;
    return (
      <>
        {(selectedCount > 0 ? `${selectedCount}/` : '') + totalCount} {unit}
      </>
    );
  };

  // Custom Layout
  const footerDom = footer && (footer.length < 2 ? footer(props) : footer(props, { direction }));

  const listCls = classNames(prefixCls, {
    [`${prefixCls}-with-pagination`]: !!pagination,
    [`${prefixCls}-with-footer`]: !!footerDom,
  });

  // ====================== Get filtered, checked item list ======================

  const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

  const checkAllCheckbox = !showRemove && !pagination && checkBox;

  let items: MenuProps['items'];

  if (showRemove) {
    items = [
      /* Remove Current Page */
      pagination
        ? {
            key: 'removeCurrent',
            label: removeCurrent,
            onClick() {
              // Optimized: extract enabled keys directly without intermediate arrays
              const pageItems = listBodyRef.current?.items || [];
              const keys: TransferKey[] = [];
              for (let i = 0; i < pageItems.length; i++) {
                const item = pageItems[i].item;
                if (!item.disabled) {
                  keys.push(item.key);
                }
              }
              onItemRemove?.(keys);
            },
          }
        : null,
      /* Remove All */
      {
        key: 'removeAll',
        label: removeAll,
        onClick() {
          onItemRemove?.(enabledFilteredKeys);
        },
      },
    ].filter(Boolean);
  } else {
    items = [
      {
        key: 'selectAll',
        label: checkStatus === 'all' ? deselectAll : selectAll,
        onClick() {
          onItemSelectAll?.(
            enabledFilteredKeys,
            enabledFilteredKeys.length !== checkedKeys.length,
          );
        },
      },
      pagination
        ? {
            key: 'selectCurrent',
            label: selectCurrent,
            onClick() {
              // Optimized: extract enabled keys directly without intermediate arrays
              const pageItems = listBodyRef.current?.items || [];
              const keys: TransferKey[] = [];
              for (let i = 0; i < pageItems.length; i++) {
                const item = pageItems[i].item;
                if (!item.disabled) {
                  keys.push(item.key);
                }
              }
              onItemSelectAll?.(keys, true);
            },
          }
        : null,
      {
        key: 'selectInvert',
        label: selectInvert,
        onClick() {
          // Optimized: extract enabled keys directly and invert selection
          const pageItems = listBodyRef.current?.items || [];
          const checkedKeySet = new Set(checkedKeys);
          const newCheckedKeysSet = new Set(checkedKeySet);
          
          for (let i = 0; i < pageItems.length; i++) {
            const item = pageItems[i].item;
            if (!item.disabled) {
              if (checkedKeySet.has(item.key)) {
                newCheckedKeysSet.delete(item.key);
              } else {
                newCheckedKeysSet.add(item.key);
              }
            }
          }
          
          onItemSelectAll?.(Array.from(newCheckedKeysSet), 'replace');
        },
      },
    ];
  }
  const dropdown: React.ReactNode = (
    <Dropdown className={`${prefixCls}-header-dropdown`} menu={{ items }} disabled={disabled}>
      {isValidIcon(selectionsIcon) ? selectionsIcon : <DownOutlined />}
    </Dropdown>
  );

  return (
    <div className={listCls} style={style}>
      {/* Header */}
      <div className={`${prefixCls}-header`}>
        {showSelectAll ? (
          <>
            {checkAllCheckbox}
            {dropdown}
          </>
        ) : null}
        <span className={`${prefixCls}-header-selected`}>
          {getSelectAllLabel(checkedActiveItems.length, filteredItems.length)}
        </span>
        <span className={`${prefixCls}-header-title`}>{titleText}</span>
      </div>
      {renderListBody()}
      {listFooter}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TransferList.displayName = 'TransferList';
}

export default TransferList;
