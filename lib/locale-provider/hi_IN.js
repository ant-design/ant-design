"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hi_IN = _interopRequireDefault(require("rc-pagination/lib/locale/hi_IN"));

var _hi_IN2 = _interopRequireDefault(require("../date-picker/locale/hi_IN"));

var _hi_IN3 = _interopRequireDefault(require("../time-picker/locale/hi_IN"));

var _hi_IN4 = _interopRequireDefault(require("../calendar/locale/hi_IN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'hi',
  Pagination: _hi_IN["default"],
  DatePicker: _hi_IN2["default"],
  TimePicker: _hi_IN3["default"],
  Calendar: _hi_IN4["default"],
  // locales for all comoponents
  global: {
    placeholder: 'कृपया चुनें'
  },
  Table: {
    filterTitle: 'सूची बंद करें',
    filterConfirm: 'अच्छी तरह से',
    filterReset: 'रीसेट',
    emptyText: 'कोई जानकारी नहीं',
    selectAll: 'वर्तमान पृष्ठ का चयन करें',
    selectInvert: 'वर्तमान पृष्ठ घुमाएं',
    sortTitle: 'द्वारा क्रमबद्ध करें'
  },
  Modal: {
    okText: 'अच्छी तरह से',
    cancelText: 'रद्द करना',
    justOkText: 'अच्छी तरह से'
  },
  Popconfirm: {
    okText: 'अच्छी तरह से',
    cancelText: 'रद्द करना'
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'नहीं मिला',
    searchPlaceholder: 'यहां खोजें',
    itemUnit: 'तत्त्व',
    itemsUnit: 'विषय-वस्तु'
  },
  Select: {
    notFoundContent: 'नहीं मिला'
  },
  Upload: {
    uploading: 'अपलोडिंग...',
    removeFile: 'फ़ाइल निकालें',
    uploadError: 'अपलोड में त्रुटि',
    previewFile: 'फ़ाइल पूर्वावलोकन'
  }
};
exports["default"] = _default;