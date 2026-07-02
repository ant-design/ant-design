import Pagination from '@rc-component/pagination/locale/fi_FI';

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
    show: 'Näytä',
    hide: 'Piilota',
    placeholder: 'Ole hyvä ja valitse',
    sortable: 'lajiteltava',
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
    filterEmptyText: 'Ei suodattimia',
    filterCheckAll: 'Valitse kaikki kohteet',
    filterSearchPlaceholder: 'Hae suodattimista',
    emptyText: 'Ei dataa',
    selectNone: 'Tyhjennä kaikki tiedot',
    selectionAll: 'Valitse kaikki tiedot',
    expand: 'Laajenna riviä',
    collapse: 'Tiivistä rivi',
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
    remove: 'Poista',
    selectCurrent: 'Valitse nykyinen sivu',
    removeCurrent: 'Poista nykyinen sivu',
    selectAll: 'Valitse kaikki tiedot',
    deselectAll: 'Poista kaikkien tietojen valinnat',
    removeAll: 'Poista kaikki tiedot',
    selectInvert: 'Kääntää nykyinen sivu',
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
  Icon: {
    icon: 'kuvake',
  },
  Text: {
    edit: 'Muokkaa',
    copy: 'Kopioi',
    copied: 'Kopioitu',
    expand: 'Näytä lisää',
    collapse: 'Kutista',
  },
  Form: {
    optional: '(valinnainen)',
    defaultValidateMessages: {
      default: 'Kentän ${label} vahvistus epäonnistui',
      required: 'Syötä ${label}',
      enum: '${label} on oltava yksi seuraavista: [${enum}]',
      whitespace: '${label} ei voi olla tyhjä',
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
        len: '${label} täytyy olla täsmälleen ${len} merkkiä pitkä',
        min: '${label} täytyy olla vähintään ${min} merkkiä pitkä',
        max: '${label} saa olla enintään ${max} merkkiä pitkä',
        range: '${label} täytyy olla ${min}–${max} merkkiä pitkä',
      },
      number: {
        len: '${label} täytyy olla yhtä suuri kuin ${len}',
        min: '${label} täytyy olla vähintään ${min}',
        max: '${label} saa olla enintään ${max}',
        range: '${label} täytyy olla välillä ${min}–${max}',
      },
      array: {
        len: '${label} täytyy sisältää täsmälleen ${len} kohdetta',
        min: '${label} täytyy sisältää vähintään ${min} kohdetta',
        max: '${label} saa sisältää enintään ${max} kohdetta',
        range: '${label} täytyy sisältää ${min}–${max} kohdetta',
      },
      pattern: {
        mismatch: '${label} ei vastaa mallia ${pattern}',
      },
    },
  },
  QRCode: {
    expired: 'QR-koodi vanhentunut',
    refresh: 'Päivitä',
    scanned: 'Skannattu',
  },
  ColorPicker: {
    presetEmpty: 'Tyhjä',
    transparent: 'Läpinäkyvä',
    singleColor: 'Yksivärinen',
    gradientColor: 'Gradienttiväri',
  },
};

export default localeValues;
