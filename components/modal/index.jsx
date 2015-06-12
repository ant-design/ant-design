'use strict';

var React = require('react');
var Dialog = require('rc-dialog');
function noop() {
}

var Modal = React.createClass({
  handleCancel() {
    this.refs.d.requestClose();
  },

  getDefaultProps() {
    return {
      prefixCls: 'ant-modal',
      onOk: noop,
      onCancel: noop,
      onBeforeClose: noop
    };
  },

  handleOk() {
    this.props.onOk();
  },

  render() {
    var props = this.props;
    var footer = [
      <button type="button" className="ant-btn-default ant-btn" onClick={this.handleCancel}>取 消</button>,
      <button type="button" className="ant-btn-primary ant-btn" onClick={this.handleOk}>确 定</button>
    ];
    return <Dialog animation="zoom" maskAnimation="fade" width="500" footer={footer} {...props} ref="d"/>;
  }
});

module.exports = Modal;
