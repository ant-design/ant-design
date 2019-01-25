"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _kn_IN = _interopRequireDefault(require("rc-pagination/lib/locale/kn_IN"));

var _kn_IN2 = _interopRequireDefault(require("../date-picker/locale/kn_IN"));

var _kn_IN3 = _interopRequireDefault(require("../time-picker/locale/kn_IN"));

var _kn_IN4 = _interopRequireDefault(require("../calendar/locale/kn_IN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'kn',
  Pagination: _kn_IN["default"],
  DatePicker: _kn_IN2["default"],
  TimePicker: _kn_IN3["default"],
  Calendar: _kn_IN4["default"],
  // locales for all comoponents
  global: {
    placeholder: 'ದಯವಿಟ್ಟು ಆರಿಸಿ'
  },
  Table: {
    filterTitle: 'ಪಟ್ಟಿ ಸೋಸಿ',
    filterConfirm: 'ಸರಿ',
    filterReset: 'ಮರುಹೊಂದಿಸಿ',
    emptyText: 'ಮಾಹಿತಿ ಇಲ್ಲ',
    selectAll: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectInvert: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ತಿರುಗಿಸಿ',
    sortTitle: 'ವಿಂಗಡಿಸಿ'
  },
  Modal: {
    okText: 'ಸರಿ',
    cancelText: 'ರದ್ದು',
    justOkText: 'ಸರಿ'
  },
  Popconfirm: {
    okText: 'ಸರಿ',
    cancelText: 'ರದ್ದು'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'ದೊರೆತಿಲ್ಲ',
    searchPlaceholder: 'ಇಲ್ಲಿ ಹುಡುಕಿ',
    itemUnit: 'ವಿಷಯ',
    itemsUnit: 'ವಿಷಯಗಳು'
  },
  Select: {
    notFoundContent: 'ದೊರೆತಿಲ್ಲ'
  },
  Upload: {
    uploading: 'ಏರಿಸಿ...',
    removeFile: 'ಫೈಲ್ ತೆಗೆದುಹಾಕಿ',
    uploadError: 'ಏರಿಸುವ ದೋಷ',
    previewFile: 'ಫೈಲ್ ಮುನ್ನೋಟ'
  }
};
exports["default"] = _default;