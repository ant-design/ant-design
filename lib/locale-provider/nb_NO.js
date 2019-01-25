"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nb_NO = _interopRequireDefault(require("rc-pagination/lib/locale/nb_NO"));

var _nb_NO2 = _interopRequireDefault(require("../date-picker/locale/nb_NO"));

var _nb_NO3 = _interopRequireDefault(require("../time-picker/locale/nb_NO"));

var _nb_NO4 = _interopRequireDefault(require("../calendar/locale/nb_NO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'nb',
  DatePicker: _nb_NO2["default"],
  TimePicker: _nb_NO3["default"],
  Calendar: _nb_NO4["default"],
  Pagination: _nb_NO["default"],
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Nullstill',
    selectAll: 'Velg alle',
    selectInvert: 'Inverter valg'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Avbryt',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Avbryt'
  },
  Transfer: {
    searchPlaceholder: 'Søk her',
    itemUnit: 'element',
    itemsUnit: 'elementer'
  },
  Upload: {
    uploading: 'Laster opp...',
    removeFile: 'Fjern fil',
    uploadError: 'Feil ved opplastning',
    previewFile: 'Forhåndsvisning'
  },
  Empty: {
    description: 'Ingen data'
  }
};
exports["default"] = _default;