import CalendarLocale from 'rc-picker/lib/locale/az_AZ';

import TimePickerLocale from '../../time-picker/locale/az_AZ';
import type { PickerLocale } from '../generatePicker';

const locale: PickerLocale = {
  lang: {
    placeholder: 'Tarix seçin',
    rangePlaceholder: ['Başlama tarixi', 'Bitmə tarixi'],
    yearPlaceholder: 'İl seçin',
    quarterPlaceholder: 'Rüb seçin',
    monthPlaceholder: 'Ay seçin',
    weekPlaceholder: 'Həftə seçin',
    rangeYearPlaceholder: ['Başlama il', 'Bitmə il'],
    rangeQuarterPlaceholder: ['Başlama rüb', 'Bitmə rüb'],
    rangeMonthPlaceholder: ['Başlama ay', 'Bitmə ay'],
    rangeWeekPlaceholder: ['Başlama həftə', 'Bitmə həftə'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
