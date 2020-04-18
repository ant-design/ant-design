import Pagination from 'rc-pagination/lib/locale/he_IL';
import DatePicker from '../date-picker/locale/he_IL';
import TimePicker from '../time-picker/locale/he_IL';
import Calendar from '../calendar/locale/he_IL';
import { Locale } from '../locale-provider';

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
};

export default localeValues;
