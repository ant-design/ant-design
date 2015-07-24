import React from 'react';
import Dialog from 'rc-dialog';
function noop() {
}

export default React.createClass({
  getInitialState() {
    return {
      visible: false,
      confirmLoading: false
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

  handleOk() {
    this.setState({
      confirmLoading: true
    });
    if (typeof this.props.onOk) {
      this.props.onOk();
    }
  },

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      // 隐藏后去除按钮 loading 效果
      if (!nextProps.visible) {
        this.setState({
          confirmLoading: false
        });
      }
    }
  },

  render() {
    var loadingIcon = this.state.confirmLoading ?
      <i className="anticon anticon-loading"></i> : '';
    var props = this.props;
    var footer = props.footer || [
      <button key="cancel" type="button" className="ant-btn ant-btn-lg" onClick={this.handleCancel}>取 消</button>,
      <button key="confirm" type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.handleOk}>
        确 定 {loadingIcon}
      </button>
    ];
    return <Dialog transitionName="zoom" onBeforeClose={props.onCancel} visible={this.state.visible} maskAnimation="fade" width="500" footer={footer} {...props} ref="d" />;
  }
});
