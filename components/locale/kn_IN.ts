import Pagination from 'rc-pagination/lib/locale/kn_IN';

import type { Locale } from '.';
import Calendar from '../calendar/locale/kn_IN';
import DatePicker from '../date-picker/locale/kn_IN';
import TimePicker from '../time-picker/locale/kn_IN';

const typeTemplate = '${label} ಮಾನ್ಯವಾದ ${type} ಅಲ್ಲ';

const localeValues: Locale = {
  locale: 'kn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all comoponents
  global: {
    placeholder: 'ದಯವಿಟ್ಟು ಆರಿಸಿ',
  },
  Table: {
    filterTitle: 'ಪಟ್ಟಿ ಸೋಸಿ',
    filterConfirm: 'ಸರಿ',
    filterReset: 'ಮರುಹೊಂದಿಸಿ',
    emptyText: 'ಮಾಹಿತಿ ಇಲ್ಲ',
    selectAll: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectInvert: 'ಪ್ರಸ್ತುತ ಪುಟವನ್ನು ತಿರುಗಿಸಿ',
    sortTitle: 'ವಿಂಗಡಿಸಿ',
    filterEmptyText: 'ಫಿಲ್ಟರ್ ಇಲ್ಲ',
    filterCheckAll: 'ಎಲ್ಲಾ ಐಟಂಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    filterSearchPlaceholder: 'ಫಿಲ್ಟರ್‌ಗಳೊಂದಿಗೆ ಹುಡುಕಿ',
    selectNone: 'ಯಾವುದನ್ನೂ ಆಯ್ಕೆ ಮಾಡಬೇಡಿ',
    selectionAll: 'ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    expand: 'ಶ್ರೇಣಿಯನ್ನು ವಿಸ್ತರಿಸಿ',
    collapse: 'ಸಾಲುಗಳನ್ನು ಸಂಕುಚಿಸಿ',
    triggerDesc: 'ಅವರೋಹಣ ಕ್ರಮದಲ್ಲಿ ವಿಂಗಡಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    triggerAsc: 'ಏರೋಹಣ ಕ್ರಮದಲ್ಲಿ ವಿಂಗಡಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    cancelSort: 'ವಿಂಗಡಣೆಯನ್ನು ರದ್ದುಗೊಳಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
  },
  Modal: {
    okText: 'ಸರಿ',
    cancelText: 'ರದ್ದು',
    justOkText: 'ಸರಿ',
  },
  Popconfirm: {
    okText: 'ಸರಿ',
    cancelText: 'ರದ್ದು',
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'ದೊರೆತಿಲ್ಲ',
    searchPlaceholder: 'ಇಲ್ಲಿ ಹುಡುಕಿ',
    itemUnit: 'ವಿಷಯ',
    itemsUnit: 'ವಿಷಯಗಳು',
  },
  Upload: {
    uploading: 'ಏರಿಸಿ...',
    removeFile: 'ಫೈಲ್ ತೆಗೆದುಹಾಕಿ',
    uploadError: 'ಏರಿಸುವ ದೋಷ',
    previewFile: 'ಫೈಲ್ ಮುನ್ನೋಟ',
    downloadFile: 'ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
  },
  Empty: {
    description: 'ಮಾಹಿತಿ ಇಲ್ಲ',
  },
  Icon: {
    icon: 'ಚಿಹ್ನೆ',
  },
  Text: {
    edit: 'ಸಂಪಾದಿಸಿ',
    copy: 'ಪ್ರತಿಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ',
    copied: 'ನಕಲಿಸಲಾಗಿದೆ',
    expand: 'ಶ್ರೇಣಿಯನ್ನು ವಿಸ್ತರಿಸಿ',
    collapse: 'ಸಾಲುಗಳನ್ನು ಸಂಕುಚಿಸಿ',
  },
  Form: {
    optional: '(ಐಚ್ಛಿಕ)',
    defaultValidateMessages: {
      default: '${label} ಗಾಗಿ ಕ್ಷೇತ್ರ ಮೌಲ್ಯೀಕರಣ ದೋಷ',
      required: '${label} ನಮೂದಿಸಿ',
      enum: '${label} [${enum}] ನಲ್ಲಿ ಒಂದಾಗಿರಬೇಕು.',
      whitespace: '${label} ಖಾಲಿ ಅಕ್ಷರವಾಗಿರಬಾರದು',
      date: {
        format: '${label} ದಿನಾಂಕ ಸ್ವರೂಪವು ಅಮಾನ್ಯವಾಗಿದೆ',
        parse: '${label} ಅನ್ನು ದಿನಾಂಕಕ್ಕೆ ಪರಿವರ್ತಿಸಲಾಗುವುದಿಲ್ಲ',
        invalid: '${label} ಒಂದು ಅಮಾನ್ಯ ದಿನಾಂಕವಾಗಿದೆ',
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
        len: '${label} ${len} ಅಕ್ಷರಗಳಾಗಿರಬೇಕು',
        min: '${label} ಕನಿಷ್ಠ ${min} ಅಕ್ಷರಗಳಾಗಿರಬೇಕು',
        max: '${label} ಗರಿಷ್ಠ ${max} ಅಕ್ಷರಗಳಾಗಿರಬೇಕು',
        range: '${label} ${min}-${max} ಅಕ್ಷರಗಳ ನಡುವೆ ಇರಬೇಕು',
      },
      number: {
        len: '${label} ${len} ಗೆ ಸಮನಾಗಿರಬೇಕು',
        min: '${label} ಕನಿಷ್ಠ ${min} ಆಗಿರಬೇಕು',
        max: '${label} ಹೆಚ್ಚೆಂದರೆ ${max} ಆಗಿರಬೇಕು',
        range: '${label} ${min}-${max} ನಡುವೆ ಇರಬೇಕು',
      },
      array: {
        len: '${label} ${len} ಗೆ ಸಮನಾಗಿರಬೇಕು',
        min: '${label} ಕನಿಷ್ಠ ${min} ಆಗಿರಬೇಕು',
        max: '${label} ಹೆಚ್ಚೆಂದರೆ ${max} ಆಗಿರಬೇಕು',
        range: '${label} ${min}-${max} ನಡುವೆ ಇರಬೇಕು',
      },
      pattern: {
        mismatch: '${label} ಮಾದರಿಯು ${pattern} ಗೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ',
      },
    },
  },
  Image: {
    preview: 'ಮುನ್ನೋಟ',
  },
  QRCode: {
    expired: 'QR ಕೋಡ್ ಅವಧಿ ಮೀರಿದೆ',
    refresh: 'ನವೀಕರಿಸಿ',
  },
};

export default localeValues;
