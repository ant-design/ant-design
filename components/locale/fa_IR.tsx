/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/fa_IR';
import DatePicker from '../date-picker/locale/fa_IR';
import TimePicker from '../time-picker/locale/fa_IR';
import Calendar from '../calendar/locale/fa_IR';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} از نوع ${type} معتبر نیست';

const localeValues: Locale = {
  locale: 'fa',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'لطفاً انتخاب کنید',
  },
  Table: {
    filterTitle: 'منوی فیلتر',
    filterConfirm: 'تایید',
    filterReset: 'پاک کردن',
    filterEmptyText: 'بدون فیلتر',
    emptyText: 'بدون داده',
    selectAll: 'انتخاب صفحه‌ی کنونی',
    selectInvert: 'معکوس کردن انتخاب‌ها در صفحه ی کنونی',
    selectNone: 'انتخاب هیچکدام',
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
    itemUnit: 'عدد',
    itemsUnit: 'عدد',
    remove: 'حذف',
    selectCurrent: 'انتخاب صفحه فعلی',
    removeCurrent: 'پاک کردن انتخاب‌های صفحه فعلی',
    selectAll: 'انتخاب همه',
    removeAll: 'پاک کردن همه انتخاب‌ها',
    selectInvert: 'معکوس کردن انتخاب‌ها در صفحه ی کنونی',
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
    copy: 'کپی',
    copied: 'کپی شد',
    expand: 'توسعه',
  },
  PageHeader: {
    back: 'برگشت',
  },
  Form: {
    optional: '(اختیاری)',
    defaultValidateMessages: {
      default: 'خطا در ${label}',
      required: 'فیلد ${label} اجباریست',
      enum: '${label} باید یکی از [${enum}] باشد',
      whitespace: '${label} نمیتواند خالی باشد',
      date: {
        format: 'ساختار تاریخ در ${label} نامعتبر است',
        parse: '${label} قابل تبدیل به تاریخ نیست',
        invalid: '${label} تاریخی نا معتبر است',
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
        len: '${label} باید ${len} کاراکتر باشد',
        min: '${label} باید حداقل ${min} کاراکتر باشد',
        max: '${label} باید حداکثر ${max} کاراکتر باشد',
        range: '${label} باید بین ${min}-${max} کاراکتر باشد',
      },
      number: {
        len: '${label} باید برابر ${len}',
        min: '${label} حداقل میتواند ${min} باشد',
        max: '${label} حداکثر میتواند ${max} باشد',
        range: '${label} باید بین ${min}-${max} باشد',
      },
      array: {
        len: 'تعداد ${label} باید ${len} باشد.',
        min: 'تعداد ${label} حداقل باید ${min} باشد',
        max: 'تعداد ${label} حداکثر باید ${max} باشد',
        range: 'مقدار ${label} باید بین ${min}-${max} باشد',
      },
      pattern: {
        mismatch: 'الگوی ${label} با ${pattern} برابری نمی‌کند',
      },
    },
  },
  Image: {
    preview: 'نمایش',
  },
};

export default localeValues;
