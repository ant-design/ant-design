import moment from 'moment';
moment.locale('en');

import Pagination from 'rc-pagination/lib/locale/en_US';
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';
import Calendar from '../calendar/locale/en_US';

export default {
  locale: 'en',
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
