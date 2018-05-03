import Modal, { ModalFuncProps } from './Modal';
import confirm from './confirm';

export { ActionButtonProps } from './ActionButton';

const config = {
  info: {
    type: 'info',
    iconType: 'info-circle',
    okCancel: false,
  },
  success: {
    type: 'success',
    iconType: 'check-circle',
    okCancel: false,
  },
  error: {
    type: 'error',
    iconType: 'cross-circle',
    okCancel: false,
  },
  warning: {
    type: 'warning',
    iconType: 'exclamation-circle',
    okCancel: false,
  },
  confirm: {
    type: 'confirm',
    okCancel: true,
  },
};

Modal.info = function (props: ModalFuncProps) { return confirm({ ...config.info, ...props }); };
Modal.success = function (props: ModalFuncProps) { return confirm({ ...config.success, ...props }); };
Modal.error = function (props: ModalFuncProps) { return confirm({ ...config.error, ...props }); };
Modal.warning = function (props: ModalFuncProps) { return confirm({ ...config.warning, ...props }); };
Modal.warn = function (props: ModalFuncProps) { return confirm({ ...config.warning, ...props }); };
Modal.confirm = function (props: ModalFuncProps) { return confirm({ ...config.confirm, ...props }); };

export default Modal;
