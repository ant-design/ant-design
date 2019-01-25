"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pl_PL = _interopRequireDefault(require("rc-pagination/lib/locale/pl_PL"));

var _pl_PL2 = _interopRequireDefault(require("../date-picker/locale/pl_PL"));

var _pl_PL3 = _interopRequireDefault(require("../time-picker/locale/pl_PL"));

var _pl_PL4 = _interopRequireDefault(require("../calendar/locale/pl_PL"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'pl',
  Pagination: _pl_PL["default"],
  DatePicker: _pl_PL2["default"],
  TimePicker: _pl_PL3["default"],
  Calendar: _pl_PL4["default"],
  Table: {
    filterTitle: 'Menu filtra',
    filterConfirm: 'OK',
    filterReset: 'Wyczyść',
    selectAll: 'Zaznacz bieżącą stronę',
    selectInvert: 'Odwróć zaznaczenie'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Anuluj',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Anuluj'
  },
  Transfer: {
    searchPlaceholder: 'Szukaj',
    itemUnit: 'obiekt',
    itemsUnit: 'obiekty'
  },
  Upload: {
    uploading: 'Wysyłanie...',
    removeFile: 'Usuń plik',
    uploadError: 'Błąd wysyłania',
    previewFile: 'Podejrzyj plik'
  },
  Empty: {
    description: 'Brak danych'
  }
};
exports["default"] = _default;