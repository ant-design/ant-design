import React from 'react';
import Dialog from './index';

export default function (props) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  let d;
  props = props || {};
  props.iconClassName = props.iconClassName || 'anticon-question-circle';
  let width = props.width || 416;

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  function close() {
    d.setState({
      visible: false
    });
    React.unmountComponentAtNode(div);
  }

  function onCancel() {
    let cancelFn = props.onCancel;
    if (cancelFn) {
      let ret;
      if (cancelFn.length) {
        ret = cancelFn(close);
      } else {
        ret = cancelFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  function onOk() {
    let okFn = props.onOk;
    if (okFn) {
      let ret;
      if (okFn.length) {
        ret = okFn(close);
      } else {
        ret = okFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  let body = <div className="ant-confirm-body">
    <i className={'anticon ' + props.iconClassName}></i>
    <span className="ant-confirm-title">{props.title}</span>
    <div className="ant-confirm-content">{props.content}</div>
  </div>;
  let footer = <div className="ant-confirm-btns">
    <button type="button" className="ant-btn-default ant-btn ant-btn-lg" onClick={onCancel}>取 消</button>
    <button type="button" className="ant-btn-primary ant-btn ant-btn-lg" onClick={onOk}>确 定</button>
  </div>;

  if (props.okCancel) {
    footer = <div className="ant-confirm-btns">
      <button type="button" className="ant-btn-default ant-btn ant-btn-lg" onClick={onCancel}>取 消</button>
      <button type="button" className="ant-btn-primary ant-btn ant-btn-lg" onClick={onOk}>确 定</button>
    </div>;
  } else {
    footer = <div className="ant-confirm-btns">
      <button type="button" className="ant-btn-primary ant-btn ant-btn-lg" onClick={onOk}>知道了</button>
    </div>;
  }

  React.render(<Dialog
    prefixCls="ant-modal"
    className="ant-confirm"
    visible={true}
    closable={false}
    title=""
    transitionName="zoom"
    footer=""
    maskTransitionName="fade" width={width}>
    <div style={{zoom: 1, overflow: 'hidden'}}>{body} {footer}</div>
  </Dialog>, div, function () {
    d = this;
  });
}
