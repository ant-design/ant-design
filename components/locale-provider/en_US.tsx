/* tslint:disable */
import THIS_IS_A_HACK_TO_FIX_LOCALE from '../date-picker/locale/zh_CN';
(THIS_IS_A_HACK_TO_FIX_LOCALE);
/* tslint:enable */

// To set the default locale of moment to en globally.
import moment from 'moment';
moment.locale('en');

import Pagination from 'rc-pagination/lib/locale/en_US';
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';
import Calendar from '../calendar/locale/en_US';

export default {
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter Menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    emptyText: 'No Data',
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
};
