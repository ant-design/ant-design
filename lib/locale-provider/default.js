"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _en_US = _interopRequireDefault(require("rc-pagination/lib/locale/en_US"));

var _en_US2 = _interopRequireDefault(require("../date-picker/locale/en_US"));

var _en_US3 = _interopRequireDefault(require("../time-picker/locale/en_US"));

var _en_US4 = _interopRequireDefault(require("../calendar/locale/en_US"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'en',
  Pagination: _en_US["default"],
  DatePicker: _en_US2["default"],
  TimePicker: _en_US3["default"],
  Calendar: _en_US4["default"],
  global: {
    placeholder: 'Please select'
  },
  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
    sortTitle: 'Sort'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Search here',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file'
  },
  Empty: {
    description: 'No Data'
  }
};
exports["default"] = _default;