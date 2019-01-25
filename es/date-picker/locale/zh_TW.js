function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import CalendarLocale from "rc-calendar/es/locale/zh_TW";
import TimePickerLocale from '../../time-picker/locale/zh_TW';
var locale = {
  lang: _extends({
    placeholder: '請選擇日期',
    rangePlaceholder: ['開始日期', '結束日期']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
};
locale.lang.ok = '確 定'; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;