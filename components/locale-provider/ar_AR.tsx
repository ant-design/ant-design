import moment from 'moment';
moment.locale('ar');

import Pagination from 'rc-pagination/lib/locale/ar_AR';
import DatePicker from '../date-picker/locale/ar_AR';
import TimePicker from '../time-picker/locale/ar_AR';
import Calendar from '../calendar/locale/ar_AR';

export default {
  locale: 'ar',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'فرز القائمة',
    filterConfirm: 'حسنا',
    filterReset: 'افتراضي',
    emptyText: 'لا يوجد بيانات',
    selectAll: 'اختيار الصفحة الحالية',
    selectInvert: 'اختيار العكس',
  },
  Modal: {
    okText: 'حسنا',
    cancelText: 'الغاء',
    justOkText: 'حسنا',
  },
  Popconfirm: {
    okText: 'حسنا',
    cancelText: 'الغاء',
  },
  Transfer: {
    notFoundContent: 'غير موحود',
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر',
  },
  Select: {
    notFoundContent: 'غير موجود',
  },
  Upload: {
    uploading: 'جاري التحميل...',
    removeFile: 'حذف الملف',
    uploadError: 'خطأ في الرفع',
    previewFile: 'عرض الملف',
  },
};
