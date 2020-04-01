import CalendarLocale from 'rc-picker/lib/locale/fr_FR';
import TimePickerLocale from '../../time-picker/locale/fr_FR';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Sélectionner une date',
    yearPlaceholder: 'Sélectionner une année',
    quarterPlaceholder: 'Sélectionner un trimestre',
    monthPlaceholder: 'Sélectionner un mois',
    weekPlaceholder: 'Sélectionner une semaine',
    rangePlaceholder: ['Date de début', 'Date de fin'],
    rangeYearPlaceholder: ['Année de début', 'Année de fin'],
    rangeMonthPlaceholder: ['Mois de début', 'Mois de fin'],
    rangeWeekPlaceholder: ['Semaine de début', 'Semaine de fin'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
