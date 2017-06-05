import moment from 'moment';
moment.locale('en-gb');

import Pagination from 'rc-pagination/lib/locale/en_GB';
import DatePicker from '../date-picker/locale/en_GB';
import TimePicker from '../time-picker/locale/en_GB';
import Calendar from '../calendar/locale/en_GB';

export default {
  locale: 'en-gb',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter Menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    emptyText: 'No Data',
    selectAll: 'Select Current Page',
    selectInvert: 'Select Invert',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel',
  },
  Transfer: {
    notFoundContent: 'Not Found',
    searchPlaceholder: 'Search here',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'Not Found',
  },
  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
  },
};
