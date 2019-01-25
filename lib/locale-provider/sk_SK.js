"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sk_SK = _interopRequireDefault(require("rc-pagination/lib/locale/sk_SK"));

var _sk_SK2 = _interopRequireDefault(require("../date-picker/locale/sk_SK"));

var _sk_SK3 = _interopRequireDefault(require("../time-picker/locale/sk_SK"));

var _sk_SK4 = _interopRequireDefault(require("../calendar/locale/sk_SK"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'sk',
  Pagination: _sk_SK["default"],
  DatePicker: _sk_SK2["default"],
  TimePicker: _sk_SK3["default"],
  Calendar: _sk_SK4["default"],
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'OK',
    filterReset: 'Obnoviť',
    selectAll: 'Vybrať všetko',
    selectInvert: 'Vybrať opačné'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Zrušiť',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Zrušiť'
  },
  Transfer: {
    searchPlaceholder: 'Vyhľadávanie',
    itemUnit: 'položka',
    itemsUnit: 'položiek'
  },
  Upload: {
    uploading: 'Nahrávanie...',
    removeFile: 'Odstrániť súbor',
    uploadError: 'Chyba pri nahrávaní',
    previewFile: 'Zobraziť súbor'
  },
  Empty: {
    description: 'Žiadne dáta'
  }
};
exports["default"] = _default;