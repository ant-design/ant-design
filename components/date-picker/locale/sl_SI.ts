import TimePickerLocale from '../../time-picker/locale/sl_SI';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    locale: 'sl',
    placeholder: 'Izberite datum',
    yearPlaceholder: 'Izberite leto',
    quarterPlaceholder: 'Izberite četrtletje',
    monthPlaceholder: 'Izberite mesec',
    weekPlaceholder: 'Izberite teden',
    rangePlaceholder: ['Začetni datum', 'Končni datum'],
    rangeYearPlaceholder: ['Začetno leto', 'Končno leto'],
    rangeQuarterPlaceholder: ['Začetno četrtletje', 'Končno četrtletje'],
    rangeMonthPlaceholder: ['Začetni mesec', 'Končni mesec'],
    rangeWeekPlaceholder: ['Začetni teden', 'Končni teden'],
    today: 'Danes',
    now: 'Trenutno',
    backToToday: 'Nazaj na trenutni datum',
    ok: 'OK',
    clear: 'Počisti',
    week: 'Teden',
    month: 'Mesec',
    year: 'Leto',
    timeSelect: 'Izberi čas',
    dateSelect: 'Izberi datum',
    monthSelect: 'Izberite mesec',
    yearSelect: 'Izberite leto',
    decadeSelect: 'Izberite desetletje',
    yearFormat: 'YYYY',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Prejšnji mesec (PageUp)',
    nextMonth: 'Naslednji mesec (PageDown)',
    previousYear: 'Lansko leto (Control + left)',
    nextYear: 'Naslednje leto (Control + right)',
    previousDecade: 'Prejšnje desetletje',
    nextDecade: 'Naslednje desetletje',
    previousCentury: 'Zadnje stoletje',
    nextCentury: 'Naslednje stoletje',
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
