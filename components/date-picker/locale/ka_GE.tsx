import CalendarLocale from 'rc-picker/lib/locale/ka_GE';
import TimePickerLocale from '../../time-picker/locale/ka_GE';
import type { PickerLocale } from '../generatePicker';

const locale: PickerLocale = {
  lang: {
    placeholder: 'აირჩიეთ თარიღი',
    yearPlaceholder: 'აირჩიეთ წელი',
    quarterPlaceholder: 'აირჩიეთ მეოთხედი',
    monthPlaceholder: 'აირჩიეთ თვე',
    weekPlaceholder: 'აირჩიეთ კვირა',
    rangePlaceholder: ['საწყისი თარიღი', 'საბოლოო თარიღი'],
    rangeYearPlaceholder: ['საწყისი წელი', 'საბოლოო წელი'],
    rangeMonthPlaceholder: ['საწყისი თვე', 'საბოლოო თვე'],
    rangeWeekPlaceholder: ['საწყისი კვირა', 'საბოლოო კვირა'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
