"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mn_MN = _interopRequireDefault(require("rc-pagination/lib/locale/mn_MN"));

var _mn_MN2 = _interopRequireDefault(require("../date-picker/locale/mn_MN"));

var _mn_MN3 = _interopRequireDefault(require("../time-picker/locale/mn_MN"));

var _mn_MN4 = _interopRequireDefault(require("../calendar/locale/mn_MN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'mn-mn',
  Pagination: _mn_MN["default"],
  DatePicker: _mn_MN2["default"],
  TimePicker: _mn_MN3["default"],
  Calendar: _mn_MN4["default"],
  Table: {
    filterTitle: 'Хайх цэс',
    filterConfirm: 'OK',
    filterReset: 'Цэвэрлэх',
    selectAll: 'Бүгдийг сонгох',
    selectInvert: 'Бусдыг сонгох'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Цуцлах',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Цуцлах'
  },
  Transfer: {
    searchPlaceholder: 'Хайх',
    itemUnit: 'Зүйл',
    itemsUnit: 'Зүйлүүд'
  },
  Upload: {
    uploading: 'Хуулж байна...',
    removeFile: 'Файл устгах',
    uploadError: 'Хуулахад алдаа гарлаа',
    previewFile: 'Файлыг түргэн үзэх'
  },
  Empty: {
    description: 'Мэдээлэл байхгүй байна'
  }
};
exports["default"] = _default;