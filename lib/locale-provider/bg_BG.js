"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bg_BG = _interopRequireDefault(require("rc-pagination/lib/locale/bg_BG"));

var _bg_BG2 = _interopRequireDefault(require("../date-picker/locale/bg_BG"));

var _bg_BG3 = _interopRequireDefault(require("../time-picker/locale/bg_BG"));

var _bg_BG4 = _interopRequireDefault(require("../calendar/locale/bg_BG"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'bg',
  Pagination: _bg_BG["default"],
  DatePicker: _bg_BG2["default"],
  TimePicker: _bg_BG3["default"],
  Calendar: _bg_BG4["default"],
  Table: {
    filterTitle: 'Филтриране',
    filterConfirm: 'Добре',
    filterReset: 'Нулриане',
    selectAll: 'Избор на текуща страница',
    selectInvert: 'Обръщане'
  },
  Modal: {
    okText: 'Добре',
    cancelText: 'Отказ',
    justOkText: 'Добре'
  },
  Popconfirm: {
    okText: 'Добре',
    cancelText: 'Отказ'
  },
  Transfer: {
    searchPlaceholder: 'Търсене',
    itemUnit: 'избор',
    itemsUnit: 'избори'
  },
  Upload: {
    uploading: 'Качване...',
    removeFile: 'Премахване',
    uploadError: 'Грешка при качването',
    previewFile: 'Преглед'
  },
  Empty: {
    description: 'Няма данни'
  }
};
exports["default"] = _default;