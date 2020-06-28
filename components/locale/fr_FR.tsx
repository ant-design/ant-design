/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/fr_FR';
import DatePicker from '../date-picker/locale/fr_FR';
import TimePicker from '../time-picker/locale/fr_FR';
import Calendar from '../calendar/locale/fr_FR';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} n\'est pas un ${type} valide';

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
    cancelSort: 'Annuler le trie',
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
  Form: {
    defaultValidateMessages: {
      default: 'Erreur de validation de champ ${label}',
      required: 'S\'il vous plaît remplir ${label}',
      enum: '${label} doit être l\'un des [${enum}]',
      whitespace: '${label} ne peut pas être un caractère vide',
      date: {
        format: '${label} date format n\'est pas valide',
        parse: '${label} ne peut pas être converti en date',
        invalid: '${label} est une date invalide',
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
        len: '${label} doit être ${len} caractères',
        min: '${label} au moins ${min} caractères',
        max: '${label} jusqu\'à ${max} caractères',
        range: '${label} doit être entre ${min}-${max} caractères',
      },
      number: {
        len: '${label} doit être égal à ${len}',
        min: 'La valeur minimale de ${label} est ${min}',
        max: 'La valeur maximale de ${label} est ${max}',
        range: '${label} doit être entre ${min}-${max}',
      },
      array: {
        len: 'Le nombre d\'éléments ${label} doit être égal à ${len}',
        min: 'Le nombre d\'éléments ${label} doit être supérieur ou égal à ${min}',
        max: 'Le nombre d\'éléments ${label} doit être inférieur ou égal à ${max}',
        range: 'Le nombre de ${label} doit être compris entre ${min} - ${max}',
      },
      pattern: {
        mismatch: '${label} ne correspond pas au modèle ${pattern}',
      },
    }
  }
};

export default localeValues;
