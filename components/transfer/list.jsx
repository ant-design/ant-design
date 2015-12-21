import React, { Component, PropTypes } from 'react';
import Checkbox from '../checkbox';
import Search from './search.jsx';
import {classSet} from 'rc-util';
function noop() {
}

class TransferList extends Component {

  constructor(props) {
    super(props);
  }

  handleSelectALl() {
    this.props.handleSelectAll(this.getGlobalCheckStatus(), this.filter);
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

  getGlobalCheckStatus() {
    const { dataSource, checkedKeys } = this.props;

    let globalCheckStatus;

    if ( checkedKeys.length > 0 ) {
      if ( checkedKeys.length < dataSource.length ) {
        globalCheckStatus = 'part';
      } else {
        globalCheckStatus = 'all';
      }
    } else {
      globalCheckStatus = 'none';
    }
    return globalCheckStatus;
  }

  renderCheckbox(props) {
    const { prefixCls } = props;
    const checkboxCls = {
      [`${prefixCls}-checkbox`]: true,
    };
    if (props.checkPart) {
      checkboxCls[`${prefixCls}-checkbox-indeterminate`] = true;
    } else if (props.checked) {
      checkboxCls[`${prefixCls}-checkbox-checked`] = true;
    }
    let customEle = null;
    if (typeof props.checkable !== 'boolean') {
      customEle = props.checkable;
    }
    if (props.disabled) {
      checkboxCls[`${prefixCls}-checkbox-disabled`] = true;
      return <span ref="checkbox" className={classSet(checkboxCls)}>{customEle}</span>;
    }
    return (<span ref="checkbox" className={classSet(checkboxCls)} onClick={this.handleSelectALl.bind(this)}>{customEle}</span>);
  }

  matchFilter(text, filterText) {
    const regex = new RegExp(filterText);
    return text.match(regex);
  }

  render() {
    let self = this;
    const { prefixCls, dataSource, title, filter, checkedKeys, body, footer, showSearch } = this.props;

    let globalCheckStatus = this.getGlobalCheckStatus();

    // Custom Layout
    const footerDom = footer({...this.props, globalCheckStatus});
    const bodyDom = body({...this.props, globalCheckStatus});

    return (<div className={prefixCls} {...this.props}>
      <div className={`${prefixCls}-header`}>
        {this.renderCheckbox({
          prefixCls: 'ant-tree',
          checked: globalCheckStatus === 'all',
          checkPart: globalCheckStatus === 'part',
          checkable: <span className={`ant-tree-checkbox-inner`}></span>
        })} { (checkedKeys.length > 0 ? checkedKeys.length + '/' : '') + dataSource.length} 条
        <span className={`${prefixCls}-header-title`}>{title}</span>
      </div>
      { bodyDom ? bodyDom :
      <div className={ showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        { showSearch ? <div className={`${prefixCls}-body-search-wrapper`}>
          <Search className={`${prefixCls}-body-search-bar`} onChange={this.handleFilter.bind(this)} handleClear={this.handleClear.bind(this)} value={filter} />
        </div> : null }
        <ul>
          { dataSource.length > 0 ?
            dataSource.map((item)=> {
              // apply filter
              const itemText = self.props.render(item);
              const filterResult = self.matchFilter(itemText, filter);

              if ( filterResult ) {
                return <li onClick={this.handleSelect.bind(this, item)}>
                  <Checkbox checked={checkedKeys.some((key) => key === item.key)} />
                  { self.props.render(item) }
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
    </div>);
  }
}

TransferList.defaultProps = {
  prefixCls: 'ant-transfer-list',
  dataSource: [],
  showSearch: false,
  searchPlaceholder: '',
  handleFilter: noop,
  handleSelect: noop,
  handleSelectAll: noop,
  render: noop,
  //advanced
  footer: noop,
  body: noop,
};

TransferList.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  handleFilter: PropTypes.func,
  handleSelect: PropTypes.func,
  handleSelectAll: PropTypes.func,
  body: PropTypes.func,
  footer: PropTypes.func,
};

export default TransferList;
