import CalendarLocale from 'rc-picker/lib/locale/ja_JP';

import TimePickerLocale from '../../time-picker/locale/ja_JP';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: '日付を選択',
    yearPlaceholder: '年を選択',
    quarterPlaceholder: '四半期を選択',
    monthPlaceholder: '月を選択',
    weekPlaceholder: '週を選択',
    rangePlaceholder: ['開始日付', '終了日付'],
    rangeYearPlaceholder: ['開始年', '終了年'],
    rangeMonthPlaceholder: ['開始月', '終了月'],
    rangeQuarterPlaceholder: ['開始四半期', '終了四半期'],
    rangeWeekPlaceholder: ['開始週', '終了週'],
    shortWeekDays: ['日', '月', '火', '水', '木', '金', '土'],
    shortMonths: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
