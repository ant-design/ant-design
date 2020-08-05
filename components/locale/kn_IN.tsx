import Pagination from 'rc-pagination/lib/locale/kn_IN';
import DatePicker from '../date-picker/locale/kn_IN';
import TimePicker from '../time-picker/locale/kn_IN';
import Calendar from '../calendar/locale/kn_IN';
import { Locale } from '../locale-provider';

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
  Select: {
    notFoundContent: 'ದೊರೆತಿಲ್ಲ',
  },
  Upload: {
    uploading: 'ಏರಿಸಿ...',
    removeFile: 'ಫೈಲ್ ತೆಗೆದುಹಾಕಿ',
    uploadError: 'ಏರಿಸುವ ದೋಷ',
    previewFile: 'ಫೈಲ್ ಮುನ್ನೋಟ',
    downloadFile: 'ಫೈಲ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
  },
};

export default localeValues;
