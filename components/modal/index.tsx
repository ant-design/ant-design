import * as React from 'react';
import Modal, { ModalFuncProps, destroyFns } from './Modal';
import confirm from './confirm';
import InfoCircle from '../icon/icons/InfoCircle';
import CheckCircle from '../icon/icons/CheckCircle';
import CloseCircle from '../icon/icons/CloseCircle';
import ExclamationCircle from '../icon/icons/ExclamationCircle';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function(props: ModalFuncProps) {
  const config = {
    type: 'info',
    icon: <InfoCircle />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.success = function(props: ModalFuncProps) {
  const config = {
    type: 'success',
    icon: <CheckCircle />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.error = function(props: ModalFuncProps) {
  const config = {
    type: 'error',
    icon: <CloseCircle />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.warning = Modal.warn = function(props: ModalFuncProps) {
  const config = {
    type: 'warning',
    icon: <ExclamationCircle />,
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
