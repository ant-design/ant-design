import CalendarLocale from '@rc-component/picker/locale/it_IT';

import TimePickerLocale from '../../time-picker/locale/it_IT';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Selezionare la data',
    yearPlaceholder: "Selezionare l'anno",
    quarterPlaceholder: 'Selezionare il trimestre',
    monthPlaceholder: 'Selezionare il mese',
    weekPlaceholder: 'Selezionare la settimana',
    rangePlaceholder: ["Data d'inizio", 'Data di fine'],
    rangeYearPlaceholder: ["Anno d'inizio", 'Anno di fine'],
    rangeQuarterPlaceholder: ["Trimestre d'inizio", 'Trimestre di fine'],
    rangeMonthPlaceholder: ["Mese d'inizio", 'Mese di fine'],
    rangeWeekPlaceholder: ["Settimana d'inizio", 'Settimana di fine'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
