"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ca_ES = _interopRequireDefault(require("rc-pagination/lib/locale/ca_ES"));

var _ca_ES2 = _interopRequireDefault(require("../date-picker/locale/ca_ES"));

var _ca_ES3 = _interopRequireDefault(require("../time-picker/locale/ca_ES"));

var _ca_ES4 = _interopRequireDefault(require("../calendar/locale/ca_ES"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'ca',
  Pagination: _ca_ES["default"],
  DatePicker: _ca_ES2["default"],
  TimePicker: _ca_ES3["default"],
  Calendar: _ca_ES4["default"],
  Table: {
    filterTitle: 'Filtrar Menu',
    filterConfirm: 'OK',
    filterReset: 'Restablir'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel·lar',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel·lar'
  },
  Transfer: {
    searchPlaceholder: 'Cercar aquí',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Empty: {
    description: 'Sense dades'
  }
};
exports["default"] = _default;