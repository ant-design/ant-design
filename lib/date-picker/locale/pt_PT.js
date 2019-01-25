"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pt_PT = _interopRequireDefault(require("rc-calendar/lib/locale/pt_PT"));

var _pt_PT2 = _interopRequireDefault(require("../../time-picker/locale/pt_PT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Merge into a locale object
var locale = {
  lang: _extends({}, _pt_PT["default"], {
    placeholder: 'Data',
    rangePlaceholder: ['Data inicial', 'Data final'],
    today: 'Hoje',
    now: 'Agora',
    backToToday: 'Hoje',
    ok: 'Ok',
    clear: 'Limpar',
    month: 'Mês',
    year: 'Ano',
    timeSelect: 'Hora',
    dateSelect: 'Selecionar data',
    monthSelect: 'Selecionar mês',
    yearSelect: 'Selecionar ano',
    decadeSelect: 'Selecionar década',
    yearFormat: 'YYYY',
    dateFormat: 'D/M/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'D/M/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: false,
    previousMonth: 'Mês anterior (PageUp)',
    nextMonth: 'Mês seguinte (PageDown)',
    previousYear: 'Ano anterior (Control + left)',
    nextYear: 'Ano seguinte (Control + right)',
    previousDecade: 'Última década',
    nextDecade: 'Próxima década',
    previousCentury: 'Último século',
    nextCentury: 'Próximo século'
  }),
  timePickerLocale: _extends({}, _pt_PT2["default"], {
    placeholder: 'Hora'
  })
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

var _default = locale;
exports["default"] = _default;