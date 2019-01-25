"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _id_ID = _interopRequireDefault(require("rc-pagination/lib/locale/id_ID"));

var _id_ID2 = _interopRequireDefault(require("../date-picker/locale/id_ID"));

var _id_ID3 = _interopRequireDefault(require("../time-picker/locale/id_ID"));

var _id_ID4 = _interopRequireDefault(require("../calendar/locale/id_ID"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'id',
  Pagination: _id_ID["default"],
  DatePicker: _id_ID2["default"],
  TimePicker: _id_ID3["default"],
  Calendar: _id_ID4["default"],
  Table: {
    filterTitle: 'Menu filter',
    filterConfirm: 'baik',
    filterReset: 'Setel ulang',
    selectAll: 'Pilih halaman saat ini',
    selectInvert: 'Balikkan halaman saat ini',
    sortTitle: 'Menyortir'
  },
  Modal: {
    okText: 'baik',
    cancelText: 'Membatalkan',
    justOkText: 'baik'
  },
  Popconfirm: {
    okText: 'baik',
    cancelText: 'Membatalkan'
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Cari di sini',
    itemUnit: 'barang',
    itemsUnit: 'item'
  },
  Upload: {
    uploading: 'Mengunggah...',
    removeFile: 'Hapus file',
    uploadError: 'Kesalahan pengunggahan',
    previewFile: 'File pratinjau'
  },
  Empty: {
    description: 'Tidak ada data'
  }
};
exports["default"] = _default;