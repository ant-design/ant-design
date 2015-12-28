import React, { Component, PropTypes } from 'react';
import Checkbox from '../checkbox';
import Search from './search';
import classNames from 'classnames';

function noop() {
}

class TransferList extends Component {

  constructor(props) {
    super(props);
  }

  handleSelectALl() {
    this.props.handleSelectAll();
  }

  handleSelect(selectedItem) {
    const { checkedKeys } = this.props;
    const result = checkedKeys.some((key) => key === selectedItem.key);
    this.props.handleSelect(selectedItem, !result);
  }

  handleFilter(e) {
    this.props.handleFilter(e);
  }

  handleClear() {
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
    return <span ref="checkbox"
      className={checkboxCls}
      onClick={(!props.disabled) && this.handleSelectALl.bind(this)}>
      {customEle}
    </span>;
  }

  matchFilter(text, filterText) {
    const regex = new RegExp(filterText);
    return text.match(regex);
  }

  render() {
    const { prefixCls, dataSource, titleText, filter, checkedKeys, checkStatus, body, footer, showSearch } = this.props;

    // Custom Layout
    const footerDom = footer({...this.props});
    const bodyDom = body({...this.props});

    const listCls = classNames({
      [prefixCls]: true,
      [prefixCls + '-with-footer']: !!footerDom,
    });

    return <div className={listCls} {...this.props}>
      <div className={`${prefixCls}-header`}>
        {this.renderCheckbox({
          prefixCls: 'ant-transfer',
          checked: checkStatus === 'all',
          checkPart: checkStatus === 'part',
          checkable: <span className={`ant-transfer-checkbox-inner`}></span>
        })}<span className={`${prefixCls}-header-selected`}><span>{(checkedKeys.length > 0 ? checkedKeys.length + '/' : '') + dataSource.length} 条</span>
        <span className={`${prefixCls}-header-title`}>{titleText}</span></span>
      </div>
      { bodyDom ? bodyDom :
      <div className={ showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        { showSearch ? <div className={`${prefixCls}-body-search-wrapper`}>
          <Search prefixCls={`${prefixCls}-search`} onChange={this.handleFilter.bind(this)} handleClear={this.handleClear.bind(this)} value={filter} />
        </div> : null }
        <ul>
          { dataSource.length > 0 ?
            dataSource.map((item) => {
              // apply filter
              const itemText = this.props.render(item);
              const filterResult = this.matchFilter(itemText, filter);

              const renderedText = this.props.render(item);

              if ( filterResult ) {
                return <li onClick={this.handleSelect.bind(this, item)} key={item.key} title={renderedText}>
                  <Checkbox checked={checkedKeys.some((key) => key === item.key)} />
                  { renderedText }
                </li>;
              }
            }) : <div className={`${prefixCls}-body-not-found`}>
            Not Found
          </div>
            }
        </ul>
      </div>}
      { footerDom ? <div className={`${prefixCls}-footer`}>
        { footerDom }
      </div> : null }
    </div>;
  }
}

TransferList.defaultProps = {
  dataSource: [],
  titleText: '',
  showSearch: false,
  searchPlaceholder: '',
  handleFilter: noop,
  handleSelect: noop,
  handleSelectAll: noop,
  render: noop,
  //advanced
  body: noop,
  footer: noop,
};

TransferList.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  titleText: PropTypes.string,
  style: PropTypes.object,
  handleFilter: PropTypes.func,
  handleSelect: PropTypes.func,
  handleSelectAll: PropTypes.func,
  render: PropTypes.func,
  body: PropTypes.func,
  footer: PropTypes.func,
};

export default TransferList;
