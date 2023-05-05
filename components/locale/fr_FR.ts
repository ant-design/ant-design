/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/fr_FR';
import type { Locale } from '.';
import Calendar from '../calendar/locale/fr_FR';
import DatePicker from '../date-picker/locale/fr_FR';
import TimePicker from '../time-picker/locale/fr_FR';

const typeTemplate = "La valeur du champ ${label} n'est pas valide pour le type ${type}";

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
    filterEmptyText: 'Aucun filtre',
    filterCheckall: 'Tout sélectionner',
    filterSearchPlaceholder: 'Chercher dans les filtres',
    emptyText: 'Aucune donnée',
    selectAll: 'Sélectionner la page actuelle',
    selectInvert: 'Inverser la sélection de la page actuelle',
    selectNone: 'Désélectionner toutes les données',
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
  Tour: {
    Next: 'Étape suivante',
    Previous: 'Étape précédente',
    Finish: 'Fin de la visite guidée',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuler',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Rechercher',
    itemUnit: 'élément',
    itemsUnit: 'éléments',
    remove: 'Désélectionner',
    selectCurrent: 'Sélectionner la page actuelle',
    removeCurrent: 'Désélectionner la page actuelle',
    selectAll: 'Sélectionner toutes les données',
    removeAll: 'Désélectionner toutes les données',
    selectInvert: 'Inverser la sélection de la page actuelle',
  },
  Upload: {
    uploading: 'Téléchargement...',
    removeFile: 'Effacer le fichier',
    uploadError: 'Erreur de téléchargement',
    previewFile: 'Fichier de prévisualisation',
    downloadFile: 'Télécharger un fichier',
  },
  Empty: {
    description: 'Aucune donnée',
  },
  Icon: {
    icon: 'icône',
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
    optional: '(optionnel)',
    defaultValidateMessages: {
      default: 'Erreur de validation pour le champ ${label}',
      required: 'Le champ ${label} est obligatoire',
      enum: 'La valeur du champ ${label} doit être parmi [${enum}]',
      whitespace: 'La valeur du champ ${label} ne peut pas être vide',
      date: {
        format: "La valeur du champ ${label} n'est pas au format date",
        parse: 'La valeur du champ ${label} ne peut pas être convertie vers une date',
        invalid: "La valeur du champ ${label} n'est pas une date valide",
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
        len: 'La taille du champ ${label} doit être de ${len} caractères',
        min: 'La taille du champ ${label} doit être au minimum de ${min} caractères',
        max: 'La taille du champ ${label} doit être au maximum de ${max} caractères',
        range: 'La taille du champ ${label} doit être entre ${min} et ${max} caractères',
      },
      number: {
        len: 'La valeur du champ ${label} doit être égale à ${len}',
        min: 'La valeur du champ ${label} doit être plus grande que ${min}',
        max: 'La valeur du champ ${label} doit être plus petit que ${max}',
        range: 'La valeur du champ ${label} doit être entre ${min} et ${max}',
      },
      array: {
        len: 'La taille du tableau ${label} doit être de ${len}',
        min: 'La taille du tableau ${label} doit être au minimum de ${min}',
        max: 'La taille du tableau ${label} doit être au maximum de ${max}',
        range: 'La taille du tableau ${label} doit être entre ${min}-${max}',
      },
      pattern: {
        mismatch: 'La valeur du champ ${label} ne correspond pas au modèle ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Aperçu',
  },
};

export default localeValues;
