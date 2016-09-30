/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */

/* tslint:disable */
import THIS_IS_A_HACK_TO_FIX_LOCALE from '../date-picker/locale/zh_CN';
(THIS_IS_A_HACK_TO_FIX_LOCALE);
/* tslint:enable */

// To set the default locale of moment to ru globally.
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import Pagination from 'rc-pagination/lib/locale/ru_RU';
import DatePicker from '../date-picker/locale/ru_RU';
import TimePicker from '../time-picker/locale/ru_RU';
import Calendar from '../calendar/locale/ru_RU';

export default {
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Фильтр',
    filterConfirm: 'OK',
    filterReset: 'Сбросить',
    emptyText: 'Нет данных',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Отмена',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Отмена',
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
