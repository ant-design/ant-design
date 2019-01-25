"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ru_RU = _interopRequireDefault(require("rc-calendar/lib/locale/ru_RU"));

var _ru_RU2 = _interopRequireDefault(require("../../time-picker/locale/ru_RU"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var locale = {
  lang: _extends({
    placeholder: 'Выберите дату',
    rangePlaceholder: ['Начальная дата', 'Конечная дата']
  }, _ru_RU["default"]),
  timePickerLocale: _extends({}, _ru_RU2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;