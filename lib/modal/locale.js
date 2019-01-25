"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeConfirmLocale = changeConfirmLocale;
exports.getConfirmLocale = getConfirmLocale;

var _default = _interopRequireDefault(require("../locale-provider/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var runtimeLocale = _extends({}, _default["default"].Modal);

function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = _extends({}, runtimeLocale, newLocale);
  } else {
    runtimeLocale = _extends({}, _default["default"].Modal);
  }
}

function getConfirmLocale() {
  return runtimeLocale;
}