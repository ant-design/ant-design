"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _da_DK = _interopRequireDefault(require("rc-calendar/lib/locale/da_DK"));

var _da_DK2 = _interopRequireDefault(require("../../time-picker/locale/da_DK"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Vælg dato',
    rangePlaceholder: ['Startdato', 'Slutdato']
  }, _da_DK["default"]),
  timePickerLocale: _extends({}, _da_DK2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;