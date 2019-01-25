function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */
import CalendarLocale from "rc-calendar/es/locale/ru_RU";
import TimePickerLocale from '../../time-picker/locale/ru_RU';
var locale = {
  lang: _extends({
    placeholder: 'Выберите дату',
    rangePlaceholder: ['Начальная дата', 'Конечная дата']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;