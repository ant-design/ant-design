"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sl_SI = _interopRequireDefault(require("rc-pagination/lib/locale/sl_SI"));

var _sl_SI2 = _interopRequireDefault(require("../date-picker/locale/sl_SI"));

var _sl_SI3 = _interopRequireDefault(require("../time-picker/locale/sl_SI"));

var _sl_SI4 = _interopRequireDefault(require("../calendar/locale/sl_SI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'sl',
  Pagination: _sl_SI["default"],
  DatePicker: _sl_SI2["default"],
  TimePicker: _sl_SI3["default"],
  Calendar: _sl_SI4["default"],
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Filtriraj',
    filterReset: 'Pobriši filter',
    selectAll: 'Izberi vse na trenutni strani',
    selectInvert: 'Obrni izbor na trenutni strani'
  },
  Modal: {
    okText: 'V redu',
    cancelText: 'Prekliči',
    justOkText: 'V redu'
  },
  Popconfirm: {
    okText: 'v redu',
    cancelText: 'Prekliči'
  },
  Transfer: {
    searchPlaceholder: 'Išči tukaj',
    itemUnit: 'Objekt',
    itemsUnit: 'Objektov'
  },
  Upload: {
    uploading: 'Nalaganje...',
    removeFile: 'Odstrani datoteko',
    uploadError: 'Napaka pri nalaganju',
    previewFile: 'Predogled datoteke'
  },
  Empty: {
    description: 'Ni podatkov'
  }
};
exports["default"] = _default;