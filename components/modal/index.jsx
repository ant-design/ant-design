import Modal from './Modal';
import confirm from './confirm';
import objectAssign from 'object-assign';

Modal.info = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'info-circle',
    okCancel: false,
  });
  return confirm(config);
};

Modal.success = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'check-circle',
    okCancel: false,
  });
  return confirm(config);
};

Modal.error = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'exclamation-circle',
    okCancel: false,
  });
  return confirm(config);
};

Modal.confirm = function (props) {
  const config = objectAssign({}, props, {
    okCancel: true,
  });
  return confirm(config);
};

export default Modal;
