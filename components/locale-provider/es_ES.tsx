// Uncomment after rc-pagination package include es_ES locale
// import Pagination from 'rc-pagination/lib/locale/es_ES';
import DatePicker from '../date-picker/locale/es_ES';
import TimePicker from '../time-picker/locale/es_ES';
import Calendar from '../calendar/locale/es_ES';

// Remove after rc-pagination package include es_ES locale
const Pagination = {
  // Options.jsx
  items_per_page: '/ página',
  jump_to: 'Ir a',
  page: '',

  // Pagination.jsx
  prev_page: 'Página anterior',
  next_page: 'Página siguiente',
  prev_5: '5 páginas previas',
  next_5: '5 páginas siguientes',
  prev_3: '3 páginas previas',
  next_3: '3 páginas siguientes',
};

export default {
  locale: 'es',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrar Menu',
    filterConfirm: 'OK',
    filterReset: 'Resetear',
    emptyText: 'No Hay Datos',
    selectAll: 'Seleccionar Todo',
    selectInvert: 'Invertir Selección',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancelar',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancelar',
  },
  Transfer: {
    notFoundContent: 'No Encontrado',
    searchPlaceholder: 'Buscar aquí',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'No Encontrado',
  },
  Upload: {
    uploading: 'Subiendo...',
    removeFile: 'Eliminar archivo',
    uploadError: 'Error de subida',
    previewFile: 'Vista previa',
  },
};
