import Modal from './Modal';
import confirm from './confirm';

Modal.info = function (props) {
  const config = {
    ...props,
    iconClassName: 'info-circle',
    okCancel: false,
  };
  return confirm(config);
};

Modal.success = function (props) {
  const config = {
    ...props,
    iconClassName: 'check-circle',
    okCancel: false,
  };
  return confirm(config);
};

Modal.error = function (props) {
  const config = {
    ...props,
    iconClassName: 'exclamation-circle',
    okCancel: false,
  };
  return confirm(config);
};

Modal.confirm = function (props) {
  const config = {
    ...props,
    okCancel: true,
  };
  return confirm(config);
};

export default Modal;
