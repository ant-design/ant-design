"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _de_DE = _interopRequireDefault(require("rc-pagination/lib/locale/de_DE"));

var _de_DE2 = _interopRequireDefault(require("../date-picker/locale/de_DE"));

var _de_DE3 = _interopRequireDefault(require("../time-picker/locale/de_DE"));

var _de_DE4 = _interopRequireDefault(require("../calendar/locale/de_DE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'de',
  Pagination: _de_DE["default"],
  DatePicker: _de_DE2["default"],
  TimePicker: _de_DE3["default"],
  Calendar: _de_DE4["default"],
  Table: {
    filterTitle: 'Filter-Menü',
    filterConfirm: 'OK',
    filterReset: 'Zurücksetzen',
    selectAll: 'Selektiere Alle',
    selectInvert: 'Selektion Invertieren'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Abbrechen',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Abbrechen'
  },
  Transfer: {
    searchPlaceholder: 'Suchen',
    itemUnit: 'Eintrag',
    itemsUnit: 'Einträge'
  },
  Upload: {
    uploading: 'Hochladen...',
    removeFile: 'Datei entfernen',
    uploadError: 'Fehler beim Hochladen',
    previewFile: 'Dateivorschau'
  },
  Empty: {
    description: 'Keine Daten'
  }
};
exports["default"] = _default;