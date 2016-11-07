import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../../time-picker/locale/zh_CN';
import assign from 'object-assign';

// To set the default locale of moment to zh-cn globally.
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 统一合并为完整的 Locale
const locale = {
  lang: assign({
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期'],
    quickSelection: '快捷选择',
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// should add whitespace between char in Button
locale.lang.ok = '确 定';

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
