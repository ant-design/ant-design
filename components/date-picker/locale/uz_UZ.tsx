import CalendarLocale from 'rc-picker/lib/locale/uz_UZ';
import TimePickerLocale from '../../time-picker/locale/uz_UZ';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
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

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
