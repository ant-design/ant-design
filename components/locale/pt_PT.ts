import Pagination from 'rc-pagination/lib/locale/pt_PT';

import type { Locale } from '.';
import Calendar from '../calendar/locale/pt_PT';
import DatePicker from '../date-picker/locale/pt_PT';
import TimePicker from '../time-picker/locale/pt_PT';

const typeTemplate = '${label} não é um(a) ${type} válido(a)';

const localeValues: Locale = {
  locale: 'pt',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Por favor, selecione',
  },
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'Aplicar',
    filterReset: 'Repor',
    filterEmptyText: 'Sem filtros',
    filterCheckAll: 'Selecionar todos os itens',
    filterSearchPlaceholder: 'Pesquisar nos filtros',
    emptyText: 'Sem dados',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter página atual',
    selectNone: 'Limpar todos os dados',
    selectionAll: 'Selecionar todos os dados',
    sortTitle: 'Ordenar',
    expand: 'Expandir linha',
    collapse: 'Colapsar linha',
    triggerDesc: 'Clique para ordenar decrescente',
    triggerAsc: 'Clique para ordenar crescente',
    cancelSort: 'Clique para cancelar ordenação',
  },
  Tour: {
    Next: 'Próximo',
    Previous: 'Anterior',
    Finish: 'Terminar',
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
    titles: ['', ''],
    searchPlaceholder: 'Procurar...',
    itemUnit: 'item',
    itemsUnit: 'itens',
    remove: 'Remover',
    selectCurrent: 'Selecionar página atual',
    removeCurrent: 'Remover página atual',
    selectAll: 'Selecionar tudo',
    deselectAll: 'Desmarcar tudo',
    removeAll: 'Remover tudo',
    selectInvert: 'Inverter página actual',
  },
  Upload: {
    uploading: 'A carregar...',
    removeFile: 'Remover',
    uploadError: 'Erro ao carregar',
    previewFile: 'Pré-visualizar',
    downloadFile: 'Descarregar',
  },
  Empty: {
    description: 'Sem dados',
  },
  Icon: {
    icon: 'ícone',
  },
  Text: {
    edit: 'Editar',
    copy: 'Copiar',
    copied: 'Copiado',
    expand: 'Expandir',
    collapse: 'Colapsar',
  },
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Erro de validação no campo ${label}',
      required: 'Por favor, introduza ${label}',
      enum: '${label} deve ser um dos valores [${enum}]',
      whitespace: '${label} não pode ser um carácter em branco',
      date: {
        format: 'Formato da data ${label} é inválido',
        parse: '${label} não pode ser convertido para data',
        invalid: '${label} é uma data inválida',
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
        len: '${label} deve ter ${len} caracteres',
        min: '${label} deve ter pelo menos ${min} caracteres',
        max: '${label} deve ter até ${max} caracteres',
        range: '${label} deve ter entre ${min}-${max} caracteres',
      },
      number: {
        len: '${label} deve ser igual a ${len}',
        min: '${label} deve ser no mínimo ${min}',
        max: '${label} deve ser no máximo ${max}',
        range: '${label} deve estar entre ${min}-${max}',
      },
      array: {
        len: 'Deve ter ${len} ${label}',
        min: 'Pelo menos ${min} ${label}',
        max: 'No máximo ${max} ${label}',
        range: 'A quantidade de ${label} deve estar entre ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} não corresponde ao padrão ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Pré-visualizar',
  },
  QRCode: {
    expired: 'Código QR expirou',
    refresh: 'Atualizar',
    scanned: 'Digitalizado',
  },
  ColorPicker: {
    presetEmpty: 'Vazio',
    transparent: 'Transparente',
    singleColor: 'Simples',
    gradientColor: 'Gradiente',
  },
};

export default localeValues;
