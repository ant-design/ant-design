/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ar_EG';

import type { Locale } from '.';
import Calendar from '../calendar/locale/ar_MA';
import DatePicker from '../date-picker/locale/ar_MA';
import TimePicker from '../time-picker/locale/ar_MA';

const typeTemplate = 'ليس ${label} من نوع ${type} صالحًا';

const localeValues: Locale = {
  locale: 'ary',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'المرجوا الاختيار',
  },
  Table: {
    filterTitle: 'قائمة الترشيح',
    filterConfirm: 'تأكيد',
    filterReset: 'إعادة الضبط',
    filterEmptyText: 'لا مرشحات',
    filterCheckall: 'حدد جميع العناصر',
    filterSearchPlaceholder: 'البحث في المرشحات',
    emptyText: 'لا توجد بيانات',
    selectAll: 'حدد الصفحة الحالية',
    selectInvert: 'عكس الصفحة الحالية',
    selectNone: 'مسح جميع البيانات',
    selectionAll: 'حدد جميع البيانات',
    sortTitle: 'رتب',
    expand: 'توسيع الصف',
    collapse: 'طي الصف',
    triggerDesc: 'ترتيب تنازلي',
    triggerAsc: 'ترتيب تصاعدي',
    cancelSort: 'إلغاء الترتيب',
  },
  Tour: {
    Next: 'التالي',
    Previous: 'السابق',
    Finish: 'إنهاء',
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
    titles: ['', ''],
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر',
    remove: 'إزالة',
    selectCurrent: 'حدد الحالية',
    removeCurrent: 'إزالة الحالية',
    selectAll: 'حدد الجميع',
    deselectAll: 'إلغاء تحديد الجميع',
    removeAll: 'إزالة الجميع',
    selectInvert: 'عكس التحديد',
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
    copied: 'تم النسخ',
    expand: 'وسع',
  },
  Form: {
    optional: '(اختياري)',
    defaultValidateMessages: {
      default: 'خطأ في حقل الإدخال ${label}',
      required: 'يرجى إدخال ${label}',
      enum: '${label} يجب أن يكون واحدا من [${enum}]',
      whitespace: '${label} لا يمكن أن يكون حرفًا فارغًا',
      date: {
        format: '${label} تنسيق التاريخ غير صحيح',
        parse: '${label} لا يمكن تحويلها إلى تاريخ',
        invalid: 'تاريخ ${label} غير صحيح',
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
        len: 'يجب ${label} ان يكون ${len} أحرف',
        min: '${label} على الأقل ${min} أحرف',
        max: '${label} يصل إلى ${max} أحرف',
        range: 'يجب ${label} ان يكون مابين ${min}-${max} أحرف',
      },
      number: {
        len: '${len} ان يساوي ${label} يجب',
        min: '${min} الأدنى هو ${label} حد',
        max: '${max} الأقصى هو ${label} حد',
        range: '${max}-${min} ان يكون مابين ${label} يجب',
      },
      array: {
        len: 'يجب أن يكون ${label} طوله ${len}',
        min: 'يجب أن يكون ${label} طوله الأدنى ${min}',
        max: 'يجب أن يكون ${label} طوله الأقصى ${max}',
        range: 'يجب أن يكون ${label} طوله مابين ${min}-${max}',
      },
      pattern: {
        mismatch: 'لا يتطابق ${label} مع ${pattern}',
      },
    },
  },
  Image: {
    preview: 'معاينة',
  },
  QRCode: {
    expired: 'انتهت صلاحية رمز QR',
    refresh: 'تحديث',
    scanned: 'تم المسح',
  },
  ColorPicker: {
    presetEmpty: 'فارغ',
    transparent: 'شفاف',
    singleColor: 'أحادي',
    gradientColor: 'التدرج',
  },
};

export default localeValues;
