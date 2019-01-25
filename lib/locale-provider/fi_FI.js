"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fi_FI = _interopRequireDefault(require("rc-pagination/lib/locale/fi_FI"));

var _fi_FI2 = _interopRequireDefault(require("../date-picker/locale/fi_FI"));

var _fi_FI3 = _interopRequireDefault(require("../time-picker/locale/fi_FI"));

var _fi_FI4 = _interopRequireDefault(require("../calendar/locale/fi_FI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'fi',
  Pagination: _fi_FI["default"],
  DatePicker: _fi_FI2["default"],
  TimePicker: _fi_FI3["default"],
  Calendar: _fi_FI4["default"],
  Table: {
    filterTitle: 'Suodatus valikko',
    filterConfirm: 'OK',
    filterReset: 'Tyhjennä',
    selectAll: 'Valitse kaikki',
    selectInvert: 'Valitse päinvastoin',
    sortTitle: 'Lajittele'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Peruuta',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Peruuta'
  },
  Transfer: {
    searchPlaceholder: 'Etsi täältä',
    itemUnit: 'kohde',
    itemsUnit: 'kohdetta'
  },
  Upload: {
    uploading: 'Lähetetään...',
    removeFile: 'Poista tiedosto',
    uploadError: 'Virhe lähetyksessä',
    previewFile: 'Esikatsele tiedostoa'
  },
  Empty: {
    description: 'Ei kohteita'
  }
};
exports["default"] = _default;