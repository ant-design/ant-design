"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rcCalendar = _interopRequireDefault(require("rc-calendar"));

var _MonthCalendar = _interopRequireDefault(require("rc-calendar/lib/MonthCalendar"));

var _createPicker = _interopRequireDefault(require("./createPicker"));

var _wrapPicker = _interopRequireDefault(require("./wrapPicker"));

var _RangePicker = _interopRequireDefault(require("./RangePicker"));

var _WeekPicker = _interopRequireDefault(require("./WeekPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DatePicker = (0, _wrapPicker["default"])((0, _createPicker["default"])(_rcCalendar["default"]));
var MonthPicker = (0, _wrapPicker["default"])((0, _createPicker["default"])(_MonthCalendar["default"]), 'YYYY-MM');

_extends(DatePicker, {
  RangePicker: (0, _wrapPicker["default"])(_RangePicker["default"]),
  MonthPicker: MonthPicker,
  WeekPicker: (0, _wrapPicker["default"])(_WeekPicker["default"], 'gggg-wo')
});

var _default = DatePicker;
exports["default"] = _default;