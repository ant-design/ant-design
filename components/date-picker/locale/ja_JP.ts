import CalendarLocale from 'rc-picker/lib/locale/ja_JP';
import TimePickerLocale from '../../time-picker/locale/ja_JP';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日付', '終了日付'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
