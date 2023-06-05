/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/hi_IN';
import Calendar from '../calendar/locale/hi_IN';
import DatePicker from '../date-picker/locale/hi_IN';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/hi_IN';

const typeTemplate = '${label} मान्य ${type} नहीं है';

const localeValues: Locale = {
  locale: 'hi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'कृपया चुनें',
  },
  Table: {
    filterTitle: 'सूची बंद करें',
    filterConfirm: 'अच्छी तरह से',
    filterReset: 'रीसेट',
    filterEmptyText: 'कोई फ़िल्टर नहीं',
    emptyText: 'कोई जानकारी नहीं',
    selectAll: 'वर्तमान पृष्ठ का चयन करें',
    selectInvert: 'वर्तमान पृष्ठ घुमाएं',
    selectNone: 'सभी डेटा साफ़ करें',
    selectionAll: 'सभी डेटा का चयन करें',
    sortTitle: 'द्वारा क्रमबद्ध करें',
    expand: 'पंक्ति का विस्तार करें',
    collapse: 'पंक्ति संक्षिप्त करें',
    triggerDesc: 'अवरोही क्रमित करने के लिए क्लिक करें',
    triggerAsc: 'आरोही क्रमित करने के लिए क्लिक करें',
    cancelSort: 'छँटाई रद्द करने के लिए क्लिक करें',
  },
  Modal: {
    okText: 'अच्छी तरह से',
    cancelText: 'रद्द करना',
    justOkText: 'अच्छी तरह से',
  },
  Popconfirm: {
    okText: 'अच्छी तरह से',
    cancelText: 'रद्द करना',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'यहां खोजें',
    itemUnit: 'तत्त्व',
    itemsUnit: 'विषय-वस्तु',
    remove: 'हटाए',
    selectCurrent: 'वर्तमान पृष्ठ का चयन करें',
    removeCurrent: 'वर्तमान पृष्ठ हटाएं',
    selectAll: 'सभी डेटा का चयन करें',
    removeAll: 'सभी डेटा हटाएं',
    selectInvert: 'वर्तमान पृष्ठ को उल्टा करें',
  },
  Upload: {
    uploading: 'अपलोड हो रहा...',
    removeFile: 'फ़ाइल निकालें',
    uploadError: 'अपलोड में त्रुटि',
    previewFile: 'फ़ाइल पूर्वावलोकन',
    downloadFile: 'फ़ाइल डाउनलोड करें',
  },
  Empty: {
    description: 'कोई आकड़ा उपलब्ध नहीं है',
  },
  Icon: {
    icon: 'आइकन',
  },
  Text: {
    edit: 'संपादित करें',
    copy: 'प्रतिलिपि',
    copied: 'कॉपी किया गया',
    expand: 'विस्तार',
  },
  PageHeader: {
    back: 'वापस',
  },
  Form: {
    optional: '(ऐच्छिक)',
    defaultValidateMessages: {
      default: '${label} के लिए फील्ड सत्यापन त्रुटि',
      required: 'कृपया ${label} दर्ज करें',
      enum: '${label} [${enum}] में से एक होना चाहिए',
      whitespace: '${label} एक खाली अक्षर नहीं हो सकता',
      date: {
        format: '${label} तिथि प्रारूप अमान्य है',
        parse: '${label} को तारीख में नहीं बदला जा सकता',
        invalid: '${label} एक अमान्य तिथि है',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} ${len} अक्षर का होना चाहिए',
        min: '${label} कम से कम ${min} वर्णों का होना चाहिए',
        max: '${label} अधिकतम ${max} वर्णों का होना चाहिए',
        range: '${label} ${min}-${max} वर्णों के बीच होना चाहिए',
      },
      number: {
        len: '${label} ${len} के बराबर होना चाहिए',
        min: '${label} कम से कम ${min} होना चाहिए',
        max: '${label} अधिकतम ${max} होना चाहिए',
        range: '${label} ${min}-${max} के बीच होना चाहिए',
      },
      array: {
        len: '${len} ${label} होना चाहिए',
        min: 'कम से कम ${min} ${label}',
        max: 'ज्यादा से ज्यादा ${max} ${label}',
        range: '${label} की राशि ${min}-${max} के बीच होनी चाहिए',
      },
      pattern: {
        mismatch: '${label} ${pattern} पैटर्न से मेल नहीं खाता',
      },
    },
  },
  Image: {
    preview: 'पूर्वावलोकन',
  },
};

export default localeValues;
