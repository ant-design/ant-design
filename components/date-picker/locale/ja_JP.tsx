import CalendarLocale from 'rc-calendar/lib/locale/ja_JP';
import TimePickerLocale from '../../time-picker/locale/ja_JP';
import assign from 'object-assign';

const locale = {
  lang: assign({
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日付', '終了日付'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
