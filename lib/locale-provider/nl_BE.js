"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nl_BE = _interopRequireDefault(require("rc-pagination/lib/locale/nl_BE"));

var _nl_BE2 = _interopRequireDefault(require("../date-picker/locale/nl_BE"));

var _nl_BE3 = _interopRequireDefault(require("../time-picker/locale/nl_BE"));

var _nl_BE4 = _interopRequireDefault(require("../calendar/locale/nl_BE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'nl-be',
  Pagination: _nl_BE["default"],
  DatePicker: _nl_BE2["default"],
  TimePicker: _nl_BE3["default"],
  Calendar: _nl_BE4["default"],
  Table: {
    filterTitle: 'FilterMenu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Selecteer huidige pagina',
    selectInvert: 'Selecteer huidige pagina'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuleer',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuleer'
  },
  Transfer: {
    searchPlaceholder: 'Zoek hier',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Upload: {
    uploading: 'Uploaden...',
    removeFile: 'Bestand verwijderen',
    uploadError: 'Upload fout',
    previewFile: 'Preview bestand'
  },
  Empty: {
    description: 'Geen gegevens'
  }
};
exports["default"] = _default;