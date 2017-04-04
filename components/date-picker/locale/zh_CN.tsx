import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../../time-picker/locale/zh_CN';
import assign from 'object-assign';

// 备注：以下代码无法完全按最初设计运行，但为了保证兼容性，需要保留，直至 antd 默认语言改为英文
//  1. 如果用户不给时间类组件传入 value defaultValue，则运行符合预期
//  2. 如果用户传入 value defaultValue，因为这段代码没有在用户代码之前运行，所以用户调用 moment 时，默认语言依然为英文
// To set the default locale of moment to zh-cn globally.
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// should add whitespace between char in Button
locale.lang.ok = '确 定';

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
