function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import CalendarLocale from "rc-calendar/es/locale/id_ID";
import TimePickerLocale from '../../time-picker/locale/id_ID'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Pilih tanggal',
    rangePlaceholder: ['Mulai tanggal', 'Tanggal akhir']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;