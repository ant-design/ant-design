'use strict';

import React from 'react';
import Tooltip from 'rc-tooltip';
const prefixCls = 'ant-popover';

export default React.createClass({
  getInitialState() {
    return {
      visible: false
    };
  },
  getDefaultProps() {
    return {
      transitionName: '',
      placement: 'top',
      trigger: 'click',
      onConfirm: function() {},
      onCancel: function() {}
    };
  },
  confirm: function() {
    this.props.onConfirm.call(this);
    this.setState({
      visible: false
    });
  },
  cancel: function() {
    this.props.onCancel.call(this);
    this.setState({
      visible: false
    });
  },
  render() {
    const overlay = <div>
      <div className={prefixCls + '-content'}>
        <p className={prefixCls + '-message'}>
          <i className="anticon anticon-exclamation-circle"></i>
          {this.props.title}
        </p>
        <div className={prefixCls + '-buttons'}>
          <button onClick={this.cancel} className="ant-btn ant-btn-sm">取 消</button>
          <button onClick={this.confirm} className="ant-btn ant-btn-primary ant-btn-sm">确 定</button>
        </div>
      </div>
    </div>;

    const transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    return (
      <Tooltip placement={this.props.placement}
        prefixCls={prefixCls}
        renderPopupToBody={false}
        transitionName={transitionName}
        visible={this.state.visible}
        trigger={this.props.trigger}
        overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
