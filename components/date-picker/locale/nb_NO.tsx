import CalendarLocale from 'rc-picker/lib/locale/nb_NO';
import TimePickerLocale from '../../time-picker/locale/nb_NO';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Velg dato',
    yearPlaceholder: 'Velg år',
    quarterPlaceholder: 'Velg kvartal',
    monthPlaceholder: 'Velg måned',
    weekPlaceholder: 'Velg uke',
    rangePlaceholder: ['Startdato', 'Sluttdato'],
    rangeYearPlaceholder: ['Startår', 'Sluttår'],
    rangeMonthPlaceholder: ['Startmåned', 'Sluttmåned'],
    rangeWeekPlaceholder: ['Start uke', 'Sluttuke'],
    today: 'I dag',
    now: 'Nâ',
    backToToday: 'Tilbake til i dag',
    ok: 'Ok',
    clear: 'Fjern',
    month: 'Måned',
    year: 'År',
    timeSelect: 'Velg tid',
    dateSelect: 'Velg dato',
    monthSelect: 'Velg en måned',
    yearSelect: 'Velg et år',
    decadeSelect: 'Velg et tiår',
    monthBeforeYear: true,
    previousMonth: 'Forrige måned (PageUp)',
    nextMonth: 'Neste måned (PageDown)',
    previousYear: 'I fjor (Kontroll + venstre)',
    nextYear: 'Neste år (Kontroll + høyre)',
    previousDecade: 'Siste tiår',
    nextDecade: 'Neste tiår',
    previousCentury: 'Siste århundre',
    nextCentury: 'Neste århundre',
    ...CalendarLocale,
  },
  timePickerLocale: {
    placeholder: 'Select time',
    ...TimePickerLocale,
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
