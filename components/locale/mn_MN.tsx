import Pagination from 'rc-pagination/lib/locale/mn_MN';
import DatePicker from '../date-picker/locale/mn_MN';
import TimePicker from '../time-picker/locale/mn_MN';
import Calendar from '../calendar/locale/mn_MN';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'mn-mn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Хайх цэс',
    filterConfirm: 'OK',
    filterReset: 'Цэвэрлэх',
    selectAll: 'Бүгдийг сонгох',
    selectInvert: 'Бусдыг сонгох',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Цуцлах',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Цуцлах',
  },
  Transfer: {
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
