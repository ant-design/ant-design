import React, { Component, PropTypes } from 'react';
import Checkbox from '../checkbox';
import Button from '../button';
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
    const { prefixCls, config, footer, extraRender, dataSource } = this.props;

    let defaultFooter = [
      <Button key="reload"
              type="primary"
              onClick={this.handleCancel}>
        刷新
      </Button>,
      <Button key="ignore"
              type="ghost"
              onClick={this.handleOk}>
        忽略所选
      </Button>
    ];

    let globalCheckStatus = this.getGlobalCheckStatus();

    return (<div className={prefixCls} {...this.props}>
      <div className={`${prefixCls}-header`}>
        {this.renderCheckbox({
          prefixCls: 'ant-tree',
          checked: globalCheckStatus === 'all',
          checkPart: globalCheckStatus === 'part',
          checkable: <span className={`ant-tree-checkbox-inner`}></span>
        })}{dataSource.length} 条{config.title}
      </div>
      <div className={`${prefixCls}-body`}>
        <ul>
          {dataSource.map((item)=> {
            return <li>
              <label>
                <Checkbox checked={item.checked} onChange={this.handleSelect.bind(this, item)} />
                { item.title }
              </label>
              {extraRender(item)}
            </li>;})}
        </ul>
      </div>
      <div className={`${prefixCls}-footer`}>
        { defaultFooter || footer }
      </div>
    </div>);
  }
}

TransferList.defaultProps = {
  prefixCls: 'ant-transfer-list',
  dataSource: [],
  onChange: noop,
  extraRender: noop,
};

TransferList.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  footer: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  handleSelect: PropTypes.func,
  handleSelectAll: PropTypes.func,
  config: PropTypes.object,
};

export default TransferList;
