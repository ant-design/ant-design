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
    filterTitle: 'منوی فیـلتر',
    filterConfirm: 'باشه',
    filterReset: 'تنظیم مجدد',
    emptyText: 'اطلاعاتی وجود ندارد',
    selectAll: 'انتخاب صفحه کنونی',
    selectInvert: 'غیرفعال کردن صفحه کنونی',
  },
  Modal: {
    okText: 'باشه',
    cancelText: 'لغـو',
    justOkText: 'باشه',
  },
  Popconfirm: {
    okText: 'باشه',
    cancelText: 'لغـو',
  },
  Transfer: {
    notFoundContent: 'اطلاعاتی وجود ندارد',
    searchPlaceholder: 'جستجـو',
    itemUnit: 'مورد',
    itemsUnit: 'مورد',
  },
  Select: {
    notFoundContent: 'اطلاعاتی وجود ندارد',
  },
  Upload: {
    uploading: 'در حال بارگزاری...',
    removeFile: 'حذف فایل',
    uploadError: 'خطا در بارگزاری',
    previewFile: 'مشاهده فایل',
  },
};
