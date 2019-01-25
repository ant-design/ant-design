"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nl_NL = _interopRequireDefault(require("rc-pagination/lib/locale/nl_NL"));

var _nl_NL2 = _interopRequireDefault(require("../date-picker/locale/nl_NL"));

var _nl_NL3 = _interopRequireDefault(require("../time-picker/locale/nl_NL"));

var _nl_NL4 = _interopRequireDefault(require("../calendar/locale/nl_NL"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'nl',
  Pagination: _nl_NL["default"],
  DatePicker: _nl_NL2["default"],
  TimePicker: _nl_NL3["default"],
  Calendar: _nl_NL4["default"],
  Table: {
    filterTitle: 'Filteren',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Selecteer huidige pagina',
    selectInvert: 'Deselecteer huidige pagina'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuleren',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuleren'
  },
  Transfer: {
    searchPlaceholder: 'Zoeken',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Upload: {
    uploading: 'Uploaden...',
    removeFile: 'Verwijder bestand',
    uploadError: 'Fout tijdens uploaden',
    previewFile: 'Bekijk bestand'
  },
  Empty: {
    description: 'Geen gegevens'
  }
};
exports["default"] = _default;