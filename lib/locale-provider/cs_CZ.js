"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cs_CZ = _interopRequireDefault(require("rc-pagination/lib/locale/cs_CZ"));

var _cs_CZ2 = _interopRequireDefault(require("../date-picker/locale/cs_CZ"));

var _cs_CZ3 = _interopRequireDefault(require("../time-picker/locale/cs_CZ"));

var _cs_CZ4 = _interopRequireDefault(require("../calendar/locale/cs_CZ"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'cs',
  Pagination: _cs_CZ["default"],
  DatePicker: _cs_CZ2["default"],
  TimePicker: _cs_CZ3["default"],
  Calendar: _cs_CZ4["default"],
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'Potvrdit',
    filterReset: 'Obnovit'
  },
  Modal: {
    okText: 'Ok',
    cancelText: 'Storno',
    justOkText: 'Ok'
  },
  Popconfirm: {
    okText: 'Ok',
    cancelText: 'Storno'
  },
  Transfer: {
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek'
  },
  Upload: {
    uploading: 'Nahrávání...',
    removeFile: 'Odstranit soubor',
    uploadError: 'Chyba při nahrávání',
    previewFile: 'Zobrazit soubor'
  },
  Empty: {
    description: 'Žádná data'
  }
};
exports["default"] = _default;