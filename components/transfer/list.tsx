import React, { useMemo, useRef, useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { groupKeysMap } from '../_util/transKeys';
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
} from './index';
import type { PaginationType, TransferKey } from './interface';
import type { ListBodyRef, TransferListBodyProps } from './ListBody';
import DefaultListBody, { OmitProps } from './ListBody';
import Search from './search';

const defaultRender = () => null;

function isRenderResultPlainObject(result: RenderResult): result is RenderResultObject {
  return !!(
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

function getEnabledItemKeys<RecordType extends KeyWiseTransferItem>(items: RecordType[]) {
  return items.filter((data) => !data.disabled).map((data) => data.key);
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
  showSearch?: boolean;
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

  const [filterValue, setFilterValue] = useState<string>('');
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
    if (filterOption) {
      return filterOption(filterValue, item, direction);
    }
    return text.includes(filterValue);
  };

  const renderListBody = (listProps: TransferListBodyProps<RecordType>) => {
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

  const checkedActiveItems = useMemo<RecordType[]>(() => {
    return filteredItems.filter((item) => checkedKeys.includes(item.key) && !item.disabled);
  }, [checkedKeys, filteredItems]);

  const checkStatus = useMemo<string>(() => {
    if (checkedActiveItems.length === 0) {
      return 'none';
    }
    const checkedKeysMap = groupKeysMap(checkedKeys);
    if (filteredItems.every((item) => checkedKeysMap.has(item.key) || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }, [checkedKeys, checkedActiveItems]);

  const listBody = useMemo<React.ReactNode>(() => {
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={internalHandleFilter}
          handleClear={internalHandleClear}
          placeholder={searchPlaceholder}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null;

    const { customize, bodyContent } = renderListBody({
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
        className={classNames(
          showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`,
        )}
      >
        {search}
        {bodyNode}
      </div>
    );
  }, [
    showSearch,
    prefixCls,
    searchPlaceholder,
    filterValue,
    disabled,
    checkedKeys,
    filteredItems,
    filteredRenderItems,
    notFoundContentEle,
  ]);

  const checkBox = (
    <Checkbox
      disabled={dataSource.filter((d) => !d.disabled).length === 0 || disabled}
      checked={checkStatus === 'all'}
      indeterminate={checkStatus === 'part'}
      className={`${prefixCls}-checkbox`}
      onChange={() => {
        // Only select enabled items
        onItemSelectAll?.(
          filteredItems.filter((item) => !item.disabled).map(({ key }) => key),
          checkStatus !== 'all',
        );
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
              const pageKeys = getEnabledItemKeys(
                (listBodyRef.current?.items || []).map((entity) => entity.item),
              );
              onItemRemove?.(pageKeys);
            },
          }
        : null,
      /* Remove All */
      {
        key: 'removeAll',
        label: removeAll,
        onClick() {
          onItemRemove?.(getEnabledItemKeys(filteredItems));
        },
      },
    ].filter(Boolean);
  } else {
    items = [
      {
        key: 'selectAll',
        label: checkStatus === 'all' ? deselectAll : selectAll,
        onClick() {
          const keys = getEnabledItemKeys(filteredItems);
          onItemSelectAll?.(keys, keys.length !== checkedKeys.length);
        },
      },
      pagination
        ? {
            key: 'selectCurrent',
            label: selectCurrent,
            onClick() {
              const pageItems = listBodyRef.current?.items || [];
              onItemSelectAll?.(getEnabledItemKeys(pageItems.map((entity) => entity.item)), true);
            },
          }
        : null,
      {
        key: 'selectInvert',
        label: selectInvert,
        onClick() {
          const availablePageItemKeys = getEnabledItemKeys(
            (listBodyRef.current?.items || []).map((entity) => entity.item),
          );
          const checkedKeySet = new Set(checkedKeys);
          const newCheckedKeysSet = new Set(checkedKeySet);
          availablePageItemKeys.forEach((key) => {
            if (checkedKeySet.has(key)) {
              newCheckedKeysSet.delete(key);
            } else {
              newCheckedKeysSet.add(key);
            }
          });
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
      {listBody}
      {listFooter}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TransferList.displayName = 'TransferList';
}

export default TransferList;
