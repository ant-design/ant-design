"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tr_TR = _interopRequireDefault(require("rc-pagination/lib/locale/tr_TR"));

var _tr_TR2 = _interopRequireDefault(require("../date-picker/locale/tr_TR"));

var _tr_TR3 = _interopRequireDefault(require("../time-picker/locale/tr_TR"));

var _tr_TR4 = _interopRequireDefault(require("../calendar/locale/tr_TR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'tr',
  Pagination: _tr_TR["default"],
  DatePicker: _tr_TR2["default"],
  TimePicker: _tr_TR3["default"],
  Calendar: _tr_TR4["default"],
  Table: {
    filterTitle: 'Menü Filtrele',
    filterConfirm: 'Tamam',
    filterReset: 'Sıfırla',
    selectAll: 'Hepsini Seç',
    selectInvert: 'Tersini Seç'
  },
  Modal: {
    okText: 'Tamam',
    cancelText: 'İptal',
    justOkText: 'Tamam'
  },
  Popconfirm: {
    okText: 'Tamam',
    cancelText: 'İptal'
  },
  Transfer: {
    searchPlaceholder: 'Arama',
    itemUnit: 'Öğe',
    itemsUnit: 'Öğeler'
  },
  Upload: {
    uploading: 'Yükleniyor...',
    removeFile: "Dosyay\u0131 kald\u0131r",
    uploadError: 'Yükleme Hatası',
    previewFile: "Dosyay\u0131 \xD6nizle"
  },
  Empty: {
    description: 'Veri Yok'
  }
};
exports["default"] = _default;