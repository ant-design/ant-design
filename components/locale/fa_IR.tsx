import Pagination from 'rc-pagination/lib/locale/fa_IR';
import DatePicker from '../date-picker/locale/fa_IR';
import TimePicker from '../time-picker/locale/fa_IR';
import Calendar from '../calendar/locale/fa_IR';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'fa',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'منوی فیلتر',
    filterConfirm: 'تایید',
    filterReset: 'پاک کردن',
    selectAll: 'انتخاب صفحه‌ی کنونی',
    selectInvert: 'معکوس کردن انتخاب‌ها در صفحه ی کنونی',
    selectionAll: 'انتخاب همه داده‌ها',
    sortTitle: 'مرتب سازی',
    expand: 'باز شدن ردیف',
    collapse: 'بستن ردیف',
    triggerDesc: 'ترتیب نزولی',
    triggerAsc: 'ترتیب صعودی',
    cancelSort: 'لغوِ ترتیبِ داده شده',
  },
  Modal: {
    okText: 'تایید',
    cancelText: 'لغو',
    justOkText: 'تایید',
  },
  Popconfirm: {
    okText: 'تایید',
    cancelText: 'لغو',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'جستجو',
    itemUnit: '',
    itemsUnit: '',
  },
  Upload: {
    uploading: 'در حال آپلود...',
    removeFile: 'حذف فایل',
    uploadError: 'خطا در آپلود',
    previewFile: 'مشاهده‌ی فایل',
    downloadFile: 'دریافت فایل',
  },
  Empty: {
    description: 'داده‌ای موجود نیست',
  },
  Icon: {
    icon: 'آیکن',
  },
  Text: {
    edit: 'ویرایش',
    copy: 'کپس',
    copied: 'کپی شد',
    expand: 'توسعه',
  },
  PageHeader: {
    back: 'برگشت',
  },
};

export default localeValues;
