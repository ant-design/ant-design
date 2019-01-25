"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _el_GR = _interopRequireDefault(require("rc-pagination/lib/locale/el_GR"));

var _el_GR2 = _interopRequireDefault(require("../date-picker/locale/el_GR"));

var _el_GR3 = _interopRequireDefault(require("../time-picker/locale/el_GR"));

var _el_GR4 = _interopRequireDefault(require("../calendar/locale/el_GR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'el',
  Pagination: _el_GR["default"],
  DatePicker: _el_GR2["default"],
  TimePicker: _el_GR3["default"],
  Calendar: _el_GR4["default"],
  Table: {
    filterTitle: 'Μενού φίλτρων',
    filterConfirm: 'ΟΚ',
    filterReset: 'Επαναφορά',
    selectAll: 'Επιλογή τρέχουσας σελίδας',
    selectInvert: 'Αντιστροφή τρέχουσας σελίδας'
  },
  Modal: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο',
    justOkText: 'ΟΚ'
  },
  Popconfirm: {
    okText: 'ΟΚ',
    cancelText: 'Άκυρο'
  },
  Transfer: {
    searchPlaceholder: 'Αναζήτηση',
    itemUnit: 'αντικείμενο',
    itemsUnit: 'αντικείμενα'
  },
  Upload: {
    uploading: 'Μεταφόρτωση...',
    removeFile: 'Αφαίρεση αρχείου',
    uploadError: 'Σφάλμα μεταφόρτωσης',
    previewFile: 'Προεπισκόπηση αρχείου'
  },
  Empty: {
    description: 'Δεν υπάρχουν δεδομένα'
  }
};
exports["default"] = _default;