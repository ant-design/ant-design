import CalendarLocale from 'rc-picker/lib/locale/uz_UZ';
import TimePickerLocale from '../../time-picker/locale/uz_UZ';
import type { PickerLocale } from '../generatePicker';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Sanani tanlang',
    rangePlaceholder: ['Boshlanish sana', 'Tugash sana'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
