import CalendarLocale from 'rc-picker/lib/locale/fi_FI';
import TimePickerLocale from '../../time-picker/locale/fi_FI';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Valitse päivä',
    rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
