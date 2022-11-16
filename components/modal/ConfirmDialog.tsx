import classNames from 'classnames';
import * as React from 'react';
import ConfigProvider from '../config-provider';
import ActionButton from '../_util/ActionButton';
import { getTransitionName } from '../_util/motion';
import warning from '../_util/warning';
import type { ModalFuncProps } from './Modal';
import Dialog from './Modal';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
  rootPrefixCls: string;
  iconPrefixCls?: string;
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
    open,
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
    wrapClassName,
    rootPrefixCls,
    iconPrefixCls,
    type,
    bodyStyle,
    closeIcon,
    modalRender,
    focusTriggerAfterClose,
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(typeof icon === 'string' && icon.length > 2),
      'Modal',
      `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
    );

    warning(
      visible === undefined,
      'Modal',
      `\`visible\` is deprecated, please use \`open\` instead.`,
    );
  }

  // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
  const okType = props.okType || 'primary';
  const contentPrefixCls = props.type ? `${prefixCls}-confirm` : prefixCls;
  // 默认为 true，保持向下兼容
  const okCancel = 'okCancel' in props ? props.okCancel! : true;
  const width = props.width || (props.type ? 416 : 520);
  const style = props.style || {};
  const mask = props.mask === undefined ? true : props.mask;
  const closable = props.closable === undefined ? !props.type : props.closable;
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? !props.type : props.maskClosable;
  const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';

  const classString = classNames(
    contentPrefixCls,
    { [`${contentPrefixCls}-${props.type}`]: props.type },
    { [`${contentPrefixCls}-rtl`]: direction === 'rtl' },
    props.className,
  );

  const cancelButton = okCancel && (
    <ActionButton
      actionFn={onCancel}
      close={close}
      autoFocus={autoFocusButton === 'cancel'}
      buttonProps={cancelButtonProps}
      prefixCls={`${rootPrefixCls}-btn`}
    >
      {cancelText}
    </ActionButton>
  );

  const renderTitle =
    props.title === undefined ? null : (
      <span className={`${contentPrefixCls}-title`}>{props.title}</span>
    );

  const renderFooter = (
    <>
      {cancelButton}
      <ActionButton
        type={okType}
        actionFn={onOk}
        close={close}
        autoFocus={autoFocusButton === 'ok'}
        buttonProps={okButtonProps}
        prefixCls={`${rootPrefixCls}-btn`}
      >
        {okText}
      </ActionButton>
    </>
  );

  return (
    <ConfigProvider prefixCls={rootPrefixCls} iconPrefixCls={iconPrefixCls} direction={direction}>
      <Dialog
        prefixCls={prefixCls}
        className={classString}
        wrapClassName={classNames(
          { [`${contentPrefixCls}-centered`]: !!props.centered },
          wrapClassName,
        )}
        onCancel={() => close?.({ triggerCancel: true })}
        open={open || visible}
        title={type ? '' : props.title}
        footer={type ? '' : renderFooter}
        transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
        maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
        mask={mask}
        maskClosable={maskClosable}
        maskStyle={maskStyle}
        style={style}
        bodyStyle={bodyStyle}
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
        {props.type ? (
          <div className={`${contentPrefixCls}-body-wrapper`}>
            <div className={`${contentPrefixCls}-body`}>
              {icon}
              {renderTitle}
              <div className={`${contentPrefixCls}-content`}>{props.content}</div>
            </div>
            <div className={`${contentPrefixCls}-btns`}>{renderFooter}</div>
          </div>
        ) : (
          props.content
        )}
      </Dialog>
    </ConfigProvider>
  );
};

export default ConfirmDialog;
