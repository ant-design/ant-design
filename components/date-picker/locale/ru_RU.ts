/** Created by Andrey Gayvoronsky on 13/04/16. */

import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import TimePickerLocale from '../../time-picker/locale/ru_RU';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Выберите дату',
    yearPlaceholder: 'Выберите год',
    quarterPlaceholder: 'Выберите квартал',
    monthPlaceholder: 'Выберите месяц',
    weekPlaceholder: 'Выберите неделю',
    rangePlaceholder: ['Начальная дата', 'Конечная дата'],
    rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
    rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
    rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
    shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
