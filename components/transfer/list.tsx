import React from 'react';
import Search from './search';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';
import { TransferItem } from './index';
import Item from './item';

function noop() {
}

export interface TransferListProps {
  prefixCls: string;
  dataSource: TransferItem[];
  filter?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  titleText?: string;
  style?: React.CSSProperties;
  handleFilter: (e: any) => void;
  handleSelect: (selectedItem: any, checked: boolean) => void;
  handleSelectAll: (dataSource: any[], checkAll: boolean) => void;
  handleClear: () => void;
  render?: (item: any) => any;
  body?: (props: any) => any;
  footer?: (props: any) => void;
  checkedKeys: string[];
  checkStatus?: boolean;
  position?: string;
  notFoundContent?: React.ReactNode | string;
  filterOption: (filterText: any, item: any) => boolean;
  lazy?: {};
}

export interface TransferListContext {
  antLocale?: {
    Transfer?: any,
  };
}

export default class TransferList extends React.Component<TransferListProps, any> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: TransferListContext;
  timer: number;
  checkboxRef: HTMLElement;

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
  }

  handleClear = () => {
    this.props.handleClear();
  }

  saveCheckbox = (node) => {
    this.checkboxRef = node;
  }

  renderCheckbox({ prefixCls, filteredDataSource, checked, checkPart, disabled, checkable }) {
    const checkAll = (!checkPart) && checked;

    const checkboxCls = classNames({
      [`${prefixCls}-checkbox`]: true,
      [`${prefixCls}-checkbox-indeterminate`]: checkPart,
      [`${prefixCls}-checkbox-checked`]: checkAll,
      [`${prefixCls}-checkbox-disabled`]: disabled,
    });

    return (
      <span
        ref={this.saveCheckbox}
        className={checkboxCls}
        onClick={() => this.props.handleSelectAll(filteredDataSource, checkAll)}
      >
        {(typeof checkable !== 'boolean') ? checkable : null}
      </span>
    );
  }

  renderBody(filteredDataSource) {
    const { prefixCls, dataSource, filter, checkedKeys, lazy, filterOption,
      body = noop, render = noop, showSearch } = this.props;
    let { searchPlaceholder, notFoundContent } = this.props;
    const { antLocale } = this.context;
    const bodyDom = body(assign({}, this.props));

    if (bodyDom) {
      return bodyDom;
    }

    if (antLocale && antLocale.Transfer) {
      const transferLocale = antLocale.Transfer;
      searchPlaceholder = searchPlaceholder || transferLocale.searchPlaceholder;
      notFoundContent = notFoundContent || transferLocale.notFoundContent;
    }

    const showItems = dataSource.map((item) => {
      if (!item.disabled) {
        filteredDataSource.push(item);
      }
      const checked = checkedKeys.indexOf(item.key) >= 0;
      return (
        <Item
          key={item.key}
          item={item}
          lazy={lazy}
          render={render}
          filter={filter}
          filterOption={filterOption}
          checked={checked}
          prefixCls={prefixCls}
          onClick={this.handleSelect}
        />
      );
    });

    const searchInput = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <Search
          prefixCls={`${prefixCls}-search`}
          onChange={this.handleFilter}
          handleClear={this.handleClear}
          placeholder={searchPlaceholder || 'Search'}
          value={filter}
        />
      </div>
    ) : null;

    const items = showItems.length > 0 ? showItems : (
      <div key="not-found" className={`${prefixCls}-body-not-found`}>{notFoundContent || 'Not Found'}</div>
    );

    return (
      <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        {searchInput}
        <Animate
          component="ul"
          className={`${prefixCls}-content`}
          transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
          transitionLeave={false}
        >
          {items}
        </Animate>
      </div>
    );
  }

  render() {
    const { prefixCls, dataSource, titleText, checkedKeys, footer = noop, style } = this.props;

    // Custom Layout
    const footerDom = footer(assign({}, this.props));

    const listCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const filteredDataSource: TransferItem[] = [];

    let unit = '';
    const antLocale = this.context.antLocale;
    if (antLocale && antLocale.Transfer) {
      const transferLocale = antLocale.Transfer;
      unit = dataSource.length > 1 ? transferLocale.itemsUnit : transferLocale.itemUnit;
    }

    const checkStatus = this.getCheckStatus(filteredDataSource);
    const outerPrefixCls = prefixCls.replace('-list', '');
    const checkbox = this.renderCheckbox({
      prefixCls: outerPrefixCls,
      checked: checkStatus === 'all',
      checkPart: checkStatus === 'part',
      checkable: <span className={`${outerPrefixCls}-checkbox-inner`} />,
      filteredDataSource,
      disabled: false,
    });

    const footerNode = footerDom ? (
      <div className={`${prefixCls}-footer`}>
        {footerDom}
      </div>
    ) : null;

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {checkbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + dataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
        </div>
        {this.renderBody(filteredDataSource)}
        {footerNode}
      </div>
    );
  }
}
