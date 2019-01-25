"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _et_EE = _interopRequireDefault(require("rc-calendar/lib/locale/et_EE"));

var _et_EE2 = _interopRequireDefault(require("../../time-picker/locale/et_EE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// 统一合并为完整的 Locale
var locale = {
  lang: _extends({
    placeholder: 'Vali kuupäev',
    rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev']
  }, _et_EE["default"]),
  timePickerLocale: _extends({}, _et_EE2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;