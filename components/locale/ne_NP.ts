import Pagination from 'rc-pagination/lib/locale/en_US';

import type { Locale } from '.';
import Calendar from '../calendar/locale/en_US';
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';

const typeTemplate = '${label} यो एक मान्य ${type} होइन';

const localeValues: Locale = {
  locale: 'ne-np',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'कृपया छान्नुहोस्',
  },
  Table: {
    filterTitle: 'फिल्टर मेनु',
    filterConfirm: 'हो',
    filterReset: 'रीसेट',
    filterEmptyText: 'कुनै फिल्टर छैन',
    filterCheckAll: 'सबै छान्नु',
    filterSearchPlaceholder: 'फिल्टर भित्र खोज्नुहोस्',
    emptyText: 'डाटा छैन',
    selectAll: 'सबै छान्नुुहोस्',
    selectInvert: 'छनौट उल्टाउनुहोस',
    selectNone: 'सबै खाली गर्नुहोस्',
    selectionAll: 'सबै छान्नु',
    sortTitle: 'क्रमबद्ध',
    expand: 'पङ्क्ति विस्तार गर्नुहोस्',
    collapse: 'पङ्क्ति बन्द गर्नुहोस्',
    triggerDesc: 'तल क्रमबद्ध गर्न क्लिक गर्नुहोस्',
    triggerAsc: 'बढ्दो अर्डर गर्न क्लिक गर्नुहोस्',
    cancelSort: 'क्रमबद्ध नगर्नुहोस्',
  },
  Modal: {
    okText: 'हो',
    cancelText: 'होईन',
    justOkText: 'हो',
  },
  Popconfirm: {
    okText: 'हो',
    cancelText: 'होईन',
  },
  Tour: {
    Next: 'अर्को पाइला',
    Previous: 'अघिल्लो',
    Finish: 'भ्रमण अन्त्य गर्नुहोस्',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'यहाँ खोज्नुहोस्',
    itemUnit: 'वस्तु',
    itemsUnit: 'वस्तुहरू',
    remove: 'मेटाउन',
    selectCurrent: 'सबै हालको पृष्ठ चयन गर्नुहोस्',
    removeCurrent: 'हालको पृष्ठ मेटाउनुहोस्',
    selectAll: 'सबै छान्नु',
    deselectAll: 'सबै अचयन गर्नुहोस्',
    removeAll: 'सबै मेटाउनुहोस्',
    selectInvert: 'हालको पृष्ठ उल्टाउनुहोस्',
  },
  Upload: {
    uploading: 'अपलोड गर्दै...',
    removeFile: 'फाइल हटाउनुहोस्',
    uploadError: 'अप्लोडमा समस्या भयो',
    previewFile: 'फाइल पूर्वावलोकन गर्नुहोस्',
    downloadFile: 'डाउनलोड फाइल',
  },
  Empty: {
    description: 'डाटा छैन',
  },
  Icon: {
    icon: 'आइकन',
  },
  Text: {
    edit: 'सम्पादन गर्नुहोस्',
    copy: 'कापी',
    copied: 'सफलतापूर्वक प्रतिलिपि गरियो',
    expand: 'विस्तार गर्नुहोस्',
    collapse: 'बन्द',
  },
  Form: {
    optional: '（ऐच्छिक）',
    defaultValidateMessages: {
      default: 'क्षेत्र प्रमाणीकरण त्रुटि${label}',
      required: 'कृपया प्रविष्ट गर्नुहोस्${label}',
      enum: '${label}ती मध्ये एक हुनुपर्छ[${enum}]',
      whitespace: '${label}शून्य वर्ण हुन सक्दैन',
      date: {
        format: '${label}अमान्य मिति ढाँचा',
        parse: '${label}मितिमा रूपान्तरण गर्न सकिँदैन',
        invalid: '${label}अवैध मिति हो',
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
        len: '${label}${len}वर्ण हुनुपर्छ',
        min: '${label}कम्तिमा${min}पात्रहरू',
        max: '${label}धेरैजसो${max}पात्रहरू',
        range: '${label}मा हुनुपर्छ${min}-${max}वर्णहरू बीच',
      },
      number: {
        len: '${label}बराबर हुनुपर्छ${len}',
        min: '${label}न्यूनतम मूल्य छ${min}',
        max: '${label}अधिकतम मान हो${max}',
        range: '${label}मा हुनुपर्छ${min}-${max}बीचमा',
      },
      array: {
        len: 'हुनै पर्छ${len}व्यक्तिगत${label}',
        min: 'कम्तिमा${min}व्यक्तिगत${label}',
        max: 'धेरैजसो${max}व्यक्तिगत${label}',
        range: '${label}मात्रा भित्र हुनुपर्छ${min}-${max}बीचमा',
      },
      pattern: {
        mismatch: '${label}ढाँचासँग मेल खाँदैन${pattern}',
      },
    },
  },
  Image: {
    preview: 'पूर्वावलोकन',
  },
  QRCode: {
    expired: 'QR कोडको म्याद सकियो',
    refresh: 'रिफ्रेस गर्न क्लिक गर्नुहोस्',
    scanned: 'स्क्यान गरियो',
  },
  ColorPicker: {
    presetEmpty: 'अहिलेसम्म कुनै पनि छैन',
    transparent: 'पारदर्शी',
    singleColor: 'एक रंग',
    gradientColor: 'ग्रेडिएण्ट',
  },
};

export default localeValues;
