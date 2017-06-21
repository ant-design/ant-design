import moment from 'moment';
moment.locale('fr');

import Pagination from 'rc-pagination/lib/locale/fr_BE';
import DatePicker from '../date-picker/locale/fr_BE';
import TimePicker from '../time-picker/locale/fr_BE';
import Calendar from '../calendar/locale/fr_BE';

export default {
  locale: 'fr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrer',
    filterConfirm: 'OK',
    filterReset: 'Réinitialiser',
    emptyText: 'Aucune donnée',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuler',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  Transfer: {
    notFoundContent: 'Pas de résultat',
    searchPlaceholder: 'Recherche',
    itemUnit: 'élément',
    itemsUnit: 'éléments',
  },
  Select: {
    notFoundContent: 'Pas de résultat',
  },
};
