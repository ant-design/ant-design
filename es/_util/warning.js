import warning from 'warning';
var warned = {};
export default (function (valid, message) {
  if (!valid && !warned[message]) {
    warning(false, message);
    warned[message] = true;
  }
});