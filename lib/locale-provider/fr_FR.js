"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fr_FR = _interopRequireDefault(require("rc-pagination/lib/locale/fr_FR"));

var _fr_FR2 = _interopRequireDefault(require("../date-picker/locale/fr_FR"));

var _fr_FR3 = _interopRequireDefault(require("../time-picker/locale/fr_FR"));

var _fr_FR4 = _interopRequireDefault(require("../calendar/locale/fr_FR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'fr',
  Pagination: _fr_FR["default"],
  DatePicker: _fr_FR2["default"],
  TimePicker: _fr_FR3["default"],
  Calendar: _fr_FR4["default"],
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