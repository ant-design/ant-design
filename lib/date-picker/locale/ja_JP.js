"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ja_JP = _interopRequireDefault(require("rc-calendar/lib/locale/ja_JP"));

var _ja_JP2 = _interopRequireDefault(require("../../time-picker/locale/ja_JP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var locale = {
  lang: _extends({
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日付', '終了日付']
  }, _ja_JP["default"]),
  timePickerLocale: _extends({}, _ja_JP2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;