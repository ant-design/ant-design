/**
 * Created by Dmitry Bublik on 15/10/17.
 */

import moment from 'moment';
moment.locale('uk');

import Pagination from 'rc-pagination/lib/locale/uk_UA';
import DatePicker from '../date-picker/locale/uk_UA';
import TimePicker from '../time-picker/locale/uk_UA';
import Calendar from '../calendar/locale/uk_UA';

export default {
  locale: 'uk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Фільтр',
    filterConfirm: 'OK',
    filterReset: 'Очистити',
    emptyText: 'Немає даних',
    selectAll: 'Обрати все',
    selectInvert: 'Інвертувати вибір',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Скасування',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Скасування',
  },
  Transfer: {
    notFoundContent: 'Нічого не знайдено',
    searchPlaceholder: 'Введіть назву для пошуку',
    itemUnit: 'елемент',
    itemsUnit: 'елементів',
  },
  Select: {
    notFoundContent: 'Нічого не знайдено',
  },
  Upload: {
    uploading: 'Завантажую...',
    removeFile: 'Видалити файл',
    uploadError: 'Помилка при завантаженні',
    previewFile: 'Передперегляд файла',
  },
};
