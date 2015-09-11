import React from 'react';
import Dialog from './index';
let div;
let cssAnimation = require('css-animation');

export default function (props) {
  let d;
  props = props || {};
  props.iconClassName = props.iconClassName || 'anticon-question-circle';
  props.bgAnimation = ' blur-enter blur-enter-active';
  let width = props.width || 416;

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  function bgBlur(b) {
    //增加背景模糊；
    function seeDom(callback) {
      for (let i = 0; i < document.body.children.length; i++) {
        let m = document.body.children[i];
        if (m.nodeName !== 'SCRIPT' && m.nodeName !== 'STYLE' && m.className.indexOf('ant-modal') < 0) {
          callback.call(this, m);
        }
      }
    }

    if (b) {
      //cssAnimation(document.body, 'blur-enter')
      seeDom((m)=> {
        m.className += props.bgAnimation;
      });
    } else {
      seeDom((m)=> {
        let rclass = /[\t\r\n\f]/g;
        let _classname = (' ' + m.className + ' ').replace(' ' + rclass + ' ', ' ');
        while (_classname.indexOf(props.bgAnimation) >= 0) {
          _classname = _classname.replace(props.bgAnimation, ' ');
        }
        m.className = _classname.trim();
        cssAnimation(m, 'blur-leave');
      });
    }
  }

  function close() {
    bgBlur(false);
    d.setState({
      visible: false
    });
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

  if (!div) {
    div = document.createElement('div');
    document.body.appendChild(div);
  }
  bgBlur(true);

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
