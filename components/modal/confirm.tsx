import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from './Modal';
import Icon from '../icon';
import Button from '../button';
import classNames from 'classnames';
import { getConfirmLocale } from './locale';
import assign from 'object-assign';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onClick = () => {
    const { actionFn, closeModal } = this.props;
    if (actionFn) {
      let ret;
      if (actionFn.length) {
        ret = actionFn(closeModal);
      } else {
        ret = actionFn();
        if (!ret) {
          closeModal();
        }
      }
      if (ret && ret.then) {
        this.setState({ loading: true });
        ret.then((...args) => {
          // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
          // this.setState({ loading: false });
          closeModal(...args);
        });
      }
    } else {
      closeModal();
    }
  }

  render() {
    const { type, children } = this.props;
    const loading = this.state.loading;
    return (
      <Button type={type} size="large" onClick={this.onClick} loading={loading}>
        {children}
      </Button>
    );
  }
}

export default function confirm(config) {
  const props = assign({ iconType: 'question-circle' }, config);
  let div = document.createElement('div');
  document.body.appendChild(div);

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

  let d;
  function close() {
    d.setState({
      visible: false,
    });
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
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
        <ActionButton type="ghost" actionFn={props.onCancel} closeModal={close}>
          {props.cancelText}
        </ActionButton>
        <ActionButton type="primary" actionFn={props.onOk} closeModal={close}>
          {props.okText}
        </ActionButton>
      </div>
    );
  } else {
    footer = (
      <div className="ant-confirm-btns">
        <ActionButton type="primary" actionFn={props.onOk} closeModal={close}>
          {props.okText}
        </ActionButton>
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
      width={width}
    >
      <div style={{ zoom: 1, overflow: 'hidden' }}>{body} {footer}</div>
    </Dialog>
  , div, function () {
    d = this;
  });

  return {
    destroy: close,
  };
}
