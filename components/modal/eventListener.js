function wrap(standard, fallback) {
  return function (el, evtName, listener, useCapture) {
    if (el[standard]) {
      el[standard](evtName, listener, useCapture);
    } else if (el[fallback]) {
      el[fallback]('on' + evtName, listener);
    }
  };
}

export default {
  add: wrap('addEventListener', 'attachEvent'),
  remove: wrap('removeEventListener', 'detachEvent')
};
