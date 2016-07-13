import * as React from 'react';
import Checkbox from '../checkbox';
import Search from './search';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import assign from 'object-assign';
import { TransferItem } from './index';

function noop() {
}

export function isRenderResultPlainObject(result) {
  return result && !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]';
}

export interface TransferListProps {
  prefixCls?: string;
  /** 数据源 */
  dataSource: Array<TransferItem>;
  filter?: TransferItem;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 搜索框的默认值 */
  searchPlaceholder?: string;
  /** 标题 */
  titleText?: string;
  style?: React.CSSProperties;
  handleFilter?: () => void;
  handleSelect?: () => void;
  handleSelectAll?: () => void;
  handleClear?: () => void;
  /** 每行渲染函数 */
  render?: () => void;
  /** 主体渲染函数 */
  body?: () => void;
  /** 底部渲染函数 */
  footer?: () => void;
  /** 选中项 */
  checkedKeys?: Array<TransferItem>;
  checkStatus?: boolean;
  position?: string;
  notFoundContent?: React.ReactNode | string;
}

export default class TransferList extends React.Component<TransferListProps, any> {
  static defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    handleClear: noop,
    handleFilter: noop,
    handleSelect: noop,
    handleSelectAll: noop,
    render: noop,
    // advanced
    body: noop,
    footer: noop,
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

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

  handleSelectAll = () => {
    this.props.handleSelectAll();
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

  renderCheckbox(props) {
    const { prefixCls } = props;
    const checkboxCls = classNames({
      [`${prefixCls}-checkbox`]: true,
      [`${prefixCls}-checkbox-indeterminate`]: props.checkPart,
      [`${prefixCls}-checkbox-checked`]: (!props.checkPart) && props.checked,
      [`${prefixCls}-checkbox-disabled`]: !!props.disabled,
    });
    let customEle = null;
    if (typeof props.checkable !== 'boolean') {
      customEle = props.checkable;
    }
    return (
      <span ref="checkbox"
        className={checkboxCls}
        onClick={(!props.disabled) && this.handleSelectAll}
      >
        {customEle}
      </span>
    );
  }

  matchFilter(text, filterText) {
    return text.indexOf(filterText) >= 0;
  }

  render() {
    const { prefixCls, dataSource, titleText, filter, checkedKeys,
            checkStatus, body, footer, showSearch, render, style } = this.props;

    let { searchPlaceholder, notFoundContent } = this.props;

    // Custom Layout
    const footerDom = footer(assign({}, this.props));
    const bodyDom = body(assign({}, this.props));

    const listCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-with-footer`]: !!footerDom,
    });

    const showItems = dataSource.map((item) => {
      const renderResult = render(item);
      let renderedText;
      let renderedEl;

      if (isRenderResultPlainObject(renderResult)) {
        renderedText = renderResult.value;
        renderedEl = renderResult.label;
      } else {
        renderedText = renderResult;
        renderedEl = renderResult;
      }

      if (filter && filter.trim() && !this.matchFilter(renderedText, filter)) {
        return null;
      }

      return (
        <li onClick={() => { this.handleSelect(item); }} key={item.key} title={renderedText}>
          <Checkbox checked={checkedKeys.some(key => key === item.key)} />
          <span>{renderedEl}</span>
        </li>
      );
    }).filter(item => !!item);

    let unit = '条';
    if (this.context.antLocale &&
        this.context.antLocale.Transfer) {
      unit = dataSource.length > 1
        ? this.context.antLocale.Transfer.itemsUnit
        : this.context.antLocale.Transfer.itemUnit;
      searchPlaceholder = searchPlaceholder
        || this.context.antLocale.Transfer.searchPlaceholder;
      notFoundContent = notFoundContent
        || this.context.antLocale.Transfer.notFoundContent;
    }

    return (
      <div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {this.renderCheckbox({
            prefixCls: 'ant-transfer',
            checked: checkStatus === 'all',
            checkPart: checkStatus === 'part',
            checkable: <span className={'ant-transfer-checkbox-inner'}></span>,
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
            <Animate component="ul"
              transitionName={this.state.mounted ? `${prefixCls}-highlight` : ''}
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
