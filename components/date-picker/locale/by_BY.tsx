import CalendarLocale from 'rc-picker/lib/locale/by_BY';
import TimePickerLocale from '../../time-picker/locale/by_BY';
import { PickerLocale } from '../generatePicker';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Выберыце дату',
    yearPlaceholder: 'Выберыце год',
    quarterPlaceholder: 'Выберыце квартал',
    monthPlaceholder: 'Выберыце месяц',
    weekPlaceholder: 'Выберыце тыдзень',
    rangePlaceholder: ['Пачатковая дата', 'Канчатковая дата'],
    rangeYearPlaceholder: ['Пачатковы год', 'Год заканчэння'],
    rangeMonthPlaceholder: ['Пачатковы месяц', 'Канчатковы месяц'],
    rangeWeekPlaceholder: ['Пачатковы тыдзень', 'Канчатковы тыдзень'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
