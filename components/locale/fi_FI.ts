import Pagination from '@rc-component/pagination/lib/locale/fi_FI';

import type { Locale } from '.';
import Calendar from '../calendar/locale/fi_FI';
import DatePicker from '../date-picker/locale/fi_FI';
import TimePicker from '../time-picker/locale/fi_FI';

const typeTemplate = '${label} ei ole kelvollinen ${type}';

const localeValues: Locale = {
  locale: 'fi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    close: 'Sulje',
  },
  Table: {
    filterTitle: 'Suodatus valikko',
    filterConfirm: 'OK',
    filterReset: 'Tyhjennä',
    selectAll: 'Valitse kaikki',
    selectInvert: 'Valitse päinvastoin',
    sortTitle: 'Lajittele',
    triggerDesc: 'Lajittele laskevasti',
    triggerAsc: 'Lajittele nousevasti',
    cancelSort: 'Peruuta lajittelu',
  },
  Tour: {
    Next: 'Seuraava',
    Previous: 'Edellinen',
    Finish: 'Valmis',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Peruuta',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Peruuta',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Etsi täältä',
    itemUnit: 'kohde',
    itemsUnit: 'kohdetta',
  },
  Upload: {
    uploading: 'Lähetetään...',
    removeFile: 'Poista tiedosto',
    uploadError: 'Virhe lähetyksessä',
    previewFile: 'Esikatsele tiedostoa',
    downloadFile: 'Lataa tiedosto',
  },
  Empty: {
    description: 'Ei kohteita',
  },
  Text: {
    edit: 'Muokkaa',
    copy: 'Kopioi',
    copied: 'Kopioitu',
    expand: 'Näytä lisää',
  },
  Form: {
    optional: '(valinnainen)',
    defaultValidateMessages: {
      default: 'Kentän validointivirhe: ${label}',
      required: 'Ole hyvä ja syötä ${label}',
      enum: '${label} pitää olla yksi näistä [${enum}]',
      whitespace: '${label} ei voi olla tyhjä merkki',
      date: {
        format: '${label} päivämäärän muoto on virheellinen',
        parse: '${label} ei voida muuntaa päivämääräksi',
        invalid: '${label} on virheellinen päivämäärä',
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
        len: '${label} pitää olla ${len} merkkiä',
        min: '${label} pitää olla vähintään ${min} merkkiä',
        max: '${label} saa olla enintään ${max} merkkiä',
        range: '${label} pitää olla ${min}-${max} merkkiä',
      },
      number: {
        len: '${label} pitää olla yhtä suuri kuin ${len}',
        min: '${label} pitää olla vähintään ${min}',
        max: '${label} saa olla enintään ${max}',
        range: '${label} pitää olla ${min}-${max} välillä',
      },
      array: {
        len: 'Pitää olla ${len} ${label}',
        min: 'Vähintään ${min} ${label}',
        max: 'Enintään ${max} ${label}',
        range: '${label} määrän pitää olla ${min}-${max} välillä',
      },
      pattern: {
        mismatch: '${label} ei vastaa mallia ${pattern}',
      },
    },
  },
};

export default localeValues;
