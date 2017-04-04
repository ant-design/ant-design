/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */

import CalendarLocale from 'rc-calendar/lib/locale/ru_RU';
import TimePickerLocale from '../../time-picker/locale/ru_RU';
import assign from 'object-assign';

const locale = {
  lang: assign({
    placeholder: 'Выберите дату',
    rangePlaceholder: ['Начальная дата', 'Конечная дата'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
