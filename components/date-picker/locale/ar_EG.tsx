// import CalendarLocale from 'rc-calendar/lib/locale/ar_EG';
import TimePickerLocale from '../../time-picker/locale/ar_EG';

// Arabic version of CalendarLocale until 'rc-calendar' accepts the pull-request
const CalendarLocale = {
  today: 'اليوم',
  now: 'الأن',
  backToToday: 'العودة إلى اليوم',
  ok: 'تأكيد',
  clear: 'مسح',
  month: 'الشهر',
  year: 'السنة',
  timeSelect: 'اختيار الوقت',
  dateSelect: 'اختيار التاريخ',
  monthSelect: 'اختيار الشهر',
  yearSelect: 'اختيار السنة',
  decadeSelect: 'اختيار العقد',
  yearFormat: 'YYYY',
  dateFormat: 'M/D/YYYY',
  dayFormat: 'D',
  dateTimeFormat: 'M/D/YYYY HH:mm:ss',
  monthBeforeYear: true,
  previousMonth: 'الشهر السابق (PageUp)',
  nextMonth: 'الشهر التالى(PageDown)',
  previousYear: 'العام السابق (Control + left)',
  nextYear: 'العام التالى (Control + right)',
  previousDecade: 'العقد السابق',
  nextDecade: 'العقد التالى',
  previousCentury: 'القرن السابق',
  nextCentury: 'القرن التالى',
};

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'اختيار التاريخ',
    rangePlaceholder: ['البداية', 'النهاية'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
