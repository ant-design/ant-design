import * as React from 'react';
import Modal, { ModalFuncProps, destroyFns } from './Modal';
import confirm from './confirm';
import InfoCircleOutlined from '../icon/icons/InfoCircleOutlined';
import CheckCircleOutlined from '../icon/icons/CheckCircleOutlined';
import CloseCircleOutlined from '../icon/icons/CloseCircleOutlined';
import ExclamationCircleOutlined from '../icon/icons/ExclamationCircleOutlined';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function(props: ModalFuncProps) {
  const config = {
    type: 'info',
    icon: <InfoCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.success = function(props: ModalFuncProps) {
  const config = {
    type: 'success',
    icon: <CheckCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.error = function(props: ModalFuncProps) {
  const config = {
    type: 'error',
    icon: <CloseCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.warning = Modal.warn = function(props: ModalFuncProps) {
  const config = {
    type: 'warning',
    icon: <ExclamationCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.confirm = function(props: ModalFuncProps) {
  const config = {
    type: 'confirm',
    okCancel: true,
    ...props,
  };
  return confirm(config);
};

Modal.destroyAll = function() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal;
