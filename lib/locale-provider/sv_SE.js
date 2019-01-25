"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sv_SE = _interopRequireDefault(require("rc-pagination/lib/locale/sv_SE"));

var _sv_SE2 = _interopRequireDefault(require("../date-picker/locale/sv_SE"));

var _sv_SE3 = _interopRequireDefault(require("../time-picker/locale/sv_SE"));

var _sv_SE4 = _interopRequireDefault(require("../calendar/locale/sv_SE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'sv',
  Pagination: _sv_SE["default"],
  DatePicker: _sv_SE2["default"],
  TimePicker: _sv_SE3["default"],
  Calendar: _sv_SE4["default"],
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Rensa'
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
    searchPlaceholder: 'Sök',
    itemUnit: 'element',
    itemsUnit: 'element'
  },
  Empty: {
    description: 'Ingen information'
  }
};
exports["default"] = _default;