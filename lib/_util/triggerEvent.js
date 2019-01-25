"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = triggerEvent;

function triggerEvent(el, type) {
  if ('createEvent' in document) {
    // modern browsers, IE9+
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    el.dispatchEvent(e);
  }
}