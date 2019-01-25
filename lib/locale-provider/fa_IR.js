"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fa_IR = _interopRequireDefault(require("rc-pagination/lib/locale/fa_IR"));

var _fa_IR2 = _interopRequireDefault(require("../date-picker/locale/fa_IR"));

var _fa_IR3 = _interopRequireDefault(require("../time-picker/locale/fa_IR"));

var _fa_IR4 = _interopRequireDefault(require("../calendar/locale/fa_IR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'fa',
  Pagination: _fa_IR["default"],
  DatePicker: _fa_IR2["default"],
  TimePicker: _fa_IR3["default"],
  Calendar: _fa_IR4["default"],
  Table: {
    filterTitle: 'منوی فیلتر',
    filterConfirm: 'تایید',
    filterReset: 'پاک کردن',
    selectAll: 'انتخاب صفحه‌ی کنونی',
    selectInvert: 'معکوس کردن انتخاب‌ها در صفحه ی کنونی'
  },
  Modal: {
    okText: 'تایید',
    cancelText: 'لغو',
    justOkText: 'تایید'
  },
  Popconfirm: {
    okText: 'تایید',
    cancelText: 'لغو'
  },
  Transfer: {
    searchPlaceholder: 'جستجو',
    itemUnit: '',
    itemsUnit: ''
  },
  Upload: {
    uploading: 'در حال آپلود...',
    removeFile: 'حذف فایل',
    uploadError: 'خطا در آپلود',
    previewFile: 'مشاهده‌ی فایل'
  },
  Empty: {
    description: 'داده‌ای موجود نیست'
  }
};
exports["default"] = _default;