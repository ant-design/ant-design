import CalendarLocale from 'rc-picker/lib/locale/by_BY';
import TimePickerLocale from '../../time-picker/locale/by_BY';
import type { PickerLocale } from '../generatePicker';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Выберыце дату',
    yearPlaceholder: 'Выберыце год',
    quarterPlaceholder: 'Выберыце квартал',
    monthPlaceholder: 'Выберыце месяц',
    weekPlaceholder: 'Выберыце тыдзень',
    rangePlaceholder: ['Дата пачатку', 'Дата заканчэння'],
    rangeYearPlaceholder: ['Год пачатку', 'Год заканчэння'],
    rangeQuarterPlaceholder: ['Квартал пачатку', 'Квартал заканчэння'],
    rangeMonthPlaceholder: ['Месяц пачатку', 'Месяц заканчэння'],
    rangeWeekPlaceholder: ['Тыдзень пачаку', 'Тыдзень заканчэння'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
