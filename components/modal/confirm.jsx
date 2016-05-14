import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Modal';
import Icon from '../icon';
import Button from '../button';
import classNames from 'classnames';
import { getConfirmLocale } from './locale';

export default function confirm(config) {
  const props = { ...config };
  let div = document.createElement('div');
  document.body.appendChild(div);

  let d;
  props.iconType = props.iconType || 'question-circle';

  let width = props.width || 416;
  let style = props.style || {};

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  const runtimeLocale = getConfirmLocale();

  props.okText = props.okText ||
    (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  props.cancelText = props.cancelText || runtimeLocale.cancelText;

  function close() {
    d.setState({
      visible: false,
    });
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
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

  let body = (
    <div className="ant-confirm-body">
      <Icon type={props.iconType} />
      <span className="ant-confirm-title">{props.title}</span>
      <div className="ant-confirm-content">{props.content}</div>
    </div>
  );

  let footer = null;
  if (props.okCancel) {
    footer = (
      <div className="ant-confirm-btns">
        <Button type="ghost" size="large" onClick={onCancel}>
          {props.cancelText}
        </Button>
        <Button type="primary" size="large" onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    );
  } else {
    footer = (
      <div className="ant-confirm-btns">
        <Button type="primary" size="large" onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    );
  }

  const classString = classNames({
    'ant-confirm': true,
    [`ant-confirm-${props.type}`]: true,
    [props.className]: !!props.className,
  });

  ReactDOM.render(
    <Dialog
      className={classString}
      visible
      closable={false}
      title=""
      transitionName="zoom"
      footer=""
      maskTransitionName="fade"
      style={style}
      width={width}>
      <div style={{ zoom: 1, overflow: 'hidden' }}>{body} {footer}</div>
    </Dialog>
  , div, function () {
    d = this;
  });
}
