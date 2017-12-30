import Modal, { ModalFuncProps } from './Modal';
import confirm from './confirm';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function (props: ModalFuncProps) {
  const config = {
    type: 'info',
    iconType: 'info-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.success = function (props: ModalFuncProps) {
  const config = {
    type: 'success',
    iconType: 'check-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.error = function (props: ModalFuncProps) {
  const config = {
    type: 'error',
    iconType: 'cross-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.warning = Modal.warn = function (props: ModalFuncProps) {
  const config = {
    type: 'warning',
    iconType: 'exclamation-circle',
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.confirm = function (props: ModalFuncProps) {
  const config = {
    type: 'confirm',
    okCancel: true,
    ...props,
  };
  return confirm(config);
};

export default Modal;
