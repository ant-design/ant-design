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
    this.props.handleSelectAll(this.getGlobalCheckStatus());
  }

  handleSelect(selectedItem) {
    this.props.handleSelect(selectedItem, !selectedItem.checked);
  }

  handleFilter(e) {
    this.props.handleFilter(e);
  }

  handleClear() {
    this.props.handleClear();
  }

  getGlobalCheckStatus() {
    let { dataSource } = this.props;

    let globalCheckStatus;
    let selectedRowLength = 0;
    dataSource.forEach((data)=> {
      if ( data.checked ) {
        selectedRowLength++;
      }
    });

    if ( selectedRowLength > 0 ) {
      if ( selectedRowLength < dataSource.length ) {
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

  render() {
    const { prefixCls, config, header, footer, dataSource, filter, body } = this.props;

    let globalCheckStatus = this.getGlobalCheckStatus();

    // Custom Layout
    const headerDom = header({...this.props, globalCheckStatus});
    const footerDom = footer({...this.props, globalCheckStatus});
    const bodyDom = body({...this.props, globalCheckStatus});

    return (<div className={prefixCls} {...this.props}>
      { headerDom ? <div className={`${prefixCls}-header`}>
        { headerDom }
      </div> : <div className={`${prefixCls}-header`}>
        {this.renderCheckbox({
          prefixCls: 'ant-tree',
          checked: globalCheckStatus === 'all',
          checkPart: globalCheckStatus === 'part',
          checkable: <span className={`ant-tree-checkbox-inner`}></span>
        })} {dataSource.length} 条
        <span className={`${prefixCls}-header-title`}>{config.title}</span>
      </div> }
      { bodyDom ? bodyDom : <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-body-search-wrapper`}>
          <Search className={`${prefixCls}-body-search-bar`} onChange={this.handleFilter.bind(this)} handleClear={this.handleClear.bind(this)} value={filter} />
        </div>
        <ul className="">
          {dataSource.map((item)=> {
            return <li onClick={this.handleSelect.bind(this, item)}>
                <Checkbox checked={item.checked} />
                { item.title }
            </li>;})}
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
  defaultDataSource: [],
  handleFilter: noop,
  handleSelect: noop,
  onChange: noop,
  //advanced
  header: noop,
  footer: noop,
  body: noop,
};

TransferList.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  footer: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  handleFilter: PropTypes.func,
  handleSelect: PropTypes.func,
  handleSelectAll: PropTypes.func,
  config: PropTypes.object,
};

export default TransferList;
