import Pagination from 'rc-pagination/lib/locale/fr_FR';
import DatePicker from '../date-picker/locale/fr_FR';
import TimePicker from '../time-picker/locale/fr_FR';
import Calendar from '../calendar/locale/fr_FR';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'fr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrer',
    filterConfirm: 'OK',
    filterReset: 'Réinitialiser',
    selectAll: 'Sélectionner la page actuelle',
    selectInvert: 'Inverser la sélection de la page actuelle',
    selectionAll: 'Sélectionner toutes les données',
    sortTitle: 'Trier',
    expand: 'Développer la ligne',
    collapse: 'Réduire la ligne',
    triggerDesc: 'Trier par ordre décroissant',
    triggerAsc: 'Trier par ordre croissant',
    cancelSort: 'Annuler le tri',
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
    searchPlaceholder: 'Rechercher',
    itemUnit: 'élément',
    itemsUnit: 'éléments',
  },
  Empty: {
    description: 'Aucune donnée',
  },
  Upload: {
    uploading: 'Téléchargement...',
    removeFile: 'Effacer le fichier',
    uploadError: 'Erreur de téléchargement',
    previewFile: 'Fichier de prévisualisation',
    downloadFile: 'Télécharger un fichier',
  },
  Text: {
    edit: 'Éditer',
    copy: 'Copier',
    copied: 'Copie effectuée',
    expand: 'Développer',
  },
  PageHeader: {
    back: 'Retour',
  },
};

export default localeValues;
