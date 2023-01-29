import Pagination from 'rc-pagination/lib/locale/vi_VN';
import Calendar from '../calendar/locale/vi_VN';
import DatePicker from '../date-picker/locale/vi_VN';
import type { Locale } from '../locale';
import TimePicker from '../time-picker/locale/vi_VN';

const localeValues: Locale = {
  locale: 'vi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Bộ lọc',
    filterConfirm: 'Đồng ý',
    filterReset: 'Bỏ lọc',
    selectAll: 'Chọn tất cả',
    selectInvert: 'Chọn ngược lại',
  },
  Modal: {
    okText: 'Đồng ý',
    cancelText: 'Hủy',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'Đồng ý',
    cancelText: 'Hủy',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Tìm ở đây',
    itemUnit: 'mục',
    itemsUnit: 'mục',
  },
  Upload: {
    uploading: 'Đang tải lên...',
    removeFile: 'Gỡ bỏ tập tin',
    uploadError: 'Lỗi tải lên',
    previewFile: 'Xem trước tập tin',
    downloadFile: 'Tải tập tin',
  },
  Empty: {
    description: 'Trống',
  },
};

export default localeValues;
