import React from 'react';
import Checkbox from '../checkbox';
import Search from './search';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';
import { TransferItem } from './index';

function noop() {
}

export function isRenderResultPlainObject(result) {
  return result && !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]';
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
        ref="checkbox"
        className={checkboxCls}
        onClick={() => this.props.handleSelectAll(filteredDataSource, checkAll)}
      >
        {(typeof checkable !== 'boolean') ? checkable : null}
      </span>
    );
  }

  matchFilter(filterText, item, text) {
    const filterOption = this.props.filterOption;
    if (filterOption) {
      return filterOption(filterText, item);
    }
    return text.indexOf(filterText) >= 0;
  }

  render() {
    const { prefixCls, dataSource, titleText, filter, checkedKeys,
            body = noop, footer = noop, showSearch, render = noop, style } = this.props;

    let { searchPlaceholder, notFoundContent } = this.props;

    // Custom Layout
    const footerDom = footer(assign({}, this.props));
    const bodyDom = body(assign({}, this.props));

    const listCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const filteredDataSource: TransferItem[] = [];

    const showItems = dataSource.map((item) => {
      const renderResult = render(item);

      if (isRenderResultPlainObject(renderResult)) {
        return {
          item: item,
          renderedText: renderResult.value,
          renderedEl: renderResult.label,
        };
      }
      return {
        item: item,
        renderedText: renderResult,
        renderedEl: renderResult,
      };
    }).filter(({ item, renderedText }) => {
      return !(filter && filter.trim() && !this.matchFilter(filter, item, renderedText));
    }).map(({ item, renderedText, renderedEl }) => {
      if (!item.disabled) {
        filteredDataSource.push(item);
      }

      const className = classNames({
        [`${prefixCls}-content-item`]: true,
        [`${prefixCls}-content-item-disabled`]: item.disabled,
      });
      return (
        <li
          key={item.key}
          className={className}
          title={renderedText}
          onClick={item.disabled ? undefined : () => this.handleSelect(item)}
        >
          <Checkbox checked={checkedKeys.some(key => key === item.key)} disabled={item.disabled} />
          <span>{renderedEl}</span>
        </li>
      );
    });

    let unit = '条';
    const antLocale = this.context.antLocale;
    if (antLocale && antLocale.Transfer) {
      const transferLocale = antLocale.Transfer;
      unit = dataSource.length > 1 ? transferLocale.itemsUnit : transferLocale.itemUnit;
      searchPlaceholder = searchPlaceholder || transferLocale.searchPlaceholder;
      notFoundContent = notFoundContent || transferLocale.notFoundContent;
    }

    const checkStatus = this.getCheckStatus(filteredDataSource);
    const outerPrefixCls = prefixCls.replace('-list', '');

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {this.renderCheckbox({
            prefixCls: outerPrefixCls,
            checked: checkStatus === 'all',
            checkPart: checkStatus === 'part',
            checkable: <span className={`${outerPrefixCls}-checkbox-inner`}></span>,
            filteredDataSource,
            disabled: false,
          })}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + dataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
        </div>
        {bodyDom ||
          <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
            {showSearch ? <div className={`${prefixCls}-body-search-wrapper`}>
              <Search prefixCls={`${prefixCls}-search`}
                onChange={this.handleFilter}
                handleClear={this.handleClear}
                placeholder={searchPlaceholder || '请输入搜索内容'}
                value={filter}
              />
            </div> : null}
            <Animate
              component="ul"
              className={`${prefixCls}-content`}
              transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''}
              transitionLeave={false}
            >
              {showItems.length > 0
                ? showItems
                : <div className={`${prefixCls}-body-not-found`}>{notFoundContent || '列表为空'}</div>}
            </Animate>
          </div>}
        {footerDom ? <div className={`${prefixCls}-footer`}>
          {footerDom}
        </div> : null}
      </div>
    );
  }
}
