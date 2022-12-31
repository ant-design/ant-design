// Tamil Locale added to rc-calendar
import CalendarLocale from 'rc-picker/lib/locale/ta_IN';
import TimePickerLocale from '../../time-picker/locale/ta_IN';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'தேதியைத் தேர்ந்தெடுக்கவும்',
    rangePlaceholder: ['தொடக்க தேதி', 'கடைசி தேதி'],
    quarterPlaceholder: 'காலாண்டைத் தேர்ந்தெடுக்கவும்',
    monthPlaceholder: 'மாதத்தைத் தேர்ந்தெடுக்கவும்',
    weekPlaceholder: 'வாரத்தைத் தேர்ந்தெடுக்கவும்',
    rangeYearPlaceholder: ['தொடக்க ஆண்டு', 'இறுதி ஆண்டு'],
    rangeQuarterPlaceholder: ['காலாண்டு தொடக்கம்', 'இறுதி காலாண்டு'],
    rangeMonthPlaceholder: ['தொடக்க மாதம்', 'இறுதி மாதம்'],
    rangeWeekPlaceholder: ['வாரம் தொடங்கு', 'இறுதி வாரம்'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
