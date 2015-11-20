import objectAssign from 'object-assign';
import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/zh_CN';
import TimepickerLocale from 'rc-time-picker/lib/locale/zh_CN';

// 统一合并为完整的 Locale
let locale = objectAssign({}, GregorianCalendarLocale);
locale.lang = objectAssign({
  placeholder: '请选择时间'
}, TimepickerLocale);

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
