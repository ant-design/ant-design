import moment from 'moment';
moment.locale('ar');

// import Pagination from 'rc-pagination/lib/locale/ar_EG';
import DatePicker from '../date-picker/locale/ar_EG';
import TimePicker from '../time-picker/locale/ar_EG';
import Calendar from '../calendar/locale/ar_EG';

// Arabic version of Pagination until 'rc-pagination' accepts the pull-request
const Pagination = {
  // Options.jsx
  items_per_page: '/ الصفحة',
  jump_to: 'الذهاب إلى',
  jump_to_confirm: 'تأكيد',
  page: '',

  // Pagination.jsx
  prev_page: 'الصفحة السابقة',
  next_page: 'الصفحة التالية',
  prev_5: 'خمس صفحات سابقة',
  next_5: 'خمس صفحات تالية',
  prev_3: 'ثلاث صفحات سابقة',
  next_3: 'ثلاث صفحات تالية',
};

export default {
  locale: 'ar',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'الفلاتر',
    filterConfirm: 'تأكيد',
    filterReset: 'إعادة ضبط',
    emptyText: 'لا توجد بيانات',
    selectAll: 'اختيار الكل',
    selectInvert: 'إلغاء الاختيار',
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
    notFoundContent: 'لا يوجد محتوى',
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر',
  },
  Select: {
    notFoundContent: 'لايوجد محتوى',
  },
  Upload: {
    uploading: 'جاري الرفع...',
    removeFile: 'احذف الملف',
    uploadError: 'مشكلة فى الرفع',
    previewFile: 'استعرض الملف',
  },
};
