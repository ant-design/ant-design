import * as React from 'react';
import * as ReactDOM from 'react-dom';
import omit from 'omit.js';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Checkbox from '../checkbox';
import { TransferItem, TransferDirection } from './index';
import Search from './search';
import defaultRenderList, { TransferListBodyProps, OmitProps } from './renderListBody';
import triggerEvent from '../_util/triggerEvent';

function noop() {}

function isRenderResultPlainObject(result: any) {
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

export interface TransferListProps {
  prefixCls: string;
  titleText: string;
  dataSource: TransferItem[];
  filterOption?: (filterText: any, item: any) => boolean;
  style?: React.CSSProperties;
  checkedKeys: string[];
  handleFilter: (e: any) => void;
  handleSelect: (selectedItem: any, checked: boolean) => void;
  /** [Legacy] Only used when `body` prop used. */
  handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
  onItemSelect: (key: any, check: boolean) => void;
  onItemSelectAll: (dataSource: any[], checkAll: boolean) => void;
  handleClear: () => void;
  render?: (item: any) => any;
  showSearch?: boolean;
  searchPlaceholder: string;
  notFoundContent: React.ReactNode;
  itemUnit: string;
  itemsUnit: string;
  body?: (props: TransferListProps) => React.ReactNode;
  renderList?: (props: TransferListBodyProps) => React.ReactNode;
  footer?: (props: TransferListProps) => React.ReactNode;
  lazy?: boolean | {};
  onScroll: Function;
  disabled?: boolean;
  direction: TransferDirection;
  showSelectAll?: boolean;
}

interface TransferListState {
  /** Filter input value */
  filterValue: string;
}

export default class TransferList extends React.Component<TransferListProps, TransferListState> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {},
  };

  timer: number;
  triggerScrollTimer: number;

  constructor(props: TransferListProps) {
    super(props);
    this.state = {
      filterValue: '',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.triggerScrollTimer);
  }

  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getCheckStatus(filteredItems: TransferItem[]) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredItems.every(item => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }

  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: filterValue },
    } = e;
    this.setState({ filterValue });
    this.props.handleFilter(e);
    if (!filterValue) {
      return;
    }
    // Manually trigger scroll event for lazy search bug
    // https://github.com/ant-design/ant-design/issues/5631
    this.triggerScrollTimer = window.setTimeout(() => {
      const transferNode = ReactDOM.findDOMNode(this) as Element;
      const listNode = transferNode.querySelectorAll('.ant-transfer-list-content')[0];
      if (listNode) {
        triggerEvent(listNode, 'scroll');
      }
    }, 0);
  };

  handleClear = () => {
    this.setState({ filterValue: '' });
    this.props.handleClear();
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
    const { render = noop } = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain ? renderResult.value : renderResult,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
      item,
    };
  };

  render() {
    const { filterValue } = this.state;
    const {
      prefixCls,
      dataSource,
      titleText,
      checkedKeys,
      disabled,
      body,
      footer,
      showSearch,
      style,
      searchPlaceholder,
      notFoundContent,
      itemUnit,
      itemsUnit,
      renderList,
      onItemSelectAll,
      showSelectAll,
    } = this.props;

    // Custom Layout
    const footerDom = footer && footer(this.props);
    const bodyDom = body && body(this.props);

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    // ====================== Get filtered, checked item list ======================
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

    // ================================= List Body =================================
    const unit = dataSource.length > 1 ? itemsUnit : itemUnit;

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

    const searchNotFound = !filteredItems.length && (
      <div className={`${prefixCls}-body-not-found`}>{notFoundContent}</div>
    );

    let listBody: React.ReactNode = bodyDom;
    if (!listBody) {
      const renderListFunc = renderList || defaultRenderList;

      let bodyNode: React.ReactNode = searchNotFound;
      if (!bodyNode) {
        const bodyContent = renderListFunc({
          ...omit(this.props, OmitProps),
          filteredItems,
          filteredRenderItems,
          selectedKeys: checkedKeys,
        });

        // We should wrap customize list body in a classNamed div to use flex layout.
        bodyNode = renderList ? (
          <div className={`${prefixCls}-body-customize-wrapper`}>{bodyContent}</div>
        ) : (
          bodyContent
        );
      }

      listBody = (
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

    // ================================ List Footer ================================
    const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

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

    // ================================== Render ===================================
    return (
      <div className={listCls} style={style}>
        {/* Header */}
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + filteredItems.length}{' '}
              {unit}
            </span>
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
