"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _en_GB = _interopRequireDefault(require("rc-pagination/lib/locale/en_GB"));

var _en_GB2 = _interopRequireDefault(require("../date-picker/locale/en_GB"));

var _en_GB3 = _interopRequireDefault(require("../time-picker/locale/en_GB"));

var _en_GB4 = _interopRequireDefault(require("../calendar/locale/en_GB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'en-gb',
  Pagination: _en_GB["default"],
  DatePicker: _en_GB2["default"],
  TimePicker: _en_GB3["default"],
  Calendar: _en_GB4["default"],
  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page'
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
    description: 'No data'
  }
};
exports["default"] = _default;