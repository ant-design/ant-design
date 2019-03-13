import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Dialog, { ModalFuncProps, destroyFns } from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';
import warning from '../_util/warning';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
}

const IS_REACT_16 = !!ReactDOM.createPortal;

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    onCancel,
    onOk,
    close,
    zIndex,
    afterClose,
    visible,
    keyboard,
    centered,
    getContainer,
    maskStyle,
    okButtonProps,
    cancelButtonProps,
    iconType = 'question-circle',
  } = props;
  warning(
    !('iconType' in props),
    'Modal',
    `The property 'iconType' is deprecated. Use the property 'icon' instead.`,
  );

  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  const icon = props.icon === undefined ? iconType : props.icon;
  const okType = props.okType || 'primary';
  const prefixCls = props.prefixCls || 'ant-modal';
  const contentPrefixCls = `${prefixCls}-confirm`;
  // 默认为 true，保持向下兼容
  const okCancel = 'okCancel' in props ? props.okCancel! : true;
  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const runtimeLocale = getConfirmLocale();
  const okText = props.okText || (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  const cancelText = props.cancelText || runtimeLocale.cancelText;
  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  const transitionName = props.transitionName || 'zoom';
  const maskTransitionName = props.maskTransitionName || 'fade';

  const classString = classNames(
    contentPrefixCls,
    `${contentPrefixCls}-${props.type}`,
    props.className,
  );

  const cancelButton = okCancel && (
    <ActionButton
      actionFn={onCancel}
      closeModal={close}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
    >
      {cancelText}
    </ActionButton>
  );

  const iconNode = typeof icon === 'string' ? <Icon type={icon} /> : icon;

  return (
    <Dialog
      prefixCls={prefixCls}
      className={classString}
      wrapClassName={classNames({ [`${contentPrefixCls}-centered`]: !!props.centered })}
      onCancel={close.bind(this, { triggerCancel: true })}
      visible={visible}
      title=""
      transitionName={transitionName}
      footer=""
      maskTransitionName={maskTransitionName}
      mask={mask}
      maskClosable={maskClosable}
      maskStyle={maskStyle}
      style={style}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
      keyboard={keyboard}
      centered={centered}
      getContainer={getContainer}
    >
      <div className={`${contentPrefixCls}-body-wrapper`}>
        <div className={`${contentPrefixCls}-body`}>
          {iconNode}
          <span className={`${contentPrefixCls}-title`}>{props.title}</span>
          <div className={`${contentPrefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${contentPrefixCls}-btns`}>
          {cancelButton}
          <ActionButton
            type={okType}
            actionFn={onOk}
            closeModal={close}
            autoFocus={autoFocusButton === 'ok'}
            buttonProps={okButtonProps}
          >
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
    currentConfig = {
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
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render(props: any) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}
