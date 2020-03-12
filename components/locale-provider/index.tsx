import * as React from 'react';
import * as PropTypes from 'prop-types';
import warning from '../_util/warning';

import { ModalLocale, changeConfirmLocale } from '../modal/locale';
import { TransferLocale as TransferLocaleForEmpty } from '../empty';
import { PaginationLocale } from '../pagination/Pagination';
import { TableLocale } from '../table/interface';
import { PopconfirmLocale } from '../popconfirm';
import { UploadLocale } from '../upload/interface';
import { TransferLocale } from '../transfer';
import { PickerLocale as DatePickerLocale } from '../date-picker/generatePicker';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  Pagination?: PaginationLocale;
  DatePicker?: DatePickerLocale;
  TimePicker?: Object;
  Calendar?: Object;
  Table?: TableLocale;
  Modal?: ModalLocale;
  Popconfirm?: PopconfirmLocale;
  Transfer?: Partial<TransferLocale>;
  Select?: Object;
  Upload?: UploadLocale;
  Empty?: TransferLocaleForEmpty;
  global?: Object;
  PageHeader?: Object;
  Icon?: Object;
  Text?: Object;
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  _ANT_MARK__?: string;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    antLocale: PropTypes.object,
  };

  constructor(props: LocaleProviderProps) {
    super(props);
    changeConfirmLocale(props.locale && props.locale.Modal);

    warning(
      props._ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );
  }

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  componentDidUpdate(prevProps: LocaleProviderProps) {
    const { locale } = this.props;
    if (prevProps.locale !== locale) {
      changeConfirmLocale(locale && locale.Modal);
    }
  }

  componentWillUnmount() {
    changeConfirmLocale();
  }

  render() {
    return this.props.children;
  }
}
