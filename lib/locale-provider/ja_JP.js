"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ja_JP = _interopRequireDefault(require("rc-pagination/lib/locale/ja_JP"));

var _ja_JP2 = _interopRequireDefault(require("../date-picker/locale/ja_JP"));

var _ja_JP3 = _interopRequireDefault(require("../time-picker/locale/ja_JP"));

var _ja_JP4 = _interopRequireDefault(require("../calendar/locale/ja_JP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'ja',
  Pagination: _ja_JP["default"],
  DatePicker: _ja_JP2["default"],
  TimePicker: _ja_JP3["default"],
  Calendar: _ja_JP4["default"],
  Table: {
    filterTitle: 'メニューをフィルター',
    filterConfirm: 'OK',
    filterReset: 'リセット',
    selectAll: 'すべてを選択',
    selectInvert: '選択を反転'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'キャンセル',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'キャンセル'
  },
  Transfer: {
    searchPlaceholder: 'ここを検索',
    itemUnit: 'アイテム',
    itemsUnit: 'アイテム'
  },
  Upload: {
    uploading: 'アップロード中...',
    removeFile: 'ファイルを削除',
    uploadError: 'アップロードエラー',
    previewFile: 'ファイルをプレビュー'
  },
  Empty: {
    description: 'データがありません'
  }
};
exports["default"] = _default;