"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ar_EG = _interopRequireDefault(require("rc-pagination/lib/locale/ar_EG"));

var _ar_EG2 = _interopRequireDefault(require("../date-picker/locale/ar_EG"));

var _ar_EG3 = _interopRequireDefault(require("../time-picker/locale/ar_EG"));

var _ar_EG4 = _interopRequireDefault(require("../calendar/locale/ar_EG"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'ar',
  Pagination: _ar_EG["default"],
  DatePicker: _ar_EG2["default"],
  TimePicker: _ar_EG3["default"],
  Calendar: _ar_EG4["default"],
  Table: {
    filterTitle: 'الفلاتر',
    filterConfirm: 'تأكيد',
    filterReset: 'إعادة ضبط',
    selectAll: 'اختيار الكل',
    selectInvert: 'إلغاء الاختيار'
  },
  Modal: {
    okText: 'تأكيد',
    cancelText: 'إلغاء',
    justOkText: 'تأكيد'
  },
  Popconfirm: {
    okText: 'تأكيد',
    cancelText: 'إلغاء'
  },
  Transfer: {
    searchPlaceholder: 'ابحث هنا',
    itemUnit: 'عنصر',
    itemsUnit: 'عناصر'
  },
  Upload: {
    uploading: 'جاري الرفع...',
    removeFile: 'احذف الملف',
    uploadError: 'مشكلة فى الرفع',
    previewFile: 'استعرض الملف'
  },
  Empty: {
    description: 'لا توجد بيانات'
  }
};
exports["default"] = _default;