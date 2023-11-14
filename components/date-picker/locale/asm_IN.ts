import CalendarLocale from 'rc-picker/lib/locale/asm_IN';
import TimePickerLocale from '../../time-picker/locale/asm_IN';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'তাৰিখ চয়ন কৰক',
    yearPlaceholder: 'বছৰ চয়ন কৰক',
    quarterPlaceholder: 'তিনমাসিক চয়ন কৰক',
    monthPlaceholder: 'মাহ চয়ন কৰক',
    weekPlaceholder: 'সপ্তাহ চয়ন কৰক',
    rangePlaceholder: ['আৰম্ভ তাৰিখ', 'শেষ তাৰিখ'],
    rangeYearPlaceholder: ['আৰম্ভ বছৰ', 'শেষ বছৰ'],
    rangeQuarterPlaceholder: ['আৰম্ভ তিনমাসিক', 'শেষ তিনমাসিক'],
    rangeMonthPlaceholder: ['আৰম্ভ মাহ', 'শেষ মাহ'],
    rangeWeekPlaceholder: ['আৰম্ভ সপ্তাহ', 'শেষ সপ্তাহ'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
