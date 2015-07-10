'use strict';

var React = require('react');
var Dialog = require('rc-dialog');
function noop() {
}

var Modal = React.createClass({
  getInitialState() {
    return {
      visible: false
    };
  },

  handleCancel() {
    var d = this.refs.d;
    d.requestClose();
  },

  getDefaultProps() {
    return {
      prefixCls: 'ant-modal',
      onOk: noop,
      onCancel: noop
    };
  },

  show() {
    this.setState({
      visible: true
    });
  },

  hide() {
    this.setState({
      visible: false
    });
  },

  handleOk() {
    this.props.onOk();
  },

  render() {
    var props = this.props;
    var footer = props.footer || [
        <button key="cancel" type="button" className="ant-btn-default ant-btn" onClick={this.handleCancel}>取 消</button>,
        <button key="confirm" type="button" className="ant-btn-primary ant-btn" onClick={this.handleOk}>确 定</button>
      ];
    return <Dialog transitionName="zoom" onBeforeClose={props.onCancel} visible={this.state.visible} maskAnimation="fade" width="500" footer={footer} {...props} ref="d"/>;
  }
});

module.exports = Modal;
