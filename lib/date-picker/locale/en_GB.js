"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _en_GB = _interopRequireDefault(require("rc-calendar/lib/locale/en_GB"));

var _en_GB2 = _interopRequireDefault(require("../../time-picker/locale/en_GB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date']
  }, _en_GB["default"]),
  timePickerLocale: _extends({}, _en_GB2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;