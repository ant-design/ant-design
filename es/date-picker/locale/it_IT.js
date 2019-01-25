function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import CalendarLocale from "rc-calendar/es/locale/it_IT";
import TimePickerLocale from '../../time-picker/locale/it_IT'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Selezionare la data',
    rangePlaceholder: ["Data d'inizio", 'Data di fine']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;