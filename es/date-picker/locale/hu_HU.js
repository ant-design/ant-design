function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import CalendarLocale from "rc-calendar/es/locale/hu_HU";
import TimePickerLocale from '../../time-picker/locale/hu_HU'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Válasszon dátumot',
    rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;