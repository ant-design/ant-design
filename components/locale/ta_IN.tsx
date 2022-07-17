import Pagination from 'rc-pagination/lib/locale/ta_IN';
import DatePicker from '../date-picker/locale/ta_IN';
import TimePicker from '../time-picker/locale/ta_IN';
import Calendar from '../calendar/locale/ta_IN';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'ta',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all comoponents
  global: {
    placeholder: 'தேதியைத் தேர்ந்தெடுக்கவும்',
  },
  Table: {
    filterTitle: 'பட்டியலை மூடு',
    filterConfirm: 'சரி',
    filterReset: 'மீட்டமை',
    emptyText: 'தகவல் இல்லை',
    selectAll: 'அனைத்தையும் தேர்வுசெய்',
    selectInvert: 'தலைகீழாக மாற்று',
    sortTitle: 'தலைப்பை வரிசைப்படுத்தவும்',
  },
  Modal: {
    okText: 'சரி',
    cancelText: 'ரத்து செய்யவும்',
    justOkText: 'பரவாயில்லை, சரி',
  },
  Popconfirm: {
    okText: 'சரி',
    cancelText: 'ரத்து செய்யவும்',
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'உள்ளடக்கம் கிடைக்கவில்லை',
    searchPlaceholder: 'இங்கு தேடவும்',
    itemUnit: 'தகவல்',
    itemsUnit: 'தகவல்கள்',
  },
  Upload: {
    uploading: 'பதிவேற்றுகிறது...',
    removeFile: 'கோப்பை அகற்று',
    uploadError: 'பதிவேற்றுவதில் பிழை',
    previewFile: 'கோப்பை முன்னோட்டமிடுங்கள்',
    downloadFile: 'பதிவிறக்க கோப்பு',
  },
  Empty: {
    description: 'தகவல் இல்லை',
  },
  Icon: {
    icon: 'உருவம்',
  },
  Text: {
    edit: 'திருத்து',
    copy: 'நகல் எடு',
    copied: 'நகல் எடுக்கப்பட்டது',
    expand: 'விரிவாக்கவும்',
  },
  PageHeader: {
    back: 'பின் செல்லவும்',
  },
};

export default localeValues;
