import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import assign from 'object-assign';
import Icon from '../icon';
import Dialog from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';

export default function confirm(config) {
  const props = assign({ iconType: 'question-circle' }, config);
  const prefixCls = props.prefixCls || 'ant-confirm';
  let div = document.createElement('div');
  document.body.appendChild(div);

  let width = props.width || 416;
  let style = props.style || {};

  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  const runtimeLocale = getConfirmLocale();

  props.okText = props.okText ||
    (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  props.cancelText = props.cancelText || runtimeLocale.cancelText;

  function close(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (props.onCancel && triggerCancel) {
      props.onCancel(...args);
    }
  }

  let body = (
    <div className={`${prefixCls}-body`}>
      <Icon type={props.iconType} />
      <span className={`${prefixCls}-title`}>{props.title}</span>
      <div className={`${prefixCls}-content`}>{props.content}</div>
    </div>
  );

  let footer: React.ReactElement<any> | null = null;
  if (props.okCancel) {
    footer = (
      <div className={`${prefixCls}-btns`}>
        <ActionButton actionFn={props.onCancel} closeModal={close}>
          {props.cancelText}
        </ActionButton>
        <ActionButton type="primary" actionFn={props.onOk} closeModal={close} autoFocus>
          {props.okText}
        </ActionButton>
      </div>
    );
  } else {
    footer = (
      <div className={`${prefixCls}-btns`}>
        <ActionButton type="primary" actionFn={props.onOk} closeModal={close} autoFocus>
          {props.okText}
        </ActionButton>
      </div>
    );
  }

  const classString = classNames(prefixCls, {
    [`${prefixCls}-${props.type}`]: true,
  }, props.className);

  ReactDOM.render(
    <Dialog
      className={classString}
      onCancel={close.bind(this, { triggerCancel: true })}
      visible
      title=""
      transitionName="zoom"
      footer=""
      maskTransitionName="fade"
      maskClosable={maskClosable}
      style={style}
      width={width}
    >
      <div className={`${prefixCls}-body-wrapper`}>
        {body} {footer}
      </div>
    </Dialog>
  , div);

  return {
    destroy: close,
  };
}
