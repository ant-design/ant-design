// import CalendarLocale from "rc-picker/es/locale/by_BY";
import TimePickerLocale from '../../time-picker/locale/by_BY'; // Merge into a locale object

var locale = {
  lang: {
    placeholder: 'Выберыце дату',
    yearPlaceholder: 'Выберыце год',
    quarterPlaceholder: 'Выберыце квартал',
    monthPlaceholder: 'Выберыце месяц',
    weekPlaceholder: 'Выберыце тыдзень',
    rangePlaceholder: ['Пачатковая дата', 'Канчатковая дата'],
    rangeYearPlaceholder: ['Пачатковы год', 'Год заканчэння'],
    rangeMonthPlaceholder: ['Пачатковы месяц', 'Канчатковы месяц'],
    rangeWeekPlaceholder: ['Пачатковы тыдзень', 'Канчатковы тыдзень'],
    today: 'Сёння',
    now: 'Зараз',
    backToToday: 'Дадзеная дата',
    ok: 'Ok',
    clear: 'Ачысціць',
    month: 'Месяц',
    year: 'Год',
    timeSelect: 'Выбраць час',
    dateSelect: 'Выбраць дату',
    monthSelect: 'Выбраць месяц',
    yearSelect: 'Выбраць год',
    decadeSelect: 'Выбраць дзесяцігоддзе',
    yearFormat: 'YYYY',
    dateFormat: 'D-M-YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'D-M-YYYY HH:mm:ss',
    monthBeforeYear: true,
    previousMonth: 'Папярэдні месяц (PageUp)',
    nextMonth: 'Наступны месяц (PageDown)',
    previousYear: 'Папярэдні год (Control + left)',
    nextYear: 'Наступны год (Control + right)',
    previousDecade: 'Папярэдняе дзесяцігоддзе',
    nextDecade: 'Наступнае дзесяцігоддзе',
    previousCentury: 'Папярэдні век',
    nextCentury: 'Наступны век'
  }, 
  // ...CalendarLocale,
  timePickerLocale:{ 
      ...TimePickerLocale,
  }
}; 

export default locale;