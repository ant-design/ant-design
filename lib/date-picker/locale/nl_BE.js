"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nl_BE = _interopRequireDefault(require("rc-calendar/lib/locale/nl_BE"));

var _nl_BE2 = _interopRequireDefault(require("../../time-picker/locale/nl_BE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Selecteer datum',
    rangePlaceholder: ['Begin datum', 'Eind datum']
  }, _nl_BE["default"]),
  timePickerLocale: _extends({}, _nl_BE2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;