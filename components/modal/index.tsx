import * as React from 'react';
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import Modal, { ModalFuncProps, destroyFns } from './Modal';
import confirm from './confirm';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

function modalWarn(props: ModalFuncProps) {
  const config = {
    type: 'warning',
    icon: <ExclamationCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
}

Modal.info = function infoFn(props: ModalFuncProps) {
  const config = {
    type: 'info',
    icon: <InfoCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.success = function successFn(props: ModalFuncProps) {
  const config = {
    type: 'success',
    icon: <CheckCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.error = function errorFn(props: ModalFuncProps) {
  const config = {
    type: 'error',
    icon: <CloseCircleOutlined />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  const config = {
    type: 'confirm',
    okCancel: true,
    ...props,
  };
  return confirm(config);
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal;
