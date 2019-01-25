"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _it_IT = _interopRequireDefault(require("rc-calendar/lib/locale/it_IT"));

var _it_IT2 = _interopRequireDefault(require("../../time-picker/locale/it_IT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({
    placeholder: 'Selezionare la data',
    rangePlaceholder: ["Data d'inizio", 'Data di fine']
  }, _it_IT["default"]),
  timePickerLocale: _extends({}, _it_IT2["default"])
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

var _default = locale;
exports["default"] = _default;