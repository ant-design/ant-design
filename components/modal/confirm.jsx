'use strict';

var React = require('react');
var Dialog = require('rc-dialog');
var div;

module.exports = function (props) {
  var d;
  props = props || {};
  props.iconClassName = props.iconClassName || 'anticon-exclamation-circle';
  props.animation = 'zoom';
  props.maskAnimation = 'fade';
  var width = props.width || 375;

  function close() {
    d.setState({
      visible: false
    });
  }

  function onCancel() {
    var cancelFn = props.onCancel;
    if (cancelFn) {
      if(cancelFn.length) {
        cancelFn(close);
      }else {
        cancelFn();
        close();
      }
    } else {
      close();
    }
  }

  function onOk() {
    var okFn = props.onOk;
    if (okFn) {
      if(okFn.length) {
        okFn(close);
      }else {
        okFn();
        close();
      }
    } else {
      close();
    }
  }

  var body = <div className="ant-confirm-body">
    <i className={'anticon ' + props.iconClassName}></i>
    <span className="ant-confirm-title">{props.title}</span>
    <div className="ant-confirm-content">{props.content}</div>
  </div>;
  var footer = <div className="ant-confirm-btns">
    <button type="button" className="ant-btn-default ant-btn ant-btn-lg" onClick={onCancel}>取 消</button>
    <button type="button" className="ant-btn-primary ant-btn ant-btn-lg" onClick={onOk}>确 定</button>
  </div>;

  if (!div) {
    div = document.createElement('div');
    document.body.appendChild(div);
  }

  React.render(<Dialog prefixCls="ant-modal" className="ant-confirm" renderToBody={false} visible={true} closable={false} title="" animation="zoom" maskAnimation="fade" width={width}>
    <div style={{zoom: 1, overflow: 'hidden'}}>{body} {footer}</div>

  </Dialog>, div, function () {
    d = this;
  });
};
