import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import DownOutlined from '@ant-design/icons/DownOutlined';
import Checkbox from '../checkbox';
import Menu from '../menu';
import Dropdown from '../dropdown';
import {
  TransferItem,
  TransferDirection,
  RenderResult,
  RenderResultObject,
  SelectAllLabel,
  TransferLocale,
} from './index';
import Search from './search';
import DefaultListBody, { TransferListBodyProps, OmitProps } from './ListBody';
import { PaginationType } from './interface';
import { isValidElement } from '../_util/reactNode';

const defaultRender = () => null;

function isRenderResultPlainObject(result: RenderResult) {
  return (
    result &&
    !isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

function getEnabledItemKeys(items: TransferItem[]) {
  return items.filter(data => !data.disabled).map(data => data.key);
}

export interface RenderedItem {
  renderedText: string;
  renderedEl: React.ReactNode;
  item: TransferItem;
}

type RenderListFunction = (props: TransferListBodyProps) => React.ReactNode;

export interface TransferListProps extends TransferLocale {
  prefixCls: string;
  titleText: string;
  dataSource: TransferItem[];
  filterOption?: (filterText: string, item: TransferItem) => boolean;
  style?: React.CSSProperties;
  checkedKeys: string[];
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemSelect: (key: string, check: boolean) => void;
  onItemSelectAll: (dataSource: string[], checkAll: boolean) => void;
  onItemRemove?: (keys: string[]) => void;
  handleClear: () => void;
  /** render item */
  render?: (item: TransferItem) => RenderResult;
  showSearch?: boolean;
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
  renderList?: RenderListFunction;
  footer?: (props: TransferListProps) => React.ReactNode;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
  disabled?: boolean;
  direction: TransferDirection;
  showSelectAll?: boolean;
  selectAllLabel?: SelectAllLabel;
  showRemove?: boolean;
  pagination?: PaginationType;
}

interface TransferListState {
  /** Filter input value */
  filterValue: string;
}

export default class TransferList extends React.PureComponent<
  TransferListProps,
  TransferListState
> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
  };

  timer: number;

  triggerScrollTimer: number;

  defaultListBodyRef = React.createRef<DefaultListBody>();

  constructor(props: TransferListProps) {
    super(props);
    this.state = {
      filterValue: '',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.triggerScrollTimer);
  }

  getCheckStatus(filteredItems: TransferItem[]) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    }
    if (filteredItems.every(item => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }

  // ================================ Item ================================
  getFilteredItems(
    dataSource: TransferItem[],
    filterValue: string,
  ): { filteredItems: TransferItem[]; filteredRenderItems: RenderedItem[] } {
    const filteredItems: TransferItem[] = [];
    const filteredRenderItems: RenderedItem[] = [];

    dataSource.forEach(item => {
      const renderedItem = this.renderItem(item);
      const { renderedText } = renderedItem;

      // Filter skip
      if (filterValue && filterValue.trim() && !this.matchFilter(renderedText, item)) {
        return null;
      }

      filteredItems.push(item);
      filteredRenderItems.push(renderedItem);
    });

    return { filteredItems, filteredRenderItems };
  }

  // =============================== Filter ===============================
  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { handleFilter } = this.props;
    const {
      target: { value: filterValue },
    } = e;
    this.setState({ filterValue });
    handleFilter(e);
  };

  handleClear = () => {
    const { handleClear } = this.props;
    this.setState({ filterValue: '' });
    handleClear();
  };

  matchFilter = (text: string, item: TransferItem) => {
    const { filterValue } = this.state;
    const { filterOption } = this.props;
    if (filterOption) {
      return filterOption(filterValue, item);
    }
    return text.indexOf(filterValue) >= 0;
  };

  getCurrentPageItems = () => {};

  // =============================== Render ===============================
  renderListBody = (renderList: RenderListFunction | undefined, props: TransferListBodyProps) => {
    let bodyContent: React.ReactNode = renderList ? renderList(props) : null;
    const customize: boolean = !!bodyContent;
    if (!customize) {
      bodyContent = <DefaultListBody ref={this.defaultListBodyRef} {...props} />;
    }
    return {
      customize,
      bodyContent,
    };
  };

  getListBody(
    prefixCls: string,
    searchPlaceholder: string,
    filterValue: string,
    filteredItems: TransferItem[],
    notFoundContent: React.ReactNode,
    filteredRenderItems: RenderedItem[],
    checkedKeys: string[],
    renderList?: RenderListFunction,
    showSearch?: boolean,
    disabled?: boolean,
  ): React.ReactNode {
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null;

    const { bodyContent, customize } = this.renderListBody(renderList, {
      ...omit(this.props, OmitProps),
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
        <div className={`${prefixCls}-body-not-found`}>{notFoundContent}</div>
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
  }

  getCheckBox(
    filteredItems: TransferItem[],
    onItemSelectAll: (dataSource: string[], checkAll: boolean) => void,
    showSelectAll?: boolean,
    disabled?: boolean,
  ): false | JSX.Element {
    const checkStatus = this.getCheckStatus(filteredItems);
    const checkedAll = checkStatus === 'all';
    const checkAllCheckbox = showSelectAll !== false && (
      <Checkbox
        disabled={disabled}
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        onChange={() => {
          // Only select enabled items
          onItemSelectAll(
            filteredItems.filter(item => !item.disabled).map(({ key }) => key),
            !checkedAll,
          );
        }}
      />
    );

    return checkAllCheckbox;
  }

  renderItem = (item: TransferItem): RenderedItem => {
    const { render = defaultRender } = this.props;
    const renderResult: RenderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain
        ? (renderResult as RenderResultObject).value
        : (renderResult as string),
      renderedEl: isRenderResultPlain ? (renderResult as RenderResultObject).label : renderResult,
      item,
    };
  };

  getSelectAllLabel = (selectedCount: number, totalCount: number): React.ReactNode => {
    const { itemsUnit, itemUnit, selectAllLabel } = this.props;
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

  render() {
    const { filterValue } = this.state;
    const {
      prefixCls,
      dataSource,
      titleText,
      checkedKeys,
      disabled,
      footer,
      showSearch,
      style,
      searchPlaceholder,
      notFoundContent,
      selectAll,
      selectCurrent,
      selectInvert,
      removeAll,
      removeCurrent,
      renderList,
      onItemSelectAll,
      onItemRemove,
      showSelectAll,
      showRemove,
      pagination,
    } = this.props;

    // Custom Layout
    const footerDom = footer && footer(this.props);

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-pagination`]: pagination,
      [`${prefixCls}-with-footer`]: footerDom,
    });

    // ====================== Get filtered, checked item list ======================

    const { filteredItems, filteredRenderItems } = this.getFilteredItems(dataSource, filterValue);

    // ================================= List Body =================================

    const listBody = this.getListBody(
      prefixCls,
      searchPlaceholder,
      filterValue,
      filteredItems,
      notFoundContent,
      filteredRenderItems,
      checkedKeys,
      renderList,
      showSearch,
      disabled,
    );

    // ================================ List Footer ================================
    const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

    const checkAllCheckbox =
      !showRemove &&
      !pagination &&
      this.getCheckBox(filteredItems, onItemSelectAll, showSelectAll, disabled);

    let menu: React.ReactElement | null = null;
    if (showRemove) {
      menu = (
        <Menu>
          {/* Remove Current Page */}
          {pagination && (
            <Menu.Item
              onClick={() => {
                const pageKeys = getEnabledItemKeys(
                  (this.defaultListBodyRef.current?.getItems() || []).map(entity => entity.item),
                );
                onItemRemove?.(pageKeys);
              }}
            >
              {removeCurrent}
            </Menu.Item>
          )}

          {/* Remove All */}
          <Menu.Item
            onClick={() => {
              onItemRemove?.(getEnabledItemKeys(filteredItems));
            }}
          >
            {removeAll}
          </Menu.Item>
        </Menu>
      );
    } else {
      menu = (
        <Menu>
          <Menu.Item
            onClick={() => {
              const keys = getEnabledItemKeys(filteredItems);
              onItemSelectAll(keys, keys.length !== checkedKeys.length);
            }}
          >
            {selectAll}
          </Menu.Item>
          {pagination && (
            <Menu.Item
              onClick={() => {
                const pageItems = this.defaultListBodyRef.current?.getItems() || [];
                onItemSelectAll(getEnabledItemKeys(pageItems.map(entity => entity.item)), true);
              }}
            >
              {selectCurrent}
            </Menu.Item>
          )}
          <Menu.Item
            onClick={() => {
              let availableKeys: string[];
              if (pagination) {
                availableKeys = getEnabledItemKeys(
                  (this.defaultListBodyRef.current?.getItems() || []).map(entity => entity.item),
                );
              } else {
                availableKeys = getEnabledItemKeys(filteredItems);
              }

              const checkedKeySet = new Set(checkedKeys);
              const newCheckedKeys: string[] = [];
              const newUnCheckedKeys: string[] = [];

              availableKeys.forEach(key => {
                if (checkedKeySet.has(key)) {
                  newUnCheckedKeys.push(key);
                } else {
                  newCheckedKeys.push(key);
                }
              });

              onItemSelectAll(newCheckedKeys, true);
              onItemSelectAll(newUnCheckedKeys, false);
            }}
          >
            {selectInvert}
          </Menu.Item>
        </Menu>
      );
    }

    const dropdown = (
      <Dropdown className={`${prefixCls}-header-dropdown`} overlay={menu} disabled={disabled}>
        <DownOutlined />
      </Dropdown>
    );

    // ================================== Render ===================================
    return (
      <div className={listCls} style={style}>
        {/* Header */}
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          {dropdown}
          <span className={`${prefixCls}-header-selected`}>
            {this.getSelectAllLabel(checkedKeys.length, filteredItems.length)}
          </span>

          <span className={`${prefixCls}-header-title`}>{titleText}</span>
        </div>

        {/* Body */}
        {listBody}

        {/* Footer */}
        {listFooter}
      </div>
    );
  }
}
