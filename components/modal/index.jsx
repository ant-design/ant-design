import AntModal from './Modal';
import confirm from './confirm';

AntModal.info = function (props) {
  props.iconClassName = 'info-circle';
  props.okCancel = false;
  return confirm(props);
};

AntModal.success = function (props) {
  props.iconClassName = 'check-circle';
  props.okCancel = false;
  return confirm(props);
};

AntModal.error = function (props) {
  props.iconClassName = 'exclamation-circle';
  props.okCancel = false;
  return confirm(props);
};

AntModal.confirm = function (props) {
  props.okCancel = true;
  return confirm(props);
};

export default AntModal;
