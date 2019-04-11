import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Checkbox from '../checkbox';
import { TransferItem, TransferDirection } from './index';
import Search from './search';
import Item from './item';
import ListBody from './ListBody';
import triggerEvent from '../_util/triggerEvent';

function noop() {}

function isRenderResultPlainObject(result: any) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
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
  handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
  handleClear: () => void;
  render?: (item: any) => any;
  showSearch?: boolean;
  searchPlaceholder: string;
  notFoundContent: React.ReactNode;
  itemUnit: string;
  itemsUnit: string;
  body?: (props: TransferListProps) => React.ReactNode;
  renderList?: (props: TransferListProps) => React.ReactNode;
  footer?: (props: TransferListProps) => React.ReactNode;
  lazy?: boolean | {};
  onScroll: Function;
  disabled?: boolean;
  direction: TransferDirection;
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

  getCheckStatus(filteredDataSource: TransferItem[]) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem: TransferItem) => {
    const { checkedKeys } = this.props;
    const result = checkedKeys.some(key => key === selectedItem.key);
    this.props.handleSelect(selectedItem, !result);
  };

  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value: filterValue } } = e;
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

  renderItem = (item: TransferItem) => {
    const { render = noop } = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain ? renderResult.value : renderResult,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
    };
  };

  render() {
    const { filterValue } = this.state;
    const {
      prefixCls,
      dataSource,
      titleText,
      checkedKeys,
      lazy,
      disabled,
      body,
      footer,
      showSearch,
      style,
      searchPlaceholder,
      notFoundContent,
      itemUnit,
      itemsUnit,
      renderList = ListBody,
    } = this.props;

    // Custom Layout
    const footerDom = footer && footer(this.props);
    const bodyDom = body && body(this.props);

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    // Get filtered, checked item list
    const filteredItems: TransferItem[] = [];

    dataSource.forEach(item => {
      const { renderedText, renderedEl } = this.renderItem(item);

      // Filter skip
      if (filterValue && filterValue.trim() && !this.matchFilter(renderedText, item)) {
        return null;
      }

      filteredItems.push(item);
    });



    // const filteredDataSource: TransferItem[] = [];
    // const totalDataSource: TransferItem[] = [];

    // const showItems = dataSource.map(item => {
    //   const { renderedText, renderedEl } = this.renderItem(item);
    //   if (filter && filter.trim() && !this.matchFilter(renderedText, item)) {
    //     return null;
    //   }

    //   // all show items
    //   totalDataSource.push(item);
    //   if (!item.disabled) {
    //     // response to checkAll items
    //     filteredDataSource.push(item);
    //   }

    //   const checked = checkedKeys.indexOf(item.key) >= 0;
    //   return (
    //     <Item
    //       disabled={disabled}
    //       key={item.key}
    //       item={item}
    //       lazy={lazy}
    //       renderedText={renderedText}
    //       renderedEl={renderedEl}
    //       checked={checked}
    //       prefixCls={prefixCls}
    //       onClick={this.handleSelect}
    //     />
    //   );
    // });

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

    // const listBody = bodyDom || (
    //   <div
    //     className={classNames(
    //       showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`,
    //     )}
    //   >
    //     {search}
    //     {!searchNotFound && (
    //       <Animate
    //         component="ul"
    //         componentProps={{ onScroll }}
    //         className={`${prefixCls}-content`}
    //         transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
    //         transitionLeave={false}
    //       >
    //         {showItems}
    //       </Animate>
    //     )}
    //     {searchNotFound}
    //   </div>
    // );

    const listBody = bodyDom || renderList({
      ...this.props,
    });

    const listFooter = footerDom ? <div className={`${prefixCls}-footer`}>{footerDom}</div> : null;

    // const checkStatus = this.getCheckStatus(filteredDataSource);
    // const checkedAll = checkStatus === 'all';
    // const checkAllCheckbox = (
    //   <Checkbox
    //     disabled={disabled}
    //     checked={checkedAll}
    //     indeterminate={checkStatus === 'part'}
    //     onChange={() => this.props.handleSelectAll(filteredDataSource, checkedAll)}
    //   />
    // );

    return (
      <div className={listCls} style={style}>
        {/* Header */}
        <div className={`${prefixCls}-header`}>
          {/* {checkAllCheckbox} */}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + filteredItems.length}{' '}
              {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>{titleText}</span>
          </span>
        </div>

        {/* Body */}
        <div
          className={classNames(
            showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`,
          )}
        >
          {!searchNotFound && listBody}
          {searchNotFound}
        </div>
        

        {/* Footer */}
        {listFooter}
      </div>
    );
  }
}
