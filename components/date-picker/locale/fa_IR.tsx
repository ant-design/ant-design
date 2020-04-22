import CalendarLocale from 'rc-picker/lib/locale/fa_IR';
import TimePickerLocale from '../../time-picker/locale/fa_IR';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'انتخاب تاریخ',
    rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
