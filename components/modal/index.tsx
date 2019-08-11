import * as React from 'react';
import { InfoCircle, CheckCircle, CloseCircle, ExclamationCircle } from '@ant-design/icons';

import Modal, { ModalFuncProps, destroyFns } from './Modal';
import confirm from './confirm';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

function modalWarn(props: ModalFuncProps) {
  const config = {
    type: 'warning',
    icon: <ExclamationCircle />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
}

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

Modal.warning = modalWarn;

Modal.warn = modalWarn;

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
