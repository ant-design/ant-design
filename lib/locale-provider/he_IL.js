"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _he_IL = _interopRequireDefault(require("rc-pagination/lib/locale/he_IL"));

var _he_IL2 = _interopRequireDefault(require("../date-picker/locale/he_IL"));

var _he_IL3 = _interopRequireDefault(require("../time-picker/locale/he_IL"));

var _he_IL4 = _interopRequireDefault(require("../calendar/locale/he_IL"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'he',
  Pagination: _he_IL["default"],
  DatePicker: _he_IL2["default"],
  TimePicker: _he_IL3["default"],
  Calendar: _he_IL4["default"],
  Table: {
    filterTitle: 'תפריט סינון',
    filterConfirm: 'אישור',
    filterReset: 'איפוס',
    selectAll: 'בחר הכל',
    selectInvert: 'הפוך בחירה'
  },
  Modal: {
    okText: 'אישור',
    cancelText: 'ביטול',
    justOkText: 'אישור'
  },
  Popconfirm: {
    okText: 'אישור',
    cancelText: 'ביטול'
  },
  Transfer: {
    searchPlaceholder: 'חפש כאן',
    itemUnit: 'פריט',
    itemsUnit: 'פריטים'
  },
  Upload: {
    uploading: 'מעלה...',
    removeFile: 'הסר קובץ',
    uploadError: 'שגיאת העלאה',
    previewFile: 'הצג קובץ'
  },
  Empty: {
    description: 'אין מידע'
  }
};
exports["default"] = _default;