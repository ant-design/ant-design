import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Checkbox from '../checkbox';
import {
  TransferItem,
  TransferDirection,
  RenderResult,
  RenderResultObject,
  SelectAllLabel,
} from './index';
import Search from './search';
import defaultRenderList, { TransferListBodyProps, OmitProps } from './renderListBody';

const defaultRender = () => null;

function isRenderResultPlainObject(result: RenderResult) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

export interface RenderedItem {
  renderedText: string;
  renderedEl: React.ReactNode;
  item: TransferItem;
}

type RenderListFunction = (props: TransferListBodyProps) => React.ReactNode;

export interface TransferListProps {
  prefixCls: string;
  titleText: string;
  dataSource: TransferItem[];
  filterOption?: (filterText: string, item: TransferItem) => boolean;
  style?: React.CSSProperties;
  checkedKeys: string[];
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemSelect: (key: string, check: boolean) => void;
  onItemSelectAll: (dataSource: string[], checkAll: boolean) => void;
  handleClear: () => void;
  render?: (item: TransferItem) => RenderResult;
  showSearch?: boolean;
  searchPlaceholder: string;
  notFoundContent: React.ReactNode;
  itemUnit: string;
  itemsUnit: string;
  renderList?: RenderListFunction;
  footer?: (props: TransferListProps) => React.ReactNode;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
  disabled?: boolean;
  direction: TransferDirection;
  showSelectAll?: boolean;
  selectAllLabel?: SelectAllLabel;
}

interface TransferListState {
  /** Filter input value */
  filterValue: string;
}

function renderListNode(renderList: RenderListFunction | undefined, props: TransferListBodyProps) {
  let bodyContent: React.ReactNode = renderList ? renderList(props) : null;
  const customize: boolean = !!bodyContent;
  if (!customize) {
    bodyContent = defaultRenderList(props);
  }
  return {
    customize,
    bodyContent,
  };
}

export default class TransferList extends React.Component<TransferListProps, TransferListState> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
  };

  timer: number;

  triggerScrollTimer: number;

  constructor(props: TransferListProps) {
    super(props);
    this.state = {
      filterValue: '',
    };
  }

  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
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

    const { bodyContent, customize } = renderListNode(renderList, {
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
      renderList,
      onItemSelectAll,
      showSelectAll,
    } = this.props;

    // Custom Layout
    const footerDom = footer && footer(this.props);

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
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

    const checkAllCheckbox = this.getCheckBox(
      filteredItems,
      onItemSelectAll,
      showSelectAll,
      disabled,
    );

    // ================================== Render ===================================
    return (
      <div className={listCls} style={style}>
        {/* Header */}
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>{this.getSelectAllLabel(checkedKeys.length, filteredItems.length)}</span>
            <span className={`${prefixCls}-header-title`}>{titleText}</span>
          </span>
        </div>

        {/* Body */}
        {listBody}

        {/* Footer */}
        {listFooter}
      </div>
    );
  }
}
