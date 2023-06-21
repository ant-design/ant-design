import Pagination from 'rc-pagination/lib/locale/ta_IN';
import Calendar from '../calendar/locale/ta_IN';
import DatePicker from '../date-picker/locale/ta_IN';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/ta_IN';

const typeTemplate = '${label} is not a valid ${type}';

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
    filterEmptyText: 'No filters',
    filterCheckall: 'அனைத்து பொருட்களையும் தேர்ந்தெடுக்கவும்',
    filterSearchPlaceholder: 'வடிப்பான்களில் தேடவும்',
    expand: 'வரிசையை விரிவாக்கு',
    collapse: 'வரிசையைச் சுருக்கு',
    triggerDesc: 'இறங்குவரிசையை வரிசைப்படுத்த கிளிக் செய்யவும்',
    triggerAsc: 'ஏறுவரிசையில் வரிசைப்படுத்த கிளிக் செய்யவும்',
    cancelSort: 'வரிசையாக்கத்தை ரத்து செய்ய கிளிக் செய்யவும்',
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
  Form: {
    optional: '(optional)',
    defaultValidateMessages: {
      default: '${label}க்கான புல சரிபார்ப்பு பிழை',
      required: '${label} ஐ உள்ளிடவும்',
      enum: '${label} கண்டிப்பாக [${enum}] இல் ஒன்றாக இருக்க வேண்டும்',
      whitespace: '${label} வெற்று எழுத்தாக இருக்கக்கூடாது',
      date: {
        format: '${label} தேதி வடிவம் தவறானது',
        parse: '${label}ஐ தேதியாக மாற்ற முடியாது',
        invalid: '${label} என்பது தவறான தேதி',
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
        len: '${label} கண்டிப்பாக ${len} எழுத்துகளாக இருக்க வேண்டும்',
        min: '${label} குறைந்தது ${min} எழுத்துகளாக இருக்க வேண்டும்',
        max: '${label} ${max} எழுத்துகள் வரை இருக்க வேண்டும்',
        range: '${label} கண்டிப்பாக ${min}-${max} எழுத்துகளுக்கு இடையில் இருக்க வேண்டும்',
      },
      number: {
        len: '${label} கண்டிப்பாக ${len}க்கு சமமாக இருக்க வேண்டும்',
        min: '${label} குறைந்தபட்சம் ${min} ஆக இருக்க வேண்டும்',
        max: '${label} அதிகபட்சம் ${max} ஆக இருக்க வேண்டும்',
        range: '${label} கண்டிப்பாக ${min}-${max} இடையே இருக்க வேண்டும்',
      },
      array: {
        len: '${len} ${label} ஆக இருக்க வேண்டும்',
        min: 'குறைந்தது ${min} ${label}',
        max: 'அதிகபட்சம் ${max} ${label}',
        range: '${label} இன் தொகை கண்டிப்பாக ${min}-${max} இடையே இருக்க வேண்டும்',
      },
      pattern: {
        mismatch: '${label} ஆனது ${pattern} வடிவத்துடன் பொருந்தவில்லை',
      },
    },
  },
  Image: {
    preview: 'முன்னோட்ட',
  },
  QRCode: {
    expired: 'QR குறியீடு காலாவதியானது',
    refresh: 'புதுப்பிப்பு',
  },
};

export default localeValues;
