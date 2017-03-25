import moment from 'moment';
moment.locale('tr');

import Pagination from 'rc-pagination/lib/locale/en_US';
import DatePicker from '../date-picker/locale/tr_TR';
import TimePicker from '../time-picker/locale/tr_TR';
import Calendar from '../calendar/locale/tr_TR';

export default {
  locale: 'tr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Menü Filtrele',
    filterConfirm: 'Tamam',
    filterReset: 'Sıfırla',
    emptyText: 'Sonuç Yok',
    selectAll: 'Hepsini Seç',
    selectInvert: 'Tersine Seç',
  },
  Modal: {
    okText: 'Tamam',
    cancelText: 'İptal',
    justOkText: 'Tamam',
  },
  Popconfirm: {
    okText: 'Tamam',
    cancelText: 'İptal',
  },
  Transfer: {
    notFoundContent: 'Bulunamadı',
    searchPlaceholder: 'Arama',
    itemUnit: 'Öğe',
    itemsUnit: 'Öğeler',
  },
  Select: {
    notFoundContent: 'Bulunamadı',
  },
  Upload: {
    uploading: 'Yükleniyor...',
    removeFile: `Dosya'ı Kaldır`,
    uploadError: 'Yükleme Hatası',
    previewFile: `Dosya'ı Görüntüle`,
  },
};
