/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/pt_PT';
import Calendar from '../calendar/locale/pt_PT';
import DatePicker from '../date-picker/locale/pt_PT';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/pt_PT';

const typeTemplate = '${label} não é um ${type} válido';

const localeValues: Locale = {
  locale: 'pt',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Por favor escolha',
  },
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'Aplicar',
    filterReset: 'Reiniciar',
    filterEmptyText: 'Sem filtros',
    filterCheckall: 'Selecionar todos os itens',
    filterSearchPlaceholder: 'Pesquisar nos filtros',
    emptyText: 'Sem conteúdo',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção',
    sortTitle: 'Ordenação',
    selectNone: 'Apagar todo o conteúdo',
    selectionAll: 'Selecionar todo o conteúdo',
    expand: 'Expandir linha',
    collapse: 'Colapsar linha',
    triggerDesc: 'Clique organiza por descendente',
    triggerAsc: 'Clique organiza por ascendente',
    cancelSort: 'Clique para cancelar organização',
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
    removeAll: 'Remover tudo',
    selectInvert: 'Inverter a página actual',
  },
  Upload: {
    uploading: 'A carregar...',
    removeFile: 'Remover',
    uploadError: 'Erro ao carregar',
    previewFile: 'Pré-visualizar',
    downloadFile: 'Baixar',
  },
  Empty: {
    description: 'Sem resultados',
  },
  Icon: {
    icon: 'ícone',
  },
  Text: {
    edit: 'editar',
    copy: 'copiar',
    copied: 'copiado',
    expand: 'expandir',
  },
  PageHeader: {
    back: 'voltar',
  },
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Erro ${label} na validação de campo',
      required: 'Por favor, insira ${label}',
      enum: '${label} deve ser um dos seguinte: [${enum}]',
      whitespace: '${label} não pode ser um carácter vazio',
      date: {
        format: ' O formato de data ${label} é inválido',
        parse: '${label} não pode ser convertido para uma data',
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
        len: '${label} deve possuir ${len} caracteres',
        min: '${label} deve possuir ao menos ${min} caracteres',
        max: '${label} deve possuir no máximo ${max} caracteres',
        range: '${label} deve possuir entre ${min} e ${max} caracteres',
      },
      number: {
        len: '${label} deve ser igual à ${len}',
        min: 'O valor mínimo de ${label} é ${min}',
        max: 'O valor máximo de ${label} é ${max}',
        range: '${label} deve estar entre ${min} e ${max}',
      },
      array: {
        len: 'Deve ser ${len} ${label}',
        min: 'No mínimo ${min} ${label}',
        max: 'No máximo ${max} ${label}',
        range: 'A quantidade de ${label} deve estar entre ${min} e ${max}',
      },
      pattern: {
        mismatch: '${label} não se enquadra no padrão ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Pré-visualização',
  },
};

export default localeValues;
