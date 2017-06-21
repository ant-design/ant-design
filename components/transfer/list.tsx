import React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';
import Checkbox from '../checkbox';
import { TransferItem } from './index';
import Search from './search';
import Item from './item';
import triggerEvent from '../_util/triggerEvent';

function noop() {
}

function isRenderResultPlainObject(result) {
  return result && !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]';
}

export interface TransferListProps {
  prefixCls: string;
  titleText: string;
  dataSource: TransferItem[];
  filter: string;
  filterOption: (filterText: any, item: any) => boolean;
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
  body?: (props: any) => any;
  footer?: (props: any) => void;
  lazy?: boolean | {};
  onScroll: Function;
}

export default class TransferList extends React.Component<TransferListProps, any> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {},
  };

  timer: number;
  triggerScrollTimer: number;

  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.triggerScrollTimer);
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getCheckStatus(filteredDataSource) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return 'none';
    } else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem) => {
    const { checkedKeys } = this.props;
    const result = checkedKeys.some((key) => key === selectedItem.key);
    this.props.handleSelect(selectedItem, !result);
  }

  handleFilter = (e) => {
    this.props.handleFilter(e);
    if (!e.target.value) {
      return;
    }
    // Manually trigger scroll event for lazy search bug
    // https://github.com/ant-design/ant-design/issues/5631
    this.triggerScrollTimer = setTimeout(() => {
      const listNode = findDOMNode(this).querySelectorAll('.ant-transfer-list-content')[0];
      if (listNode) {
        triggerEvent(listNode, 'scroll');
      }
    }, 0);
  }

  handleClear = () => {
    this.props.handleClear();
  }

  matchFilter = (text, item) => {
    const { filter, filterOption } = this.props;
    if (filterOption) {
      return filterOption(filter, item);
    }
    return text.indexOf(filter) >= 0;
  }

  renderItem = (item) => {
    const { render = noop } = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain ? renderResult.value : renderResult,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
    };
  }

  render() {
    const {
      prefixCls, dataSource, titleText, checkedKeys, lazy,
      body = noop, footer = noop, showSearch, style, filter,
      searchPlaceholder, notFoundContent, itemUnit, itemsUnit, onScroll,
    } = this.props;

    // Custom Layout
    const footerDom = footer(assign({}, this.props));
    const bodyDom = body(assign({}, this.props));

    const listCls = classNames(prefixCls, {
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const filteredDataSource: TransferItem[] = [];
    const totalDataSource: TransferItem[] = [];

    const showItems = dataSource.map((item) => {
      const { renderedText, renderedEl } = this.renderItem(item);
      if (filter && filter.trim() && !this.matchFilter(renderedText, item)) {
        return null;
      }

      // all show items
      totalDataSource.push(item);
      if (!item.disabled) {
         // response to checkAll items
        filteredDataSource.push(item);
      }

      const checked = checkedKeys.indexOf(item.key) >= 0;
      return (
        <Item
          key={item.key}
          item={item}
          lazy={lazy}
          renderedText={renderedText}
          renderedEl={renderedEl}
          checked={checked}
          prefixCls={prefixCls}
          onClick={this.handleSelect}
        />
      );
    });

    const unit = dataSource.length > 1 ? itemsUnit : itemUnit;

    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder}
          value={filter}
        />
      </div>
    ) : null;

    const listBody = bodyDom || (
      <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        {search}
        <Animate
          component="ul"
          componentProps={{ onScroll }}
          className={`${prefixCls}-content`}
          transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {showItems}
        </Animate>
        <div className={`${prefixCls}-body-not-found`}>
          {notFoundContent}
        </div>
      </div>
    );

    const listFooter = footerDom ? (
      <div className={`${prefixCls}-footer`}>
        {footerDom}
      </div>
    ) : null;

    const checkStatus = this.getCheckStatus(filteredDataSource);
    const checkedAll = checkStatus === 'all';
    const checkAllCheckbox = (
      <Checkbox
        ref="checkbox"
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        onChange={() => this.props.handleSelectAll(filteredDataSource, checkedAll)}
      />
    );

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + totalDataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
        </div>
        {listBody}
        {listFooter}
      </div>
    );
  }
}
