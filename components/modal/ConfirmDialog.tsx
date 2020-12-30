import * as React from 'react';
import classNames from 'classnames';
import Dialog, { ModalFuncProps } from './Modal';
import ActionButton from './ActionButton';
import devWarning from '../_util/devWarning';
import ConfigProvider from '../config-provider';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
  rootPrefixCls?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    icon,
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
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    direction,
    prefixCls,
    rootPrefixCls,
    bodyStyle,
    closable = false,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
  } = props;

  devWarning(
    !(typeof icon === 'string' && icon.length > 2),
    'Modal',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
  );

  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  const okType = props.okType || 'primary';
  const contentPrefixCls = `${prefixCls}-confirm`;
  // 默认为 true，保持向下兼容
  const okCancel = 'okCancel' in props ? props.okCancel! : true;
  const width = props.width || 416;
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  const transitionName = props.transitionName || 'zoom';
  const maskTransitionName = props.maskTransitionName || 'fade';

  const classString = classNames(
    contentPrefixCls,
    `${contentPrefixCls}-${props.type}`,
    { [`${contentPrefixCls}-rtl`]: direction === 'rtl' },
    props.className,
  );

  const cancelButton = okCancel && (
    <ActionButton
      actionFn={onCancel}
      closeModal={close}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {cancelText}
    </ActionButton>
  );

  return (
    <Dialog
      prefixCls={prefixCls}
      className={classString}
      wrapClassName={classNames({ [`${contentPrefixCls}-centered`]: !!props.centered })}
      onCancel={() => close({ triggerCancel: true })}
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
      closable={closable}
      closeIcon={closeIcon}
      modalRender={modalRender}
      focusTriggerAfterClose={focusTriggerAfterClose}
    >
      <div className={`${contentPrefixCls}-body-wrapper`}>
        <ConfigProvider prefixCls={rootPrefixCls}>
          <div className={`${contentPrefixCls}-body`} style={bodyStyle}>
            {icon}
            {props.title === undefined ? null : (
              <span className={`${contentPrefixCls}-title`}>{props.title}</span>
            )}
            <div className={`${contentPrefixCls}-content`}>{props.content}</div>
          </div>
        </ConfigProvider>
        <div className={`${contentPrefixCls}-btns`}>
          {cancelButton}
          <ActionButton
            type={okType}
            actionFn={onOk}
            closeModal={close}
            autoFocus={autoFocusButton === 'ok'}
            buttonProps={okButtonProps}
            prefixCls={`${rootPrefixCls}-btn`}
          >
            {okText}
          </ActionButton>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
