import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/zh_CN';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../../time-picker/locale/zh_CN';

// 统一合并为完整的 Locale
const locale = { ...GregorianCalendarLocale };
locale.lang = {
  placeholder: '请选择日期',
  rangePlaceholder: ['开始日期', '结束日期'],
  ...CalendarLocale,
};

locale.timePickerLocale = { ...TimePickerLocale };

// should add whitespace between char in Button
locale.lang.ok = '确 定';

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
