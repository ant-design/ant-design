import CalendarLocale from 'rc-calendar/lib/locale/ko_KR';
import TimePickerLocale from '../../time-picker/locale/ko_KR';
import assign from 'object-assign';

// 统一合并为完整的 Locale
const locale = {
  lang: assign({
    placeholder: '날짜 선택',
    rangePlaceholder: ['시작일', '종료일'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
