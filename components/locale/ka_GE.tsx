import Pagination from 'rc-pagination/lib/locale/ka_GE';
import DatePicker from '../date-picker/locale/ka_GE';
import TimePicker from '../time-picker/locale/ka_GE';
import Calendar from '../calendar/locale/ka_GE';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'ka',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'ფილტრი',
    filterConfirm: 'დიახ',
    filterReset: 'გასუფთავება',
    filterEmptyText: 'ფილტრების გარეშე',
    emptyText: 'მონაცემები არ არის',
    selectAll: 'ყველას არჩევა',
    selectionAll: 'ყველა მონაცემის არჩევა',
    sortTitle: 'სორტირება',
    expand: 'სტრიქონის გახსნა',
    collapse: 'სტრიქონის ჩაკეცვა',
    triggerDesc: 'სორტირება დაღმავლობით',
    triggerAsc: 'სორტირება აღმავლობით',
    cancelSort: 'სორტირების გაუქმება',
  },
  Empty: {
    description: 'მონაცემები არ არის',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ძიება',
    itemUnit: 'ობიექტი',
    itemsUnit: 'ობიექტი.',
    remove: 'წაშლა',
    selectAll: 'ყველა მონაცემის არჩევა',
    selectCurrent: 'მიმდინარე გვერდის არჩევა',
    selectInvert: 'საპირისპირო თანმიმდევრობით ჩვენება',
    removeAll: 'ყველა მონაცემის წაშლა',
    removeCurrent: 'მიმდინარე გვერდის წაშლა',
  },
};

export default localeValues;
