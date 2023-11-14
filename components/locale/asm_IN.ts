/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/asm_IN';
import type { Locale } from '.';
import Calendar from '../calendar/locale/asm_IN';
import DatePicker from '../date-picker/locale/asm_IN';
import TimePicker from '../time-picker/locale/asm_IN';

const typeTemplate = '${label} এটি একটি বৈধ ${type} নহয়';

const localeValues: Locale = {
  locale: 'asm',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'অনুগ্ৰহ কৰি চয়ন কৰক',
  },
  Table: {
    filterTitle: 'ফিল্টাৰ মেনু',
    filterConfirm: 'ঠিক আছে',
    filterReset: 'ৰিছেট কৰক',
    filterEmptyText: 'কোনো ফিল্টাৰ নাই',
    filterCheckall: 'সকলো আইটেম চয়ন কৰক',
    filterSearchPlaceholder: 'ফিল্টাৰত সন্ধান কৰক',
    emptyText: 'কোনো ডাটা নাই',
    selectAll: 'বৰ্তমান পৃষ্ঠা চয়ন কৰক',
    selectInvert: 'বৰ্তমান পৃষ্ঠা উলটাই চয়ন কৰক',
    selectNone: 'সকলো ডাটা মুক কৰক',
    selectionAll: 'সকলো ডাটা চয়ন কৰক',
    sortTitle: 'সাজনি কৰক',
    expand: 'সাৰি প্ৰসাৰিত কৰক',
    collapse: 'সাৰি ক্ষেষ্টিত ঘটিকাওক',
    triggerDesc: 'অধমানে সাজনি কৰিবলৈ ক্লিক কৰক',
    triggerAsc: 'আৰোহনে সাজনি কৰিবলৈ ক্লিক কৰক',
    cancelSort: 'সাজনি বাতিল কৰিবলৈ ক্লিক কৰক',
  },
  Tour: {
    Next: 'পৰবৎ',
    Previous: 'পূৰ্বৱৎ',
    Finish: 'সমাপ্ত কৰক',
  },
  Modal: {
    okText: 'ঠিক আছে',
    cancelText: 'বাতিল কৰক',
    justOkText: 'ঠিক আছে',
  },
  Popconfirm: {
    okText: 'ঠিক আছে',
    cancelText: 'বাতিল কৰক',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ইয়াত সন্ধান কৰক',
    itemUnit: 'আইটেম',
    itemsUnit: 'আইটেমসমূহ',
    remove: 'আঁতৰাওক',
    selectCurrent: 'বৰ্তমান পৃষ্ঠা চয়ন কৰক',
    removeCurrent: 'বৰ্তমান পৃষ্ঠা আঁতৰাওক',
    selectAll: 'সকলো ডাটা চয়ন কৰক',
    removeAll: 'সকলো ডাটা আঁতৰাওক',
    selectInvert: 'বৰ্তমান পৃষ্ঠা উলটাই চয়ন কৰক',
  },
  Upload: {
    uploading: 'আপলোড হৈ আছে...',
    removeFile: 'ফাইল আঁতৰাওক',
    uploadError: 'আপলোড ত্ৰুটি',
    previewFile: 'ফাইল পূৰ্বালোকন',
    downloadFile: 'ফাইল ডাউনলোড কৰক',
  },
  Empty: {
    description: 'কোনো ডাটা নাই',
  },
  Icon: {
    icon: 'চিহ্ন',
  },
  Text: {
    edit: 'সম্পাদনা কৰক',
    copy: 'কপি কৰক',
    copied: 'কপি কৰা হৈছে',
    expand: 'প্ৰসাৰিত কৰক',
  },
  PageHeader: {
    back: 'পিছলৈ যাওক',
  },
  Form: {
    optional: '(ঐচ্ছিক)',
    defaultValidateMessages: {
      default: '${label}-ৰ বৈধীকৰণ ত্ৰুটি',
      required: '${label} অনুগ্ৰহ কৰি দিয়ক',
      enum: '${label} অবশ্যই [${enum}] ত থাকিব লাগিব',
      whitespace: '${label} এটি খালী অক্ষৰ হোৱা নাই',
      date: {
        format: '${label}-ৰ তাৰিখৰ বৈধ ফৰ্মেট নহয়',
        parse: '${label} তাৰিখৰ হিচাপে সৰি নোৱা হৈছে',
        invalid: '${label} এটি অবৈধ তাৰিখ',
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
        len: '${label} অবশ্যই ${len} অক্ষৰ থাকিব লাগিব',
        min: "${label} অতি কমত হ'ব ${min} অক্ষৰৰ",
        max: "${label} অতি অধিক হ'ব ${max} অক্ষৰৰ",
        range: "${label} ${min}-${max} অক্ষৰৰ মধ্যে হ'ব লাগিব",
      },
      number: {
        len: "${label} অবশ্যই ${len}-ৰ সমান হ'ব লাগিব",
        min: "${label} অতি কমত হ'ব ${min}",
        max: "${label} অতি অধিক হ'ব ${max}",
        range: "${label} ${min}-${max} মধ্যে হ'ব লাগিব",
      },
      array: {
        len: '${len} সংখ্যাৰ ${label} থাকিব লাগিব',
        min: "কমত হ'ব ${min} ${label}",
        max: "অধিকতম হ'ব ${max} ${label}",
        range: '${label}-ৰ পৰিমাণ ${min}-${max} মধ্যে থাকিব লাগিব',
      },
      pattern: {
        mismatch: '${label} ${pattern}-ৰ সাথে মিলা নাই',
      },
    },
  },
  Image: {
    preview: 'পূৰ্বালোকন',
  },
  QRCode: {
    expired: "QR ক'ড মেয়াদৰ উত্তীৰ্ণ হৈছে",
    refresh: 'পুনৰ লোড কৰক',
  },
  ColorPicker: {
    presetEmpty: 'খালী',
  },
};

export default localeValues;
