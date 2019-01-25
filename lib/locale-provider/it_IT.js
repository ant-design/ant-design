"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _it_IT = _interopRequireDefault(require("rc-pagination/lib/locale/it_IT"));

var _it_IT2 = _interopRequireDefault(require("../date-picker/locale/it_IT"));

var _it_IT3 = _interopRequireDefault(require("../time-picker/locale/it_IT"));

var _it_IT4 = _interopRequireDefault(require("../calendar/locale/it_IT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'it',
  Pagination: _it_IT["default"],
  DatePicker: _it_IT2["default"],
  TimePicker: _it_IT3["default"],
  Calendar: _it_IT4["default"],
  Table: {
    filterTitle: 'Menù Filtro',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Seleziona pagina corrente',
    selectInvert: 'Inverti selezione nella pagina corrente',
    sortTitle: 'Ordina'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annulla',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annulla'
  },
  Transfer: {
    searchPlaceholder: 'Cerca qui',
    itemUnit: 'articolo',
    itemsUnit: 'elementi'
  },
  Upload: {
    uploading: 'Caricamento...',
    removeFile: 'Rimuovi il file',
    uploadError: 'Errore di caricamento',
    previewFile: 'Anteprima file'
  },
  Empty: {
    description: 'Nessun dato'
  }
};
exports["default"] = _default;