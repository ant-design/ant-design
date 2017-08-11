// import CalendarLocale from 'rc-calendar/lib/locale/sr_RS';
import TimePickerLocale from '../../time-picker/locale/sr_RS';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Izaberite datum',
    rangePlaceholder: ['Početni datum', 'Krajnji datum'],

  },
  timePickerLocale: {
    ...TimePickerLocale,
    // remove when rc-calendar v9.1.3 or greater is used in ant.design
    today: 'Danas',
    now: 'Sada',
    backToToday: 'Vrati se na danas',
    ok: 'U redu',
    clear: 'Obriši',
    month: 'Mesec',
    year: 'Godina',
    timeSelect: 'Izaberi vreme',
    dateSelect: 'Izaberi datum',
    monthSelect: 'Izaberi mesec',
    yearSelect: 'Izaberi godinu',
    decadeSelect: 'Izaberi deceniju',
    yearFormat: 'YYYY',
    dateFormat: 'DD.MM.YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
    monthBeforeYear: true,
    previousMonth: 'Prethodni mesec (PageUp)',
    nextMonth: 'Sledeći mesec (PageDown)',
    previousYear: 'Prethodna godina (Control + left)',
    nextYear: 'Sledeća godina (Control + right)',
    previousDecade: 'Prethodna decenija',
    nextDecade: 'Sledeća decenija',
    previousCentury: 'Prethodni vek',
    nextCentury: 'Sledeći vek',
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
