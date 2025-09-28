import Pagination from '@rc-component/pagination/lib/locale/mr_IN';

import type { Locale } from '.';
import Calendar from '../calendar/locale/mr_IN';
import DatePicker from '../date-picker/locale/mr_IN';
import TimePicker from '../time-picker/locale/mr_IN';

const typeTemplate = '${label} हा वैध ${type} नाही';

const localeValues: Locale = {
  locale: 'mr',
  DatePicker,
  TimePicker,
  Calendar,
  Pagination,
  global: {
    placeholder: 'कृपया निवडा',
    close: 'बंद करा',
  },
  Table: {
    filterTitle: 'फिल्टर मेनू',
    filterConfirm: 'ठीक आहे',
    filterReset: 'रीसेट करा',
    filterEmptyText: 'कोणतेही फिल्टर नाहीत',
    filterCheckAll: 'सर्व वस्तू निवडा',
    filterSearchPlaceholder: 'फिल्टरमध्ये शोधा',
    emptyText: 'कोणतीही माहिती नाही',
    selectAll: 'सध्याचा पृष्ठ निवडा',
    selectInvert: 'सध्याच्या पृष्ठाचे उलट करा',
    selectNone: 'सर्व माहिती काढून टाका',
    selectionAll: 'सर्व माहिती निवडा',
    sortTitle: 'वर्गीकरण',
    expand: 'पंक्ती वाढवा',
    collapse: 'पंक्ती संकुचित करा',
    triggerDesc: 'उतरत्या क्रमाने वर्गीकरण करण्यासाठी क्लिक करा',
    triggerAsc: 'वाढत्या क्रमाने वर्गीकरण करण्यासाठी क्लिक करा',
    cancelSort: 'वर्गीकरण रद्द करण्यासाठी क्लिक करा',
  },
  Tour: {
    Next: 'पुढे',
    Previous: 'मागे',
    Finish: 'समाप्त करा',
  },
  Modal: {
    okText: 'ठीक आहे',
    cancelText: 'रद्द करा',
    justOkText: 'ठीक आहे',
  },
  Popconfirm: {
    okText: 'ठीक आहे',
    cancelText: 'रद्द करा',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'येथे शोधा',
    itemUnit: 'वस्तू',
    itemsUnit: 'वस्तू',
    remove: 'काढा',
    selectCurrent: 'सध्याचा पृष्ठ निवडा',
    removeCurrent: 'सध्याचा पृष्ठ काढा',
    selectAll: 'सर्व माहिती निवडा',
    deselectAll: 'सर्व माहिती निवडणे रद्द करा',
    removeAll: 'सर्व माहिती काढून टाका',
    selectInvert: 'सध्याच्या पृष्ठाचे उलट करा',
  },
  Upload: {
    uploading: 'अपलोड करत आहे...',
    removeFile: 'फाइल हटवा',
    uploadError: 'अपलोडमध्ये त्रुटी',
    previewFile: 'फाइलचे पूर्वावलोकन',
    downloadFile: 'फाइल डाउनलोड करा',
  },
  Empty: {
    description: 'कोणतीही माहिती नाही',
  },
  Icon: {
    icon: 'आयकॉन',
  },
  Text: {
    edit: 'संपादन करा',
    copy: 'कॉपी करा',
    copied: 'कॉपी केली',
    expand: 'वाढवा',
    collapse: 'संकुचित करा',
  },
  Form: {
    optional: '(ऐच्छिक)',
    defaultValidateMessages: {
      default: '${label} साठी प्रमाणीकरणाची चूक',
      required: 'कृपया ${label} प्रविष्ट करा',
      enum: '${label} हे [${enum}] यापैकी एक असले पाहिजे',
      whitespace: '${label} मध्ये रिकामं वर्णन असू शकत नाही',
      date: {
        format: '${label} तारीख स्वरूप अवैध आहे',
        parse: '${label} तारखेत रूपांतरीत करता येत नाही',
        invalid: '${label}ची तारीख चुकीची आहे',
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
        len: '${label} ${len} वर्णांचे असले पाहिजे',
        min: '${label} ${min} किमान वर्णांचे असले पाहिजे',
        max: '${label} ${max} कमाल वर्णांचे असले पाहिजे',
        range: '${label} ${min}-${max} वर्णांच्या दरम्यान असले पाहिजे',
      },
      number: {
        len: '${label} ${len} च्या बरोबरचे असले पाहिजे',
        min: '${label} किमान ${min} असणे आवश्यक आहे',
        max: '${label} जास्तीत जास्त ${max} असणे आवश्यक आहे',
        range: '${label} ${min}-${max} च्या दरम्यान असले पाहिजे',
      },
      array: {
        len: '${len} ${label} असणे आवश्यक आहे',
        min: 'कमीत कमी ${min} ${label}',
        max: 'जास्तीत जास्त ${max} ${label}',
        range: '${label} ची रक्कम ${min}-${max} दरम्यान असणे आवश्यक आहे',
      },
      pattern: {
        mismatch: '${label} हे ${pattern} पॅटर्नशी जुळत नाही',
      },
    },
  },
};

export default localeValues;
