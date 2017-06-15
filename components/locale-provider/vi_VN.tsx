import moment from 'moment';
moment.locale('vi');

import Pagination from 'rc-pagination/lib/locale/en_US';
import DatePicker from '../date-picker/locale/vi_VN';
import TimePicker from '../time-picker/locale/vi_VN';
import Calendar from '../calendar/locale/vi_VN';

export default {
  locale: 'vi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Bộ ',
    filterConfirm: 'OK',
    filterReset: 'Tạo Lại',
    emptyText: 'Trống',
    selectAll: 'Chọn Tất Cả',
    selectInvert: 'Chọn Ngược Lại',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Huỷ',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Huỷ',
  },
  Transfer: {
    notFoundContent: 'Không Tìm Thấy',
    searchPlaceholder: 'Tìm ở đây',
    itemUnit: 'mục',
    itemsUnit: 'mục',
  },
  Select: {
    notFoundContent: 'Không Tìm Thấy',
  },
  Upload: {
    uploading: 'Đang tải lên...',
    removeFile: 'Gỡ bỏ tập tin',
    uploadError: 'Lỗi tải lên',
    previewFile: 'Xem thử tập tin',
  },
};
