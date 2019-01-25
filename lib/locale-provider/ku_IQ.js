"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ku_IQ = _interopRequireDefault(require("rc-pagination/lib/locale/ku_IQ"));

var _ku_IQ2 = _interopRequireDefault(require("../date-picker/locale/ku_IQ"));

var _ku_IQ3 = _interopRequireDefault(require("../time-picker/locale/ku_IQ"));

var _ku_IQ4 = _interopRequireDefault(require("../calendar/locale/ku_IQ"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'ku-iq',
  Pagination: _ku_IQ["default"],
  DatePicker: _ku_IQ2["default"],
  TimePicker: _ku_IQ3["default"],
  Calendar: _ku_IQ4["default"],
  Table: {
    filterTitle: 'Menuê peldanka',
    filterConfirm: 'Temam',
    filterReset: 'Jê bibe',
    selectAll: 'Hemî hilbijêre',
    selectInvert: 'Hilbijartinan veguhere'
  },
  Modal: {
    okText: 'Temam',
    cancelText: 'Betal ke',
    justOkText: 'Temam'
  },
  Popconfirm: {
    okText: 'Temam',
    cancelText: 'Betal ke'
  },
  Transfer: {
    searchPlaceholder: 'Lêgerîn',
    itemUnit: 'tişt',
    itemsUnit: 'tişt'
  },
  Upload: {
    uploading: 'Bardike...',
    removeFile: 'Pelê rabike',
    uploadError: 'Xeta barkirine',
    previewFile: 'Pelê pêşbibîne'
  },
  Empty: {
    description: 'Agahî tune'
  }
};
exports["default"] = _default;