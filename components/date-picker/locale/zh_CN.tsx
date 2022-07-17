import CalendarLocale from 'rc-picker/lib/locale/zh_CN';
import TimePickerLocale from '../../time-picker/locale/zh_CN';
import type { PickerLocale } from '../generatePicker';

// 统一合并为完整的 Locale
const locale: PickerLocale = {
  lang: {
    placeholder: '请选择日期',
    yearPlaceholder: '请选择年份',
    quarterPlaceholder: '请选择季度',
    monthPlaceholder: '请选择月份',
    weekPlaceholder: '请选择周',
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeQuarterPlaceholder: ['开始季度', '结束季度'],
    rangeWeekPlaceholder: ['开始周', '结束周'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// should add whitespace between char in Button
locale.lang.ok = '确定';

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
