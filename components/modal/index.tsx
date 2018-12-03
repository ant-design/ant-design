import Modal, { ModalFuncProps, destroyFns } from './Modal';
import confirm from './confirm';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function(props: ModalFuncProps) {
  const config = {
    type: 'info',
    iconType: 'info-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.success = function(props: ModalFuncProps) {
  const config = {
    type: 'success',
    iconType: 'check-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.error = function(props: ModalFuncProps) {
  const config = {
    type: 'error',
    iconType: 'close-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.warning = Modal.warn = function(props: ModalFuncProps) {
  const config = {
    type: 'warning',
    iconType: 'exclamation-circle',
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

Modal.destroyAll = function () {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal;
