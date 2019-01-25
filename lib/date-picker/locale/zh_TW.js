"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zh_TW = _interopRequireDefault(require("rc-calendar/lib/locale/zh_TW"));

var _zh_TW2 = _interopRequireDefault(require("../../time-picker/locale/zh_TW"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var locale = {
  lang: _extends({
    placeholder: '請選擇日期',
    rangePlaceholder: ['開始日期', '結束日期']
  }, _zh_TW["default"]),
  timePickerLocale: _extends({}, _zh_TW2["default"])
};
locale.lang.ok = '確 定'; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;