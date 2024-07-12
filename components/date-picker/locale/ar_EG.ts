import CalendarLocale from 'rc-picker/lib/locale/ar_EG';

import TimePickerLocale from '../../time-picker/locale/ar_EG';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    locale: "ar_EG",
    placeholder: 'اختيار التاريخ',
    rangePlaceholder: ['البداية', 'النهاية'],
    today: "اليوم",
    now: "الآن",
    backToToday: "العودة إلى اليوم",
    ok: "تأكيد",
    clear: "مسح",
    month: "شهر",
    year: "سنة",
    timeSelect: "اختيار الوقت",
    dateSelect:  "اختيار التاريخ",
    monthSelect: "اختر شهر",
    yearSelect: "اختر سنة",
    decadeSelect: "اختر العقد",
    yearFormat: "YYYY",
    dateFormat: "D/M/YYYY",
    dayFormat: "D",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "الشهر السابق (PageUp)",
    nextMonth: "الشهر القادم (PageDown)",
    previousYear: "العام الماضي (Control + left)",
    nextYear: "العام القادم (Control + right)",
    previousDecade: "العقد الماضي",
    nextDecade: "العقد القادم",
    previousCentury: "القرن الماضي",
    nextCentury: "القرن القادم",
    shortWeekDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    shortMonths: [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر"
    ],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
  dateFormat: 'DD-MM-YYYY',
  monthFormat: 'MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
  weekFormat: 'wo-YYYY',
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
