"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fr_BE = _interopRequireDefault(require("rc-pagination/lib/locale/fr_BE"));

var _fr_BE2 = _interopRequireDefault(require("../date-picker/locale/fr_BE"));

var _fr_BE3 = _interopRequireDefault(require("../time-picker/locale/fr_BE"));

var _fr_BE4 = _interopRequireDefault(require("../calendar/locale/fr_BE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'fr',
  Pagination: _fr_BE["default"],
  DatePicker: _fr_BE2["default"],
  TimePicker: _fr_BE3["default"],
  Calendar: _fr_BE4["default"],
  Table: {
    filterTitle: 'Filtrer',
    filterConfirm: 'OK',
    filterReset: 'Réinitialiser'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuler',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler'
  },
  Transfer: {
    searchPlaceholder: 'Recherche',
    itemUnit: 'élément',
    itemsUnit: 'éléments'
  },
  Empty: {
    description: 'Aucune donnée'
  }
};
exports["default"] = _default;