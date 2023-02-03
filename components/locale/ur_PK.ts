/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ur_PK';
import Calendar from '../calendar/locale/ur_PK';
import DatePicker from '../date-picker/locale/ur_PK';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/ur_PK';

const typeTemplate = '${label} درست نہیں ہے ${type}';

const localeValues: Locale = {
  locale: 'ur',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'منتخب کریں',
  },
  Table: {
    filterTitle: 'فلٹر مینو',
    filterConfirm: 'ٹھیک ہے',
    filterReset: 'ری سیٹ کریں',
    filterEmptyText: 'فلٹرز نہیں',
    emptyText: 'کوئی ڈیٹا نہیں',
    selectAll: 'موجودہ صفحہ منتخب کریں',
    selectInvert: 'موجودہ صفحے کو الٹ دیں',
    selectNone: 'تمام ڈیٹا صاف کریں',
    selectionAll: 'تمام ڈیٹا کو منتخب کریں',
    sortTitle: 'ترتیب دیں',
    expand: 'پھیلائیں',
    collapse: 'سمیٹیں',
    triggerDesc: 'نزولی کو ترتیب دینے کیلئے کلک کریں',
    triggerAsc: 'چڑھنے کو ترتیب دینے کیلئے کلک کریں',
    cancelSort: 'ترتیب کو منسوخ کرنے کیلئے دبائیں',
  },
  Modal: {
    okText: 'ٹھیک ہے',
    cancelText: 'منسوخ کریں',
    justOkText: 'ٹھیک ہے',
  },
  Popconfirm: {
    okText: 'ٹھیک ہے',
    cancelText: 'منسوخ کریں',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'یہاں تلاش کریں',
    itemUnit: 'شے',
    itemsUnit: 'اشیاء',
    remove: 'ہٹائیں',
    selectCurrent: 'موجودہ صفحہ منتخب کریں',
    removeCurrent: 'موجودہ صفحہ ہٹائیں',
    selectAll: 'تمام ڈیٹا کو منتخب کریں',
    removeAll: 'تمام ڈیٹا کو ہٹا دیں',
    selectInvert: 'موجودہ صفحے کو الٹ دیں',
  },
  Upload: {
    uploading: 'اپ لوڈ ہو رہا ہے…',
    removeFile: 'فائل کو ہٹا دیں',
    uploadError: 'اپ لوڈ کی خرابی',
    previewFile: 'پیش نظار فائل',
    downloadFile: 'فائل ڈاؤن لوڈ کریں',
  },
  Empty: {
    description: 'کوئی ڈیٹا نہیں',
  },
  Icon: {
    icon: 'آئیکن',
  },
  Text: {
    edit: 'ترمیم',
    copy: 'کاپی',
    copied: 'کاپی ہوگیا',
    expand: 'پھیلائیں',
  },
  PageHeader: {
    back: 'پیچھے',
  },
  Form: {
    optional: '(اختیاری)',
    defaultValidateMessages: {
      default: ' ${label} کیلئے فیلڈ کی توثیق میں نقص',
      required: 'درج کریں ${label}',
      enum: '${label} ایک ہونا ضروری ہے [${enum}]',
      whitespace: '${label} خالی نہیں ہوسکتا',
      date: {
        format: '${label} تاریخ کی شکل غلط ہے',
        parse: '${label} تاریخ میں تبدیل نہیں کیا جاسکتا',
        invalid: '${label} غلط تاریخ ہے',
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
        len: '${label} ضروری ہے ${len} حروف',
        min: '${label} کم از کم ہونا چاہئے ${min} حروف',
        max: '${label} تک ہونا چاہئے ${max} حروف',
        range: '${label} کے درمیان ہونا چاہئے ${min}-${max} حروف',
      },
      number: {
        len: '${label} کے برابر ہونا چاہئے ${len}',
        min: '${label} کم از کم ہونا چاہئے ${min}',
        max: '${label} زیادہ سے زیادہ ہونا چاہئے ${max}',
        range: '${label} کے درمیان ہونا چاہئے ${min}-${max}',
      },
      array: {
        len: 'ضروری ہے ${len} ${label}',
        min: 'کم از کم ${min} ${label}',
        max: 'زیادہ سے زیادہ ${max} ${label}',
        range: 'کی رقم ${label} کے درمیان ہونا چاہئے ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} پیٹرن سے ملتا نہیں ہے ${pattern}',
      },
    },
  },
  Image: {
    preview: 'پیش نظارہ',
  },
};

export default localeValues;
