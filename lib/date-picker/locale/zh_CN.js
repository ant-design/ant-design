"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zh_CN = _interopRequireDefault(require("rc-calendar/lib/locale/zh_CN"));

var _zh_CN2 = _interopRequireDefault(require("../../time-picker/locale/zh_CN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var locale = {
  lang: _extends({
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期']
  }, _zh_CN["default"]),
  timePickerLocale: _extends({}, _zh_CN2["default"])
}; // should add whitespace between char in Button

locale.lang.ok = '确 定'; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;