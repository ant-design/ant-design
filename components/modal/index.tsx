import Modal, { ModalFuncProps } from './Modal';
import confirm from './confirm';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

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

Modal.info = (props: ModalFuncProps) => { confirm({ ...config.info, ...props }); };
Modal.success = (props: ModalFuncProps) => { confirm({ ...config.success, ...props }); };
Modal.error = (props: ModalFuncProps) => { confirm({ ...config.error, ...props }); };
Modal.warning = (props: ModalFuncProps) => { confirm({ ...config.warning, ...props }); };
Modal.warn = (props: ModalFuncProps) => { confirm({ ...config.warning, ...props }); };
Modal.confirm = (props: ModalFuncProps) => { confirm({ ...config.confirm, ...props }); };

export default Modal;
