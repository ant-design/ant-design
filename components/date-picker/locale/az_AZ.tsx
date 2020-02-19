import CalendarLocale from 'rc-picker/lib/locale/az_AZ';
import TimePickerLocale from '../../time-picker/locale/az_AZ';

const locale = {
  lang: {
    placeholder: 'Tarix seçin',
    rangePlaceholder: ['Başlama tarixi', 'Bitmə tarixi'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
