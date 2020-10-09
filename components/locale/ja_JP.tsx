/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ja_JP';
import DatePicker from '../date-picker/locale/ja_JP';
import TimePicker from '../time-picker/locale/ja_JP';
import Calendar from '../calendar/locale/ja_JP';
import { Locale } from '../locale-provider';

const typeTemplate = '${label}は有効な${type}ではありません';

const localeValues: Locale = {
  locale: 'ja',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'メニューをフィルター',
    filterConfirm: 'OK',
    filterReset: 'リセット',
    filterEmptyText: 'フィルターなし',
    selectAll: 'すべてを選択',
    selectInvert: '選択を反転',
    selectionAll: 'すべてのデータを選択',
    sortTitle: 'ソート',
    expand: '展開する',
    collapse: '折り畳む',
    triggerDesc: 'クリックで降順にソート',
    triggerAsc: 'クリックで昇順にソート',
    cancelSort: 'ソートをキャンセル',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'キャンセル',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },
  Transfer: {
    searchPlaceholder: 'ここを検索',
    itemUnit: 'アイテム',
    itemsUnit: 'アイテム',
  },
  Upload: {
    uploading: 'アップロード中...',
    removeFile: 'ファイルを削除',
    uploadError: 'アップロードエラー',
    previewFile: 'ファイルをプレビュー',
    downloadFile: 'ダウンロードファイル',
  },
  Empty: {
    description: 'データがありません',
  },
  Form: {
    defaultValidateMessages: {
      default: '${label}のフィールド検証エラー',
      required: '${label}を入力してください',
      enum: '${label}は[${enum}]のいずれかである必要があります',
      whitespace: '${label}は空白文字にすることはできません',
      date: {
        format: '${label}の日付形式は不正です',
        parse: '${label}は日付に変換できません',
        invalid: '${label}は不正な日付です',
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
        len: '${label}は${len}文字である必要があります',
        min: '${label}は${min}文字以上である必要があります',
        max: '${label}は${max}文字以下である必要があります',
        range: '${label}は${min}-${max}文字の範囲である必要があります',
      },
      number: {
        len: '${label}は${len}と等しい必要があります',
        min: '${label}の最小値は${min}です',
        max: '${label}の最大値は${max}です',
        range: '${label}は${min}-${max}の範囲である必要があります',
      },
      array: {
        len: '${label}は${len}である必要があります',
        min: '${label}の最小は${min}です',
        max: '${label}の最大は${max}です',
        range: '${label}の合計は${min}-${max}の範囲である必要があります',
      },
      pattern: {
        mismatch: '${label}はパターン${pattern}と一致しません',
      },
    },
  },
};

export default localeValues;
