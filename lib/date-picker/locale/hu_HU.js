"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hu_HU = _interopRequireDefault(require("rc-calendar/lib/locale/hu_HU"));

var _hu_HU2 = _interopRequireDefault(require("../../time-picker/locale/hu_HU"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Válasszon dátumot',
    rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma']
  }, _hu_HU["default"]),
  timePickerLocale: _extends({}, _hu_HU2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;