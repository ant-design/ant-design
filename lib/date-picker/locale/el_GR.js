"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _el_GR = _interopRequireDefault(require("rc-calendar/lib/locale/el_GR"));

var _el_GR2 = _interopRequireDefault(require("../../time-picker/locale/el_GR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Επιλέξτε ημερομηνία',
    rangePlaceholder: ['Αρχική ημερομηνία', 'Τελική ημερομηνία']
  }, _el_GR["default"]),
  timePickerLocale: _extends({}, _el_GR2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;