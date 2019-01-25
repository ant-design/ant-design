"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _de_DE = _interopRequireDefault(require("rc-calendar/lib/locale/de_DE"));

var _de_DE2 = _interopRequireDefault(require("../../time-picker/locale/de_DE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Datum auswählen',
    rangePlaceholder: ['Startdatum', 'Enddatum']
  }, _de_DE["default"]),
  timePickerLocale: _extends({}, _de_DE2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;