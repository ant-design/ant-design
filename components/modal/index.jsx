import AntModal from './Modal';
import confirm from './confirm';
import objectAssign from 'object-assign';

AntModal.info = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'info-circle',
    okCancel: false,
  });
  return confirm(config);
};

AntModal.success = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'check-circle',
    okCancel: false,
  });
  return confirm(config);
};

AntModal.error = function (props) {
  const config = objectAssign({}, props, {
    iconClassName: 'cross-circle',
    okCancel: false,
  });
  return confirm(config);
};

AntModal.confirm = function (props) {
  const config = objectAssign({}, props, {
    okCancel: true,
  });
  return confirm(config);
};

export default AntModal;
