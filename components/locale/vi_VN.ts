import Pagination from 'rc-pagination/lib/locale/vi_VN';
import Calendar from '../calendar/locale/vi_VN';
import DatePicker from '../date-picker/locale/vi_VN';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/vi_VN';

const typeTemplate = '${label} không phải kiểu ${type} hợp lệ';

const localeValues: Locale = {
  locale: 'vi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Vui lòng chọn',
  },
  Table: {
    filterTitle: 'Bộ lọc',
    filterConfirm: 'Đồng ý',
    filterReset: 'Bỏ lọc',
    filterEmptyText: 'Không có bộ lọc',
    filterCheckall: 'Chọn tất cả',
    filterSearchPlaceholder: 'Tìm kiếm bộ lọc',
    emptyText: 'Trống',
    selectAll: 'Chọn tất cả',
    selectInvert: 'Chọn ngược lại',
    selectNone: 'Bỏ chọn tất cả',
    selectionAll: 'Chọn tất cả',
    sortTitle: 'Sắp xếp',
    expand: 'Mở rộng dòng',
    collapse: 'Thu gọn dòng',
    triggerDesc: 'Nhấp để sắp xếp giảm dần',
    triggerAsc: 'Nhấp để sắp xếp tăng dần',
    cancelSort: 'Nhấp để hủy sắp xếp',
  },
  Tour: {
    Next: 'Tiếp',
    Previous: 'Trước',
    Finish: 'Hoàn thành',
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
    remove: 'Gỡ bỏ',
    selectCurrent: 'Chọn trang hiện tại',
    removeCurrent: 'Gỡ bỏ trang hiện tại',
    selectAll: 'Chọn tất cả',
    removeAll: 'Gỡ bỏ tất cả',
    selectInvert: 'Đảo ngược trang hiện tại',
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
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'Chỉnh sửa',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    expand: 'Mở rộng',
  },
  PageHeader: {
    back: 'Quay lại',
  },
  Form: {
    optional: '(Tùy chọn)',
    defaultValidateMessages: {
      default: '${label} không đáp ứng điều kiện quy định',
      required: 'Hãy nhập thông tin cho trường ${label}',
      enum: '${label} phải có giá trị nằm trong tập [${enum}]',
      whitespace: '${label} không được chứa khoảng trắng',
      date: {
        format: '${label} sai định dạng ngày tháng',
        parse: 'Không thể chuyển ${label} sang kiểu Ngày tháng',
        invalid: '${label} không phải giá trị Ngày tháng hợp lệ',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} phải dài đúng ${len} ký tự',
        min: 'Độ dài tối thiểu trường ${label} là ${min} ký tự',
        max: 'Độ dài tối đa trường ${label} là ${max} ký tự',
        range: 'Độ dài trường ${label} phải từ ${min} đến ${max} ký tự',
      },
      number: {
        len: '${label} phải bằng ${len}',
        min: '${label} phải lớn hơn hoặc bằng ${min}',
        max: '${label} phải nhỏ hơn hoặc bằng ${max}',
        range: '${label} phải nằm trong khoảng ${min}-${max}',
      },
      array: {
        len: 'Mảng ${label} phải có ${len} phần tử ',
        min: 'Mảng ${label} phải chứa tối thiểu ${min} phần tử ',
        max: 'Mảng ${label} phải chứa tối đa ${max} phần tử ',
        range: 'Mảng ${label} phải chứa từ ${min}-${max} phần tử',
      },
      pattern: {
        mismatch: '${label} không thỏa mãn mẫu kiểm tra ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Xem trước',
  },
  QRCode: {
    expired: 'Mã QR hết hạn',
    refresh: 'Làm mới',
  },
};

export default localeValues;
