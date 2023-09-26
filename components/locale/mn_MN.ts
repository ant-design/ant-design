import Pagination from 'rc-pagination/lib/locale/mn_MN';
import type { Locale } from '.';
import Calendar from '../calendar/locale/mn_MN';
import DatePicker from '../date-picker/locale/mn_MN';
import TimePicker from '../time-picker/locale/mn_MN';

const localeValues: Locale = {
  locale: 'mn-mn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Хайх цэс',
    filterConfirm: 'Тийм',
    filterReset: 'Цэвэрлэх',
    selectAll: 'Бүгдийг сонгох',
    selectInvert: 'Бусдыг сонгох',
  },
  Modal: {
    okText: 'Тийм',
    cancelText: 'Цуцлах',
    justOkText: 'Тийм',
  },
  Popconfirm: {
    okText: 'Тийм',
    cancelText: 'Цуцлах',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Хайх',
    itemUnit: 'Зүйл',
    itemsUnit: 'Зүйлүүд',
  },
  Upload: {
    uploading: 'Хуулж байна...',
    removeFile: 'Файл устгах',
    uploadError: 'Хуулахад алдаа гарлаа',
    previewFile: 'Файлыг түргэн үзэх',
    downloadFile: 'Файлыг татах',
  },
  Empty: {
    description: 'Мэдээлэл байхгүй байна',
  },
};

export default localeValues;
