/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ml_IN';
import Calendar from '../calendar/locale/ml_IN';
import DatePicker from '../date-picker/locale/ml_IN';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/ml_IN';

const typeTemplate = '${label} അസാധുവായ ${type} ആണ്';

const localeValues: Locale = {
  locale: 'ml',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'ദയവായി തിരഞ്ഞെടുക്കുക',
  },
  Table: {
    filterTitle: 'ഫിൽറ്റർ',
    filterConfirm: 'ശരിയാണ്',
    filterReset: 'പുനഃക്രമീകരിക്കുക',
    filterEmptyText: 'ഫിൽറ്ററുകളൊന്നുമില്ല',
    emptyText: 'ഡാറ്റയൊന്നുമില്ല',
    selectAll: 'നിലവിലെ പേജ് തിരഞ്ഞെടുക്കുക',
    selectInvert: 'നിലവിലെ പേജിൽ ഇല്ലാത്തത് തിരഞ്ഞെടുക്കുക',
    selectNone: 'എല്ലാ ഡാറ്റയും നീക്കം ചെയ്യുക',
    selectionAll: 'എല്ലാ ഡാറ്റയും തിരഞ്ഞെടുക്കുക',
    sortTitle: 'ക്രമമാക്കുക',
    expand: 'വരി വികസിപ്പിക്കുക',
    collapse: 'വരി ചുരുക്കുക',
    triggerDesc: 'അവരോഹണ ക്രമത്തിനായി ക്ലിക്ക് ചെയ്യുക',
    triggerAsc: 'ആരോഹണ ക്രമത്തിനായി ക്ലിക്ക് ചെയ്യുക',
    cancelSort: 'ക്രമീകരണം ഒഴിവാക്കുന്നതിനായി ക്ലിക്ക് ചെയ്യുക',
  },
  Modal: {
    okText: 'ശരിയാണ്',
    cancelText: 'റദ്ദാക്കുക',
    justOkText: 'ശരിയാണ്',
  },
  Popconfirm: {
    okText: 'ശരിയാണ്',
    cancelText: 'റദ്ദാക്കുക',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ഇവിടെ തിരയുക',
    itemUnit: 'ഇനം',
    itemsUnit: 'ഇനങ്ങൾ',
    remove: 'നീക്കം ചെയ്യുക',
    selectCurrent: 'നിലവിലെ പേജ് തിരഞ്ഞെടുക്കുക',
    removeCurrent: 'നിലവിലെ പേജ് നീക്കം ചെയ്യുക',
    selectAll: 'എല്ലാ ഡാറ്റയും തിരഞ്ഞെടുക്കുക',
    removeAll: 'എല്ലാ ഡാറ്റയും നീക്കം ചെയ്യുക',
    selectInvert: 'നിലവിലെ പേജിൽ ഇല്ലാത്തത് തിരഞ്ഞെടുക്കുക',
  },
  Upload: {
    uploading: 'അപ്‌ലോഡ് ചെയ്തു കൊണ്ടിരിക്കുന്നു...',
    removeFile: 'ഫയൽ നീക്കം ചെയ്യുക',
    uploadError: 'അപ്‌ലോഡിൽ പിശക് സംഭവിച്ചിരിക്കുന്നു',
    previewFile: 'ഫയൽ പ്രിവ്യൂ ചെയ്യുക',
    downloadFile: 'ഫയൽ ഡൗൺലോഡ് ചെയ്യുക',
  },
  Empty: {
    description: 'ഡാറ്റയൊന്നുമില്ല',
  },
  Icon: {
    icon: 'ഐക്കൺ',
  },
  Text: {
    edit: 'തിരുത്തുക',
    copy: 'കോപ്പി ചെയ്യുക',
    copied: 'കോപ്പി ചെയ്തു',
    expand: 'വികസിപ്പിക്കുക',
  },
  PageHeader: {
    back: 'തിരികെ',
  },
  Form: {
    optional: '(optional)',
    defaultValidateMessages: {
      default: '${label} ഫീൽഡിൽ വാലിഡേഷൻ പിശകുണ്ട്',
      required: 'ദയവായി ${label} രേഖപ്പെടുത്തുക',
      enum: '${label} നിർബന്ധമായും [${enum}]-ൽ നിന്നുള്ളതായിരിക്കണം',
      whitespace: '${label} ശൂന്യമായി വെക്കാനാകില്ല',
      date: {
        format: '${label} തീയതി രൂപരേഖ അസാധുവാണ്',
        parse: '${label} ഒരു തീയതിയാക്കി മാറ്റാൻ സാധിക്കില്ല',
        invalid: '${label} ഒരു അസാധുവായ തീയതി ആണ്',
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
        len: '${label} നിർബന്ധമായും ${len} അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം',
        min: '${label} നിർബന്ധമായും ${min} അക്ഷരങ്ങൾ എങ്കിലും ഉണ്ടായിരിക്കണം',
        max: '${label} നിർബന്ധമായും ${max} അക്ഷരങ്ങളിൽ കൂടാൻ പാടില്ല',
        range: '${label} നിർബന്ധമായും ${min}-നും ${max}-നും ഇടയിൽ അക്ഷരങ്ങൾ ഉള്ളതായിരിക്കണം',
      },
      number: {
        len: '${label} നിർബന്ധമായും ${len}-നു തുല്യമായിരിക്കണം',
        min: '${label} നിർബന്ധമായും ${min}-ൽ കുറയാൻ പാടില്ല',
        max: '${label} നിർബന്ധമായും ${max}-ൽ കൂടാൻ പാടില്ല',
        range: '${label} നിർബന്ധമായും ${min}-നും ${max}-നും ഇടയിൽ ആയിരിക്കണം',
      },
      array: {
        len: 'നിർബന്ധമായും ${len} ${label} ഉണ്ടായിരിക്കണം',
        min: 'കുറഞ്ഞപക്ഷം ${min} ${label} എങ്കിലും ഉണ്ടായിരിക്കണം',
        max: 'അങ്ങേയറ്റം ${max} ${label} ആയിരിക്കണം',
        range: '${label}-ന്റെ എണ്ണം നിർബന്ധമായും ${min}-നും ${max}-നും ഇടയിൽ ആയിരിക്കണം',
      },
      pattern: {
        mismatch: '${label} ${pattern} മാതൃകയുമായി യോജിക്കുന്നില്ല',
      },
    },
  },
  Image: {
    preview: 'പ്രിവ്യൂ',
  },
};

export default localeValues;
