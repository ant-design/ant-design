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

  handleSelect(selectedItem, e) {
    this.props.handleSelect(selectedItem, e.target.checked);
  }

  handleFilter(e) {
    this.props.handleFilter(e);
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
    const { prefixCls, config, header, footer, dataSource, filter, customLayout } = this.props;

    let globalCheckStatus = this.getGlobalCheckStatus();

    const headerDom = header({...this.props, globalCheckStatus});
    const footerDom = footer({...this.props, globalCheckStatus});
    const layout = customLayout({...this.props, globalCheckStatus});

    return (<div className={prefixCls} {...this.props}>
      { headerDom ? <div className={`${prefixCls}-header`}>
        { headerDom }
      </div> : <div className={`${prefixCls}-header`}>
        {this.renderCheckbox({
          prefixCls: 'ant-tree',
          checked: globalCheckStatus === 'all',
          checkPart: globalCheckStatus === 'part',
          checkable: <span className={`ant-tree-checkbox-inner`}></span>
        })} {dataSource.length} 条{config.title}
      </div> }
      <div className={`${prefixCls}-body`}>
        { layout ? layout : <div>
          <Search onChange={this.handleFilter.bind(this)} value={filter} />
          <ul>
            {dataSource.map((item)=> {
              return <li>
                <label>
                  <Checkbox checked={item.checked} onChange={this.handleSelect.bind(this, item)} />
                  { item.title }
                </label>
              </li>;})}
          </ul>
        </div>}
      </div>
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
  customLayout: noop,
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
