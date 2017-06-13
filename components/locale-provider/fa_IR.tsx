import moment from 'moment';
moment.locale('fa');

import Pagination from 'rc-pagination/lib/locale/fa_IR';
import DatePicker from '../date-picker/locale/fa_IR';
import TimePicker from '../time-picker/locale/fa_IR';
import Calendar from '../calendar/locale/fa_IR';

export default {
  locale: 'fa',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'منوی فیلتر',
    filterConfirm: 'باشه',
    filterReset: 'تنظیم مجدد',
    emptyText: 'داده ای موجود نیست',
    selectAll: 'انتخاب صفحه فعلی',
    selectInvert: 'انتخاب معکوس',
  },
  Modal: {
    okText: 'باشه',
    cancelText: 'لغو',
    justOkText: 'باشه',
  },
  Popconfirm: {
    okText: 'باشه',
    cancelText: 'لغو',
  },
  Transfer: {
    notFoundContent: 'پیدا نشد',
    searchPlaceholder: 'جستجو',
    itemUnit: 'آیتم',
    itemsUnit: 'آیتم',
  },
  Select: {
    notFoundContent: 'پیدا نشد',
  },
  Upload: {
    uploading: 'درحال آپلود...',
    removeFile: 'حذف فایل',
    uploadError: 'خطای آپلود',
    previewFile: 'پیش نمایش فایل',
  },
};
