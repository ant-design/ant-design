/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/he_IL';
import DatePicker from '../date-picker/locale/he_IL';
import TimePicker from '../time-picker/locale/he_IL';
import Calendar from '../calendar/locale/he_IL';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} הוא לא ${type} תקין';

const localeValues: Locale = {
  locale: 'he',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'אנא בחר',
  },
  Table: {
    filterTitle: 'תפריט סינון',
    filterConfirm: 'אישור',
    filterReset: 'איפוס',
    selectAll: 'בחר הכל',
    selectInvert: 'הפוך בחירה',
    selectionAll: 'בחר את כל הנתונים',
    sortTitle: 'מיון',
    expand: 'הרחב שורה',
    collapse: 'צמצם שורהw',
    triggerDesc: 'לחץ על מיון לפי סדר יורד',
    triggerAsc: 'לחץ על מיון לפי סדר עולה',
    cancelSort: 'לחץ כדי לבטל את המיון',
  },
  Modal: {
    okText: 'אישור',
    cancelText: 'ביטול',
    justOkText: 'אישור',
  },
  Popconfirm: {
    okText: 'אישור',
    cancelText: 'ביטול',
  },
  Transfer: {
    searchPlaceholder: 'חפש כאן',
    itemUnit: 'פריט',
    itemsUnit: 'פריטים',
  },
  Upload: {
    uploading: 'מעלה...',
    removeFile: 'הסר קובץ',
    uploadError: 'שגיאת העלאה',
    previewFile: 'הצג קובץ',
    downloadFile: 'הורד קובץ',
  },
  Empty: {
    description: 'אין מידע',
  },
  Icon: {
    icon: 'סמל',
  },
  Text: {
    edit: 'ערוך',
    copy: 'העתק',
    copied: 'הועתק',
    expand: 'הרחב',
  },
  PageHeader: {
    back: 'חזרה',
  },
  Form: {
    defaultValidateMessages: {
      default: 'ערך השדה שגוי ${label}',
      required: 'בבקשה הזן ${label}',
      enum: '${label} חייב להיות אחד מערכים אלו [${enum}]',
      whitespace: '${label} לא יכול להיות ריק',
      date: {
        format: '${label} תאריך לא תקין',
        parse: '${label} לא ניתן להמיר לתאריך',
        invalid: '${label} הוא לא תאריך תקין',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} חייב להיות ${len} תווים',
        min: '${label} חייב להיות ${min} תווים',
        max: '${label} מקסימום ${max} תווים',
        range: '${label} חייב להיות בין ${min}-${max} תווים',
      },
      number: {
        len: '${label} חייב להיות שווה ל ${len}',
        min: '${label} ערך מינימלי הוא ${min}',
        max: '${label} ערך מקסימלי הוא ${max}',
        range: '${label} חייב להיות בין ${min}-${max}',
      },
      array: {
        len: 'חייב להיות ${len} ${label}',
        min: 'מינימום ${min} ${label}',
        max: 'מקסימום ${max} ${label}',
        range: 'הסכום של ${label} חייב להיות בין ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} לא תואם לתבנית ${pattern}',
      },
    },
  },
};

export default localeValues;
