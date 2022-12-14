import CalendarLocale from 'rc-picker/lib/locale/uz_UZ';
import TimePickerLocale from '../../time-picker/locale/uz_UZ';
import type { PickerLocale } from '../generatePicker';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Sanani tanlang',
    yearPlaceholder: 'Yilni tanlang',
    quarterPlaceholder: 'Chorakni tanlang',
    monthPlaceholder: 'Oyni tanlang',
    weekPlaceholder: 'Haftani tanlang',
    rangePlaceholder: ['Bosh sana', 'Oxirigi sana'],
    rangeYearPlaceholder: ['Yilning boshi', 'Yilning oxiri'],
    rangeMonthPlaceholder: ['Oyning boshi', 'Oyning oxiri'],
    rangeWeekPlaceholder: ['Haftaning boshi', 'Haftaning oxiri'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
