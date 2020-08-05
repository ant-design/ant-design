/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ar_EG';
import DatePicker from '../date-picker/locale/ar_EG';
import TimePicker from '../time-picker/locale/ar_EG';
import Calendar from '../calendar/locale/ar_EG';
import { Locale } from '../locale-provider';

const typeTemplate = 'صالحًا ${type} من نوع ${label} ليس';

const localeValues: Locale = {
  locale: 'ar',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'يرجى التحديد',
  },
  Table: {
    filterTitle: 'الفلاتر',
    filterConfirm: 'تأكيد',
    filterReset: 'إعادة ضبط',
    selectAll: 'اختيار الكل',
    selectInvert: 'إلغاء الاختيار',
    selectionAll: 'حدد جميع البيانات',
    sortTitle: 'رتب',
    expand: 'توسيع الصف',
    collapse: 'طي الصف',
    triggerDesc: 'ترتيب تنازلي',
    triggerAsc: 'ترتيب تصاعدي',
    cancelSort: 'إلغاء الترتيب',
  },
  Modal: {
    okText: 'تأكيد',
    cancelText: 'إلغاء',
    justOkText: 'تأكيد',
  },
  Popconfirm: {
    okText: 'تأكيد',
    cancelText: 'إلغاء',
  },
  Transfer: {
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر',
  },
  Upload: {
    uploading: 'جاري الرفع...',
    removeFile: 'احذف الملف',
    uploadError: 'مشكلة فى الرفع',
    previewFile: 'استعرض الملف',
    downloadFile: 'تحميل الملف',
  },
  Empty: {
    description: 'لا توجد بيانات',
  },
  Icon: {
    icon: 'أيقونة',
  },
  Text: {
    edit: 'تعديل',
    copy: 'نسخ',
    copied: 'نقل',
    expand: 'وسع',
  },
  PageHeader: {
    back: 'عودة',
  },
  Form: {
    defaultValidateMessages: {
      default: '${label} خطأ في حقل الإدخال',
      required: '${label} يرجى إدخال',
      enum: '[${enum}] يجب أن يكون واحدا من ${label}',
      whitespace: 'لا يمكن أن يكون حرفًا فارغًا ${label}',
      date: {
        format: 'تنسيق التاريخ غير صحيح ${label}',
        parse: 'لا يمكن تحويلها إلى تاريخ ${label}',
        invalid: 'غير صحيح ${label} تاريخ',
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
        len: 'أحرف ${len} ان يكون ${label} يجب',
        min: 'أحرف ${min} على الأقل ${label}',
        max: 'أحرف ${max} يصل إلى ${label}',
        range: 'أحرف ${max}-${min} ان يكون مابين ${label} يجب',
      },
      number: {
        len: '${len} ان يساوي ${label} يجب',
        min: '${min} الأدنى هو ${label} حد',
        max: '${max} الأقصى هو ${label} حد',
        range: '${max}-${min} ان يكون مابين ${label} يجب',
      },
      array: {
        len: '${len} طوله ${label} يجب أن يكون',
        min: '${min} طوله الأدنى ${label} يجب أن يكون',
        max: '${max} طوله الأقصى ${label} يجب أن يكون',
        range: '${max}-${min} طوله مابين ${label} يجب أن يكون',
      },
      pattern: {
        mismatch: '${pattern} مع ${label} لا يتطابق',
      },
    },
  },
};

export default localeValues;
