import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Dialog, { ModalFuncProps } from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
}

const IS_REACT_16 = !!ReactDOM.createPortal;

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { onCancel, onOk, close, zIndex, afterClose, visible, keyboard, centered, getContainer } = props;
  const iconType = props.iconType || 'question-circle';
  const okType = props.okType || 'primary';
  const prefixCls = props.prefixCls || 'ant-confirm';
  // 默认为 true，保持向下兼容
  const okCancel = ('okCancel' in props) ? props.okCancel! : true;
  const width = props.width || 416;
  const style = props.style || {};
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const runtimeLocale = getConfirmLocale();
  const okText = props.okText ||
    (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  const cancelText = props.cancelText || runtimeLocale.cancelText;

  const classString = classNames(
    prefixCls,
    `${prefixCls}-${props.type}`,
    props.className,
  );

  const cancelButton = okCancel && (
    <ActionButton actionFn={onCancel} closeModal={close}>
      {cancelText}
    </ActionButton>
  );

  return (
    <Dialog
      className={classString}
      wrapClassName={classNames({ [`${prefixCls}-centered`]: !!props.centered })}
      onCancel={close.bind(this, { triggerCancel: true })}
      visible={visible}
      title=""
      transitionName="zoom"
      footer=""
      maskTransitionName="fade"
      maskClosable={maskClosable}
      style={style}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
      keyboard={keyboard}
      centered={centered}
      getContainer={getContainer}
    >
      <div className={`${prefixCls}-body-wrapper`}>
        <div className={`${prefixCls}-body`}>
          <Icon type={iconType!} />
          <span className={`${prefixCls}-title`}>{props.title}</span>
          <div className={`${prefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${prefixCls}-btns`}>
          {cancelButton}
          <ActionButton type={okType} actionFn={onOk} closeModal={close} autoFocus>
            {okText}
          </ActionButton>
        </div>
      </div>
    </Dialog>
  );
};

export default function confirm(config: ModalFuncProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { ...config, close, visible: true } as any;

  function close(...args: any[]) {
    currentConfig =  {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    if (IS_REACT_16) {
      render(currentConfig);
    } else {
      destroy(...args);
    }
  }

  function update(newConfig: ModalFuncProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  function render(props: any) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }

  render(currentConfig);

  return {
    destroy: close,
    update,
  };
}
