import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/zh_CN';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';

// 统一合并为完整的 Locale
let locale = { ...GregorianCalendarLocale };
locale.lang = {
  placeholder: '请选择日期',
  timePlaceholder: '请选择时间',
  rangePlaceholder: ['开始日期', '结束日期'],
  ...CalendarLocale,
};

// should add whitespace between char in Button
locale.lang.ok = '确 定';

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
