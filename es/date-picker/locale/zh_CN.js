function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import CalendarLocale from "rc-calendar/es/locale/zh_CN";
import TimePickerLocale from '../../time-picker/locale/zh_CN';
var locale = {
  lang: _extends({
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // should add whitespace between char in Button

locale.lang.ok = '确 定'; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;