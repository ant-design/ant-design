/* eslint-disable no-template-curly-in-string */

import Pagination from 'rc-pagination/lib/locale/pt_BR';
import DatePicker from '../date-picker/locale/pt_BR';
import TimePicker from '../time-picker/locale/pt_BR';
import Calendar from '../calendar/locale/pt_BR';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} não é um ${type} válido';

const localeValues: Locale = {
  locale: 'pt-br',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Por favor escolha',
  },
  Table: {
    filterTitle: 'Menu de Filtro',
    filterConfirm: 'OK',
    filterReset: 'Resetar',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção',
    selectionAll: 'Selecionar todo o conteúdo',
    sortTitle: 'Ordenar título',
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
    searchPlaceholder: 'Procurar',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Upload: {
    uploading: 'Enviando...',
    removeFile: 'Remover arquivo',
    uploadError: 'Erro no envio',
    previewFile: 'Visualizar arquivo',
    downloadFile: 'Baixar arquivo',
  },
  Empty: {
    description: 'Não há dados',
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
    back: 'Retornar',
  },
  Form: {
    defaultValidateMessages: {
      default: 'Erro ${label} na validação de campo',
      required: 'Por favor, insira ${label}',
      enum: '${label} deve ser um dos seguinte: [${enum}]',
      whitespace: '${label} não pode ser um caractér vazio',
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
        mismatch: '${label} não se encaixa no padrão ${pattern}',
      },
    },
  },
};

export default localeValues;
